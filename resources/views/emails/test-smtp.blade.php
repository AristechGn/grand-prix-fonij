<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Email - Grand Prix FONIJ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #016f10;
        }
        .title {
            color: #016f10;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #016f10;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">Test Email SMTP</h1>
            <p>Grand Prix FONIJ {{ $editionYear }}</p>
        </div>

        <div class="content">
            <p>Bonjour <strong>{{ $candidateName }}</strong>,</p>
            
            <p>Ceci est un test d'envoi d'email SMTP.</p>

            <div class="info-box">
                <div class="info-title">Détails du test</div>
                <div class="info-item">
                    <span class="info-label">Numéro de candidature :</span>
                    <span class="info-value">{{ $applicationNumber }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Nom du projet :</span>
                    <span class="info-value">{{ $projectName }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date de test :</span>
                    <span class="info-value">{{ $submissionDate }}</span>
                </div>
            </div>

            <p>Si vous recevez cet email, la configuration SMTP fonctionne correctement !</p>
            
            <p>Cordialement,<br>
            <strong>L'équipe du Grand Prix FONIJ</strong></p>
        </div>
    </div>
</body>
</html>
