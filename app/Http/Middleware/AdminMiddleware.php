<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Vérifie si l'utilisateur connecté est un administrateur.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !($request->user()->isAdmin() || $request->user()->isSuperAdmin())) {
            return redirect()->route('dashboard')->with('error', 'Vous n\'avez pas les droits d\'accès à cette page.');
        }

        return $next($request);
    }
} 