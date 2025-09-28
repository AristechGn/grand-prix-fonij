<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        {{-- Métadonnées SEO dynamiques --}}
        @if(session('seo_title'))
            <meta name="description" content="{{ session('seo_description', config('app.description', 'Le Grand Prix FONIJ est une initiative du FONIJ pour favoriser l\'insertion socioéconomique et professionnelle des jeunes guinéens âgés de 18 à 35 ans.')) }}">
            <meta name="keywords" content="{{ is_array(session('seo_keywords')) ? implode(', ', session('seo_keywords')) : session('seo_keywords', 'FONIJ, Grand Prix FONIJ, Guinée, jeunes entrepreneurs, entrepreneuriat, innovation, insertion professionnelle') }}">
        @else
            <meta name="description" content="{{ config('app.description', 'Le Grand Prix FONIJ est une initiative du FONIJ pour favoriser l\'insertion socioéconomique et professionnelle des jeunes guinéens âgés de 18 à 35 ans.') }}">
            <meta name="keywords" content="FONIJ, Grand Prix FONIJ, Guinée, jeunes entrepreneurs, entrepreneuriat, innovation, insertion professionnelle, concours, startup, business plan, SMART Entrepreneur, Youth Incuba, Boost Entrepreneurs, Conakry, Afrique de l'Ouest">
        @endif
        
        <meta name="author" content="FONIJ - Fonds National pour l'Insertion des Jeunes">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="format-detection" content="telephone=no">
        <meta name="theme-color" content="#008751" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)">
        <meta name="color-scheme" content="light dark">
        <meta name="application-name" content="{{ config('app.name', 'Grand Prix FONIJ') }}">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'Grand Prix FONIJ') }}">

        {{-- Métadonnées géographiques et organisationnelles --}}
        <meta name="geo.region" content="GN">
        <meta name="geo.country" content="Guinée">
        <meta name="geo.placename" content="Conakry">
        <meta name="geo.position" content="9.6412;-13.5784">
        <meta name="ICBM" content="9.6412, -13.5784">
        <meta name="DC.title" content="{{ config('app.name', 'Grand Prix FONIJ') }}">
        <meta name="DC.creator" content="FONIJ">
        <meta name="DC.subject" content="Entrepreneuriat, Jeunes, Guinée, Innovation">
        <meta name="DC.description" content="{{ session('seo_description', config('app.description')) }}">
        <meta name="DC.publisher" content="FONIJ - Fonds National pour l'Insertion des Jeunes">
        <meta name="DC.contributor" content="FONIJ">
        <meta name="DC.date" content="{{ date('Y-m-d') }}">
        <meta name="DC.type" content="Website">
        <meta name="DC.format" content="text/html">
        <meta name="DC.identifier" content="{{ request()->url() }}">
        <meta name="DC.language" content="fr">
        <meta name="DC.coverage" content="Guinée">
        <meta name="DC.rights" content="© {{ date('Y') }} FONIJ">

        {{-- Sécurité et performance SEO --}}
        <meta http-equiv="X-Content-Type-Options" content="nosniff">
        <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()">
        <meta name="referrer" content="strict-origin-when-cross-origin">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
        <meta http-equiv="X-XSS-Protection" content="1; mode=block">
        <meta name="rating" content="General">
        <meta name="distribution" content="Global">
        <meta name="revisit-after" content="7 days">
        <meta name="expires" content="never">
        <meta name="language" content="fr">
        <meta name="copyright" content="© {{ date('Y') }} FONIJ - Fonds National pour l'Insertion des Jeunes">
        <meta name="designer" content="FONIJ">
        <meta name="reply-to" content="fonijguinee@gmail.com">
        <meta name="owner" content="FONIJ">
        <meta name="url" content="{{ config('app.url') }}">
        <meta name="identifier-URL" content="{{ config('app.url') }}">
        <meta name="category" content="Entrepreneuriat">
        <meta name="coverage" content="Guinée">
        <meta name="distribution" content="Global">
        <meta name="target" content="Jeunes entrepreneurs guinéens">
        <meta name="audience" content="Jeunes guinéens 18-35 ans">
        <meta name="generator" content="Laravel {{ app()->version() }}">

        {{-- Balises Open Graph --}}
        <meta property="og:type" content="{{ session('seo_type', 'website') }}">
        <meta property="og:title" content="{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}">
        <meta property="og:description" content="{{ session('seo_description', config('app.description', 'Le Grand Prix FONIJ est une initiative du FONIJ pour favoriser l\'insertion socioéconomique et professionnelle des jeunes guinéens âgés de 18 à 35 ans.')) }}">
        <meta property="og:url" content="{{ request()->url() }}">
        <meta property="og:site_name" content="Grand Prix FONIJ">
        <meta property="og:locale" content="fr_FR">
        <meta property="og:locale:alternate" content="en_US">
        <meta property="og:image" content="{{ session('seo_image', '/images/fonij/logo.png') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Logo Grand Prix FONIJ">
        <meta property="og:image:type" content="image/png">
        <meta property="og:updated_time" content="{{ date('c') }}">
        <meta property="og:see_also" content="{{ config('app.url') }}">
        <meta property="og:rich_attachment" content="true">
        <meta property="og:app_id" content="Grand Prix FONIJ">
        <meta property="og:country_name" content="Guinée">
        <meta property="og:region" content="Conakry">
        <meta property="og:postal_code" content="001">
        <meta property="og:latitude" content="9.6412">
        <meta property="og:longitude" content="-13.5784">
        <meta property="og:street_address" content="102-316 Av. de la République">
        <meta property="og:locality" content="Conakry">
        <meta property="og:email" content="fonijguinee@gmail.com">
        <meta property="og:phone_number" content="+224-612-96-96-96">
        <meta property="og:fax_number" content="+224-612-96-96-97">
        <meta property="og:website" content="{{ config('app.url') }}">
        <meta property="og:contact_data:street_address" content="102-316 Av. de la République">
        <meta property="og:contact_data:locality" content="Conakry">
        <meta property="og:contact_data:region" content="Conakry">
        <meta property="og:contact_data:postal_code" content="001">
        <meta property="og:contact_data:country_name" content="Guinée">

        {{-- Balises Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@FONIJGUINEE">
        <meta name="twitter:creator" content="@FONIJGUINEE">
        <meta name="twitter:title" content="{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}">
        <meta name="twitter:description" content="{{ session('seo_description', config('app.description', 'Le Grand Prix FONIJ est une initiative du FONIJ pour favoriser l\'insertion socioéconomique et professionnelle des jeunes guinéens âgés de 18 à 35 ans.')) }}">
        <meta name="twitter:image" content="{{ session('seo_image', '/images/fonij/logo.png') }}">
        <meta name="twitter:image:alt" content="Logo Grand Prix FONIJ">
        <meta name="twitter:domain" content="{{ parse_url(config('app.url'), PHP_URL_HOST) }}">
        <meta name="twitter:url" content="{{ request()->url() }}">
        <meta name="twitter:label1" content="Organisateur">
        <meta name="twitter:data1" content="FONIJ - Fonds National pour l'Insertion des Jeunes">
        <meta name="twitter:label2" content="Localisation">
        <meta name="twitter:data2" content="Conakry, Guinée">
        <meta name="twitter:app:country" content="GN">
        <meta name="twitter:app:name:iphone" content="Grand Prix FONIJ">
        <meta name="twitter:app:name:ipad" content="Grand Prix FONIJ">
        <meta name="twitter:app:name:googleplay" content="Grand Prix FONIJ">
        <meta name="twitter:app:url:iphone" content="{{ config('app.url') }}">
        <meta name="twitter:app:url:ipad" content="{{ config('app.url') }}">
        <meta name="twitter:app:url:googleplay" content="{{ config('app.url') }}">

        {{-- Balises LinkedIn --}}
        <meta property="linkedin:owner" content="FONIJ Guinée">
        <meta property="linkedin:title" content="{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}">
        <meta property="linkedin:description" content="{{ session('seo_description', config('app.description')) }}">
        <meta property="linkedin:image" content="{{ session('seo_image', '/images/fonij/logo.png') }}">

        {{-- Balises WhatsApp --}}
        <meta property="whatsapp:title" content="{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}">
        <meta property="whatsapp:description" content="{{ session('seo_description', config('app.description')) }}">
        <meta property="whatsapp:image" content="{{ session('seo_image', '/images/fonij/logo.png') }}">

        {{-- Balises Telegram --}}
        <meta property="telegram:title" content="{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}">
        <meta property="telegram:description" content="{{ session('seo_description', config('app.description')) }}">
        <meta property="telegram:image" content="{{ session('seo_image', '/images/fonij/logo.png') }}">

        {{-- Balises Pinterest --}}
        <meta name="pinterest-rich-pin" content="true">
        <meta name="pinterest" content="nopin">
        <meta property="pinterest:title" content="{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}">
        <meta property="pinterest:description" content="{{ session('seo_description', config('app.description')) }}">
        <meta property="pinterest:image" content="{{ session('seo_image', '/images/fonij/logo.png') }}">

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

        {{-- Favicons --}}
        <link rel="icon" href="/images/favicon/favicon.ico" sizes="any">
        <link rel="icon" href="/images/favicon/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png" sizes="180x180">
        <link rel="manifest" href="/site.webmanifest" crossorigin="use-credentials">
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#008751">
        <meta name="msapplication-TileColor" content="#008751">
        <meta name="msapplication-config" content="/browserconfig.xml">

        {{-- Préchargement des polices --}}
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="preload" href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" as="style">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        {{-- Données structurées JSON-LD --}}
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": "{{ config('app.url') }}/#organization",
                    "name": "FONIJ - Fonds National pour l'Insertion des Jeunes",
                    "alternateName": "FONIJ",
                    "url": "{{ config('app.url') }}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "{{ config('app.url') }}/images/fonij/logo-transparent.png",
                        "width": 300,
                        "height": 300
                    },
                    "description": "Le FONIJ est une institution publique guinéenne dédiée à l'insertion socioéconomique et professionnelle des jeunes.",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "102-316 Av. de la République",
                        "addressLocality": "Conakry",
                        "addressRegion": "Conakry",
                        "addressCountry": "GN",
                        "postalCode": "001"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+224-612-96-96-96",
                        "contactType": "customer service",
                        "email": "fonijguinee@gmail.com",
                        "availableLanguage": ["French"],
                        "areaServed": "GN",
                        "hoursAvailable": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                            "opens": "08:00",
                            "closes": "17:00"
                        }
                    },
                    "sameAs": [
                        "https://www.facebook.com/fonijguinee/",
                        "https://www.youtube.com/@fonijguinee3261",
                        "https://x.com/FONIJGUINEE",
                        "https://gn.linkedin.com/company/fonij-guinée"
                    ],
                    "foundingDate": "2020",
                    "numberOfEmployees": "50-100",
                    "areaServed": {
                        "@type": "Country",
                        "name": "Guinée"
                    },
                    "knowsAbout": [
                        "Entrepreneuriat",
                        "Insertion professionnelle",
                        "Formation des jeunes",
                        "Accompagnement entrepreneurial",
                        "Financement de projets"
                    ]
                },
                {
                    "@type": "WebSite",
                    "@id": "{{ config('app.url') }}/#website",
                    "url": "{{ config('app.url') }}",
                    "name": "Grand Prix FONIJ",
                    "description": "{{ session('seo_description', config('app.description')) }}",
                    "publisher": {
                        "@id": "{{ config('app.url') }}/#organization"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "{{ config('app.url') }}/search?q={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    },
                    "inLanguage": "fr-FR"
                },
                {
                    "@type": "WebPage",
                    "@id": "{{ request()->url() }}/#webpage",
                    "url": "{{ request()->url() }}",
                    "name": "{{ session('seo_title', config('app.name', 'Grand Prix FONIJ')) }}",
                    "description": "{{ session('seo_description', config('app.description')) }}",
                    "isPartOf": {
                        "@id": "{{ config('app.url') }}/#website"
                    },
                    "about": {
                        "@id": "{{ config('app.url') }}/#organization"
                    },
                    "publisher": {
                        "@id": "{{ config('app.url') }}/#organization"
                    },
                    "datePublished": "{{ date('c') }}",
                    "dateModified": "{{ date('c') }}",
                    "inLanguage": "fr-FR",
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Accueil",
                                "item": "{{ config('app.url') }}"
                            }
                        ]
                    }
                },
                {
                    "@type": "Event",
                    "@id": "{{ config('app.url') }}/#event",
                    "name": "Grand Prix FONIJ",
                    "description": "Concours d'entrepreneuriat pour les jeunes guinéens âgés de 18 à 35 ans",
                    "organizer": {
                        "@id": "{{ config('app.url') }}/#organization"
                    },
                    "eventStatus": "https://schema.org/EventScheduled",
                    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                    "location": {
                        "@type": "Place",
                        "name": "Palais du Peuple, Conakry",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "102-316 Av. de la République",
                            "addressLocality": "Conakry",
                            "addressRegion": "Conakry",
                            "addressCountry": "GN"
                        }
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "GNF",
                        "availability": "https://schema.org/InStock",
                        "validFrom": "{{ date('Y-m-d') }}",
                        "url": "{{ route('application') }}"
                    },
                    "audience": {
                        "@type": "Audience",
                        "audienceType": "Jeunes entrepreneurs guinéens",
                        "geographicArea": {
                            "@type": "Country",
                            "name": "Guinée"
                        }
                    },
                    "keywords": "{{ is_array(session('seo_keywords')) ? implode(', ', session('seo_keywords')) : 'FONIJ, Grand Prix FONIJ, Guinée, jeunes entrepreneurs, entrepreneuriat' }}",
                    "inLanguage": "fr-FR"
                }
            ]
        }
        </script>

        {{-- Balises de validation des moteurs de recherche --}}
        <meta name="google-site-verification" content="">
        <meta name="msvalidate.01" content="">
        <meta name="yandex-verification" content="">
        <meta name="p:domain_verify" content="">

        {{-- Balises de performance et analytics --}}
        <meta name="google-analytics" content="">
        <meta name="google-tag-manager" content="">
        <meta name="facebook-domain-verification" content="">

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