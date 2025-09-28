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
                // Mots-clés principaux
                'FONIJ', 'Grand Prix FONIJ', 'Guinée', 'jeunes entrepreneurs', 'entrepreneuriat', 
                'innovation', 'insertion professionnelle', 'concours', 'startup', 'business plan',
                
                // Catégories du concours
                'promotion esprit entreprise', 'éducation compétences entrepreneuriales', 
                'transition numérique', 'entrepreneuriat agricole durable', 'grand prix jury',
                'esprit entreprise', 'compétences entrepreneuriales', 'numérique', 'agricole durable',
                'jury', 'créativité entrepreneuriale', 'initiative créative', 'projet innovant',
                
                // Programmes d'accompagnement
                'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs', 'programmes accompagnement',
                'mentorat', 'coaching', 'formation entrepreneuriat', 'accompagnement personnalisé',
                'développement startup', 'levée de fonds', 'networking', 'formation gestion',
                'coaching individuel', 'expertise entrepreneuriat', 'croissance entreprise',
                
                // Géographie et localisation
                'Conakry', 'Guinée', 'Afrique de l\'Ouest', 'Kaloum', 'Palais du Peuple',
                'République de Guinée', 'Conakry Guinée', 'Guinée Conakry', 'Afrique',
                
                // Partenaires et institutions
                'Ministère Jeunesse', 'CNT', 'Ambassade Japon', 'Conseil National Transition',
                'Ministère Plan', 'Coopération Internationale', 'partenaires FONIJ',
                'institutions guinéennes', 'gouvernement guinéen', 'secteur public',
                
                // Secteurs d'activité
                'agriculture', 'technologie', 'numérique', 'innovation technologique',
                'sécurité alimentaire', 'développement rural', 'économie verte',
                'environnement', 'durabilité', 'changement climatique', 'écologie',
                'santé', 'éducation', 'formation', 'emploi', 'travail',
                
                // Types de projets
                'projet social', 'projet économique', 'projet environnemental',
                'projet technologique', 'projet agricole', 'projet éducatif',
                'projet santé', 'projet communautaire', 'projet durable',
                
                // Compétences et formations
                'leadership', 'gestion', 'marketing', 'comptabilité', 'finance',
                'communication', 'négociation', 'planification', 'organisation',
                'créativité', 'innovation', 'résolution problèmes', 'travail équipe',
                
                // Public cible
                'jeunes', 'jeunes guinéens', '18-35 ans', 'étudiants', 'diplômés',
                'chômeurs', 'demandeurs emploi', 'femmes', 'personnes handicapées',
                'marginalisés', 'vulnérables', 'communauté', 'société civile',
                
                // Financement et investissement
                'financement', 'investissement', 'capital', 'fonds', 'subvention',
                'prêt', 'microcrédit', 'crowdfunding', 'investisseurs', 'bailleurs',
                'donateurs', 'partenaires financiers', 'sources financement',
                
                // Événements et activités
                'concours', 'compétition', 'prix', 'récompense', 'lauréats',
                'gagnants', 'finalistes', 'candidats', 'participants', 'jury',
                'sélection', 'évaluation', 'critères', 'règlement', 'calendrier',
                
                // Communication et médias
                'actualités', 'nouvelles', 'événements', 'annonces', 'communiqués',
                'presse', 'médias', 'réseaux sociaux', 'Facebook', 'Twitter',
                'LinkedIn', 'YouTube', 'communication', 'marketing digital',
                
                // Résultats et impact
                'succès', 'résultats', 'impact', 'bénéfices', 'retombées',
                'témoignages', 'cas d\'étude', 'retours expérience', 'statistiques',
                'métriques', 'performance', 'efficacité', 'mesure impact',
                
                // Développement et croissance
                'développement', 'croissance', 'expansion', 'scalabilité', 'durabilité',
                'pérennité', 'viabilité', 'rentabilité', 'profitabilité', 'revenus',
                'emplois créés', 'valeur ajoutée', 'contribution économique',
                
                // Innovation et technologie
                'innovation', 'technologie', 'digital', 'numérique', 'transformation',
                'disruption', 'nouveauté', 'créativité', 'invention', 'brevet',
                'propriété intellectuelle', 'R&D', 'recherche développement',
                
                // Formation et éducation
                'formation', 'éducation', 'apprentissage', 'compétences', 'savoir-faire',
                'connaissances', 'expertise', 'qualification', 'certification',
                'diplôme', 'titre', 'compétence professionnelle', 'métier',
                
                // Accompagnement et soutien
                'accompagnement', 'soutien', 'aide', 'assistance', 'conseil',
                'guidance', 'orientation', 'encadrement', 'supervision', 'tutorat',
                'mentorat', 'coaching', 'consulting', 'expertise', 'conseil',
                
                // Réseau et partenariat
                'réseau', 'partenariat', 'collaboration', 'alliance', 'association',
                'communauté', 'groupe', 'collectif', 'consortium', 'plateforme',
                'écosystème', 'environnement', 'milieu', 'secteur', 'industrie',
                
                // Opportunités et perspectives
                'opportunités', 'perspectives', 'avenir', 'potentiel', 'possibilités',
                'chances', 'occasions', 'débouchés', 'marchés', 'clients',
                'consommateurs', 'utilisateurs', 'bénéficiaires', 'cibles',
                
                // Défis et enjeux
                'défis', 'enjeux', 'problèmes', 'obstacles', 'difficultés',
                'challenges', 'barrières', 'freins', 'contraintes', 'limites',
                'risques', 'menaces', 'vulnérabilités', 'faiblesses',
                
                // Solutions et réponses
                'solutions', 'réponses', 'stratégies', 'approches', 'méthodes',
                'techniques', 'outils', 'ressources', 'moyens', 'instruments',
                'leviers', 'facteurs', 'éléments', 'composants', 'ingrédients'
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
                '/images/og-home.jpg',
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
                '/images/og-home.jpg',
                '/images/fonij/logo-transparent.png'
            ],
        ],
    ],
];
