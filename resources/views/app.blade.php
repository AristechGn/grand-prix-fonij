<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        {{-- SEO Meta Tags --}}
        @if(class_exists('Artesaos\SEOTools\Facades\SEOMeta'))
            {!! Artesaos\SEOTools\Facades\SEOMeta::generate() !!}
        @endif
        @if(class_exists('Artesaos\SEOTools\Facades\OpenGraph'))
            {!! Artesaos\SEOTools\Facades\OpenGraph::generate() !!}
        @endif
        @if(class_exists('Artesaos\SEOTools\Facades\TwitterCard'))
            {!! Artesaos\SEOTools\Facades\TwitterCard::generate() !!}
        @endif
        @if(class_exists('Artesaos\SEOTools\Facades\JsonLd'))
            {!! Artesaos\SEOTools\Facades\JsonLd::generate() !!}
        @endif
        
        <meta name="author" content="FONIJ">
        <meta name="format-detection" content="telephone=no">
        <meta name="theme-color" content="#008751" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)">
        <meta name="color-scheme" content="light dark">
        <meta name="application-name" content="{{ config('app.name', 'Grand Prix FONIJ') }}">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'Grand Prix FONIJ') }}">
        
        {{-- Meta tags supplémentaires pour le SEO --}}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="googlebot" content="index, follow">
        <meta name="bingbot" content="index, follow">
        <meta name="language" content="fr">
        <meta name="geo.region" content="GN">
        <meta name="geo.country" content="Guinée">
        <meta name="geo.placename" content="Conakry">
        <meta name="distribution" content="global">
        <meta name="rating" content="general">
        <meta name="revisit-after" content="1 days">

        {{-- Sécurité --}}
        <meta http-equiv="X-Content-Type-Options" content="nosniff">
        <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()">
        <meta name="referrer" content="strict-origin-when-cross-origin">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Script de détection du mode sombre --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Style de base --}}
        <style>
            html {
                background-color: oklch(1 0 0);
                scroll-behavior: smooth;
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Grand Prix FONIJ') }}</title>

        {{-- Favicons et icônes --}}
        <link rel="icon" href="/images/favicon/favicon.ico" sizes="any">
        <link rel="icon" href="/images/favicon/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png" sizes="180x180">
        <link rel="icon" href="/images/favicon/favicon-96x96.png" sizes="96x96">
        <link rel="manifest" href="/site.webmanifest" crossorigin="use-credentials">
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#008751">
        <meta name="msapplication-TileColor" content="#008751">
        <meta name="msapplication-config" content="/browserconfig.xml">
        
        {{-- Images par défaut pour le partage social --}}
        <meta property="og:image" content="{{ config('app.url') }}/images/affiche.jpg">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Grand Prix FONIJ - Initiative pour l'entrepreneuriat des jeunes guinéens">
        <meta name="twitter:image" content="{{ config('app.url') }}/images/affiche.jpg">

        {{-- Préchargement des polices --}}
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="preload" href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" as="style">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <noscript>
            <div style="padding: 20px; text-align: center; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
                Pour une expérience optimale, veuillez activer JavaScript dans votre navigateur.
            </div>
        </noscript>
    </body>
</html>
