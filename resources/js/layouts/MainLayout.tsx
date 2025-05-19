import { Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { 
    Menu, X, Home, Award, GraduationCap, Send, 
    Mail, Phone, MapPin, Facebook, Twitter, 
    Instagram, Linkedin, Calendar, ChevronRight 
} from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
    metaDescription?: string;
}

interface RouteItem {
    name: string;
    label: string;
    icon: React.ElementType;
    href: string;
    active: string;
}

export default function MainLayout({ 
    children, 
    title = 'Grand Prix FONIJ',
    metaDescription = 'Le Grand Prix FONIJ récompense les initiatives exceptionnelles en faveur de l\'entrepreneuriat en Guinée.' 
}: MainLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Routes configuration
    const route_list: RouteItem[] = [
        {
            'name': 'home',
            'label': 'Accueil',
            'icon': Home,
            'href': '/',
            'active': 'home',
        },
        {
            'name': 'agenda',
            'label': 'Agenda',
            'icon': Calendar,
            'href': '/#agenda',
            'active': 'agenda',
        },
        {
            'name': 'categories',
            'label': 'Catégories',
            'icon': Award,
            'href': '/categories',
            'active': 'categories',
        },
        {
            'name': 'deroulement',
            'label': 'Déroulement',
            'icon': GraduationCap,
            'href': route('deroulement'),
            'active': 'deroulement',
        },
        {
            'name': 'accompagnement',
            'label': 'Accompagnement',
            'icon': GraduationCap,
            'href': route('programmes'),
            'active': 'programmes',
        },
        {
            'name': 'A Propos',
            'label': 'APropos',
            'icon': GraduationCap,
            'href': route('about.index'),
            'active': 'about.index',
        },
    ];

    const isActiveRoute = (routeName: string) => route().current(routeName);
    
    // Memoize scroll handler for better performance
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 10);
    }, []);

    // Close mobile menu on resize to prevent UI issues
    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Initial scroll check
        handleScroll();
        
        // Cleanup event listeners
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleScroll, handleResize]);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Meta tags */}
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            
            {/* Navigation - hauteur réduite sur mobile */}
            <nav 
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled 
                        ? 'bg-background/90 backdrop-blur-md shadow-md py-1 sm:py-2' 
                        : 'bg-transparent py-2 sm:py-4'
                }`}
                aria-label="Navigation principale"
             >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo Section - taille réduite sur mobile */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-1 sm:space-x-2 group">
                                <div className="relative flex items-center">
                                    <div className="relative">
                                        <img 
                                            src="/images/fonij/logo-transparent.png" 
                                            alt="FONIJ Logo" 
                                            className="h-10 sm:h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" 
                                        />
                                    </div>
                                    <div className="relative ml-2 sm:ml-4">
                                        <img 
                                            src="/images/guinee.jpg"
                                            alt="Drapeau Guinée" 
                                            className="h-8 sm:h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                            {route_list.map((route) => (
                                <Link 
                                    key={route.name}
                                    href={route.href} 
                                    className={`inline-flex items-center px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-lg relative ${
                                        isActiveRoute(route.active) 
                                            ? 'bg-primary text-white shadow-sm border-b-4 border-yellow-400' 
                                            : 'text-black hover:text-white hover:bg-primary-900'
                                    }`}
                                    aria-current={isActiveRoute(route.active) ? 'page' : undefined}
                                >
                                    <route.icon className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                    <span className="whitespace-nowrap">{route.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* CTA and Mobile Menu Section */}
                        <div className="flex items-center">
                            {/* Desktop CTA Button */}
                            <div className="hidden md:block">
                                <Link 
                                    href="/candidater" 
                                    className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 text-xs lg:text-sm font-medium rounded-full bg-gradient-fonij text-white hover:bg-gradient-fonij-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    <Send className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                    Candidater
                                </Link>
                            </div>
                            
                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                                    aria-expanded={isMenuOpen}
                                    aria-controls="mobile-menu"
                                    aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                >
                                    <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
                                    {isMenuOpen ? <X className="h-5 sm:h-6 w-5 sm:w-6" /> : <Menu className="h-5 sm:h-6 w-5 sm:w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - amélioration de l'ergonomie */}
                {isMenuOpen && (
                    <div 
                        id="mobile-menu"
                        className="md:hidden bg-background/95 backdrop-blur-md shadow-xl rounded-b-2xl mt-1 sm:mt-2 border-t border-border animate-slideDown max-h-[80vh] overflow-y-auto"
                    >
                        <div className="pt-2 pb-3 space-y-1 px-3 sm:px-4">
                            {route_list.map((route) => (
                                <Link 
                                    key={route.name}
                                    href={route.href} 
                                    className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-colors ${
                                        isActiveRoute(route.active) 
                                            ? 'bg-primary/10 text-primary' 
                                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                                    }`} 
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-current={isActiveRoute(route.active) ? 'page' : undefined}
                                >
                                    <div className="flex items-center">
                                        <route.icon className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3" />
                                        {route.label}
                                    </div>
                                    {isActiveRoute(route.active) && <ChevronRight className="h-3 sm:h-4 w-3 sm:w-4 text-primary" />}
                                </Link>
                            ))}
                            <div className="pt-3 sm:pt-4 pb-2">
                                <Link 
                                    href="/candidater" 
                                    className="flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium bg-gradient-fonij text-white hover:bg-gradient-fonij-gold rounded-full shadow-md hover:shadow-lg transition-all duration-200" 
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Send className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                                    Candidater maintenant
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content - moins de padding sur mobile */}
            <main className="flex-grow pt-16 sm:pt-20 md:pt-24">{children}</main>

            {/* Footer - adapter pour mobile */}
            <footer className="bg-gradient-to-b from-primary-800 to-black mt-8 sm:mt-12 text-gray-200">
                <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {/* About Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                                <img src="/images/fonij/logo-transparent.png" alt="FONIJ Logo" className="h-14 sm:h-16 md:h-20 w-auto" />
                                <h3 className="font-bold text-base sm:text-lg text-background">Grand Prix FONIJ</h3>
                            </div>
                            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                                Le Grand Prix FONIJ récompense les initiatives exceptionnelles en faveur de l'entrepreneuriat en Guinée et soutient le développement économique.
                            </p>
                        </div>
                        
                        {/* Objectives Section */}
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-background">Objectifs</h3>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-background/90">
                                <li className="flex items-start group hover:translate-x-1 transition-transform duration-200">
                                    <span className="text-secondary mr-2 flex-shrink-0">•</span>
                                    <span>Promotion de l'entrepreneuriat et l'innovation</span>
                                </li>
                                <li className="flex items-start group hover:translate-x-1 transition-transform duration-200">
                                    <span className="text-secondary mr-2 flex-shrink-0">•</span>
                                    <span>Soutien aux jeunes porteurs de projets innovants</span>
                                </li>
                                <li className="flex items-start group hover:translate-x-1 transition-transform duration-200">
                                    <span className="text-secondary mr-2 flex-shrink-0">•</span>
                                    <span>Création d'emplois et développement économique</span>
                                </li>
                                <li className="flex items-start group hover:translate-x-1 transition-transform duration-200">
                                    <span className="text-secondary mr-2 flex-shrink-0">•</span>
                                    <span>Valorisation des talents et compétences guinéens</span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Useful Links Section */}
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-background mt-4 sm:mt-0">Liens utiles</h3>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                {route_list.map((route) => (
                                    <li key={route.name}>
                                        <Link 
                                            href={route.href} 
                                            className="text-background/90 hover:text-background flex items-center transition-colors hover:translate-x-1 duration-200 group"
                                        >
                                            <route.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 group-hover:text-secondary transition-colors" />
                                            {route.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link 
                                        href="/candidater" 
                                        className="text-background/90 hover:text-background flex items-center transition-colors hover:translate-x-1 duration-200 group"
                                    >
                                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 group-hover:text-secondary transition-colors" />
                                        Candidater
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Contact Section */}
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-background mt-4 sm:mt-0">Contact</h3>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-background/90">
                                <li className="flex items-center group hover:translate-x-1 transition-transform duration-200">
                                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-secondary" />
                                    <a href="mailto:contact@fonij.org" className="hover:text-background transition-colors">
                                        contact@fonij.org
                                    </a>
                                </li>
                                <li className="flex items-center group hover:translate-x-1 transition-transform duration-200">
                                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-secondary" />
                                    <a href="tel:+224123456789" className="hover:text-background transition-colors">
                                        +224 123 456 789
                                    </a>
                                </li>
                                <li className="flex items-start group hover:translate-x-1 transition-transform duration-200">
                                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-secondary flex-shrink-0 mt-0.5" />
                                    <span>Conakry, Guinée</span>
                                </li>
                            </ul>
                            
                            {/* Social Media Icons */}
                            <div className="mt-4 sm:mt-6 flex space-x-3 sm:space-x-4">
                                <a 
                                    href="#" 
                                    className="bg-background/10 p-1.5 sm:p-2 rounded-full text-background hover:bg-background/20 hover:text-secondary hover:scale-110 transform transition-all duration-200"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="bg-background/10 p-1.5 sm:p-2 rounded-full text-background hover:bg-background/20 hover:text-secondary hover:scale-110 transform transition-all duration-200"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="bg-background/10 p-1.5 sm:p-2 rounded-full text-background hover:bg-background/20 hover:text-secondary hover:scale-110 transform transition-all duration-200"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="bg-background/10 p-1.5 sm:p-2 rounded-full text-background hover:bg-background/20 hover:text-secondary hover:scale-110 transform transition-all duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Copyright and Legal Links */}
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-background/20">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                            <p className="text-background/90 text-xs sm:text-sm">
                                &copy; {new Date().getFullYear()} FONIJ. Tous droits réservés.
                            </p>
                            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
                                <Link href="/mentions-legales" className="text-background/90 hover:text-background transition-colors">
                                    Mentions légales
                                </Link>
                                <Link href="/confidentialite" className="text-background/90 hover:text-background transition-colors">
                                    Confidentialité
                                </Link>
                                <Link href="/accessibilite" className="text-background/90 hover:text-background transition-colors">
                                    Accessibilité
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            
            {/* Styles pour l'animation du menu mobile */}
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-slideDown {
                    animation: slideDown 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
}