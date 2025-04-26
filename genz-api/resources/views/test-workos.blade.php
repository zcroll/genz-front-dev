<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WorkOS Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            max-width: 800px;
        }
        .container {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .label {
            font-weight: bold;
        }
        .value {
            word-break: break-all;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>WorkOS Configuration Test</h1>
    
    <div class="container">
        <div class="info-item">
            <div class="label">Client ID:</div>
            <div class="value">{{ $clientId }}</div>
        </div>
        
        <div class="info-item">
            <div class="label">API Key (masked):</div>
            <div class="value">{{ $apiKey }}</div>
        </div>
        
        <div class="info-item">
            <div class="label">Redirect URL:</div>
            <div class="value">{{ $redirectUrl }}</div>
        </div>
        
        <div class="info-item">
            <div class="label">WorkOS Initialized:</div>
            <div class="value">{{ $workosInitialized ? 'Yes' : 'No' }}</div>
        </div>
        
        <div class="info-item">
            <div class="label">Generated Authorization URL:</div>
            <div class="value">{{ $authUrl }}</div>
        </div>
        
        <a href="{{ $authUrl }}" class="button">Test Login</a>
    </div>
</body>
</html>
