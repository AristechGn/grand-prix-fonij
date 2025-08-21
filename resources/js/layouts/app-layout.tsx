import { Head, Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface SharedData {
  auth: {
    user: any;
  };
}

interface AppLayoutProps extends PropsWithChildren {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
    ogType?: string;
    twitterCreator?: string;
    datePublished?: string;
    dateModified?: string;
    articleSection?: string;
    alternateLocales?: {locale: string, url: string}[];
    itemProps?: Record<string, string>;
  };
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ 
  children, 
  seo = {
    title: "Grand Prix FONIJ - Fonds National d'Insertion des Jeunes",
    description: "Le Grand Prix FONIJ est une initiative du FONIJ pour favoriser l'insertion socioéconomique et professionnelle des jeunes guinéens âgés de 18 à 35 ans.",
    keywords: "FONIJ, Grand Prix FONIJ, entrepreneuriat jeunes, Guinée, financement projets, insertion professionnelle, jeunes guinéens",
    ogImage: "/images/grand-prix-fonij.jpg",
    canonicalUrl: "https://fonij.cguitech.com",
    ogType: "website",
    twitterCreator: "@fonijgn"
  },
  breadcrumbs,
  ...props
}: AppLayoutProps) {
  const { url } = usePage();
  const { appearance } = useAppearance();
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const {
    title,
    description,
    keywords,
    ogImage = "/images/grand-prix-fonij.jpg",
    canonicalUrl,
    ogType,
    twitterCreator,
    datePublished,
    dateModified,
    articleSection,
    alternateLocales = [],
    itemProps = {}
  } = seo;

  const currentUrl = `${baseUrl}${url}`;
  const absoluteImageUrl = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const publishDate = datePublished ?? new Date().toISOString();
  const modifyDate = dateModified ?? new Date().toISOString();

  return (
    <AppLayoutTemplate>
      <Head>
        {/* Balises meta de base */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="FONIJ" />
        <meta charSet="UTF-8" />
        
        {/* Directives pour les robots et les navigateurs */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        
        {/* Métadonnées géographiques et linguistiques */}
        <meta name="language" content="fr" />
        <meta name="geo.region" content="GN" />
        <meta name="geo.placename" content="Conakry" />
        
        {/* Métadonnées pour applications mobiles */}
        <meta name="application-name" content="Grand Prix FONIJ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Grand Prix FONIJ" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#008751" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)" />
        
        {/* Open Graph */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Logo Grand Prix FONIJ" />
        <meta property="og:site_name" content="Grand Prix FONIJ" />
        <meta property="og:locale" content="fr_GN" />
        
        {/* Article metadata */}
        {ogType === 'article' && (
          <>
            <meta property="article:published_time" content={publishDate} />
            <meta property="article:modified_time" content={modifyDate} />
            {articleSection && <meta property="article:section" content={articleSection} />}
          </>
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteImageUrl} />
        <meta name="twitter:creator" content={twitterCreator} />
        <meta name="twitter:site" content="@fonijgn" />
        
        {/* Canonical et langues alternatives */}
        <link rel="canonical" href={canonicalUrl || currentUrl} />
        {alternateLocales.map(({locale, url}) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={url} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        
        {/* Préconnexion aux origines externes */}
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.bunny.net" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FONIJ - Fonds National d'Insertion des Jeunes",
            "url": baseUrl,
            "logo": `${baseUrl}/images/logo-fonij.svg`,
            "description": description,
            "image": absoluteImageUrl,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "T2 Kipé Centre Emetteur",
              "addressLocality": "Ratoma",
              "addressRegion": "Conakry",
              "addressCountry": "GN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+224 622 06 55 52",
              "contactType": "customer service",
              "email": "contact@fonijguinee.org",
              "availableLanguage": ["French"]
            },
            "sameAs": [
              "https://www.facebook.com/fonijgn",
              "https://twitter.com/fonijgn",
              "https://www.linkedin.com/company/fonij",
              "https://fonijguinee.org"
            ]
          })}
        </script>
      </Head>

      <div className={`min-h-screen flex flex-col ${appearance === 'dark' ? 'dark' : ''}`}>
        {/* Contenu principal */}
        <main 
          id="main-content" 
          role="main"
          tabIndex={-1}
          aria-label="Contenu principal"
          className="flex-grow"
        >
          {children}
        </main>
      </div>
    </AppLayoutTemplate>
  );
}
