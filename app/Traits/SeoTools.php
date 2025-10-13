<?php

namespace App\Traits;

trait SeoTools
{
    /**
     * Données SEO pour Inertia.js
     */
    protected $seoData = [];
    
    /**
     * Récupère les mots-clés SEO globaux depuis la configuration
     *
     * @return array
     */
    protected function getGlobalSeoKeywords(): array
    {
        return config('seotools.defaults.keywords', [
            'FONIJ', 'Grand Prix FONIJ', 'Guinée', 'jeunes entrepreneurs', 'entrepreneuriat', 
            'innovation', 'insertion professionnelle', 'concours', 'startup', 'business plan'
        ]);
    }
    
    /**
     * Récupère des mots-clés SEO spécifiques par catégorie
     *
     * @param string $category
     * @return array
     */
    protected function getCategorySeoKeywords(string $category): array
    {
        $categoryKeywords = [
            'actualités' => [
                'actualités', 'nouvelles', 'événements', 'communiqués', 'informations', 'news', 'breaking news',
                'développements', 'mises à jour', 'annonces', 'publications', 'communiqués de presse'
            ],
            'médias' => [
                'médias', 'photos', 'vidéos', 'galerie', 'multimédia', 'images', 'photographies', 'vidéographie',
                'documentation visuelle', 'reportages', 'interviews', 'captures', 'enregistrements'
            ],
            'rapports' => [
                'rapports', 'publications', 'études', 'analyses', 'documents', 'rapports annuels', 'rapports trimestriels',
                'rapports mensuels', 'bilan', 'compte-rendu', 'synthèse', 'évaluation', 'audit', 'expertise'
            ],
            'entrepreneuriat' => [
                'entrepreneuriat', 'entrepreneurs', 'startup', 'business plan', 'projet entrepreneurial', 'innovation',
                'créativité entrepreneuriale', 'initiative créative', 'projet innovant', 'idée projet', 'concept',
                'solution proposée', 'valeur ajoutée', 'différenciation', 'marché cible'
            ],
            'programmes' => [
                'programmes accompagnement', 'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs',
                'formation entrepreneuriat', 'coaching projet', 'mentorat jeunes', 'développement startup',
                'accompagnement personnalisé', 'formation gestion', 'levée de fonds', 'networking'
            ],
            'catégories' => [
                'catégories Grand Prix FONIJ', 'promotion esprit entreprise', 'éducation compétences entrepreneuriales',
                'transition numérique', 'entrepreneuriat agricole durable', 'grand prix jury',
                'projets innovants', 'jeunes entrepreneurs guinéens', 'concours entrepreneuriat',
                'secteurs d\'activité', 'domaines entrepreneuriat', 'innovation Guinée'
            ],
            'contact' => [
                'contact', 'coordonnées', 'adresse', 'téléphone', 'email', 'localisation', 'géolocalisation',
                'itinéraire', 'accès', 'horaires', 'ouverture', 'fermeture', 'permanence', 'réception'
            ],
            'about' => [
                'à propos', 'présentation', 'histoire', 'mission', 'vision', 'équipe', 'organisation', 'structure',
                'valeurs', 'objectifs', 'stratégie', 'gouvernance', 'leadership', 'management', 'direction'
            ],
            'candidature' => [
                'candidature', 'candidater', 'postuler', 'inscrire', 'participer', 'concours', 'compétition',
                'dossier candidature', 'formulaire inscription', 'pièces justificatives', 'documents requis',
                'critères sélection', 'évaluation', 'jury', 'sélection', 'inscription jeunes entrepreneurs'
            ],
            'accompagnement' => [
                'accompagnement', 'soutien', 'aide', 'assistance', 'conseil', 'guidance', 'orientation',
                'encadrement', 'supervision', 'tutorat', 'mentorat', 'coaching', 'consulting', 'expertise'
            ],
            'financement' => [
                'financement', 'investissement', 'capital', 'fonds', 'subvention', 'prêt', 'microcrédit',
                'crowdfunding', 'investisseurs', 'bailleurs', 'donateurs', 'partenaires financiers',
                'sources financement', 'levée de fonds', 'pitch', 'présentation', 'défense projet'
            ],
            'innovation' => [
                'innovation', 'créativité', 'originalité', 'nouveauté', 'disruption', 'transformation',
                'amélioration', 'optimisation', 'efficacité', 'performance', 'excellence', 'qualité',
                'valeur ajoutée', 'propriété intellectuelle', 'brevet', 'invention', 'découverte'
            ],
            'jeunes' => [
                'jeunes', 'jeunes guinéens', '18-35 ans', 'étudiants', 'diplômés', 'chômeurs', 'demandeurs emploi',
                'femmes', 'personnes handicapées', 'marginalisés', 'vulnérables', 'communauté', 'société civile',
                'génération', 'futur', 'espoir', 'potentiel', 'talents', 'compétences'
            ],
            'guinée' => [
                'Guinée', 'République de Guinée', 'État guinéen', 'gouvernement Guinée', 'administration Guinée',
                'institutions publiques', 'services publics', 'patrimoine national', 'patrimoine Guinée',
                'Conakry', 'Kaloum', 'Palais du Peuple', 'Afrique de l\'Ouest', 'Afrique occidentale'
            ]
        ];
        
        return $categoryKeywords[$category] ?? [];
    }
    
