import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, ChevronRight, CheckCircle, Clock, Users, MapPin, Trophy, Target, Sparkles, Zap, BookOpen, Award, Info, Star, BarChart, ArrowRight, Rocket, Lightbulb } from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { FONIJ } from '@/utils';

const testimonials = [
    {
        name: "Marie Camara",
        role: "Fondatrice de TechSolutions",
        quote: "Le programme SMART Entrepreneur m'a donné les outils nécessaires pour structurer mon business plan et obtenir mon premier financement.",
        avatar: "https://img.freepik.com/free-photo/portrait-smiling-young-woman-looking-camera_23-2148255245.jpg?t=st=1742318820~exp=1742322420~hmac=cd28b0aeb4fbbf547bd6c1a9fbd55e64d44a1da1e5beca7c0e3fa4536ce6379b&w=740"
    },
    {
        name: "Ibrahim Diallo",
        role: "Fondateur de AgriTech",
        quote: "Youth'Incuba m'a permis de valider mon concept avant de me lancer. Les mentors ont été d'une aide précieuse pour affiner mon modèle économique.",
        avatar: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?t=st=1742318860~exp=1742322460~hmac=9a647c465526ce644d70e0b012cd9e3cf86b63d4bdcc238e76d7b27b46a09964&w=740"
    },
    {
        name: "Sophie Bakayoko",
        role: "CEO de EduLearn",
        quote: "Boost Entrepreneurs a transformé ma vision de l'entreprise. J'ai réussi à développer mon activité et à doubler mon chiffre d'affaires en un an.",
        avatar: "https://img.freepik.com/free-photo/successful-african-american-woman-smiling-pretty-female-with-arms-crossed-smile-looking-side-portrait-entrepreneur-white-background_176420-33775.jpg?t=st=1742318841~exp=1742322441~hmac=a99ba8df90b35dd08fc59fc1e0ce35c41d5bd55f1ad24e6e1ebf3dacd0cdcbff&w=740"
    }
];


interface EditionProps {
    name: string;
    year: number;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
}

interface AccompagnementProps {
    edition: EditionProps | null;
}


// Composant pour les particules flottantes
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

