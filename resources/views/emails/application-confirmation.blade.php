<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de candidature - Grand Prix FONIJ</title>
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
        .logo {
            max-width: 200px;
            height: auto;
        }
        .title {
            color: #016f10;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
        }
        .content {
            margin-bottom: 30px;
        }
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #016f10;
            padding: 15px;
            margin: 20px 0;
        }
        .info-title {
            font-weight: bold;
            color: #016f10;
            margin-bottom: 10px;
        }
        .info-item {
            margin: 8px 0;
        }
        .info-label {
            font-weight: bold;
            color: #333;
        }
        .info-value {
            color: #666;
        }
        .next-steps {
            background-color: #e8f5e8;
            border: 1px solid #016f10;
            border-radius: 5px;
            padding: 20px;
            margin: 30px 0;
        }
        .next-steps h3 {
            color: #016f10;
            margin-top: 0;
        }
        .next-steps ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .next-steps li {
            margin: 8px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        .contact-info {
            background-color: #f0f8ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .contact-info h4 {
            color: #016f10;
            margin-top: 0;
        }
        .btn {
            display: inline-block;
            background-color: #016f10;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
            font-weight: bold;
        }
        .btn:hover {
            background-color: #014a0a;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('images/fonij-logo.png') }}" alt="Logo FONIJ" class="logo">
            <h1 class="title">Confirmation de candidature</h1>
            <p class="subtitle">Grand Prix FONIJ {{ $editionYear }}</p>
        </div>

        <div class="content">
            <p>Bonjour <strong>{{ $candidateName }}</strong>,</p>
            
            <p>Nous avons bien reçu votre candidature pour le <strong>Grand Prix FONIJ {{ $editionYear }}</strong>.</p>
            
            <p>Nous vous remercions pour votre intérêt et votre confiance en notre programme d'entrepreneuriat.</p>

            <div class="info-box">
                <div class="info-title">Détails de votre candidature</div>
                <div class="info-item">
                    <span class="info-label">Numéro de candidature :</span>
                    <span class="info-value">{{ $applicationNumber }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Nom du projet :</span>
                    <span class="info-value">{{ $projectName }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date de soumission :</span>
                    <span class="info-value">{{ $submissionDate }}</span>
                </div>
            </div>

            <div class="next-steps">
                <h3>Prochaines étapes</h3>
                <ul>
                    <li><strong>Vérification des documents :</strong> Notre équipe va examiner votre dossier dans les plus brefs délais.</li>
                    <li><strong>Évaluation :</strong> Votre projet sera évalué par notre jury d'experts selon les critères établis.</li>
                    <li><strong>Notification :</strong> Vous serez informé(e) des résultats par email et par téléphone.</li>
                    <li><strong>Suivi :</strong> Conservez précieusement ce numéro de candidature pour tout échange ultérieur.</li>
                </ul>
            </div>

            <div class="contact-info">
                <h4>Besoin d'aide ?</h4>
                <p>Si vous avez des questions concernant votre candidature, n'hésitez pas à nous contacter :</p>
                <p>
                    <strong>Email :</strong> contact@fonij.org<br>
                    <strong>Téléphone :</strong> +224 XXX XX XX XX<br>
                    <strong>Site web :</strong> www.fonij.org
                </p>
            </div>

            <p>Encore une fois, merci pour votre candidature et bonne chance !</p>
            
            <p>Cordialement,<br>
            <strong>L'équipe du Grand Prix FONIJ</strong></p>
        </div>

        <div class="footer">
            <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.</p>
            <p>&copy; {{ date('Y') }} FONIJ - Fondation pour l'Innovation et l'Entrepreneuriat en Guinée</p>
        </div>
    </div>
</body>
</html>
