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
use App\Traits\HasSEO;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    use HasSEO;
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
        $seoData = $this->setHomeSEO();
        
        return Inertia::render('Home', array_merge([
            'edition' => $this->getCurrentEdition(true)
        ], $seoData));
    }

    public function categories()
    {
        $seoData = $this->setCategoriesSEO();
        
        return Inertia::render('Categories', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }

    public function accompagnement()
    {
        $seoData = $this->setSupportSEO();
        
        return Inertia::render('Accompagnement', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }

    public function programme()
    {
        $seoData = $this->setProgramSEO();
        
        return Inertia::render('Programme', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }

    public function actualites()
    {
        $seoData = $this->setNewsSEO();
        
        return Inertia::render('Actualites', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }

    public function candidater()
    {
        $seoData = $this->setApplicationSEO();
        
        return Inertia::render('Candidater', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }

    public function about()
    {
        $seoData = $this->setAboutSEO();
        
        return Inertia::render('APropos', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }

    public function contact()
    {
        $seoData = $this->setContactSEO();
        
        return Inertia::render('Contact', array_merge([
            'edition' => $this->getCurrentEdition()
        ], $seoData));
    }
}