export default function Accompagnement({ edition }: AccompagnementProps) {
    // Références pour les animations avec parallaxe
    const heroRef = useRef(null);
    const aboutRef = useRef(null);

    
    const dateFinInscriptions = useMemo(() => 
        edition ? new Date(edition.registrationDeadline) : new Date(), 
        [edition]
    );

    console.log("dateFinInscriptions", dateFinInscriptions);
    console.log("now", new Date());
    
    // Animation scroll parallaxe
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    
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
    
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    
    const slideInLeft = {
        hidden: { x: -60, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };
    
    const slideInRight = {
        hidden: { x: 60, opacity: 0 },
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
                damping: 20 
            } 
        }
    };

    // État pour le compteur d'intérêt
    const [participants, setParticipants] = useState({
        count: 0,
        target: 250
    });

    // Animation du compteur
    useEffect(() => {
        const interval = setInterval(() => {
            setParticipants(prev => {
                if (prev.count >= prev.target) {
                    clearInterval(interval);
                    return prev;
                }
                const increment = Math.ceil((prev.target - prev.count) / 10);
                return { ...prev, count: prev.count + increment };
            });
        }, 80);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <MainLayout>
            {/* Hero Section avec effet de parallaxe et animation de particules */}
            <div ref={heroRef} className="relative bg-gradient-to-tr from-primary-900/80 via-black/80 to-black/20 min-h-[85vh] overflow-hidden">
                {/* Overlay de motifs */}
                <div className="absolute inset-0 bg-[url('/images/accompagnement/cover.jpg')] bg-cover bg-no-repeat opacity-85 mix-blend-overlay"></div>
                
                {/* Éléments décoratifs et particules */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="absolute -top-10 -right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            repeatType: "reverse"
                        }}
                    />
                    <motion.div 
                        className="absolute top-1/2 -left-20 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            x: [0, 20, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{ 
                            duration: 10, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-20 right-10 w-56 h-56 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                        animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 10, 0],
                        }}
                        transition={{ 
                            duration: 12, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 2
                        }}
                    />
                </div>
                
                <FloatingParticles />
                
                {/* Contenu Hero avec animation de texte */}
                <div className="container mx-auto px-4 md:px-8 h-full relative z-10 py-20 md:py-32">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto text-center"
                        style={{ y, opacity }}
                    >
                        <motion.span 
                            variants={popIn}
                            className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-lg text-white text-sm font-semibold mb-6 border border-white/20"
                        >
                            DÉVELOPPEZ VOTRE ENTREPRISE
                        </motion.span>
                        
                        <motion.h1 
                            variants={slideInLeft}
                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
                        >
                            Programmes d'Accélération 
                            <span className="relative">
                                <span className="relative z-10 bg-gradient-to-r from-secondary via-secondary-300 to-secondary-100 text-transparent bg-clip-text"> FONIJ</span>
                                <motion.span 
                                    className="absolute -top-1 -right-2 text-secondary"
                                    animate={{ 
                                        opacity: [0, 1, 0],
                                        scale: [0.8, 1.2, 0.8],
                                        rotate: [0, 15, 0]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        delay: 2
                                    }}
                                >
                                    <Sparkles className="w-6 h-6" />
                                </motion.span>
                            </span>
                        </motion.h1>
                        
                        <motion.p 
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light"
                        >
                            Accompagner les jeunes vers le succès entrepreneurial.
                            Un parcours complet pour transformer votre idée en une entreprise solide et durable.
                        </motion.p>
                        
                        <motion.div 
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row justify-center gap-5 mt-8"
                        >                            
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link 
                                    href="/contact"
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                                >
                                    Nous contacter
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    
                    {/* Flèche indiquant de scrolldown */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
                    >
                        <motion.div 
                            className="flex flex-col items-center cursor-pointer hover:text-white transition-all duration-300"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                repeatType: "reverse" 
                            }}
                            onClick={() => {
                                const programsSection = document.getElementById('programmes');
                                if (programsSection) {
                                    programsSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className="text-white/70 text-sm mb-2 group-hover:text-white">Découvrir</span>
                            <ChevronRight className="h-6 w-6 text-white/70 transform rotate-90" />
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Vague en bas */}
                <div className="absolute -bottom-1 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,64C672,53,768,75,864,85.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>
            </div>

            {/* Bande d'infos interactive avec animations */}
            <div className="bg-primary shadow-lg py-6 -mt-1 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { icon: Calendar, text: "3 à 12 mois d'accompagnement", animation: { rotate: [0, 5, 0] } },
                            { icon: MapPin, text: "Conakry, Palais du Peuple", animation: { y: [0, -6, 0] } },
                            { icon: Trophy, text: "3 Parcours spécialisés", animation: { x: [0, 5, 0, -5, 0] } }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex justify-center"
                            >
                                <div className="flex items-center space-x-2 md:space-x-3">
                                    <motion.div
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white"
                                        animate={item.animation}
                                        transition={{ 
                                            duration: 2.5,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <item.icon className="h-5 w-5" />
                                    </motion.div>
                                    <span className="text-xs md:text-sm text-white">{item.text}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section présentation et compteur */}
            <div ref={aboutRef} className="relative py-24 bg-white overflow-hidden border-b border-gray-100">
                {/* Fond avec motif et effet de parallaxe */}
                <div className="absolute inset-0 bg-[url('/images/circuit-pattern.jpg')] bg-cover bg-no-repeat opacity-5"></div>
                
                {/* Éléments décoratifs avec animation */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-10"
                        animate={{ 
                            y: [0, -30, 0],
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-full opacity-10"
                        animate={{ 
                            x: [0, 20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1 
                        }}
                    />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* À propos avec animations */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeIn} className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-6">
                                POURQUOI NOUS REJOINDRE
                            </motion.div>
                            
                            <motion.h2 
                                variants={slideInLeft}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
                            >
                                Développez votre projet avec un <span className="text-primary relative">
                                    accompagnement d'excellence
                                    <motion.div 
                                        className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </span>
                            </motion.h2>
                            
                            <motion.p 
                                variants={fadeInUp}
                                className="text-lg text-gray-700 mb-6 leading-relaxed"
                            >
                                Les programmes d'accélération du FONIJ offrent aux entrepreneurs guinéens un parcours structuré pour développer
                                leur projet, de l'idée jusqu'à la croissance. Notre approche combine formation, mentorat et réseautage.
                            </motion.p>
                            
                            <motion.p 
                                variants={fadeInUp}
                                className="text-lg text-gray-700 mb-8 leading-relaxed"
                            >
                                Chaque participant bénéficie d'un suivi personnalisé, d'ateliers pratiques et d'un accès privilégié à un réseau
                                d'experts et d'investisseurs locaux et internationaux.
                            </motion.p>
                            
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                                variants={staggerContainer}
                            >
                                {[
                                    { 
                                        icon: Target, 
                                        title: "Objectif", 
                                        description: "Pérennisation des entreprises",
                                        color: "bg-gradient-to-r from-primary-500 to-primary-600"
                                    },
                                    { 
                                        icon: Sparkles, 
                                        title: "Bénéfice", 
                                        description: "Taux de réussite de 87%",
                                        color: "bg-gradient-to-br from-secondary-500 to-secondary-200"
                                    }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={popIn}
                                        className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                                        whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                                    >
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${item.color} text-white mr-4 shadow-md`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Compteur d'intérêt avec animations modernes */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideInRight}
                            className="relative"
                        >
                            {/* Élément décoratif arrière-plan */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-300 -translate-x-4 -translate-y-4 translate-z-0 transform rotate-6 scale-105"></div>
                            
                            <motion.div 
                                className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10 relative z-10"
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                                <div className="absolute top-6 right-6">
                                    <motion.div
                                        className="bg-primary/10 p-3 rounded-full"
                                        animate={{ 
                                            rotate: [0, 360],
                                            scale: [1, 1.05, 1] 
                                        }}
                                        transition={{ 
                                            duration: 10, 
                                            repeat: Infinity,
                                            repeatType: "loop" 
                                        }}
                                    >
                                        <Target className="w-6 h-6 text-primary" />
                                    </motion.div>
                                </div>
                                
                                <motion.h3 
                                    className="text-3xl font-bold text-gray-900 mb-8"
                                    variants={fadeInUp}
                                >
                                    Rejoignez notre communauté
                                </motion.h3>
                                
                                <motion.div 
                                    className="mb-10"
                                    variants={fadeInUp}
                                >
                                    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                        <motion.div 
                                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(participants.count / participants.target) * 100}%` }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                        >
                                            {/* Effet de brillance */}
                                            <motion.div 
                                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-30" 
                                                animate={{ x: [-100, 400] }}
                                                transition={{ 
                                                    duration: 2.5, 
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    repeatDelay: 1
                                                }}
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="text-center mb-10"
                                    variants={popIn}
                                >
                                    <div className="inline-flex items-center bg-gradient-to-r from-primary/20 to-secondary/20 px-8 py-5 rounded-xl">
                                        <div>
                                            <p className="text-gray-600 font-medium">Valorise ton projet d'entreprise</p>
                                        </div>
                                    </div>
                                </motion.div>
                                {dateFinInscriptions < new Date() ? (
                                    <>
                                        <motion.div variants={fadeInUp}>
                                            <Link
                                                href="/inscription"
                                                className="group relative inline-flex w-full items-center justify-center px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                            >
                                                {/* Effet d'éclat au survol */}
                                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                                                
                                                <span className="relative flex items-center">
                                                    S'inscrire maintenant
                                                    <motion.span 
                                                        className="ml-2"
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ 
                                                            duration: 1.5, 
                                                            repeat: Infinity,
                                                            repeatType: "loop" 
                                                        }}
                                                    >
                                                        <ArrowRight className="h-5 w-5" />
                                                    </motion.span>
                                                </span>
                                            </Link>
                                        </motion.div>

                                        <motion.div 
                                            variants={fadeIn}
                                            className="mt-6 text-center text-sm text-gray-500"
                                        >
                                            Inscriptions ouvertes jusqu'au {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </motion.div>
                                        </>
                                ) : (
                                    <motion.div variants={fadeInUp}>
                                        <p className="text-gray-600 font-medium">Inscriptions fermées</p>
                                    </motion.div>
                                )}
                                
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Programmes Cards */}
            <div id="programmes" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
                {/* Effet de motif arrière-plan */}
                <div className="absolute inset-0 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147.avif')] opacity-5"></div>
                <div className="absolute top-20 inset-x-0 h-60 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147-2.png')] bg-top opacity-5"></div>
                
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full filter blur-3xl opacity-30"
                        animate={{ 
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full filter blur-3xl opacity-30"
                        animate={{ 
                            x: [0, -40, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 2
                        }}
                    />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div 
                            variants={fadeInUp}
                            className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-6"
                        >
                            NOS PROGRAMMES
                        </motion.div>
                        
                        <motion.h2 
                            variants={fadeInUp}
                            className="text-4xl font-bold text-gray-900 mb-6"
                        >
                            Choisissez votre parcours 
                            <span className="relative ml-2">
                                <span className="relative z-10 text-primary">d'accélération</span>
                                <motion.svg 
                                    className="absolute -bottom-2 left-0 w-full"
                                    width="100%" 
                                    height="8" 
                                    viewBox="0 0 100 8" 
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <motion.path 
                                        d="M0,4 Q25,0 50,4 T100,4" 
                                        stroke="currentColor" 
                                        strokeWidth="3" 
                                        fill="none" 
                                        className="text-primary"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </motion.svg>
                            </span>
                        </motion.h2>
                        
                        <motion.p 
                            variants={fadeInUp}
                            className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
                        >
                            Découvrez les différents programmes conçus pour accompagner chaque étape 
                            de votre développement entrepreneurial
                        </motion.p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {FONIJ.programmes.map((programme, index) => (
                        <motion.div
                            key={programme.slug}
                            className="relative group"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.7, delay: index * 0.2 }
                                }
                            }}
                        >
                            {/* Effet d'arrière plan avec rotation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-blue-500/5 rounded-2xl -z-10 transform rotate-2 scale-[1.03] transition-all duration-300 opacity-50 group-hover:rotate-3 group-hover:scale-[1.05]"></div>
                            
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col transform group-hover:-translate-y-2">
                                {/* Image d'en-tête améliorée */}
                                <div className="relative h-48 overflow-hidden">
                                    {/* Image avec gestion d'erreur et loading */}
                                    <div className="relative w-full h-full">
                                        <img 
                                            src={programme.image} 
                                            alt={programme.title}
                                            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                e.currentTarget.src = 'https://via.placeholder.co/600x400/4F46E5/FFFFFF?text=' + encodeURIComponent(programme.title);
                                            }}
                                        />
                                        
                                        {/* Overlay graduel amélioré */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Badge de statut */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                                Disponible
                                            </div>
                                        </div>
                                        
                                        {/* Contenu superposé */}
                                        <div className="absolute inset-0 flex items-end">
                                            <div className="p-6 w-full">
                                                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                                                    {programme.title}
                                                </h3>
                                                <div className="flex items-center space-x-2">
                                                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white flex items-center border border-white/20">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {programme.duration}
                                                    </div>
                                                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20">
                                                        <Users className="w-3 h-3 mr-1" />
                                                        12 places
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 pt-5 flex-1 flex flex-col">
                                    {/* Icône flottante améliorée */}
                                    <div className="absolute -mt-12 ml-3">
                                        <motion.div 
                                            className={`p-3 rounded-xl shadow-lg inline-flex items-center justify-center bg-gradient-to-br ${programme.color} text-white border-2 border-white`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <programme.icon className="w-6 h-6" />
                                        </motion.div>
                                    </div>
                                    
                                    <div className="mb-4 pt-6">
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                            {programme.description.split('.')[0]}.
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6 flex-1">
                                        {programme.features.slice(0, 3).map((feature, i) => (
                                            <motion.div 
                                                key={i} 
                                                className="flex items-start"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <div className="flex-shrink-0 pt-1">
                                                    <motion.div 
                                                        className="w-5 h-5 rounded-full border-2 border-green-500/30 flex items-center justify-center bg-green-50"
                                                        whileHover={{ scale: 1.2, borderColor: "rgb(34 197 94)" }}
                                                    >
                                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                                    </motion.div>
                                                </div>
                                                <span className="text-gray-700 text-sm ml-3 leading-relaxed">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    
                                    {/* Bouton d'action */}
                                    <motion.button
                                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r ${programme.color} hover:shadow-lg transition-all duration-300`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        En savoir plus
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                </div>
            </div>

            {/* Comment ça marche */}
            <div className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            MÉTHODOLOGIE
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Comment fonctionnent nos programmes
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Une approche structurée en 4 phases pour maximiser vos chances de réussite
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[
                            { 
                                number: "01", 
                                title: "Diagnostic", 
                                description: "Évaluation approfondie de votre projet et identification des besoins spécifiques",
                                icon: <Info className="h-8 w-8 text-background" />,
                                color: "bg-gradient-fonij"
                            },
                            { 
                                number: "02", 
                                title: "Formation", 
                                description: "Ateliers pratiques et séminaires théoriques adaptés à votre niveau et à votre secteur",
                                icon: <BookOpen className="h-8 w-8 text-background" />,
                                color: "bg-gradient-fonij"
                            },
                            { 
                                number: "03", 
                                title: "Mentorat", 
                                description: "Accompagnement individuel par des experts et entrepreneurs expérimentés",
                                icon: <Users className="h-8 w-8 text-background" />,
                                color: "bg-gradient-fonij"
                            },
                            { 
                                number: "04", 
                                title: "Networking", 
                                description: "Mise en relation avec des partenaires, investisseurs et autres entrepreneurs",
                                icon: <Target className="h-8 w-8 text-background" />,
                                color: "bg-gradient-fonij"
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-xl ${step.color} flex items-center justify-center text-background shadow-lg`}>
                                    {step.icon}
                                </div>
                                <div className="bg-background rounded-xl shadow-md p-6 pl-16 pt-14 border border-border">
                                    <div className="text-sm text-muted-foreground mb-2">{step.number}</div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 left-full w-12 h-2 -translate-y-1/2 -translate-x-6">
                                        <div className="w-full h-0.5 bg-border relative">
                                            <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-border transform rotate-45"></div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section moderne et interactive */}
            <div className="relative py-20 overflow-hidden">
                {/* Background avec gradient et motif */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
                
                {/* Particules animées */}
                <FloatingParticles />
                
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 mix-blend-overlay filter blur-3xl"
                        animate={{ 
                            scale: [1, 1.5, 1],
                            x: [0, 30, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ 
                            duration: 12, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary/20 mix-blend-overlay filter blur-3xl"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, -20, 0],
                            y: [0, 20, 0]
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1
                        }}
                    />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
                        {/* Contenu texte */}
                        <motion.div 
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h2 
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Rejoignez le Mouvement
                                <motion.span
                                    className="inline-block ml-2"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    <Rocket className="inline-block h-7 w-7 text-secondary" />
                                </motion.span>
                            </motion.h2>
                            
                            <motion.p 
                                className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Vous avez une idée, un rêve, ou un projet ? C'est le moment. 
                                Transformez votre vision en impact réel et rejoignez notre 
                                communauté d'entrepreneurs innovants.
                            </motion.p>
                            
                            <motion.div 
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/candidater"
                                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                                    >
                                        {/* Effet de brillance au survol */}
                                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                                        
                                        <span className="relative flex items-center">
                                            Postulez maintenant
                                            <motion.span 
                                                className="ml-2"
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ 
                                                    duration: 1.5, 
                                                    repeat: Infinity,
                                                    repeatType: "loop" 
                                                }}
                                            >
                                                <ArrowRight className="h-5 w-5" />
                                            </motion.span>
                                        </span>
                                    </Link>
                                </motion.div>
                                
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        En savoir plus
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        
                        {/* Image/Carte flottante */}
                        <motion.div 
                            className="lg:w-1/2 flex justify-center lg:justify-end"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div 
                                className="relative max-w-md"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ 
                                    duration: 5, 
                                    repeat: Infinity,
                                    repeatType: "reverse" 
                                }}
                            >
                                {/* Carte principale */}
                                <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <Star className="h-7 w-7 text-primary mr-2" />
                                                <h3 className="text-xl font-bold text-gray-900">Avantages</h3>
                                            </div>
                                            <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                                PREMIUM
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {["Mentorat personnalisé", "Réseautage stratégique", "Accès aux financements"].map((avantage, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-3 flex-shrink-0">
                                                        <CheckCircle className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-700">{avantage}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Prochaine session</h4>
                                        <div className="flex items-center text-primary mb-1">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span className="text-sm">Début: 15 Octobre 2025</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-4">
                                            Places limitées à 50 participants
                                        </div>
                                        <div className="flex justify-center">
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <Link
                                                    href="/inscription"
                                                    className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 w-full"
                                                >
                                                    Réservez votre place
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Éléments décoratifs derrière la carte */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-sm transform rotate-3 scale-105 -z-10"></div>
                                <div className="absolute inset-0 bg-white/50 rounded-2xl blur-md transform -rotate-2 scale-105 -z-20 opacity-50"></div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Styles CSS additionnels pour les animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
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
            `}</style>
        </MainLayout>
    );
} 
