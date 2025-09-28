<?php

namespace App\Traits;

use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;
use Artesaos\SEOTools\Facades\JsonLd;

trait HasSEO
{
    /**
     * Configure SEO meta tags for a page
     *
     * @param string $title
     * @param string|null $description
     * @param array $keywords
     * @param string|null $image
     * @param string $type
     * @return array
     */
    protected function setSEO(
        string $title,
        ?string $description = null,
        array $keywords = [],
        ?string $image = null,
        string $type = 'website'
    ): array {
        // Meta tags
        SEOMeta::setTitle($title);
        
        if ($description) {
            SEOMeta::setDescription($description);
        }
        
        if (!empty($keywords)) {
            SEOMeta::setKeywords($keywords);
        }
        
        SEOMeta::setCanonical(request()->url());

        // Open Graph
        OpenGraph::setTitle($title);
        
        if ($description) {
            OpenGraph::setDescription($description);
        }
        
        OpenGraph::setUrl(request()->url());
        OpenGraph::setType($type);
        OpenGraph::setSiteName('Grand Prix FONIJ');
        
        if ($image) {
            OpenGraph::addImage($image);
        }

        // Twitter Card
        TwitterCard::setTitle($title);
        
        if ($description) {
            TwitterCard::setDescription($description);
        }
        
        if ($image) {
            TwitterCard::addImage($image);
        }

        // JSON-LD avec données structurées avancées
        $this->setAdvancedJsonLd($title, $description, $image, $type);

        // Retourner les données SEO pour Inertia
        return [
            'seo' => [
                'title' => $title,
                'description' => $description,
                'keywords' => $keywords,
                'image' => $image,
                'url' => request()->url(),
                'type' => $type,
            ]
        ];
    }