    /**
     * Récupère des mots-clés SEO par priorité (haute, moyenne, basse)
     *
     * @param string $priority
     * @return array
     */
    protected function getPrioritySeoKeywords(string $priority = 'haute'): array
    {
        $priorityKeywords = [
            'haute' => [
                'FONIJ', 'Grand Prix FONIJ', 'Guinée', 'jeunes entrepreneurs', 'entrepreneuriat', 
                'innovation', 'insertion professionnelle', 'concours', 'startup', 'business plan',
                'Fonds National Insertion Jeunes', 'FONIJ Guinée', 'initiative entrepreneuriat', 'compétition jeunes'
            ],
            'moyenne' => [
                'programmes accompagnement FONIJ', 'SMART Entrepreneur', 'Youth Incuba', 'Boost Entrepreneurs',
                'formation entrepreneuriat', 'coaching projet', 'mentorat jeunes', 'développement startup',
                'Conakry', 'Kaloum', 'Palais du Peuple', 'Afrique de l\'Ouest', 'République de Guinée',
                'candidature', 'candidater', 'postuler', 'inscrire', 'participer', 'concours', 'compétition'
            ],
            'basse' => [
                'numérisation patrimoine', 'digitalisation patrimoine', 'informatisation gestion', 'système information',
                'développement durable', 'construction durable', 'bâtiment durable', 'patrimoine durable',
                'formation personnel', 'compétences techniques', 'expertise patrimoine', 'savoir-faire',
                'communication institutionnelle', 'relations publiques', 'information publique', 'transparence'
            ]
        ];
        
        return $priorityKeywords[$priority] ?? $priorityKeywords['haute'];
    }
    
    /**
     * Récupère des mots-clés SEO par contexte géographique
     *
     * @param string $context
     * @return array
     */
    protected function getGeographicSeoKeywords(string $context = 'local'): array
    {
        $geographicKeywords = [
            'local' => [
                'Conakry', 'Kaloum', 'Guinée Conakry', 'Capitale Guinée', 'Palais du Peuple',
                'Kaloum Conakry', 'Centre ville Conakry', 'Guinée maritime', 'Région de Conakry'
            ],
            'national' => [
                'Guinée', 'République de Guinée', 'État guinéen', 'gouvernement Guinée', 'administration Guinée',
                'institutions publiques', 'services publics', 'patrimoine national', 'patrimoine Guinée'
            ],
            'regional' => [
                'Afrique de l\'Ouest', 'Afrique occidentale', 'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Sierra Leone',
                'Libéria', 'Guinée-Bissau', 'Côte atlantique', 'Afrique subsaharienne'
            ],
            'international' => [
                'Afrique', 'continent africain', 'pays en développement', 'économie africaine', 'développement Afrique',
                'coopération internationale', 'aide internationale', 'investissement étranger', 'partenariat international'
            ]
        ];
        
        return $geographicKeywords[$context] ?? $geographicKeywords['local'];
    }
    
