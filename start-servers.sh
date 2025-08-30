#!/bin/bash

echo "🚀 Starting GlorAI servers..."

# Start the form submission server in the background
echo "Starting form submission server on port 8001..."
python3 server.py &
FORM_SERVER_PID=$!

# Wait a moment for the server to start
sleep 2

# Start the web server
echo "Starting web server on port 8000..."
echo "🌐 Visit: http://localhost:8000"
echo "📝 Form server: http://localhost:8001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Start web server (this will block)
python3 -m http.server 8000

# If we get here, the web server was stopped
echo "Stopping form submission server..."
kill $FORM_SERVER_PID 2>/dev/null

echo "All servers stopped." 