    /**
     * Configure advanced JSON-LD structured data
     */
    protected function setAdvancedJsonLd(string $title, ?string $description, ?string $image, string $type): void
    {
        // Données de base de l'organisation FONIJ
        $organizationData = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'FONIJ - Fonds National pour l\'Insertion des Jeunes',
            'alternateName' => 'FONIJ',
            'url' => config('app.url'),
            'logo' => asset('images/fonij/logo-transparent.png'),
            'description' => 'Le FONIJ est une institution publique guinéenne dédiée à l\'insertion socioéconomique et professionnelle des jeunes.',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '102-316 Av. de la République',
                'addressLocality' => 'Conakry',
                'addressRegion' => 'Conakry',
                'addressCountry' => 'GN'
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => '+224-612-96-96-96',
                'contactType' => 'customer service',
                'email' => 'fonijguinee@gmail.com',
                'availableLanguage' => ['French']
            ],
            'sameAs' => [
                'https://www.facebook.com/fonijguinee/',
                'https://www.youtube.com/@fonijguinee3261',
                'https://x.com/FONIJGUINEE',
                'https://gn.linkedin.com/company/fonij-guinée'
            ]
        ];

        // Données de la page courante
        $webPageData = [
            '@context' => 'https://schema.org',
            '@type' => 'WebPage',
            'name' => $title,
            'description' => $description,
            'url' => request()->url(),
            'isPartOf' => [
                '@type' => 'WebSite',
                'name' => 'Grand Prix FONIJ',
                'url' => config('app.url'),
                'publisher' => $organizationData
            ],
            'publisher' => $organizationData,
            'mainEntity' => [
                '@type' => 'Event',
                'name' => 'Grand Prix FONIJ',
                'description' => 'Concours d\'entrepreneuriat pour les jeunes guinéens âgés de 18 à 35 ans',
                'organizer' => $organizationData,
                'eventStatus' => 'https://schema.org/EventScheduled',
                'eventAttendanceMode' => 'https://schema.org/OnlineEventAttendanceMode',
                'location' => [
                    '@type' => 'Place',
                    'name' => 'Palais du Peuple, Conakry',
                    'address' => $organizationData['address']
                ]
            ]
        ];

        if ($image) {
            $webPageData['image'] = $image;
        }

        // Ajouter les données structurées
        JsonLd::addValue('@context', 'https://schema.org');
        JsonLd::addValue('@graph', [$organizationData, $webPageData]);
    }

    /**
     * Set SEO for home page
     */
    protected function setHomeSEO(): array
    {
        return $this->setSEO(
            title: 'Grand Prix FONIJ - Initiative pour l\'entrepreneuriat des jeunes guinéens',
            description: 'Le Grand Prix FONIJ récompense les jeunes entrepreneurs guinéens âgés de 18 à 35 ans dans 5 catégories : promotion de l\'esprit d\'entreprise, éducation aux compétences entrepreneuriales, transition numérique, entrepreneuriat agricole durable et grand prix du jury. Participez à cette initiative du FONIJ pour transformer vos idées en entreprises prospères.',
            keywords: [
                // Mots-clés principaux
                'FONIJ', 'Grand Prix FONIJ', 'Guinée', 'jeunes entrepreneurs', 'entrepreneuriat', 
                'innovation', 'insertion professionnelle', 'concours', 'startup', 'business plan',
                
                // Catégories spécifiques
                'promotion esprit entreprise', 'éducation compétences entrepreneuriales', 
                'transition numérique', 'entrepreneuriat agricole durable', 'grand prix jury',
                'esprit entreprise', 'compétences entrepreneuriales', 'numérique', 'agricole durable',
                'créativité entrepreneuriale', 'initiative créative', 'projet innovant',
                
                // Programmes d'accompagnement
                'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs', 'programmes accompagnement',
                'mentorat', 'coaching', 'formation entrepreneuriat', 'accompagnement personnalisé',
                'développement startup', 'levée de fonds', 'networking', 'formation gestion',
                
                // Géographie et localisation
                'Conakry', 'Afrique de l\'Ouest', 'Kaloum', 'Palais du Peuple',
                'République de Guinée', 'Conakry Guinée', 'Guinée Conakry', 'Afrique',
                
                // Partenaires et institutions
                'Ministère Jeunesse', 'CNT', 'Ambassade Japon', 'Conseil National Transition',
                'Ministère Plan', 'Coopération Internationale', 'partenaires FONIJ',
                'institutions guinéennes', 'gouvernement guinéen', 'secteur public',
                
                // Public cible
                'jeunes', 'jeunes guinéens', '18-35 ans', 'étudiants', 'diplômés',
                'chômeurs', 'demandeurs emploi', 'femmes', 'personnes handicapées',
                'marginalisés', 'vulnérables', 'communauté', 'société civile',
                
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
                
                // Financement et investissement
                'financement', 'investissement', 'capital', 'fonds', 'subvention',
                'prêt', 'microcrédit', 'crowdfunding', 'investisseurs', 'bailleurs',
                'donateurs', 'partenaires financiers', 'sources financement',
                
                // Événements et activités
                'concours', 'compétition', 'prix', 'récompense', 'lauréats',
                'gagnants', 'finalistes', 'candidats', 'participants', 'jury',
                'sélection', 'évaluation', 'critères', 'règlement', 'calendrier',
                
                // Résultats et impact
                'succès', 'résultats', 'impact', 'bénéfices', 'retombées',
                'témoignages', 'cas d\'étude', 'retours expérience', 'statistiques',
                'métriques', 'performance', 'efficacité', 'mesure impact',
                
                // Développement et croissance
                'développement', 'croissance', 'expansion', 'scalabilité', 'durabilité',
                'pérennité', 'viabilité', 'rentabilité', 'profitabilité', 'revenus',
                'emplois créés', 'valeur ajoutée', 'contribution économique'
            ],
            image: asset('images/og-home.jpg')
        );
    }

    /**
     * Set SEO for about page
     */
    protected function setAboutSEO(): array
    {
        return $this->setSEO(
            title: 'À propos - Grand Prix FONIJ',
            description: 'Découvrez l\'histoire et la mission du Grand Prix FONIJ, une initiative pour l\'insertion socioéconomique des jeunes guinéens.',
            keywords: ['FONIJ', 'à propos', 'mission', 'histoire', 'jeunes guinéens', 'insertion'],
            image: asset('images/og-about.jpg')
        );
    }

    /**
     * Set SEO for application page
     */
    protected function setApplicationSEO(): array
    {
        return $this->setSEO(
            title: 'Candidater au Grand Prix FONIJ - Postulez maintenant',
            description: 'Postulez au Grand Prix FONIJ et participez à cette initiative exceptionnelle pour l\'entrepreneuriat des jeunes guinéens. Découvrez les programmes d\'accompagnement SMART Entrepreneur, Youth Incuba et Boost Entrepreneurs.',
            keywords: [
                // Mots-clés principaux candidature
                'candidature Grand Prix FONIJ', 'postuler concours', 'inscription jeunes entrepreneurs',
                'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs', 'programmes accompagnement',
                'business plan', 'projet entrepreneurial', 'formation entrepreneuriat', 'mentorat',
                
                // Processus de candidature
                'candidater', 'postuler', 'inscrire', 'participer', 'concours', 'compétition',
                'dossier candidature', 'formulaire inscription', 'pièces justificatives',
                'documents requis', 'critères sélection', 'évaluation', 'jury', 'sélection',
                
                // Programmes d'accompagnement détaillés
                'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs', 'programmes accompagnement',
                'mentorat', 'coaching', 'formation entrepreneuriat', 'accompagnement personnalisé',
                'développement startup', 'levée de fonds', 'networking', 'formation gestion',
                'coaching individuel', 'expertise entrepreneuriat', 'croissance entreprise',
                
                // Documents et exigences
                'business plan', 'projet entrepreneurial', 'plan d\'affaires', 'étude faisabilité',
                'modèle économique', 'stratégie commerciale', 'analyse marché', 'concurrents',
                'prévisions financières', 'budget', 'financement', 'investissement',
                
                // Informations personnelles requises
                'informations personnelles', 'profil candidat', 'expérience', 'formation',
                'compétences', 'motivation', 'objectifs', 'ambitions', 'projet professionnel',
                'parcours', 'background', 'qualifications', 'diplômes', 'certifications',
                
                // Projet et idée
                'idée projet', 'concept', 'innovation', 'créativité', 'originalité',
                'problème résolu', 'solution proposée', 'valeur ajoutée', 'différenciation',
                'marché cible', 'clients potentiels', 'bénéficiaires', 'impact social',
                'impact économique', 'impact environnemental', 'durabilité',
                
                // Éligibilité et critères
                'éligibilité', 'critères', 'conditions', 'âge', '18-35 ans', 'jeunes',
                'guinéens', 'nationalité', 'résidence', 'domicile', 'Conakry', 'Guinée',
                'étudiants', 'diplômés', 'chômeurs', 'demandeurs emploi', 'femmes',
                'personnes handicapées', 'marginalisés', 'vulnérables',
                
                // Processus et étapes
                'processus candidature', 'étapes', 'phases', 'calendrier', 'dates limites',
                'délais', 'timeline', 'planning', 'programme', 'agenda', 'événements',
                'sélection', 'pré-sélection', 'finale', 'demi-finale', 'jury', 'évaluation',
                
                // Accompagnement et soutien
                'accompagnement', 'soutien', 'aide', 'assistance', 'conseil', 'guidance',
                'orientation', 'encadrement', 'supervision', 'tutorat', 'mentorat',
                'coaching', 'consulting', 'expertise', 'conseil', 'formation',
                
                // Financement et investissement
                'financement', 'investissement', 'capital', 'fonds', 'subvention',
                'prêt', 'microcrédit', 'crowdfunding', 'investisseurs', 'bailleurs',
                'donateurs', 'partenaires financiers', 'sources financement',
                'levée de fonds', 'pitch', 'présentation', 'défense projet',
                
                // Réseau et partenariat
                'réseau', 'partenariat', 'collaboration', 'alliance', 'association',
                'communauté', 'groupe', 'collectif', 'consortium', 'plateforme',
                'écosystème', 'environnement', 'milieu', 'secteur', 'industrie',
                'networking', 'relations', 'contacts', 'opportunités',
                
                // Résultats et impact attendus
                'résultats attendus', 'impact', 'bénéfices', 'retombées', 'effets',
                'transformation', 'changement', 'amélioration', 'développement',
                'croissance', 'expansion', 'scalabilité', 'durabilité', 'pérennité',
                'viabilité', 'rentabilité', 'profitabilité', 'revenus', 'emplois créés',
                
                // Innovation et créativité
                'innovation', 'créativité', 'originalité', 'nouveauté', 'disruption',
                'transformation', 'amélioration', 'optimisation', 'efficacité',
                'performance', 'excellence', 'qualité', 'valeur ajoutée',
                'propriété intellectuelle', 'brevet', 'invention', 'découverte',
                
                // Secteurs et domaines d'activité
                'agriculture', 'technologie', 'numérique', 'innovation technologique',
                'sécurité alimentaire', 'développement rural', 'économie verte',
                'environnement', 'durabilité', 'changement climatique', 'écologie',
                'santé', 'éducation', 'formation', 'emploi', 'travail',
                'commerce', 'services', 'industrie', 'manufacture', 'production'
            ],
            image: asset('images/og-application.jpg')
        );
    }

    /**
     * Set SEO for program page
     */
    protected function setProgramSEO(): array
    {
        return $this->setSEO(
            title: 'Programmes d\'accompagnement - Grand Prix FONIJ',
            description: 'Découvrez les 3 programmes d\'accompagnement du Grand Prix FONIJ : SMART Entrepreneur (3 mois), Youth Incuba (6 mois) et Boost Entrepreneurs (12 mois). Chaque programme offre un accompagnement personnalisé pour développer votre projet entrepreneurial.',
            keywords: [
                'programmes accompagnement FONIJ', 'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs',
                'formation entrepreneuriat', 'coaching projet', 'mentorat jeunes', 'développement startup',
                'accompagnement personnalisé', 'formation gestion', 'levée de fonds', 'networking'
            ],
            image: asset('images/og-program.jpg')
        );
    }

    /**
     * Set SEO for categories page
     */
    protected function setCategoriesSEO(): array
    {
        return $this->setSEO(
            title: 'Catégories du Grand Prix FONIJ - 5 domaines d\'entrepreneuriat',
            description: 'Découvrez les 5 catégories du Grand Prix FONIJ : Promotion de l\'esprit d\'entreprise, Éducation aux compétences entrepreneuriales, Transition numérique, Entrepreneuriat agricole durable et Grand prix du jury. Chaque catégorie récompense des projets innovants portés par des jeunes guinéens.',
            keywords: [
                // Mots-clés principaux catégories
                'catégories Grand Prix FONIJ', 'promotion esprit entreprise', 'éducation compétences entrepreneuriales',
                'transition numérique', 'entrepreneuriat agricole durable', 'grand prix jury',
                'projets innovants', 'jeunes entrepreneurs guinéens', 'concours entrepreneuriat',
                'secteurs d\'activité', 'domaines entrepreneuriat', 'innovation Guinée',
                
                // Catégorie 1: Promotion esprit entreprise
                'promotion esprit entreprise', 'culture entrepreneuriale', 'envie entreprendre',
                'dynamiser écosystème', 'projets inclusifs', 'projets éducatifs', 'projets inspirants',
                'environnement favorable', 'entrepreneuriat', 'initiatives jeunes', 'mobilisation jeunesse',
                'valoriser initiatives', 'donner envie oser', 'esprit entreprise société',
                
                // Catégorie 2: Éducation compétences entrepreneuriales
                'éducation compétences entrepreneuriales', 'savoir-faire entrepreneuriat', 'gestion',
                'leadership', 'numérique', 'marketing', 'comptabilité', 'compétences accessibles',
                'jeunes', 'femmes', 'personnes handicapées', 'marginalisés', 'former entrepreneurs',
                'éduquer', 'accompagner', 'renforcer capacités', 'inclure vulnérables',
                
                // Catégorie 3: Transition numérique
                'transition numérique', 'technologies numériques', 'créer', 'transformer',
                'améliorer', 'produits', 'services', 'modèles économiques', 'innovation technologique',
                'levier impact social', 'levier impact économique', 'booster entrepreneuriat tech',
                'digitaliser', 'innover', 'impacter', 'solutions numériques', 'made in Guinée',
                
                // Catégorie 4: Entrepreneuriat agricole durable
                'entrepreneuriat agricole durable', 'jeunes entrepreneurs agricoles', 'agriculture innovante',
                'agriculture durable', 'respectueuse environnement', 'sécurité alimentaire',
                'création revenus', 'zone rurale', 'réponse défis climatiques', 'produire mieux',
                'durablement', 'localement', 'valoriser ressources rurales', 'innovation',
                'réconcilier agriculture', 'économie', 'écologie',
                
                // Catégorie 5: Grand prix du jury
                'grand prix jury', 'initiative exceptionnelle', 'toutes catégories', 'audace',
                'créativité', 'impact global', 'projet', 'vision originale', 'capacité transformer',
                'récompenser excellence', 'hors norme', 'mettre honneur', 'créativité entrepreneuriale',
                'valoriser idée', 'changer donne', 'initiative créative', 'projet créatif',
                
                // Secteurs et domaines
                'agriculture', 'technologie', 'numérique', 'innovation technologique',
                'sécurité alimentaire', 'développement rural', 'économie verte',
                'environnement', 'durabilité', 'changement climatique', 'écologie',
                'santé', 'éducation', 'formation', 'emploi', 'travail',
                
                // Types de projets par catégorie
                'projet social', 'projet économique', 'projet environnemental',
                'projet technologique', 'projet agricole', 'projet éducatif',
                'projet santé', 'projet communautaire', 'projet durable',
                'projet inclusif', 'projet inspirant', 'projet innovant',
                
                // Compétences spécifiques
                'leadership', 'gestion', 'marketing', 'comptabilité', 'finance',
                'communication', 'négociation', 'planification', 'organisation',
                'créativité', 'innovation', 'résolution problèmes', 'travail équipe',
                'compétences numériques', 'compétences agricoles', 'compétences sociales',
                
                // Public cible par catégorie
                'jeunes', 'jeunes guinéens', '18-35 ans', 'étudiants', 'diplômés',
                'chômeurs', 'demandeurs emploi', 'femmes', 'personnes handicapées',
                'marginalisés', 'vulnérables', 'communauté', 'société civile',
                'agriculteurs', 'techniciens', 'ingénieurs', 'développeurs',
                
                // Impact et résultats
                'impact social', 'impact économique', 'impact environnemental',
                'transformation', 'changement', 'amélioration', 'développement',
                'croissance', 'durabilité', 'pérennité', 'viabilité',
                'rentabilité', 'profitabilité', 'revenus', 'emplois créés',
                
                // Innovation et créativité
                'innovation', 'créativité', 'originalité', 'nouveauté', 'disruption',
                'transformation', 'amélioration', 'optimisation', 'efficacité',
                'performance', 'excellence', 'qualité', 'valeur ajoutée'
            ],
            image: asset('images/og-categories.jpg')
        );
    }

    /**
     * Set SEO for contact page
     */
    protected function setContactSEO(): array
    {
        return $this->setSEO(
            title: 'Contact - Grand Prix FONIJ',
            description: 'Contactez l\'équipe du Grand Prix FONIJ pour toute question sur le concours, les candidatures ou l\'accompagnement entrepreneurial. Nous sommes situés au Palais du Peuple à Conakry et disponibles du lundi au vendredi de 8h à 17h.',
            keywords: [
                'contact FONIJ', 'aide Grand Prix', 'support candidature', 'information concours',
                'équipe FONIJ', 'Conakry', 'Palais du Peuple', 'Kaloum', 'téléphone FONIJ',
                'email FONIJ', 'adresse FONIJ', 'horaires FONIJ'
            ],
            image: asset('images/og-contact.jpg')
        );
    }

    /**
     * Set SEO for news page
     */
    protected function setNewsSEO(): array
    {
        return $this->setSEO(
            title: 'Actualités - Grand Prix FONIJ',
            description: 'Restez informé des dernières actualités du Grand Prix FONIJ : annonces importantes, témoignages de lauréats, événements, et nouvelles initiatives pour l\'entrepreneuriat des jeunes guinéens.',
            keywords: [
                'actualités FONIJ', 'nouvelles Grand Prix', 'événements entrepreneuriat', 'témoignages lauréats',
                'annonces importantes', 'initiatives jeunes', 'news FONIJ', 'blog entrepreneuriat',
                'succès stories', 'cas d\'étude', 'retours d\'expérience'
            ],
            image: asset('images/og-news.jpg')
        );
    }

    /**
     * Set SEO for support page
     */
    protected function setSupportSEO(): array
    {
        return $this->setSEO(
            title: 'Accompagnement et soutien - Grand Prix FONIJ',
            description: 'Bénéficiez d\'un accompagnement complet avec le Grand Prix FONIJ : mentorat personnalisé, formations spécialisées, accès à des espaces de travail, et intégration dans notre réseau d\'entrepreneurs. Transformez votre idée en entreprise prospère.',
            keywords: [
                'accompagnement FONIJ', 'soutien entrepreneurs', 'mentorat personnalisé', 'formations spécialisées',
                'espaces de travail', 'réseau entrepreneurs', 'coaching individuel', 'expertise entrepreneuriat',
                'développement projet', 'croissance entreprise', 'partenariats', 'financement'
            ],
            image: asset('images/og-support.jpg')
        );
    }
}