    /**
     * Récupère des mots-clés SEO par secteur d'activité
     *
     * @param string $sector
     * @return array
     */
    protected function getSectorSeoKeywords(string $sector = 'general'): array
    {
        $sectorKeywords = [
            'general' => [
                'entrepreneuriat', 'innovation', 'jeunes entrepreneurs', 'startup', 'business plan',
                'insertion professionnelle', 'concours', 'compétition', 'prix', 'récompense'
            ],
            'agriculture' => [
                'entrepreneuriat agricole durable', 'jeunes entrepreneurs agricoles', 'agriculture innovante',
                'agriculture durable', 'respectueuse environnement', 'sécurité alimentaire',
                'création revenus', 'zone rurale', 'réponse défis climatiques', 'produire mieux',
                'durablement', 'localement', 'valoriser ressources rurales', 'innovation'
            ],
            'technologie' => [
                'transition numérique', 'technologies numériques', 'créer', 'transformer',
                'améliorer', 'produits', 'services', 'modèles économiques', 'innovation technologique',
                'levier impact social', 'levier impact économique', 'booster entrepreneuriat tech',
                'digitaliser', 'innover', 'impacter', 'solutions numériques', 'made in Guinée'
            ],
            'education' => [
                'éducation compétences entrepreneuriales', 'savoir-faire entrepreneuriat', 'gestion',
                'leadership', 'numérique', 'marketing', 'comptabilité', 'compétences accessibles',
                'jeunes', 'femmes', 'personnes handicapées', 'marginalisés', 'former entrepreneurs',
                'éduquer', 'accompagner', 'renforcer capacités', 'inclure vulnérables'
            ],
            'promotion' => [
                'promotion esprit entreprise', 'culture entrepreneuriale', 'envie entreprendre',
                'dynamiser écosystème', 'projets inclusifs', 'projets éducatifs', 'projets inspirants',
                'environnement favorable', 'entrepreneuriat', 'initiatives jeunes', 'mobilisation jeunesse',
                'valoriser initiatives', 'donner envie oser', 'esprit entreprise société'
            ],
            'jury' => [
                'grand prix jury', 'initiative exceptionnelle', 'toutes catégories', 'audace',
                'créativité', 'impact global', 'projet', 'vision originale', 'capacité transformer',
                'récompenser excellence', 'hors norme', 'mettre honneur', 'créativité entrepreneuriale',
                'valoriser idée', 'changer donne', 'initiative créative', 'projet créatif'
            ]
        ];
        
        return $sectorKeywords[$sector] ?? $sectorKeywords['general'];
    }
    
    /**
     * Combine les mots-clés globaux avec des mots-clés spécifiques
     *
     * @param array $specificKeywords
     * @return array
     */
    protected function combineSeoKeywords(array $specificKeywords = []): array
    {
        $globalKeywords = $this->getGlobalSeoKeywords();
        $combined = array_merge($globalKeywords, $specificKeywords);
        
        // Supprimer les doublons et limiter à 200 mots-clés maximum
        $unique = array_unique($combined);
        return array_slice($unique, 0, 200);
    }
    
    /**
     * Crée des mots-clés SEO intelligents basés sur le contexte
     *
     * @param string $pageType
     * @param string $priority
     * @param string $geographicContext
     * @param string $sector
     * @param array $additionalKeywords
     * @return array
     */
    protected function createIntelligentSeoKeywords(
        string $pageType = 'general',
        string $priority = 'haute',
        string $geographicContext = 'local',
        string $sector = 'general',
        array $additionalKeywords = []
    ): array {
        // Récupérer les mots-clés par catégorie
        $categoryKeywords = $this->getCategorySeoKeywords($pageType);
        
        // Récupérer les mots-clés par priorité
        $priorityKeywords = $this->getPrioritySeoKeywords($priority);
        
        // Récupérer les mots-clés géographiques
        $geographicKeywords = $this->getGeographicSeoKeywords($geographicContext);
        
        // Récupérer les mots-clés sectoriels
        $sectorKeywords = $this->getSectorSeoKeywords($sector);
        
        // Combiner tous les mots-clés
        $allKeywords = array_merge(
            $categoryKeywords,
            $priorityKeywords,
            $geographicKeywords,
            $sectorKeywords,
            $additionalKeywords
        );
        
        // Utiliser la méthode de combinaison existante
        return $this->combineSeoKeywords($allKeywords);
    }
    
