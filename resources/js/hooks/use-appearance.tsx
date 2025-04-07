import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = () => {
    // Désactiver le thème sombre - toujours utiliser le thème clair
    document.documentElement.classList.remove('dark');
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    // Ne rien faire, on force le thème clair
};

export function initializeTheme() {
    // Forcer l'utilisation du thème clair
    applyTheme();
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const updateAppearance = useCallback((mode: Appearance) => {
        // Si le mode est dark, on le change en light
        const finalMode = mode === 'dark' ? 'light' : mode;
        
        setAppearance(finalMode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', finalMode);

        // Store in cookie for SSR...
        setCookie('appearance', finalMode);

        // Forcer l'utilisation du thème clair
        applyTheme();
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        // Si le thème sauvegardé est dark, on le change en light
        const finalAppearance = savedAppearance === 'dark' ? 'light' : (savedAppearance || 'system');
        
        updateAppearance(finalAppearance);

        return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
