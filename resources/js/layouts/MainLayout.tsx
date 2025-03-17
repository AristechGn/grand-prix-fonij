import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Award, GraduationCap, Newspaper, Send, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Calendar, FileText, Target } from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function MainLayout({ children, title = 'Grand Prix FONIJ' }: MainLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Effet de scroll pour changer l'apparence de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Metadonnées */}
            <title>{title}</title>
            
            {/* Navigation */}
            <nav className={`${scrolled ? 'shadow-md py-2' : 'py-4'} bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3">
                                <img src="https://fonijguinee.org/wp-content/uploads/2022/09/LOGO-NEW.png" alt="FONIJ Logo" className="h-12 w-auto" />
                                {/* <div className="hidden md:block">
                                    <h1 className="font-bold text-lg text-emerald-600">Grand Prix FONIJ</h1>
                                    <p className="text-xs text-gray-600">Promotion de l'Esprit d'Entreprise</p>
                                </div> */}
                            </Link>
                        </div>
                        
                        <div className="hidden md:flex md:space-x-6 items-center">
                            <Link href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                <Home className="h-4 w-4 mr-1" />
                                Accueil
                            </Link>
                            <Link href="/categories" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                <Award className="h-4 w-4 mr-1" />
                                Catégories
                            </Link>
                            <Link href="/programmes" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                <GraduationCap className="h-4 w-4 mr-1" />
                                Programmes
                            </Link>
                            <Link href="/calendrier" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                <Calendar className="h-4 w-4 mr-1" />
                                Calendrier
                            </Link>
                            <Link href="/actualites" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                                <Newspaper className="h-4 w-4 mr-1" />
                                Actualités
                            </Link>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/candidater" className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-md hover:shadow-lg transition-all duration-200">
                                <Send className="h-4 w-4 mr-2" />
                                Candidater maintenant
                            </Link>
                        </div>
                        
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors"
                            >
                                <span className="sr-only">Ouvrir le menu</span>
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg rounded-b-xl mt-2 border-t border-gray-100 animate-fadeIn">
                        <div className="pt-2 pb-3 space-y-1 px-4">
                            <Link href="/" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:text-emerald-600 rounded-md hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <Home className="h-5 w-5 mr-2" />
                                Accueil
                            </Link>
                            <Link href="/categories" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:text-emerald-600 rounded-md hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <Award className="h-5 w-5 mr-2" />
                                Catégories
                            </Link>
                            <Link href="/programmes" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:text-emerald-600 rounded-md hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <GraduationCap className="h-5 w-5 mr-2" />
                                Programmes
                            </Link>
                            <Link href="/calendrier" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:text-emerald-600 rounded-md hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <Calendar className="h-5 w-5 mr-2" />
                                Calendrier
                            </Link>
                            <Link href="/actualites" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:text-emerald-600 rounded-md hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                <Newspaper className="h-5 w-5 mr-2" />
                                Actualités
                            </Link>
                            <div className="pt-2 pb-1">
                                <Link href="/candidater" className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl hover:from-emerald-700 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                                    <Send className="h-5 w-5 mr-2" />
                                    Candidater maintenant
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Contenu principal */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-600 text-white relative">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
                <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-3 mb-4">
                                <img src="https://fonijguinee.org/wp-content/uploads/2022/09/LOGO-NEW.png" alt="FONIJ Logo" className="h-10 w-auto" />
                                <div>
                                    <h3 className="font-bold text-lg text-emerald-400">Grand Prix FONIJ</h3>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Le Grand Prix FONIJ, initié par le Fonds National pour l'Insertion des Jeunes (FONIJ), distingue et récompense les initiatives exceptionnelles allant dans le sens de la promotion de l'Esprit d'Entreprise en République de Guinée.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Target className="h-5 w-5 mr-2 text-emerald-400" />
                                Objectifs
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-emerald-400 mr-2">•</span>
                                    Identifier et reconnaître les initiatives pour promouvoir l'entrepreneuriat
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-400 mr-2">•</span>
                                    Encourager les jeunes porteurs de projets
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-400 mr-2">•</span>
                                    Favoriser la création d'emplois et l'innovation
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-emerald-400" />
                                Liens utiles
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/categories" className="text-gray-300 hover:text-emerald-400 flex items-center transition-colors"><Award className="h-4 w-4 mr-2" />Catégories de prix</Link></li>
                                <li><Link href="/programmes" className="text-gray-300 hover:text-emerald-400 flex items-center transition-colors"><GraduationCap className="h-4 w-4 mr-2" />Programmes d'accélération</Link></li>
                                <li><Link href="/calendrier" className="text-gray-300 hover:text-emerald-400 flex items-center transition-colors"><Calendar className="h-4 w-4 mr-2" />Calendrier du concours</Link></li>
                                <li><Link href="/criteres" className="text-gray-300 hover:text-emerald-400 flex items-center transition-colors"><Target className="h-4 w-4 mr-2" />Critères d'éligibilité</Link></li>
                                <li><Link href="/actualites" className="text-gray-300 hover:text-emerald-400 flex items-center transition-colors"><Newspaper className="h-4 w-4 mr-2" />Actualités</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-emerald-400" />
                                Contact
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-center"><Mail className="h-4 w-4 mr-2 text-emerald-400" />contact@fonij.org</li>
                                <li className="flex items-center"><Phone className="h-4 w-4 mr-2 text-emerald-400" />+224 123 456 789</li>
                                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-emerald-400" />Conakry, République de Guinée</li>
                            </ul>
                            <div className="mt-6 flex space-x-4">
                                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all duration-200">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all duration-200">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all duration-200">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all duration-200">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-sm">
                                &copy; {new Date().getFullYear()} FONIJ. Tous droits réservés.
                            </p>
                            <div className="flex space-x-6 text-sm">
                                <Link href="/mentions-legales" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    Mentions légales
                                </Link>
                                <Link href="/confidentialite" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    Politique de confidentialité
                                </Link>
                                <Link href="/accessibilite" className="text-gray-400 hover:text-emerald-400 transition-colors">
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