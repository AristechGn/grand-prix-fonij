import MainLayout from '@/layouts/MainLayout';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, Target, Search, Book, Presentation, Award, LineChart, Flag, LucideIcon, ChevronRight, ArrowRight, Sparkles, Rocket, Star, Clock, Users, Trophy, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRef, useEffect, useState, ReactNode } from 'react';
import { FONIJ } from '@/utils/index';
import { Link } from '@inertiajs/react';

// Interface pour les programmes
interface ProgrammeType {
    id: number;
    title: string;
    description: string;
    date?: string;
    icon: LucideIcon;
    features?: string[];
    activites?: string[];
    color?: string;
    textColor?: string;
    image?: string;
    [key: string]: any;
}

// Fonction utilitaire pour fusionner les classes CSS
const cn = (...inputs: (string | undefined)[]) => {
    return twMerge(clsx(inputs));
};

interface FloatingElementProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

const FloatingElement = ({ children, delay = 0, className = "" }: FloatingElementProps) => {
    return (
        <motion.div
            className={`absolute ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{ zIndex: 10 }}
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 3, 0, -3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

// Composant de particules flottantes
const FloatingParticles = () => {
    useEffect(() => {
        const createParticle = () => {
            const particles = document.getElementById('particles-container');
            if (!particles) return;
            
            const size = Math.random() * 15 + 5;
            const particle = document.createElement('div');
            
            particle.className = "particle";
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = `${Math.random() * 0.5}`;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
            
            particles.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        };
        
        const particleInterval = setInterval(createParticle, 500);
        
        return () => clearInterval(particleInterval);
    }, []);

    return <div id="particles-container" className="absolute inset-0 z-10 overflow-hidden pointer-events-none"></div>;
};

interface ProgramCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

const ProgramCard = ({ icon: Icon, title, description, index }: ProgramCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
            <div className="h-1 w-full bg-gradient-fonij" />
            <div className="p-6">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
            </div>
        </motion.div>
    );
};

export default function Programme() {
    // État pour tracker l'élément de la timeline actif lors du scroll
    const [activePhase, setActivePhase] = useState(1);
    const timelineRef = useRef(null);

    // Observer pour la timeline
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActivePhase(Number(entry.target.getAttribute('data-phase')));
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-100px 0px' }
        );

        const phaseElements = document.querySelectorAll('.phase-item');
        phaseElements.forEach((el) => observer.observe(el));

        return () => {
            phaseElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.8,
                ease: "easeOut"
            } 
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const shine = {
        initial: { opacity: 0, scale: 0 },
        animate: { 
            opacity: [0, 1, 0], 
            scale: [0.5, 1.2, 0.5]
        },
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop" as const
        }
    };

    // Stats pour la bande d'infos avec des animations plus fun
    const stats = [
        { 
            icon: Calendar, 
            label: "7 phases clés",
            animation: {
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1],
            }
        },
        { 
            icon: Clock, 
            label: "11 mois de programme",
            animation: {
                scale: [1, 1.2, 1],
            }
        },
        { 
            icon: Trophy, 
            label: "300M GNF par projet",
            animation: {
                y: [0, -5, 0],
                scale: [1, 1.3, 1],
            }
        }
    ];

    // Pour simplifier je garde les phases du programme
    const phases = FONIJ.programmes.map((programme: any) => ({
        ...programme,
        activites: programme.activites || programme.features || []
    }));

    // Les programmes offerts de manière ludique
    const programmes = [
        {
            icon: Rocket,
            title: "SMART Entrepreneur",
            description: "Décollage immédiat pour les porteurs de projet ! Une aventure de 3 mois pour transformer votre idée en entreprise concrète.",
        },
        {
            icon: Sparkles,
            title: "Youth'Incuba",
            description: "6 mois d'effervescence créative pour les entrepreneurs en herbe. Prototypez et prouvez que votre concept fonctionne !",
        },
        {
            icon: Star,
            title: "Boost Entrepreneur",
            description: "Propulsez votre entreprise vers les étoiles ! 12 mois d'accélération intensive pour les jeunes dirigeants ambitieux.",
        },
    ];

    return (
        <MainLayout>
            {/* Hero Section moderne et ludique */}
            <div className="relative overflow-hidden bg-[url('/images/programmes/hero.jpg')] bg-cover bg-center min-h-[90vh]">
                {/* Overlay d'effets visuels */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/50 rounded-full mix-blend-multiply filter blur-[10px] opacity-5 animate-blob"></div>
                    <div className="absolute top-60 -left-20 w-72 h-72 bg-primary-light/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-5 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 right-20 w-80 h-80 bg-primary/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-5 animate-blob animation-delay-4000"></div>
                </div>

                <FloatingParticles />
                
                {/* Éléments flottants décoratifs - uniquement visibles sur desktop */}
                <div className="hidden md:block">
                    <FloatingElement className="opacity-5 top-[15%] left-[10%]" delay={0.3}>
                        <div className="w-20 h-20 rounded-full bg-primary/30 backdrop-blur-sm"></div>
                    </FloatingElement>
                    <FloatingElement className="opacity-5 top-[35%] right-[5%]" delay={0.8}>
                        <div className="w-32 h-32 rounded-full bg-primary-light/20 backdrop-blur-sm"></div>
                    </FloatingElement>
                    <FloatingElement className="opacity-5 bottom-[20%] left-[20%]" delay={1.2}>
                        <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm"></div>
                    </FloatingElement>
                    <FloatingElement className="opacity-5 bottom-[30%] right-[25%]" delay={1.5}>
                        <Calendar className="w-10 h-10 text-white/30" />
                    </FloatingElement>
                    <FloatingElement className="opacity-5 top-[25%] left-[30%]" delay={1.8}>
                        <Award className="w-12 h-12 text-white/30" />
                    </FloatingElement>
                    <FloatingElement className="opacity-5 top-[40%] right-[30%]" delay={2.0}>
                        <Star className="w-8 h-8 text-primary-light/50" />
                    </FloatingElement>
                </div>

                {/* Contenu principal du héro - ajustement pour mobile */}
                <div className="relative container mx-auto px-4 py-12 md:py-20 min-h-[90vh] flex flex-col justify-center items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.span 
                            variants={fadeInUp}
                            className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20"
                        >
                            GRAND PRIX FONIJ 2025
                        </motion.span>
                        
                        <motion.h1 
                            variants={fadeInUp}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight"
                        >
                            <span className="relative inline-block">
                                Embarquez 
                                <motion.span 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ 
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1.5, 0.5],
                                        rotate: [0, 15, 0]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        repeatType: "loop",
                                        delay: 2
                                    }}
                                    className="absolute -top-6 sm:-top-10 -right-4 sm:-right-8 text-primary-light"
                                >
                                    <Sparkles className="w-5 h-5 sm:w-8 sm:h-8" />
                                </motion.span>
                            </span>{" "}
                            <br className="sm:hidden" />
                            dans l'Aventure <span className="text-transparent bg-clip-text bg-gradient-fonij text-secondary-500 px-2">Entrepreneuriale</span>
                        </motion.h1>
                        
                        <motion.p 
                            variants={fadeInUp}
                            className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto"
                        >
                            Découvrez les 3 étapes palpitantes de notre programme d'innovation qui transformera votre idée en entreprise florissante !
                        </motion.p>
                        
                        <motion.div 
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.a
                                href="#timeline"
                                className="rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-primary shadow-lg transition-transform duration-300 hover:scale-105"
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Découvrir le programme
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                </span>
                            </motion.a>
                            
                            <motion.a
                                href={route('candidater')}
                                className="rounded-full bg-secondary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Je candidate maintenant
                                </span>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                    
                    {/* Animation décorative en bas - masquée sur les très petits écrans */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden xs:flex"
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                repeatType: "reverse" 
                            }}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-90" />
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Vague en bas - version plus simple pour mobile */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" className="w-full h-12 sm:h-auto">
                        <path fill="#FFFFFF" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,80C640,75,800,85,960,90.7C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* Bande d'infos interactive et ludique */}
            <div className="py-8 sm:py-10 bg-background relative -mt-1">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <motion.div 
                                    className="relative flex items-center justify-center mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-tr from-primary/10 to-primary/5 shadow-md"
                                    animate={stat.animation}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        repeatType: "reverse" 
                                    }}
                                >
                                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                    <motion.div 
                                        className="absolute inset-0 rounded-xl bg-primary"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ 
                                            opacity: [0, 0.3, 0], 
                                            scale: [0.5, 1.2, 0.5] 
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            repeatType: "loop" 
                                        }}
                                    />
                                </motion.div>
                                <h3 className="text-sm sm:text-lg font-bold text-foreground">{stat.label}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Programme visualisée comme timeline ludique */}
            <div id="timeline" className="py-20 bg-primary-50/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147.avif')] opacity-5"></div>
                <div className="absolute inset-0 top-0 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147-2.png')] bg-top opacity-5"></div>
                
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4">
                            NOTRE SUPER PROGRAMME
                        </span>
                        <h2 className="text-4xl font-bold mb-6">L'aventure en 7 étapes</h2>
                        <div className="h-1 w-24 bg-gradient-fonij mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Suivez votre parcours entrepreneurial à travers ces 3 phases excitantes, 
                            de l'appel à candidatures jusqu'à la victoire finale !
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto" ref={timelineRef}>
                        <div className="relative">
                            {/* Ligne centrale animée */}
                            <motion.div 
                                className="absolute left-[15px] sm:left-1/2 sm:-ml-0.5 w-1 h-full bg-gradient-to-b from-primary via-primary-light to-primary/50"
                                initial={{ height: "0%" }}
                                whileInView={{ height: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Phases du programme */}
                            {phases.map((phase: any, index: number) => {
                                const isLeft = index % 2 === 0;
                                const Icon = phase.icon;
                                
                                return (
                                    <div 
                                        key={phase.id}
                                        data-phase={phase.id}
                                        className={`phase-item mb-16 relative ${isLeft ? 'sm:ml-0' : 'sm:ml-0'}`}
                                    >
                                        {/* Point sur la timeline */}
                                        <motion.div 
                                            className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-xl
                                                ${activePhase === phase.id ? 'bg-gradient-fonij' : 'bg-white'}`}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                            style={{ top: 0 }}
                                        >
                                            <Icon className={`w-4 h-4 ${activePhase === phase.id ? 'text-white' : 'text-primary'}`} />
                                        </motion.div>

                                        <div className={`flex flex-col sm:flex-row ${isLeft ? '' : 'sm:flex-row-reverse'}`}>
                                            <div className="ml-14 sm:ml-0 sm:w-1/2 sm:pr-8">
                                                <motion.div 
                                                    className={`bg-white p-6 rounded-xl shadow-lg border-t-4 border-primary hover:shadow-xl transition-all duration-300
                                                        ${isLeft ? 'sm:ml-auto sm:mr-6' : 'sm:mr-auto sm:ml-6'}`}
                                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5 }}
                                                    whileHover={{ y: -5 }}
                                                >
                                                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-fonij text-white text-xs font-semibold mb-4">
                                                        Phase {phase.id}
                                                    </span>
                                                    <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                                                    {phase.date && <p className="text-sm text-muted-foreground mb-4">{phase.date}</p>}
                                                    
                                                    <ul className="space-y-2">
                                                        {phase.activites && phase.activites.slice(0, 3).map((activite: string, i: number) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                <div className="mt-1 h-2 w-2 rounded-full flex-shrink-0 bg-primary"></div>
                                                                <span>{activite}</span>
                                                            </li>
                                                        ))}
                                                        {phase.activites && phase.activites.length > 3 && (
                                                            <li className="text-sm text-primary font-medium">
                                                                + {phase.activites.length - 3} autres activités
                                                            </li>
                                                        )}
                                                    </ul>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Programmes en style carte ludique */}
            <div className="py-20 bg-gradient-to-b from-background to-primary/5">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4">
                            NOS PROGRAMMES
                        </span>
                        <h2 className="text-4xl font-bold mb-6">Un accompagnement sur mesure</h2>
                        <div className="h-1 w-24 bg-gradient-fonij mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Choisissez le programme qui correspond à votre ambition entrepreneuriale
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {programmes.map((programme, index) => (
                            <ProgramCard 
                                key={index}
                                icon={programme.icon} 
                                title={programme.title} 
                                description={programme.description}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Section CTA ludique et énergique */}
            <div className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-300 via-primary-900 to-primary-950">
                {/* Éléments décoratifs animés */}
                <div className="absolute inset-0">
                    {/* Cercles lumineux animés */}
                    <motion.div 
                        className="absolute top-10 left-10 w-56 h-56 rounded-full bg-white/30 blur-3xl"
                        animate={{ 
                            x: [0, 40, 0], 
                            y: [0, -30, 0],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            repeatType: "mirror" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-secondary-500/40 blur-3xl"
                        animate={{ 
                            x: [0, -50, 0], 
                            y: [0, 30, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                            duration: 10, 
                            repeat: Infinity, 
                            repeatType: "mirror",
                            delay: 2
                        }}
                    />
                    <motion.div 
                        className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-500/20 blur-3xl"
                        animate={{ 
                            x: [0, 60, 0], 
                            y: [0, 40, 0],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{ 
                            duration: 12, 
                            repeat: Infinity, 
                            repeatType: "mirror",
                            delay: 1
                        }}
                    />
                    
                    {/* Particules flottantes */}
                    <FloatingParticles />
                    <FloatingParticles />
                    <FloatingParticles />
                    
                    {/* Étoiles scintillantes */}
                    <div className="absolute inset-0 overflow-hidden opacity-70">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [0.8, 1.5, 0.8],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="container relative mx-auto px-4 z-10">
                    <motion.div 
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Animation emblématique centrale */}
                        <div className="relative mb-8">
                            <motion.div
                                className="inline-flex p-6 rounded-full bg-primary-800/30 backdrop-blur-sm border border-primary-500/30"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, 0, -5, 0],
                                }}
                                transition={{ 
                                    duration: 6, 
                                    repeat: Infinity,
                                    repeatType: "loop" 
                                }}
                            >
                                <motion.div
                                    className="text-secondary-300"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Rocket className="w-16 h-16" />
                                </motion.div>
                            </motion.div>
                            
                            {/* Orbites décoratives */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-primary-500/20 animate-spin-slow"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-dashed border-secondary-500/10 animate-spin-reverse"></div>
                        </div>
                        
                        {/* Titre avec animation de text gradient */}
                        <motion.h2 
                            className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary-200 to-primary-300 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Prêt à décoller vers le succès ?
                        </motion.h2>
                        
                        {/* Sous-titre avec éléments animés */}
                        <motion.p 
                            className="text-lg sm:text-xl text-white/90 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Rejoignez le Grand Prix FONIJ et transformez votre projet en 
                            <span className="inline-block align-middle mx-1">
                                <motion.span 
                                    className="inline-block"
                                    animate={{
                                        rotate: [0, 10, 0, -10, 0],
                                        scale: [1, 1.2, 1, 1.2, 1],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    ✨
                                </motion.span>
                            </span>
                            success story !
                        </motion.p>
                        
                        {/* Boutons avec effets améliorés */}
                        <motion.div 
                            className="flex flex-wrap gap-4 sm:gap-6 justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                whileHover={{ 
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href={route('candidater')}
                                    className="relative group rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 text-base font-bold text-white shadow-lg overflow-hidden"
                                >
                                    {/* Effet de brillance au survol */}
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                    
                                    <span className="relative z-10 flex items-center gap-2">
                                        Je dépose ma candidature
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.span>
                                    </span>
                                </Link>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ 
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href={route('contact')}
                                    className="relative group rounded-full bg-white/10 border border-white/30 backdrop-blur-md px-8 py-4 text-base font-bold text-white overflow-hidden"
                                >
                                    {/* Effet de pulsation de bordure */}
                                    <span className="absolute inset-0 border border-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></span>
                                    
                                    <span className="relative z-10 flex items-center gap-2">
                                        Nous contacter
                                        <MessageCircle className="w-5 h-5" />
                                    </span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Styles CSS pour animations personnalisées */}
                <style>{`
                    @keyframes spin-slow {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                    @keyframes spin-reverse {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to { transform: translate(-50%, -50%) rotate(-360deg); }
                    }
                    .animate-spin-slow {
                        animation: spin-slow 30s linear infinite;
                    }
                    .animate-spin-reverse {
                        animation: spin-reverse 45s linear infinite;
                    }
                `}</style>
            </div>

            {/* Styles CSS pour les animations supplémentaires */}
            <style>
                {`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(20px, -50px) scale(1.1);
                    }
                    50% {
                        transform: translate(0, -20px) scale(1);
                    }
                    75% {
                        transform: translate(-20px, -15px) scale(0.9);
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                .particle {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    animation: floatParticle 5s ease-in-out forwards;
                }
                
                @keyframes floatParticle {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    20% {
                        opacity: 0.3;
                    }
                    80% {
                        opacity: 0.2;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) translateX(20px) rotate(360deg);
                    }
                }
                `}
            </style>
        </MainLayout>
    );
}