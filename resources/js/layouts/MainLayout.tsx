import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Award, GraduationCap, Send, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Calendar } from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function MainLayout({ children, title = 'Grand Prix FONIJ' }: MainLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const route_list = [
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
            'active': 'accompagnement',
        },
        // {
        //     'name': 'actualites',
        //     'label': 'Actualités',
        //     'icon': Newspaper,
        //     'href': route('actualites'),
        //     'active': 'actualites',
        // },
    ];

    const isActiveRoute = (routeName: string) => route().current(routeName);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <title>{title}</title>
            
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' 
                    : 'bg-transparent py-4'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-4">
                    <div className="flex justify-between items-center">
                        {/* Section Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <div className="relative flex items-center">
                                    <div className="relative">
                                        <img 
                                            src="/images/fonij/logo-transparent.png" 
                                            alt="FONIJ Logo" 
                                            className="h-16 w-auto transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        {/* <div className="absolute inset-0 bg-emerald-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                                    </div>
                                    <div className="relative ml-4">
                                        <img 
                                            src="/images/guinee.jpg"
                                            alt="Simandou Logo" 
                                            className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
                                        />
                                        {/* <div className="absolute inset-0 bg-emerald-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Section Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            {route_list.map((route) => (
                                <Link 
                                    key={route.name}
                                    href={route.href} 
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                                        isActiveRoute(route.active) 
                                            ? 'text-emerald-600 bg-emerald-50 shadow-sm' 
                                            : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                                    }`}
                                >
                                    <route.icon className="h-4 w-4 mr-2" />
                                    {route.label}
                                </Link>
                            ))}
                        </div>

                        {/* Section CTA et Menu Mobile */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block">
                                <Link 
                                    href="/candidater" 
                                    className="inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-full text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Candidater
                                </Link>
                            </div>
                            
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors"
                                >
                                    <span className="sr-only">Ouvrir le menu</span>
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-xl rounded-b-2xl mt-2 border-t border-gray-100 animate-fadeIn">
                        <div className="pt-2 pb-3 space-y-1 px-4">
                            {route_list.map((route) => (
                                <Link 
                                    key={route.name}
                                    href={route.href} 
                                    className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                                        isActiveRoute(route.active) 
                                            ? 'text-emerald-600 bg-emerald-50' 
                                            : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                                    }`} 
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <route.icon className="h-5 w-5 mr-3" />
                                    {route.label}
                                </Link>
                            ))}
                            <div className="pt-2">
                                <Link 
                                    href="/candidater" 
                                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-200" 
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Send className="h-5 w-5 mr-2" />
                                    Candidater
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Contenu principal avec padding pour la navbar fixe */}
            <main className="pt-20">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-3 mb-6">
                                <img src="/images/fonij/logo-transparent.png" alt="FONIJ Logo" className="h-20 w-auto" />
                                <h3 className="font-bold text-lg text-emerald-400">Grand Prix FONIJ</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Le Grand Prix FONIJ récompense les initiatives exceptionnelles en faveur de l'entrepreneuriat en Guinée.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Objectifs</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    Promotion de l'entrepreneuriat
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    Soutien aux jeunes porteurs de projets
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    Création d'emplois et innovation
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Liens utiles</h3>
                            <ul className="space-y-2 text-sm">
                                {route_list.map((route) => (
                                    <li key={route.name}>
                                        <Link 
                                            href={route.href} 
                                            className="text-gray-400 hover:text-emerald-400 flex items-center transition-colors"
                                        >
                                            <route.icon className="h-4 w-4 mr-2" />
                                            {route.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Contact</h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-emerald-500" />
                                    contact@fonij.org
                                </li>
                                <li className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-emerald-500" />
                                    +224 123 456 789
                                </li>
                                <li className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                                    Conakry, Guinée
                                </li>
                            </ul>
                            <div className="mt-6 flex space-x-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                    <a 
                                        key={index}
                                        href="#" 
                                        className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all duration-200"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-500 text-sm">
                                &copy; {new Date().getFullYear()} FONIJ. Tous droits réservés.
                            </p>
                            <div className="flex space-x-6 text-sm">
                                <Link href="/mentions-legales" className="text-gray-500 hover:text-emerald-400 transition-colors">
                                    Mentions légales
                                </Link>
                                <Link href="/confidentialite" className="text-gray-500 hover:text-emerald-400 transition-colors">
                                    Confidentialité
                                </Link>
                                <Link href="/accessibilite" className="text-gray-500 hover:text-emerald-400 transition-colors">
                                    Accessibilité
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}