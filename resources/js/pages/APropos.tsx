import MainLayout from '@/layouts/MainLayout';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, Target, Users, BookOpen, GraduationCap, ChevronRight, ArrowUpRight, BrainCircuit, Globe, Heart, Lightbulb, Star, ArrowRight, Sparkles, Rocket } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
import { Edition } from '@/types';

// Composant pour les particules flottantes
const FloatingParticles = () => {
    useEffect(() => {
        const createParticle = () => {
            const particles = document.getElementById('particles-container');
            if (!particles) return;
            
            const size = Math.random() * 10 + 3;
            const particle = document.createElement('div');
            
            particle.className = "particle";
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = `${Math.random() * 0.3}`;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
            
            particles.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 6000);
        };
        
        const particleInterval = setInterval(createParticle, 800);
        
        return () => clearInterval(particleInterval);
    }, []);

    return <div id="particles-container" className="absolute inset-0 z-10 overflow-hidden pointer-events-none"></div>;
};


interface AProposProps {
    edition: Edition | null;
}
export default function APropos({ edition }: AProposProps) {
    // Refs pour les sections avec parallaxe
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const currentYear = edition ? edition.year : new Date().getFullYear();
    
    // Animation parallaxe pour le hero
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    
    const heroY = useTransform(heroScrollProgress, [0, 1], [0, 300]);
    const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
    
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };
    
    const slideInLeft = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };
    
    const slideInRight = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };
    
    const popIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 10 
            } 
        }
    };

    return (
        <MainLayout>
            {/* Hero Section avec parallaxe avancé et particules */}
            <motion.div 
                ref={heroRef} 
                className="relative w-full h-screen flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Image de fond avec effet de parallaxe */}
                <motion.div 
                    className="absolute inset-0 bg-center bg-contain bg-fixed bg-no-repeat"
                    style={{ 
                        backgroundImage: `url('/images/covers/guinea-cart.jpg')`,
                        y: heroY,
                    }}
                />
                
                {/* Overlay avec dégradé et textures */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40 z-0"></div>
                
                {/* Forme décorative - cercle avec flou */}
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-primary/30 mix-blend-overlay filter blur-[80px] opacity-40"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ 
                        duration: 15, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                    }}
                />
                
                {/* Autre forme décorative */}
                <motion.div 
                    className="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-80 md:h-80 rounded-full bg-red-500/20 mix-blend-overlay filter blur-[60px] opacity-30"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        x: [0, -20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2
                    }}
                />
                
                {/* Particules flottantes */}
                <FloatingParticles />
                
                {/* Contenu principal avec animation */}
                <motion.div 
                    className="max-w-7xl w-full mx-4 space-y-8 backdrop-blur-sm bg-black/40 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl z-10"
                    style={{ opacity: heroOpacity }}
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeIn} className="space-y-3 text-center">
                        <motion.span 
                            variants={slideInLeft}
                            className="inline-block text-white/70 font-semibold text-lg md:text-xl uppercase tracking-wider px-4 py-1 rounded-full border border-white/20"
                        >
                            République de Guinée
                        </motion.span>
                        
                        <motion.h1 
                            variants={popIn}
                            className="text-5xl md:text-7xl font-bold leading-tight text-white"
                        >
                            Grand Prix 
                            <motion.span
                                className="relative mx-2"
                                animate={{ 
                                    textShadow: ["0px 0px 5px rgba(255,255,255,0.5)", "0px 0px 20px rgba(255,255,255,0.8)", "0px 0px 5px rgba(255,255,255,0.5)"]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity
                                }}
                            >FONIJ</motion.span>
                        </motion.h1>
                        
                        <motion.p 
                            variants={slideInRight}
                            className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 via-secondary-500 to-secondary-600 font-semibold tracking-wide animate-gradient"
                        >
                            <span className="text-red-500">Innover</span> • <span className="text-yellow-500">Entreprendre</span> • <span className="text-green-500">Transformer</span>
                        </motion.p>
                    </motion.div>
                    
                    {/* Bouton pour découvrir */}
                    <motion.div 
                        className="flex justify-center items-center"
                        variants={fadeIn}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <motion.div
                            className="mt-4 inline-flex items-center gap-2 px-6 py-2 text-white border border-white/20 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                            whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: "rgba(255,255,255,0.1)" 
                            }}
                            onClick={() => {
                                const aboutSection = document.getElementById('about-section');
                                if (aboutSection) {
                                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <span>Découvrir</span>
                            <motion.span
                                animate={{ y: [0, 5, 0] }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity
                                }}
                            >
                                <ChevronRight className="h-5 w-5 transform rotate-90" />
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>
                
                {/* Vague en bas */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,64C672,53,768,75,864,85.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </motion.div>

            {/* Section Qu'est-ce que le Grand Prix FONIJ ? */}
            <div id="about-section" className="py-16 md:py-24 bg-white relative overflow-hidden">
                {/* Motifs arrière-plan */}
                <div className="absolute inset-0 bg-[url('/images/covers/perspective-grid-pattern_1409-1826.avif')] bg-cover bg-no-repeat opacity-5"></div>
                
                {/* Formes décoratives */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full opacity-20 filter blur-xl"
                        animate={{ 
                            y: [0, -30, 0],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                            duration: 18, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-red-500/10 to-secondary/5 rounded-full opacity-20 filter blur-xl"
                        animate={{ 
                            x: [0, 20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 2
                        }}
                    />
                </div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        ref={aboutRef}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={slideInLeft} className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Qu'est-ce que le Grand Prix FONIJ ?</h2>
                        </motion.div>

                        <motion.div 
                            className="space-y-6 text-lg text-gray-700"
                            variants={fadeIn}
                        >
                            <motion.p
                                variants={fadeIn}
                                className="relative"
                            >
                                <span className="relative">
                                    Le Grand Prix FONIJ 
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </span> est un concours national initié par le Fonds National pour l'Insertion des Jeunes (FONIJ) pour encourager et valoriser l'entrepreneuriat jeune en Guinée.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                                Cette première édition a pour ambition de récompenser les projets les plus innovants, ambitieux et porteurs d'impact, portés par des jeunes issus de toutes les régions du pays.
                            </motion.p>
                            <motion.p variants={fadeIn}>
                            Conçu sous l'impulsion des plus hautes autorités de la République, le Grand Prix FONIJ marque une nouvelle étape dans la promotion de l'excellence, de l'innovation et de l'insertion économique des jeunes guinéens. Il repose sur un processus de sélection rigoureux et un accompagnement structuré des lauréats.
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                            variants={staggerContainer}
                        >
                            {[
                                { 
                                    icon: Award, 
                                    title: "Excellence", 
                                    description: "Reconnaissance des projets les plus innovants et à fort impact pour le développement de la Guinée.",
                                    color: "from-red-500 to-red-700" 
                                },
                                { 
                                    icon: Target, 
                                    title: "Impact", 
                                    description: "Soutien aux initiatives répondant aux enjeux prioritaires du développement national.",
                                    color: "from-secondary to-yellow-600" 
                                },
                                { 
                                    icon: Users, 
                                    title: "Inclusion", 
                                    description: "Valorisation de la diversité des talents à travers tout le territoire guinéen.",
                                    color: "from-primary to-primary-dark"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                    variants={popIn}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    {/* Bordure décorative en haut */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>
                                    
                                    {/* Icône avec animation */}
                                    <motion.div
                                        className="relative mb-6"
                                        whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-md">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                                <item.icon className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        
                                        {/* Cercle décoratif */}
                                        <motion.div 
                                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100"
                                            animate={{ scale: [0.8, 1.2, 0.8] }}
                                            transition={{ 
                                                duration: 2, 
                                                repeat: Infinity,
                                                repeatType: "loop"
                                            }}
                                        />
                                    </motion.div>
                                    
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Section Appui présidentiel et institutionnel */}
            <div className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
                {/* Motif de fond subtil */}
                <div className="absolute inset-0 bg-[url('/images/circuit-pattern.jpg')] bg-cover bg-no-repeat opacity-5"></div>
                
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full filter blur-xl opacity-30"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ 
                            duration: 12, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                </div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div variants={fadeIn} className="text-center mb-12">
                            <motion.span 
                                variants={popIn}
                                className="inline-block uppercase rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-sm font-medium text-white mb-6 shadow-md"
                            >
                                Message officiel
                            </motion.span>
                            
                            <motion.h2 
                                variants={fadeIn}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                            >
                                Une initiative portée par une 
                                <span className="relative ml-2">
                                    <span className="relative z-10 text-primary">vision présidentielle</span>
                                    <motion.div 
                                        className="absolute -bottom-1 left-0 w-full h-1 bg-primary/30"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </span> forte
                            </motion.h2>
                            
                            <motion.div 
                                variants={fadeIn}
                                className="mx-auto h-1 w-20 bg-gradient-to-r from-primary to-secondary mb-8"
                            ></motion.div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <motion.div
                                variants={slideInLeft}
                                className="relative group"
                            >
                                {/* Cadre décoratif */}
                                <motion.div 
                                    className="absolute -top-3 -left-3 right-3 bottom-3 bg-primary/10 rounded-xl z-0 group-hover:left-3 group-hover:right-3 group-hover:-top-3 group-hover:-bottom-3"
                                    transition={{ duration: 0.4 }}
                                />
                                
                                <img
                                    src="/images/fonij/dg-fonij.jpg"
                                    alt="Abdourahmane Baldé - Directeur Général du FONIJ"
                                    className="rounded-xl shadow-xl w-full h-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
                                />
                                    
                                {/* Badge de titre */}
                                <motion.div 
                                    className="absolute -bottom-5 -right-5 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity 
                                    }}
                                >
                                    Directeur Général
                                </motion.div>
                                
                                {/* Badge flottant */}
                                {/* <motion.div 
                                    className="absolute -bottom-5 -right-5 bg-white p-2 rounded-xl shadow-lg z-20"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity,
                                        repeatType: "reverse" 
                                    }}
                                >
                                    <img 
                                        src="https://mjs.gov.gn/file/2022/09/logo-MJS.png" 
                                        alt="Ministère" 
                                        className="h-12 w-auto" 
                                    />
                                </motion.div> */}
                            </motion.div>
                            
                            <motion.div 
                                className="space-y-6 text-lg text-gray-700"
                                variants={slideInRight}
                            >
                                <motion.p variants={fadeIn}>
                                    C'est avec fierté et engagement que je vous souhaite la bienvenue sur le site officiel du Grand Prix FONIJ {currentYear}.
                                </motion.p>
                                <motion.p variants={fadeIn}>
                                Cette initiative du <motion.span 
                                        className="relative mx-2 font-semibold text-primary-800"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        "Fonds National pour l'Insertion des Jeunes (FONIJ)"
                                    </motion.span> s'inscrit dans la vision portée par Son Excellence le Général d'Armée Mamadi Doumbouya, Président de la République de Guinée, qui place la jeunesse au cœur du développement et de la transformation de notre pays.
                                </motion.p>
                                <motion.p 
                                    variants={fadeIn}
                                    className="relative"
                                >
                                    Le Grand Prix FONIJ se veut bien plus qu’un concours. Il est une plateforme nationale d’opportunités, destinée à révéler, accompagner et valoriser les jeunes porteurs de projets à fort potentiel d’impact, dans toutes les régions de la Guinée.
                                </motion.p>

                                <motion.div 
                                        className="pt-8 flex items-center gap-3 bg-gradient-to-r from-primary to-black rounded-lg p-4"
                                        variants={fadeIn}
                                >
                                    <div className="h-10 w-1 bg-white/40 rounded-full"></div> 
                                    <div>
                                        <p className="font-bold text-2xl text-white">Abdourahmane Baldé</p>
                                        <p className="text-white/80 text-sm">Directeur Général du FONIJ</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Section Le mot du Ministre de la Jeunesse et des Sports */}
            <div className="py-16 md:py-24 relative overflow-hidden">
                {/* Fond avec gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900"></div>
                
                {/* Motif et texture */}
                <div className="absolute inset-0 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147.avif')] bg-repeat opacity-10 mix-blend-overlay"></div>
                
                {/* Particules */}
                <FloatingParticles />
                
                {/* Formes décoratives */}
                <motion.div 
                    className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/10 mix-blend-overlay filter blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, -30, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ 
                        duration: 15, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                    }}
                />
                
                <motion.div 
                    className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-secondary/20 mix-blend-overlay filter blur-3xl"
                    animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2
                    }}
                />
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div 
                            variants={fadeIn}
                            className="text-center mb-12"
                        >
                            <motion.span 
                                variants={popIn}
                                className="inline-block rounded-full bg-white/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-white mb-6 shadow-lg border border-white/10"
                            >
                                MESSAGE OFFICIEL
                            </motion.span>
                            
                            <motion.h2 
                                variants={fadeIn}
                                className="text-3xl uppercase md:text-2xl font-bold text-white mb-6"
                            >
                                Le mot du Ministre de la Jeunesse et des Sports
                            </motion.h2>
                            
                            <motion.div 
                                variants={slideInLeft}
                                className="mx-auto h-1 w-24 bg-white/70 mb-8"
                            ></motion.div>
                        </motion.div>

                        <motion.div 
                            className="relative bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
                            variants={popIn}
                            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            {/* Forme décorative */}
                            <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/30 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-secondary/30 rounded-full blur-2xl"></div>
                            
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <motion.div 
                                    className="w-full md:w-1/3 relative"
                                    variants={slideInLeft}
                                >
                                    {/* Effet de bordure animée */}
                                    <motion.div 
                                        className="absolute inset-0 border-2 border-white/50 rounded-xl"
                                        animate={{ 
                                            opacity: [0.2, 0.5, 0.2],
                                        }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity 
                                        }}
                                    ></motion.div>
                                    
                                    <img
                                        src="/images/fonij/Minstre-HABA-transparent.png"
                                        alt="Ministre Haba"
                                        className="rounded-xl bg-white shadow-lg w-full h-auto object-cover aspect-square"
                                    />
                                    
                                    {/* Badge de titre */}
                                    <motion.div 
                                        className="absolute -bottom-5 -right-5 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity 
                                        }}
                                    >
                                        Ministre de la Jeunesse et des Sports
                                    </motion.div>
                                </motion.div>
                                
                                <motion.div 
                                    className="w-full md:w-2/3 space-y-6"
                                    variants={slideInRight}
                                >
                                    <motion.div
                                        className="relative"
                                        variants={fadeIn}
                                    >
                                        {/* Guillemets décoratifs */}
                                        <motion.div 
                                            className="absolute -top-6 -left-6 text-6xl text-white/20 font-serif"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ 
                                                duration: 3, 
                                                repeat: Infinity,
                                                repeatType: "reverse" 
                                            }}
                                        >
                                            "
                                        </motion.div>
                                        
                                        <motion.p 
                                            className="text-2xl text-white/90 italic font-light leading-relaxed"
                                            animate={{ 
                                                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 3px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"]
                                            }}
                                            transition={{ 
                                                duration: 5,
                                                repeat: Infinity
                                            }}
                                        >
                                            "La jeunesse est la force vive de notre nation. C’est pourquoi le Grand Prix FONIJ 2025 s’inscrit pleinement dans cette dynamique. Il constitue un cadre structurant et équitable pour encourager l’innovation, valoriser l’initiative et accompagner les projets portés par les jeunes Guinéens.
                                        </motion.p>
                                        
                                        <motion.div 
                                            className="absolute -bottom-10 -right-6 text-6xl text-white/20 font-serif"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ 
                                                duration: 3, 
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                delay: 1.5
                                            }}
                                        >
                                            "
                                        </motion.div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="pt-8 flex items-center gap-3"
                                        variants={fadeIn}
                                    >
                                        <div className="h-10 w-1 bg-white/40 rounded-full"></div>
                                        <div>
                                            <p className="font-bold text-2xl text-white">Keamou Bogola Haba</p>
                                            <p className="text-white/80 text-sm">Ministre de la Jeunesse et des Sports</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                                
                            <motion.div 
                                className="flex items-center gap-4 mt-8 flex-wrap bg-white/80 rounded-lg p-4"
                                variants={fadeIn}
                            >
                                <motion.img
                                    src="https://mjs.gov.gn/file/2022/09/logo-MJS.png"
                                    alt="Ministère de la Jeunesse et des Sports"
                                    className="h-16 w-auto"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Section Objectifs du Grand Prix */}
            <div className="py-16 md:py-24 bg-white relative overflow-hidden">
                {/* Motif de fond */}
                <div className="absolute inset-0 bg-[url('/images/covers/perspective-grid-pattern_1409-1826.avif')] bg-cover bg-top opacity-5"></div>
                
                {/* Formes décoratives */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full filter blur-xl opacity-30"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            y: [0, -30, 0],
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full filter blur-xl opacity-30"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            x: [0, 20, 0],
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1
                        }}
                    />
                </div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div 
                            className="text-center mb-12"
                            variants={fadeIn}
                        >
                            <motion.span 
                                variants={popIn}
                                className="inline-block rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary mb-6 shadow-sm"
                            >
                                NOTRE MISSION
                            </motion.span>
                            
                            <motion.h2 
                                variants={slideInLeft}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                            >
                                Pourquoi le 
                                <motion.span
                                    className="relative mx-2 text-primary"
                                    animate={{ 
                                        textShadow: ["0px 0px 0px rgba(var(--primary), 0)", "0px 0px 5px rgba(var(--primary), 0.3)", "0px 0px 0px rgba(var(--primary), 0)"]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity
                                    }}
                                >
                                    Grand Prix
                                </motion.span>
                                ?
                            </motion.h2>
                            
                            <motion.div 
                                variants={slideInRight}
                                className="mx-auto h-1 w-20 bg-primary mb-8"
                            ></motion.div>
                            
                            <motion.p 
                                variants={fadeIn}
                                className="text-lg text-gray-600 max-w-3xl mx-auto"
                            >
                                Le Grand Prix FONIJ poursuit plusieurs objectifs stratégiques pour le développement économique et social de la Guinée.
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-16"
                            variants={staggerContainer}
                        >
                            {[
                                { 
                                    icon: Award, 
                                    title: "Récompenser les meilleures initiatives jeunes", 
                                    description: "Identifier et valoriser les projets prometteurs portés par la jeunesse guinéenne dans toutes les régions du pays.",
                                    animation: { rotate: [0, 5, 0] },
                                    color: "from-primary to-primary-dark"
                                },
                                { 
                                    icon: BrainCircuit, 
                                    title: "Promouvoir l'innovation locale", 
                                    description: "Encourager les solutions créatives et adaptées aux défis spécifiques de la Guinée pour un développement endogène.",
                                    animation: { scale: [1, 1.1, 1] },
                                    color: "from-secondary to-yellow-600"
                                },
                                { 
                                    icon: Users, 
                                    title: "Valoriser le leadership féminin et inclusif", 
                                    description: "Assurer une représentation équitable des femmes et des personnes en situation de handicap dans l'écosystème entrepreneurial.",
                                    animation: { y: [0, -5, 0] },
                                    color: "from-red-500 to-red-700"
                                },
                                { 
                                    icon: ArrowUpRight, 
                                    title: "Créer une dynamique nationale", 
                                    description: "Fédérer les acteurs publics et privés autour de l'entrepreneuriat jeune pour générer un écosystème favorable à l'innovation.",
                                    animation: { x: [0, 5, 0] },
                                    color: "from-purple-500 to-blue-700"
                                }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex gap-5"
                                    variants={fadeIn}
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    <motion.div 
                                        className="flex-shrink-0"
                                        animate={item.animation}
                                        transition={{ 
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
                                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                                    <item.icon className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                            
                                            {/* Éléments décoratifs autour de l'icône */}
                                            <motion.div 
                                                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow-md"
                                                animate={{ 
                                                    scale: [0, 1, 0],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.5
                                                }}
                                            />
                                            <motion.div 
                                                className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary/70"
                                                animate={{ 
                                                    scale: [0, 1, 0],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.5 + 1
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                    
                                    <div>
                                        <motion.h3 
                                            className="text-xl font-bold mb-3 text-gray-900"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            {item.title}
                                        </motion.h3>
                                        
                                        <motion.p 
                                            className="text-gray-600"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                        >
                                            {item.description}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section modernisée */}
            <div className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/10 mix-blend-multiply filter blur-3xl opacity-70"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 15, 0]
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                    <motion.div 
                        className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-secondary/20 mix-blend-multiply filter blur-3xl opacity-60"
                        animate={{ 
                            scale: [1, 1.3, 1],
                            x: [0, 30, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 2
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div 
                            className="relative bg-gradient-to-br from-primary to-primary-900 rounded-2xl overflow-hidden p-8 md:p-12 shadow-2xl"
                            variants={popIn}
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            {/* Formes et particules décoratives */}
                            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                            
                            <motion.div 
                                className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 filter blur-xl"
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    x: [0, -10, 0],
                                    y: [0, 10, 0]
                                }}
                                transition={{ 
                                    duration: 5, 
                                    repeat: Infinity,
                                    repeatType: "reverse" 
                                }}
                            />
                            
                            <motion.div 
                                className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/20 filter blur-xl"
                                animate={{ 
                                    scale: [1, 1.3, 1],
                                    x: [0, 15, 0],
                                    y: [0, -10, 0]
                                }}
                                transition={{ 
                                    duration: 7, 
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: 1
                                }}
                            />
                            
                            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                                <motion.div 
                                    className="flex-1 text-white"
                                    variants={slideInLeft}
                                >
                                    <motion.div 
                                        className="relative inline-block mb-4"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <motion.span 
                                            className="absolute w-2 h-2 rounded-full bg-secondary top-0 right-0"
                                            animate={{ 
                                                scale: [1, 1.5, 1],
                                                opacity: [0.7, 1, 0.7]
                                            }}
                                            transition={{ 
                                                duration: 2,
                                                repeat: Infinity
                                            }}
                                        />
                                        <motion.h3 
                                            className="text-2xl md:text-3xl font-bold mb-4"
                                            animate={{ 
                                                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"]
                                            }}
                                            transition={{ 
                                                duration: 5,
                                                repeat: Infinity
                                            }}
                                        >
                                            Rejoignez l'aventure FONIJ
                                        </motion.h3>
                                    </motion.div>
                                    
                                    <motion.p 
                                        className="text-white/80 mb-8 text-lg"
                                        variants={fadeIn}
                                    >
                                        Participez à l'édition {currentYear} du Grand Prix et transformez votre idée en une entreprise prospère pour contribuer au développement de la Guinée.
                                    </motion.p>
                                    
                                    <motion.div 
                                        className="flex flex-col sm:flex-row gap-4"
                                        variants={staggerContainer}
                                    >
                                        <motion.div 
                                            variants={fadeIn}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href={route('candidater')}
                                                className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 rounded-xl px-6 py-3 font-medium text-primary border border-white/20 shadow-lg transition-all duration-300"
                                            >
                                                <span>Déposer ma candidature</span>
                                                <motion.span 
                                                    className="transition-transform duration-300"
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{ 
                                                        duration: 1.5, 
                                                        repeat: Infinity,
                                                        repeatType: "loop" 
                                                    }}
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </motion.span>
                                            </Link>
                                        </motion.div>
                                        
                                        <motion.div 
                                            variants={fadeIn}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href={route('programme')}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 px-6 py-3 font-medium text-white hover:bg-white/20 transition-all duration-300"
                                            >
                                                <span>Voir le déroulement</span>
                                                <Rocket className="h-4 w-4" />
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                                
                                <motion.div 
                                    className="flex-shrink-0 w-full md:w-1/3 relative"
                                    variants={slideInRight}
                                >
                                    {/* Effet de brillance autour du logo */}
                                    <motion.div 
                                        className="absolute inset-0 bg-white/20 rounded-full filter blur-xl"
                                        animate={{ 
                                            scale: [0.8, 1.1, 0.8],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{ 
                                            duration: 5,
                                            repeat: Infinity
                                        }}
                                    />
                                    
                                    <motion.img
                                        src="/images/fonij/logo-transparent.png"
                                        alt="Logo FONIJ"
                                        className="w-full h-auto relative z-10"
                                        animate={{ 
                                            y: [0, -10, 0],
                                            rotate: [0, 3, 0]
                                        }}
                                        transition={{ 
                                            duration: 5,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    />
                                    
                                    {/* Étoiles décoratives */}
                                    <motion.div 
                                        className="absolute top-5 right-5"
                                        animate={{ 
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{ 
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: 1
                                        }}
                                    >
                                        <Sparkles className="h-6 w-6 text-yellow-300" />
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="absolute bottom-10 left-5"
                                        animate={{ 
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{ 
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: 0.5
                                        }}
                                    >
                                        <Star className="h-5 w-5 text-yellow-300" />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            
            {/* Styles pour les animations de particules */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
                
                .particle {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    animation: floatParticle 6s ease-in-out forwards;
                }
                
                @keyframes floatParticle {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    20% {
                        opacity: 0.2;
                    }
                    80% {
                        opacity: 0.15;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) translateX(20px) rotate(360deg);
                    }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 8s ease infinite;
                }
                
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </MainLayout>
    );
} 