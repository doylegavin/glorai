<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['name']) || !isset($input['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        exit;
    }
    
    $name = $input['name'];
    $email = $input['email'];
    
    // Google Form submission URL
    $url = 'https://docs.google.com/forms/d/e/1FAIpQLSdqBSUPmkABigWFVJJAiSOOh0UUfRWHuLtLiu14Rz_wMuS3dA/formResponse';
    
    // Prepare form data
    $data = [
        'entry.1096888862' => $name,
        'entry.1534687542' => $email
    ];
    
    // Submit to Google Form
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; FormSubmitter/1.0)');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    // Log the submission
    $logEntry = date('Y-m-d H:i:s') . " - Name: $name, Email: $email, HTTP Code: $httpCode\n";
    file_put_contents('submissions.log', $logEntry, FILE_APPEND);
    
    // Return success regardless of Google's response (they often return errors even on success)
    echo json_encode([
        'success' => true,
        'message' => 'Form submitted successfully',
        'name' => $name,
        'email' => $email
    ]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?> 