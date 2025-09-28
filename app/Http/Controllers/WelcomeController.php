<?php

/*
 * Signature DREAMER:
 *
 *  _______   _______   ________   ______   __       __  ________  _______  
 * /       \ /       \ /        | /      \ /  \     /  |/        |/       \ 
 * $$$$$$$  |$$$$$$$  |$$$$$$$$/ /$$$$$$  |$$  \   /$$ |$$$$$$$$/ $$$$$$$  |
 * $$ |  $$ |$$ |__$$ |$$ |__    $$ |__$$ |$$$  \ /$$$ |$$ |__    $$ |__$$ |
 * $$ |  $$ |$$    $$< $$    |   $$    $$ |$$$$  /$$$$ |$$    |   $$    $$< 
 * $$ |  $$ |$$$$$$$  |$$$$$/    $$$$$$$$ |$$ $$ $$/$$ |$$$$$/    $$$$$$$  |
 * $$ |__$$ |$$ |  $$ |$$ |_____ $$ |  $$ |$$ |$$$/ $$ |$$ |_____ $$ |  $$ |
 * $$    $$/ $$ |  $$ |$$       |$$ |  $$ |$$ | $/  $$ |$$       |$$ |  $$ |
 * $$$$$$/  $$/   $$/ $$$$$$$$/ $$/   $$/ $$/      $$/ $$$$$$$$/ $$/   $$/ 
 *
 */


namespace App\Http\Controllers;

use App\Models\Edition;
use App\Traits\SeoTools;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    use SeoTools;
    /**
     * Récupère l'édition courante ou la dernière édition si aucune n'est marquée comme courante
     * 
     * @return array|null Les données de l'édition formatées pour le frontend
     */
    private function getCurrentEdition(bool $withFullDates = false): ?array
    {
        $currentEdition = Edition::current()->first();
        
        // Utiliser une édition par défaut si aucune n'est marquée comme actuelle
        if (!$currentEdition) {
            $currentEdition = Edition::latest()->first();
        }
        
        if (!$currentEdition) {
            return null;
        }
        
        $edition = [
            'id' => $currentEdition->id,
            'name' => $currentEdition->name,
            'year' => $currentEdition->year,
            'registrationDeadline' => $currentEdition->registration_deadline->format('Y-m-d\TH:i:s'),
        ];
        
        // Ajout des dates complètes si demandé (pour la page d'accueil)
        if ($withFullDates) {
            $edition['startDate'] = $currentEdition->start_date->format('Y-m-d\TH:i:s');
            $edition['endDate'] = $currentEdition->end_date->format('Y-m-d\TH:i:s');
        }
        
        return $edition;
    }
    
    public function home()
    {
        $this->setHomeSeoMeta();
        
        return Inertia::render('Home', array_merge([
            'edition' => $this->getCurrentEdition(true)
        ], $this->getSeoData()));
    }

    public function categories()
    {
        $this->setCategoriesSeoMeta();
        
        return Inertia::render('Categories', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }

    public function accompagnement()
    {
        $title = 'Accompagnement et soutien - Grand Prix FONIJ';
        $description = 'Bénéficiez d\'un accompagnement complet avec le Grand Prix FONIJ : mentorat personnalisé, formations spécialisées, accès à des espaces de travail, et intégration dans notre réseau d\'entrepreneurs. Transformez votre idée en entreprise prospère.';
        $this->setAboutSeoMeta($title, $description);
        
        return Inertia::render('Accompagnement', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }

    public function programme()
    {
        $this->setProgramSeoMeta();
        
        return Inertia::render('Programme', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }

    public function actualites()
    {
        $title = 'Actualités - Grand Prix FONIJ';
        $description = 'Restez informé des dernières actualités du Grand Prix FONIJ : annonces importantes, témoignages de lauréats, événements, et nouvelles initiatives pour l\'entrepreneuriat des jeunes guinéens.';
        $this->setAboutSeoMeta($title, $description);
        
        return Inertia::render('Actualites', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }

    public function candidater()
    {
        $this->setApplicationSeoMeta();
        
        return Inertia::render('Candidater', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }

    public function about()
    {
        $title = 'À propos - Grand Prix FONIJ';
        $description = 'Découvrez l\'histoire et la mission du Grand Prix FONIJ, une initiative pour l\'insertion socioéconomique des jeunes guinéens.';
        $this->setAboutSeoMeta($title, $description);
        
        return Inertia::render('APropos', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }

    public function contact()
    {
        $this->setContactSeoMeta();
        
        return Inertia::render('Contact', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $this->getSeoData()));
    }
}
