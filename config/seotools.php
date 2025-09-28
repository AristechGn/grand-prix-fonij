<?php
/**
 * @see https://github.com/artesaos/seotools
 */

return [
    'inertia' => env('SEO_TOOLS_INERTIA', true),
    'meta' => [
        /*
         * The default configurations to be used by the meta generator.
         */
        'defaults'       => [
            'title'        => 'Grand Prix FONIJ - Initiative pour l\'entrepreneuriat des jeunes guinéens', // set false to total remove
            'titleBefore'  => false, // Put defaults.title before page title, like 'It's Over 9000! - Dashboard'
            'description'  => 'Le Grand Prix FONIJ récompense les jeunes entrepreneurs guinéens âgés de 18 à 35 ans dans 5 catégories : promotion de l\'esprit d\'entreprise, éducation aux compétences entrepreneuriales, transition numérique, entrepreneuriat agricole durable et grand prix du jury. Participez à cette initiative du FONIJ pour transformer vos idées en entreprises prospères.', // set false to total remove
            'separator'    => ' - ',
            'keywords'     => [
                // Mots-clés principaux (15)
                'FONIJ', 'Grand Prix FONIJ', 'Guinée', 'jeunes entrepreneurs', 'entrepreneuriat', 
                'innovation', 'insertion professionnelle', 'concours', 'startup', 'business plan',
                'Fonds National Insertion Jeunes', 'FONIJ Guinée', 'initiative entrepreneuriat', 'compétition jeunes', 'prix entrepreneuriat',
                
                // Mots-clés géographiques (20)
                'Conakry', 'Kaloum', 'Guinée Conakry', 'Afrique de l\'Ouest', 'République de Guinée',
                'Capitale Guinée', 'Palais du Peuple', 'Kaloum Conakry', 'Centre ville Conakry',
                'Guinée maritime', 'Région de Conakry', 'Préfecture de Conakry', 'Commune de Kaloum',
                'Quartier Kaloum', 'Afrique occidentale', 'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Sierra Leone',
                'Libéria', 'Guinée-Bissau', 'Côte atlantique', 'Afrique subsaharienne',
                
                // Mots-clés sectoriels (30)
                'patrimoine immobilier', 'gestion immobilière', 'administration publique', 'service immobilier',
                'bâtiments publics', 'infrastructures publiques', 'patrimoine national', 'biens immobiliers',
                'patrimoine architectural', 'architecture publique', 'urbanisme Conakry', 'développement urbain',
                'immobilier d\'État', 'propriété publique', 'domaine public', 'patrimoine collectif',
                'bâtiments institutionnels', 'infrastructures gouvernementales', 'patrimoine culturel', 'patrimoine historique',
                'architecture coloniale', 'architecture moderne', 'urbanisme Guinée', 'aménagement urbain', 'développement territorial',
                'agriculture', 'technologie', 'numérique', 'innovation technologique', 'sécurité alimentaire', 'développement rural',
                
                // Mots-clés fonctionnels (35)
                'entretien bâtiments', 'maintenance immobilière', 'valorisation patrimoine', 'gestion patrimoine',
                'administration immobilière', 'service public immobilier', 'patrimoine étatique', 'gestion locative',
                'maintenance préventive', 'rénovation bâtiments', 'réhabilitation patrimoine', 'restauration patrimoine',
                'conservation patrimoine', 'préservation patrimoine', 'mise en valeur', 'exploitation patrimoine',
                'gestion technique', 'gestion financière', 'gestion administrative', 'gestion opérationnelle',
                'planification maintenance', 'programmation travaux', 'suivi travaux', 'contrôle qualité',
                'audit patrimoine', 'inventaire patrimoine', 'évaluation patrimoine', 'expertise patrimoine',
                'conseil patrimoine', 'assistance technique', 'formation personnel', 'compétences techniques',
                'leadership', 'gestion', 'marketing', 'comptabilité', 'finance',
                
                // Mots-clés techniques (40)
                'immobilier public', 'bâtiments administratifs', 'infrastructures étatiques', 'patrimoine bâti public',
                'gestion locative publique', 'entretien infrastructures', 'maintenance bâtiments', 'rénovation patrimoine',
                'valorisation immobilière', 'administration patrimoine', 'service patrimoine', 'bâtiments gouvernementaux',
                'infrastructures publiques', 'équipements publics', 'installations publiques', 'ouvrages publics',
                'constructions publiques', 'aménagements publics', 'espaces publics', 'voirie publique',
                'réseaux publics', 'utilités publiques', 'services publics', 'facilities management',
                'gestion technique bâtiment', 'gestion énergétique', 'efficacité énergétique', 'performance énergétique',
                'sécurité bâtiments', 'sécurité incendie', 'accessibilité bâtiments', 'normes construction',
                'réglementation bâtiment', 'certification bâtiment', 'qualité bâtiment', 'durabilité bâtiment',
                'communication', 'négociation', 'planification', 'organisation', 'créativité', 'innovation',
                
                // Mots-clés sectoriels spécifiques (45)
                'ministères Guinée', 'administrations publiques', 'bâtiments gouvernementaux', 'infrastructures publiques',
                'patrimoine architectural', 'architecture publique', 'urbanisme Conakry', 'développement urbain',
                'ministère économie', 'ministère finances', 'ministère éducation', 'ministère santé', 'ministère justice',
                'ministère défense', 'ministère intérieur', 'ministère affaires étrangères', 'ministère agriculture',
                'ministère mines', 'ministère énergie', 'ministère transports', 'ministère travaux publics',
                'ministère environnement', 'ministère culture', 'ministère sport', 'ministère jeunesse',
                'ministère emploi', 'ministère commerce', 'ministère industrie', 'ministère tourisme',
                'ministère communication', 'ministère technologie', 'ministère innovation', 'ministère développement',
                'ministère planification', 'ministère statistiques', 'ministère budget', 'ministère contrôle',
                'ministère audit', 'ministère inspection', 'ministère régulation', 'ministère supervision',
                'résolution problèmes', 'travail équipe', 'compétences numériques', 'compétences agricoles', 'compétences sociales',
                
                // Mots-clés de services (35)
                'programmes accompagnement FONIJ', 'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs',
                'formation entrepreneuriat', 'coaching projet', 'mentorat jeunes', 'développement startup',
                'accompagnement personnalisé', 'formation gestion', 'levée de fonds', 'networking',
                'location bâtiments', 'gestion locative publique', 'entretien infrastructures', 'maintenance bâtiments',
                'rénovation patrimoine', 'valorisation immobilière', 'administration patrimoine', 'service patrimoine',
                'location bureaux', 'location salles', 'location espaces', 'location terrains', 'location parkings',
                'gestion locative', 'gestion locataires', 'gestion contrats', 'gestion loyers', 'gestion charges',
                'gestion réparations', 'gestion améliorations', 'gestion travaux', 'gestion interventions',
                'gestion urgences', 'gestion plannings', 'gestion équipes', 'gestion fournisseurs',
                
                // Mots-clés institutionnels (25)
                'PBP Guinée', 'Patrimoine Bâti Public', 'service public Guinée', 'administration Guinée',
                'gouvernement Guinée', 'État guinéen', 'institutions publiques', 'services publics',
                'établissement public', 'organisme public', 'agence publique', 'office public',
                'société publique', 'entreprise publique', 'structure publique', 'entité publique',
                'autorité publique', 'administration centrale', 'administration déconcentrée', 'administration territoriale',
                'collectivité publique', 'territoire public', 'domaine public', 'propriété publique',
                'patrimoine public', 'biens publics', 'actifs publics', 'investissements publics',
                
                // Mots-clés économiques et financiers (20)
                'investissement public', 'financement public', 'budget public', 'comptabilité publique',
                'gestion financière', 'contrôle financier', 'audit public', 'évaluation économique',
                'rentabilité patrimoine', 'performance patrimoine', 'optimisation patrimoine', 'maximisation valeur',
                'coût maintenance', 'coût exploitation', 'coût possession', 'coût cycle vie',
                'économie énergie', 'économie maintenance', 'économie exploitation', 'économie gestion',
                
                // Mots-clés technologiques et innovation (15)
                'numérisation patrimoine', 'digitalisation patrimoine', 'informatisation gestion', 'système information',
                'base données patrimoine', 'géolocalisation patrimoine', 'cartographie patrimoine', 'inventaire numérique',
                'gestion assistée ordinateur', 'logiciel gestion patrimoine', 'application mobile', 'portail web',
                'télégestion', 'télésurveillance', 'télémaintenance', 'télédiagnostic',
                
                // Mots-clés environnementaux et durables (15)
                'développement durable', 'construction durable', 'bâtiment durable', 'patrimoine durable',
                'efficacité énergétique', 'performance énergétique', 'économie énergie', 'énergies renouvelables',
                'isolation thermique', 'climatisation', 'chauffage', 'ventilation', 'éclairage LED',
                'matériaux écologiques', 'construction écologique', 'rénovation écologique',
                
                // Mots-clés de formation et compétences (10)
                'formation personnel', 'compétences techniques', 'expertise patrimoine', 'savoir-faire',
                'qualification professionnelle', 'certification professionnelle', 'apprentissage', 'perfectionnement',
                'recyclage professionnel', 'mise à niveau compétences',
                
                // Mots-clés de communication et relations (10)
                'communication institutionnelle', 'relations publiques', 'information publique', 'transparence',
                'communication interne', 'communication externe', 'partenariat', 'collaboration',
                'coopération', 'synergie', 'réseau professionnel', 'partage expérience',
                
                // Mots-clés de qualité et certification (10)
                'qualité service', 'certification qualité', 'normes qualité', 'processus qualité',
                'amélioration continue', 'excellence opérationnelle', 'satisfaction client', 'performance service',
                'indicateurs performance', 'tableau bord', 'reporting', 'suivi performance',
                
                // Mots-clés de sécurité et conformité (10)
                'sécurité bâtiments', 'sécurité incendie', 'sécurité personnes', 'prévention risques',
                'conformité réglementaire', 'normes sécurité', 'audit sécurité', 'inspection sécurité',
                'formation sécurité', 'consignes sécurité', 'équipements sécurité', 'système sécurité',
                
                // Mots-clés de maintenance et travaux (15)
                'maintenance préventive', 'maintenance corrective', 'maintenance prédictive', 'maintenance conditionnelle',
                'planification maintenance', 'programmation travaux', 'suivi travaux', 'contrôle qualité travaux',
                'gestion travaux', 'coordination travaux', 'supervision travaux', 'réception travaux',
                'garantie travaux', 'maintenance après travaux', 'exploitation après travaux',
                
                // Mots-clés de location et commercial (10)
                'commercialisation espaces', 'marketing immobilier', 'promotion patrimoine', 'valorisation commerciale',
                'stratégie commerciale', 'politique tarifaire', 'négociation commerciale', 'contrats location',
                'gestion clientèle', 'relation client', 'satisfaction locataire', 'fidélisation client',
                
                // Mots-clés de développement et expansion (10)
                'développement patrimoine', 'expansion patrimoine', 'croissance patrimoine', 'extension patrimoine',
                'modernisation patrimoine', 'amélioration patrimoine', 'optimisation patrimoine', 'transformation patrimoine',
                'évolution patrimoine', 'adaptation patrimoine', 'innovation patrimoine', 'renouvellement patrimoine'
            ],
            'canonical'    => 'current', // Set to null or 'full' to use Url::full(), set to 'current' to use Url::current(), set false to total remove
            'robots'       => 'all', // Set to 'all', 'none' or any combination of index/noindex and follow/nofollow
        ],
        /*
         * Webmaster tags are always added.
         */
        'webmaster_tags' => [
            'google'    => null,
            'bing'      => null,
            'alexa'     => null,
            'pinterest' => null,
            'yandex'    => null,
            'norton'    => null,
        ],

        'add_notranslate_class' => false,
    ],
    'opengraph' => [
        /*
         * The default configurations to be used by the opengraph generator.
         */
        'defaults' => [
            'title'       => 'Grand Prix FONIJ - Initiative pour l\'entrepreneuriat des jeunes guinéens', // set false to total remove
            'description' => 'Le Grand Prix FONIJ récompense les jeunes entrepreneurs guinéens âgés de 18 à 35 ans dans 5 catégories : promotion de l\'esprit d\'entreprise, éducation aux compétences entrepreneuriales, transition numérique, entrepreneuriat agricole durable et grand prix du jury. Participez à cette initiative du FONIJ pour transformer vos idées en entreprises prospères.', // set false to total remove
            'url'         => null, // Set null for using Url::current(), set false to total remove
            'type'        => 'website',
            'site_name'   => 'Grand Prix FONIJ',
            'images'      => [
                '/images/affiche.jpg',
                '/images/fonij/logo-transparent.png'
            ],
        ],
    ],
    'twitter' => [
        /*
         * The default values to be used by the twitter cards generator.
         */
        'defaults' => [
            'card'        => 'summary_large_image',
            'site'        => '@FONIJGUINEE',
            'creator'     => '@FONIJGUINEE',
        ],
    ],
    'json-ld' => [
        /*
         * The default configurations to be used by the json-ld generator.
         */
        'defaults' => [
            'title'       => 'Grand Prix FONIJ - Initiative pour l\'entrepreneuriat des jeunes guinéens', // set false to total remove
            'description' => 'Le Grand Prix FONIJ récompense les jeunes entrepreneurs guinéens âgés de 18 à 35 ans dans 5 catégories : promotion de l\'esprit d\'entreprise, éducation aux compétences entrepreneuriales, transition numérique, entrepreneuriat agricole durable et grand prix du jury. Participez à cette initiative du FONIJ pour transformer vos idées en entreprises prospères.', // set false to total remove
            'url'         => 'current', // Set to null or 'full' to use Url::full(), set to 'current' to use Url::current(), set false to total remove
            'type'        => 'WebPage',
            'images'      => [
                '/images/affiche.jpg',
                '/images/fonij/logo-transparent.png'
            ],
        ],
    ],
];
