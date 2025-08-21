<?php

/*
 * Nom       : Gnimassou
 * Prénom    : Jean-Marie Aristide 
 * Email     : aristechdev@gmail.com
 *
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
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
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
        return Inertia::render('Home', [
            'edition' => $this->getCurrentEdition(true)
        ]);
    }

    public function categories()
    {
        return Inertia::render('Categories', [
            'edition' => $this->getCurrentEdition()
        ]);
    }

    public function accompagnement()
    {
        return Inertia::render('Accompagnement', [
            'edition' => $this->getCurrentEdition()
        ]);
    }

    public function programme()
    {
        return Inertia::render('Programme', [
            'edition' => $this->getCurrentEdition()
        ]);
    }

    public function actualites()
    {
        return Inertia::render('Actualites', [
            'edition' => $this->getCurrentEdition()
        ]);
    }

    public function candidater()
    {
        return Inertia::render('Candidater', [
            'edition' => $this->getCurrentEdition()
        ]);
    }

    public function about()
    {
        return Inertia::render('APropos', [
            'edition' => $this->getCurrentEdition()
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', [
            'edition' => $this->getCurrentEdition()
        ]);
    }
}
