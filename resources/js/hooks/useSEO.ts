import { usePage } from '@inertiajs/react';

interface SEOData {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
}

export function useSEO(): SEOData {
    const { props } = usePage();
    
    // Les données SEO sont passées depuis le contrôleur via les props
    return {
        title: props.seo?.title,
        description: props.seo?.description,
        keywords: props.seo?.keywords,
        image: props.seo?.image,
        url: props.seo?.url,
        type: props.seo?.type,
    };
}

export default useSEO;