    /**
     * Configure les métadonnées SEO de base
     *
     * @param string $title
     * @param string $description
     * @param array $keywords
     * @param string $canonical
     * @param string $image
     * @param string $type
     * @return void
     */
    protected function setSeoMeta(string $title, string $description, array $keywords = [], string $canonical = null, string $image = null, string $type = 'website'): void
    {
        // Combiner les mots-clés spécifiques avec les mots-clés globaux
        $combinedKeywords = $this->combineSeoKeywords($keywords);
        
        // Stocker les métadonnées dans la session pour utilisation dans les vues Blade
        session([
            'seo_title' => $title,
            'seo_description' => $description,
            'seo_keywords' => $combinedKeywords,
            'seo_canonical' => $canonical,
            'seo_image' => $image,
            'seo_type' => $type,
        ]);
        
        // Préparer les données SEO pour Inertia.js
        $this->seoData = [
            'title' => $title,
            'description' => $description,
            'keywords' => $combinedKeywords,
            'canonical' => $canonical,
            'type' => $type,
            'image' => $image,
            'article' => null,
            'organization' => null
        ];
    }

    /**
     * Configure les métadonnées pour la page d'accueil
     *
     * @return void
     */
    protected function setHomeSeoMeta(): void
    {
        $title = 'Grand Prix FONIJ - Initiative pour l\'entrepreneuriat des jeunes guinéens';
        $description = 'Le Grand Prix FONIJ récompense les jeunes entrepreneurs guinéens âgés de 18 à 35 ans dans 5 catégories : promotion de l\'esprit d\'entreprise, éducation aux compétences entrepreneuriales, transition numérique, entrepreneuriat agricole durable et grand prix du jury. Participez à cette initiative du FONIJ pour transformer vos idées en entreprises prospères.';
        
        // Utiliser les mots-clés intelligents pour la page d'accueil
        $keywords = $this->createIntelligentSeoKeywords('entrepreneuriat', 'haute', 'national', 'general');
        
        $this->setSeoMeta($title, $description, $keywords, route('home'), '/images/fonij/logo.png', 'website');
        
        // Stocker des métadonnées spécifiques pour la page d'accueil
        session([
            'seo_organization_name' => 'FONIJ - Fonds National pour l\'Insertion des Jeunes',
            'seo_organization_type' => 'Organization',
            'seo_contact_phone' => '+224-612-96-96-96',
            'seo_contact_email' => 'fonijguinee@gmail.com',
            'seo_address' => '102-316 Av. de la République, Conakry, GN',
            'seo_social_facebook' => 'https://www.facebook.com/fonijguinee/',
            'seo_social_linkedin' => 'https://gn.linkedin.com/company/fonij-guinée',
        ]);
        
        // Préparer les données SEO pour Inertia.js
        $this->seoData = array_merge($this->seoData, [
            'organization' => [
                'type' => 'Organization',
                'name' => 'FONIJ - Fonds National pour l\'Insertion des Jeunes',
                'contact_phone' => '+224-612-96-96-96',
                'contact_email' => 'fonijguinee@gmail.com',
                'address' => '102-316 Av. de la République, Conakry, GN',
                'social_facebook' => 'https://www.facebook.com/fonijguinee/',
                'social_linkedin' => 'https://gn.linkedin.com/company/fonij-guinée'
            ]
        ]);
    }

    /**
     * Configure les métadonnées pour une page à propos
     *
     * @param string $pageTitle
     * @param string $description
     * @return void
     */
    protected function setAboutSeoMeta(string $pageTitle, string $description): void
    {
        $title = $pageTitle . ' - Grand Prix FONIJ';
        $keywords = $this->createIntelligentSeoKeywords('about', 'moyenne', 'national', 'general');
        
        $this->setSeoMeta($title, $description, $keywords, null, '/images/fonij/cover.png', 'article');
        
        // Préparer les données SEO pour Inertia.js
        $this->seoData = array_merge($this->seoData, [
            'type' => 'article'
        ]);
    }
    
