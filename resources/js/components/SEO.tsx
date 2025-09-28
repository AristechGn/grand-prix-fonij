import { Head } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
}

export default function SEO({
    title = 'Grand Prix FONIJ',
    description = 'Le Grand Prix FONIJ est une initiative du FONIJ pour favoriser l\'insertion socioéconomique et professionnelle des jeunes guinéens âgés de 18 à 35 ans.',
    keywords = ['FONIJ', 'Grand Prix', 'Guinée', 'jeunes', 'entrepreneuriat', 'innovation', 'insertion professionnelle'],
    image = '/images/og-default.jpg',
    url,
    type = 'website'
}: SEOProps) {
    const currentUrl = url || window.location.href;
    const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

    return (
        <Head>
            {/* Meta tags de base */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Grand Prix FONIJ" />
            <meta property="og:locale" content="fr_FR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": type === 'website' ? 'WebPage' : 'Event',
                        "name": title,
                        "description": description,
                        "url": currentUrl,
                        "image": fullImageUrl,
                        "publisher": {
                            "@type": "Organization",
                            "name": "FONIJ",
                            "url": "https://fonij.gov.gn"
                        },
                        "inLanguage": "fr-FR"
                    })
                }}
            />
        </Head>
    );
}
