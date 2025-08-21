import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Award, BookOpen, Laptop, Sprout, Check, ChevronRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { FONIJ } from '../utils';

interface Edition {
    id: number;
    name: string;
    year: number;
    registrationDeadline: string;
}

interface CategoriesProps {
    edition: Edition | null;
}

const categories = FONIJ.categories;

export default function Categories({ edition }: CategoriesProps) {
    // Date limite d'inscription formatée
    const dateFinInscriptions = edition 
        ? new Date(edition.registrationDeadline) 
        : new Date('2025-09-15');
        
    // Année de l'édition actuelle
    const currentYear = edition ? edition.year : new Date().getFullYear();
    
    return (
        <MainLayout>
            {/* Hero Section avec effet parallaxe */}
            <div 
                className="w-full min-h-[90vh] bg-fixed bg-top bg-cover bg-gradient-to-b from-black/60 via-black/50 to-black/40 relative flex items-center justify-center py-32" 
                    style={{
                        backgroundImage: `url('https://libreopinionguinee.com/wp-content/uploads/2023/11/IMG_2306.jpeg')`,
                }}
             >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-7xl w-full space-y-6 backdrop-blur-sm bg-black/40 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mx-auto">
                        <div className="space-y-3 text-center">
                            <span className="text-white/70 font-semibold text-lg md:text-xl uppercase tracking-wider">République de Guinée</span>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                                Grand Prix FONIJ {currentYear}
                            </h1>
                            {edition && (
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="bg-white/20 py-1 px-3 rounded-full inline-flex">
                                        <span className="text-white font-semibold">{edition.name}</span>
                                    </div>
                                    <div className="bg-yellow-500/20 py-1 px-3 rounded-full inline-flex">
                                        <span className="text-yellow-300 font-semibold">
                                            Date limite: {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <p className="text-xl md:text-2xl text-yellow-400 font-semibold tracking-wide">
                                <span className="text-red-500">Innovation</span> • Excellence • <span className="text-primary">Leadership</span>
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-1 gap-8 text-white/90 mt-8">
                            <div className="space-y-3 border-l-4 border-yellow-400 pl-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Vision Présidentielle</h2>
                                <p className="text-lg md:text-xl leading-relaxed">
                                    Ce projet s'aligne sur la vision du Président de la République, le Général de Corps d'Armée Mamadi Doumbouya, 
                                    qui a placé la jeunesse au cœur de la Refondation nationale.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
                            <Link
                                href={route('candidater')}
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-lg transform hover:-translate-y-1"
                            >
                                Déposer ma candidature
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="#category-1"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 text-lg border border-white/20 transform hover:-translate-y-1"
                            >
                                Découvrir les catégories
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction et présentation */}
            <div className="bg-gradient-fonij text-white py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Catégories du Grand Prix</h2>
                        <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8">
                            Explorez nos quatre catégories d'excellence et trouvez celle qui correspond le mieux à votre projet innovant pour transformer la Guinée.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-2xl mx-auto justify-center items-center">
                            {categories.slice(0, 4).map((cat, index) => (
                                <motion.a
                                    href={`#${cat.slug}`}
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-background/10 hover:bg-background/20 rounded-xl p-3 md:p-4 flex flex-col items-center transition-all duration-300"
                                >
                                    <cat.icon className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
                                    <span className="text-xs md:text-sm text-center font-medium">{cat.title}</span>
                                </motion.a>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            {categories.length > 4 && (
                                <motion.a
                                    href={`#category-${categories[4].id}`}
                                    key={categories[4].id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                    className="bg-black/30 hover:bg-black/20 rounded-xl p-7 md:p-8 flex flex-col items-center animate-pulse transition-all duration-1500"
                                >
                                    <Trophy className="w-10 h-10 md:w-12 md:h-12 mb-1 md:mb-2 text-secondary font-extrabold" />
                                    <span className="text-xs md:text-sm text-center font-bold text-secondary">Grand prix du jury</span>
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categories Section avec nouveau design */}
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="space-y-20 md:space-y-32">
                        {categories.map((category, index) => (
                            <motion.div 
                                id={`${category.slug}`}
                                key={category.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { duration: 0.8 } }
                                }}
                                className="relative"
                            >
                                {/* Index number */}
                                <div id={`category-${category.slug}`} className="absolute -top-10 md:-top-16 left-0 md:left-10 z-10">
                                    <div className="bg-gradient-fonij w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg">
                                        {category.id}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    {/* Content side */}
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
                                            visible: { 
                                                opacity: 1, 
                                                x: 0, 
                                                transition: { duration: 0.8, delay: 0.4 } 
                                            }
                                        }}
                                        className="space-y-4 md:space-y-6 mt-4 md:mt-0"
                                    >
                                        <h2 className="text-2xl md:text-4xl font-bold text-primary">
                                            {category.title}
                                        </h2>
                                        <p className="text-base md:text-xl text-muted-foreground text-justify">
                                            {category.description}
                                        </p>
                                        
                                        {/* Tabs for details */}
                                        <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
                                            <div className="bg-background rounded-xl shadow-md overflow-hidden">
                                                <div className="p-4 md:p-6">
                                                    <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center mb-3 md:mb-4">
                                                        <span className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 md:mr-3 bg-gradient-fonij flex items-center justify-center">
                                                            <Check className="w-4 h-4 md:w-5 md:h-5 text-background" />
                                                        </span>
                                                        Objectif principal
                                                    </h3>
                                                    <ul className="space-y-1 md:space-y-2">
                                                        {category.crochets.map((crochet, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <span className="text-base md:text-lg text-primary mr-2">•</span>
                                                                <span className="text-sm md:text-base text-muted-foreground">{crochet}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* CTA */}
                                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="text-xs md:text-sm text-muted-foreground">
                                                Date limite : <span className="font-semibold text-foreground">{dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                            <Link
                                                href={`/candidater?category=${category.id}`}
                                                className="inline-flex items-center px-4 md:px-5 py-2 md:py-3 bg-gradient-fonij text-white font-medium rounded-full w-full sm:w-auto justify-center sm:justify-start hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                Candidater
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </motion.div>

                                    {/* Image side */}
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                                            visible: { 
                                                opacity: 1, 
                                                x: 0, 
                                                transition: { duration: 0.8, delay: 0.2 } 
                                            }
                                        }}
                                        className={`relative ${index % 2 === 0 ? 'md:order-first' : 'md:order-last'}`}
                                    >
                                        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                                            <img 
                                                src={category.image} 
                                                alt={category.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-fonij opacity-1"></div>
                                        </div>
                                        <div className="absolute top-6 right-6 bg-gradient-fonij rounded-full p-4 shadow-lg">
                                            <category.icon className="h-8 w-8 text-white" />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bannière CTA pour l'accompagnement */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-gradient-fonij py-16 overflow-hidden text-white"
            >
                
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/30 rounded-full"></div>
                    <div className="absolute top-20 left-90 w-64 h-64 bg-yellow-400/50 rounded-full"></div>
                    <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/30 rounded-full"></div>
                </div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-5xl mx-auto bg-background/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-background/20 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                            <div className="md:col-span-3 space-y-4">
                                <h2 className="text-2xl md:text-4xl font-bold text-background leading-tight">
                                    Gagnez et bénéficiez de nos programmes d'accompagnement
                                </h2>
                                <p className="text-background/80 text-base md:text-lg">
                                    Les lauréats du Grand Prix FONIJ {currentYear} bénéficient de programmes d'accompagnement exclusifs et personnalisés pour transformer leur projet en entreprise prospère et durable.
                                </p>
                            </div>
                            <div className="md:col-span-2 flex flex-col items-start space-y-4">
                                <div className="flex items-center text-background">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background/20 mr-3">
                                        <Check className="w-4 h-4 text-background" />
                                    </div>
                                    <span>Mentorat personnalisé par des experts</span>
                                </div>
                                <div className="flex items-center text-background">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background/20 mr-3">
                                        <Check className="w-4 h-4 text-background" />
                                    </div>
                                    <span>Financement et formation spécialisée</span>
                                </div>
                                <div className="flex items-center text-background">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background/20 mr-3">
                                        <Check className="w-4 h-4 text-background" />
                                    </div>
                                    <span>Intégration à notre réseau d'excellence</span>
                                </div>
                                <Link
                                    href={route('accompagnement')}
                                    className="mt-6 inline-flex items-center px-6 py-4 bg-background text-primary font-medium rounded-xl hover:bg-background/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full justify-center"
                                >
                                    Découvrir les avantages des lauréats
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            
        </MainLayout>
    );
}