    /**
     * Configure les métadonnées pour la page de candidature
     *
     * @return void
     */
    protected function setApplicationSeoMeta(): void
    {
        $title = 'Candidater au Grand Prix FONIJ - Postulez maintenant';
        $description = 'Postulez au Grand Prix FONIJ et participez à cette initiative exceptionnelle pour l\'entrepreneuriat des jeunes guinéens. Découvrez les programmes d\'accompagnement SMART Entrepreneur, Youth Incuba et Boost Entrepreneurs.';
        
        $keywords = $this->createIntelligentSeoKeywords('candidature', 'haute', 'national', 'general');
        
        $this->setSeoMeta($title, $description, $keywords, route('application'), '/images/programmes/hero.jpg', 'website');
    }
    
    /**
     * Configure les métadonnées pour la page des programmes
     *
     * @return void
     */
    protected function setProgramSeoMeta(): void
    {
        $title = 'Programmes d\'accompagnement - Grand Prix FONIJ';
        $description = 'Découvrez les 3 programmes d\'accompagnement du Grand Prix FONIJ : SMART Entrepreneur (3 mois), Youth Incuba (6 mois) et Boost Entrepreneurs (12 mois). Chaque programme offre un accompagnement personnalisé pour développer votre projet entrepreneurial.';
        
        $keywords = $this->createIntelligentSeoKeywords('programmes', 'haute', 'national', 'education');
        
        $this->setSeoMeta($title, $description, $keywords, route('programme'), '/images/programmes/SMART-Entrepreneur.jpg', 'website');
    }
    
    /**
     * Configure les métadonnées pour la page des catégories
     *
     * @return void
     */
    protected function setCategoriesSeoMeta(): void
    {
        $title = 'Catégories du Grand Prix FONIJ - 5 domaines d\'entrepreneuriat';
        $description = 'Découvrez les 5 catégories du Grand Prix FONIJ : Promotion de l\'esprit d\'entreprise, Éducation aux compétences entrepreneuriales, Transition numérique, Entrepreneuriat agricole durable et Grand prix du jury. Chaque catégorie récompense des projets innovants portés par des jeunes guinéens.';
        
        $keywords = $this->createIntelligentSeoKeywords('catégories', 'haute', 'national', 'general');
        
        $this->setSeoMeta($title, $description, $keywords, route('categories'), '/images/categories/1.jpg', 'website');
    }
    
    /**
     * Configure les métadonnées pour la page de contact
     *
     * @return void
     */
    protected function setContactSeoMeta(): void
    {
        $title = 'Contact - Grand Prix FONIJ';
        $description = 'Contactez l\'équipe du Grand Prix FONIJ pour toute question sur le concours, les candidatures ou l\'accompagnement entrepreneurial. Nous sommes situés au Palais du Peuple à Conakry et disponibles du lundi au vendredi de 8h à 17h.';
        
        $keywords = $this->createIntelligentSeoKeywords('contact', 'moyenne', 'local', 'general');
        
        $this->setSeoMeta($title, $description, $keywords, route('contact'), '/images/fonij/dg-fonij.jpg', 'website');
    }
    
    /**
     * Récupère les données SEO pour Inertia.js
     *
     * @return array
     */
    protected function getSeoData(): array
    {
        return $this->cleanSeoData($this->seoData);
    }

    /**
     * Nettoie les données SEO pour éviter les Symboles
     *
     * @param array $data
     * @return array
     */
    private function cleanSeoData($data)
    {
        if (!is_array($data)) {
            return $data;
        }

        $cleanData = [];

        foreach ($data as $key => $value) {
            // Nettoyer la clé
            $cleanKey = is_string($key) ? $key : (string) $key;

            // Nettoyer la valeur
            if (is_null($value)) {
                $cleanData[$cleanKey] = null;
            } elseif (is_string($value)) {
                $cleanData[$cleanKey] = $value;
            } elseif (is_numeric($value)) {
                $cleanData[$cleanKey] = $value;
            } elseif (is_bool($value)) {
                $cleanData[$cleanKey] = $value;
            } elseif (is_array($value)) {
                $cleanData[$cleanKey] = $this->cleanSeoData($value);
            } else {
                $cleanData[$cleanKey] = (string) $value;
            }
        }

        return $cleanData;
    }
}
