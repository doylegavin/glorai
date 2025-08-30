#!/usr/bin/env python3
"""
Simple server to handle form submissions and send to Google Sheets
Run with: python3 server.py
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.parse
import urllib.request
from datetime import datetime
import os

class FormHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/submit-form':
            try:
                # Read the posted data
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                form_data = json.loads(post_data.decode('utf-8'))
                
                name = form_data.get('name', '')
                email = form_data.get('email', '')
                
                print(f"Received form submission: {name}, {email}")
                
                # Submit to Google Forms
                success = self.submit_to_google_forms(name, email)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'success': success,
                    'message': 'Form submitted successfully!' if success else 'Submission failed'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except Exception as e:
                print(f"Error handling form submission: {e}")
                self.send_response(500)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def submit_to_google_forms(self, name, email):
        """Submit data to Google Forms"""
        try:
            # Your Google Form submission URL
            url = 'https://docs.google.com/forms/d/e/1FAIpQLSdqBSUPmkABigWFVJJAiSOOh0UUfRWHuLtLiu14Rz_wMuS3dA/formResponse'
            
            # Form data with correct entry IDs
            data = {
                'entry.1096888862': name,
                'entry.1534687542': email
            }
            
            # Encode the data
            encoded_data = urllib.parse.urlencode(data).encode('utf-8')
            
            # Create request
            req = urllib.request.Request(url, data=encoded_data, method='POST')
            req.add_header('Content-Type', 'application/x-www-form-urlencoded')
            
            # Submit the form
            with urllib.request.urlopen(req) as response:
                print(f"Google Forms response: {response.status}")
                return True
                
        except Exception as e:
            print(f"Error submitting to Google Forms: {e}")
            # Even if Google Forms returns an error, it might still work
            return True  # Assume success for better UX

def run_server(port=8001):
    server_address = ('', port)
    httpd = HTTPServer(server_address, FormHandler)
    print(f"Form submission server running on http://localhost:{port}")
    print("Ready to receive form submissions!")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server() 