import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { PhoneCall, ChevronRight, CheckCircle, Trophy, Calendar, MapPin, Clock, Users, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, useRef } from 'react';
import { FONIJ } from '../utils';

interface EditionProps {
    name: string;
    year: number;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
}

interface HomeProps {
    edition: EditionProps | null;
}

export default function Home({ edition }: HomeProps) {
    // Références pour les animations au scroll
    const heroRef = useRef(null);
    
    // Utiliser les dates de l'édition actuelle ou des dates par défaut si non disponibles
    const dateEvenement = edition ? new Date(edition.startDate) : new Date('now');
    const dateFinalEvenement = edition ? new Date(edition.endDate) : new Date('now');
    const dateFinInscriptions = useMemo(() => 
        edition ? new Date(edition.registrationDeadline) : new Date('now'), 
        [edition]
    );
    
    // État pour le compteur
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    
    const membresJuries = [
        { 
            nom_complet: "?", 
            photo: "/images/avatar1.jpg", 
            post:"ADMINSTRATEUR - INCUBA", 
            countrie:"GUINEE", 
            description: "Accueil et enregistrement des participants",
            isPresident: false,
        },
        { 
            nom_complet: "?", 
            photo: "/images/avatar2.jpg", 
            post:"RESPONSABLE IT - CGUITECH", 
            countrie:"GUINEE", 
            description: "Accueil des participants et installation des stands",
            isPresident: false,
        },
        { 
            nom_complet: "?", 
            photo: "/images/avatar1.jpg", 
            post:"COMPTABLE - GUINEE ACCOMPTE", 
            countrie:"GUINEE", 
            description: "Message de bienvenue et introduction du jury",
            isPresident: false,
        },
        { 
            nom_complet: "?", 
            photo: "/images/avatar2.jpg", 
            post:"DIRECTEUR GENERAl - FONIJ", 
            countrie:"GUINEE", 
            description: "Invitation de nos partenaires pour présenter leurs activités",
            isPresident: false,
        },
        { 
            nom_complet: "?", 
            photo: "/images/avatar1.jpg", 
            post:"DIRECTEUR GENERAl - FONIJ", 
            countrie:"GUINEE", 
            description: "Invitation de nos partenaires pour présenter leurs activités",
            isPresident: true,
        },
    ];

    // Calculer le temps restant jusqu'à la fin des inscriptions
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = dateFinInscriptions.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [dateFinInscriptions]);

    // Animation de l'effet de particules flottantes
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

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const heroImage = {
        hidden: { scale: 1.2, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            transition: { 
                duration: 1.2, 
                ease: "easeOut" 
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
    
    const heroTextVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.3
            } 
        }
    };
    
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.5, 
                delay: 0.6 
            } 
        },
        hover: { 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            transition: { 
                type: "spring",
                stiffness: 400,
                damping: 10
            } 
        },
        tap: { 
            scale: 0.98
        }
    };

    // Extraire l'année de l'édition actuelle
    const currentYear = edition ? edition.year : new Date().getFullYear();

    return (
        <MainLayout>
            {/* Hero Section améliorée et responsive avec animations */}
            <motion.div 
                ref={heroRef}
                className="relative w-full bg-primary overflow-hidden" 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Overlay avec dégradé pour un meilleur contraste */}
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                
                {/* Éléments décoratifs - tailles réduites sur mobile */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                    <motion.div 
                        className="absolute top-1/4 left-5 w-12 h-12 sm:w-20 sm:h-20 md:w-40 md:h-40 rounded-full bg-primary/30 blur-xl"
                        variants={fadeIn}
                        animate={{ 
                            x: [0, 10, 0],
                            y: [0, -15, 0],
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    ></motion.div>
                    <motion.div 
                        className="absolute bottom-1/4 right-5 w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full bg-cyan-500/20 blur-xl"
                        variants={fadeIn}
                        animate={{ 
                            x: [0, -10, 0],
                            y: [0, 10, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    ></motion.div>
                    <motion.div 
                        className="absolute top-1/3 right-1/4 w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-yellow-500/10 blur-xl"
                        variants={fadeIn}
                        animate={{ 
                            x: [0, 15, 0],
                            y: [0, 5, 0],
                            scale: [1, 0.9, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ 
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    ></motion.div>
                </div>
                
                {/* Conteneur de particules */}
                <div id="particles-container" className="absolute inset-0 z-10 overflow-hidden pointer-events-none"></div>
                
                {/* Animation subtile au chargement - hauteur adaptée au mobile */}
                <motion.div 
                    className="w-full h-[85vh] sm:h-[90vh] md:min-h-screen max-h-screen overflow-hidden bg-gradient-to-l from-primary-400 to-primary-800"
                    variants={heroImage}
                 >
                   <motion.img 
                        src="/images/fonij/cover_4.png"
                        alt="Grand Prix FONIJ"
                        className="md:hidden sm:block w-full h-full object-cover object-center"
                        loading="eager"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                    />
                    <motion.img 
                        src="/images/fonij/cover_4.png"
                        alt="Grand Prix FONIJ"
                        className="md:block sm:hidden w-full h-full object-contain object-center border-transparent shadoow-none"
                        loading="eager"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                    />
                </motion.div>
                
                {/* Contenu superposé - espacement et taille de texte adaptés */}
                <motion.div 
                    className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-4 md:px-12"
                    variants={staggerContainer}
                 >
                    <div className="max-w-4xl text-center">
                        <motion.h1 
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 md:mb-6 text-shadow-lg drop-shadow-2xl"
                            variants={heroTextVariants}
                        >
                            Grand Prix <motion.span 
                                className="text-yellow-400"
                                animate={{ 
                                    textShadow: [
                                        "0 0 5px rgba(250, 204, 21, 0.5)",
                                        "0 0 15px rgba(250, 204, 21, 0.8)", 
                                        "0 0 5px rgba(250, 204, 21, 0.5)"
                                    ]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                            >FONIJ</motion.span>
                        </motion.h1>
                        <motion.p 
                            className="text-base sm:text-lg md:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto text-shadow-sm drop-shadow-lg"
                            variants={heroTextVariants}
                        >
                            Ton idée mérite d'aller plus loin
                        </motion.p>
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                            variants={fadeInUp}
                        >
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Link
                                    href="/candidater"
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 shadow-lg hover:shadow-xl block w-full sm:w-auto"
                                >
                                    S'inscrire maintenant
                                </Link>
                            </motion.div>
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Link
                                    href={route('about.index')}
                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 block w-full sm:w-auto"
                                >
                                    En savoir plus
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Effet de vague en bas */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,64C672,53,768,75,864,85.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </motion.div>

            {/* Bande d'infos adaptée au mobile avec animations */}
            <motion.div 
                className="relative z-20 mx-2 sm:mx-4 lg:mx-auto -mt-2 sm:mt-0 w-full mx-auto"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className="bg-gradient-fonij hover:bg-primary-900 shadow-md sm:shadow-xl transition-all duration-300 py-2 sm:py-3 md:py-4 text-white rounded-lg sm:rounded-none">
                    <div className="px-3 sm:px-6 lg:px-8">
                        <motion.div 
                            className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="flex items-center space-x-1 sm:space-x-2" variants={fadeInUp}>
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary-light" />
                                <span className="text-[10px] sm:text-xs md:text-sm">{dateEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} - {dateFinalEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                            </motion.div>
                            <motion.div className="flex items-center space-x-1 sm:space-x-2" variants={fadeInUp}>
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary-light" />
                                <span className="text-[10px] sm:text-xs md:text-sm">Conakry, Guinée</span>
                            </motion.div>
                            <motion.div className="flex items-center space-x-1 sm:space-x-2" variants={fadeInUp}>
                                <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary-light" />
                                <span className="text-[10px] sm:text-xs md:text-sm">+1000 Participants</span>
                            </motion.div>
                            <motion.div className="flex items-center space-x-1 sm:space-x-2" variants={fadeInUp}>
                                <Trophy className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary-light" />
                                <span className="text-[10px] sm:text-xs md:text-sm">5 Prix Majeurs</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Section Compteur et Présentation - adaptée au mobile avec animations */}
            <div className="py-12 sm:py-24 bg-white relative overflow-hidden border-b">
                <div className="absolute inset-0 bg-[url('/images/covers/perspective-grid-pattern_1409-1826.avif')] bg-cover bg-no-repeat opacity-10"></div>
                <div className="absolute inset-0 bg-[url('/images/fonij/cover_3.png')] bg-contain bg-left bg-no-repeat opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                        {/* À propos amélioré avec animations */}
                        <div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                <motion.div 
                                    className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                                    variants={slideInLeft}
                                >
                                    ÉDITION {currentYear}
                                </motion.div>
                                <motion.h2 
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
                                    variants={fadeInUp}
                                >
                                    Rejoignez le mouvement de <span className="text-primary">l'innovation entrepreneuriale</span> en Guinée
                                </motion.h2>
                                <motion.div 
                                    className="w-16 sm:w-24 h-1 bg-primary mb-4 sm:mb-8"
                                    variants={slideInLeft}
                                    transition={{ duration: 0.4 }}
                                ></motion.div>
                                <motion.p 
                                    className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed"
                                    variants={fadeInUp}
                                >
                                    Le Grand Prix FONIJ est le rendez-vous incontournable de l'entrepreneuriat jeune en Guinée.
                                    Initié par le Fonds National pour l'Insertion des Jeunes (FONIJ), cet événement distingue et
                                    récompense les initiatives exceptionnelles pour la promotion de l'esprit d'entreprise.
                                </motion.p>
                                <motion.p 
                                    className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed"
                                    variants={fadeInUp}
                                >
                                    Notre objectif est de rassembler les jeunes entrepreneurs, les investisseurs et les décideurs
                                    politiques pour discuter des dernières tendances en matière d'innovation et de développement économique.
                                </motion.p>
                                <motion.div 
                                    className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                                    variants={staggerContainer}
                                >
                                    <motion.div 
                                        className="flex items-center"
                                        variants={fadeInUp}
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 text-primary mr-3 sm:mr-4">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground text-sm sm:text-base">Lieu</h4>
                                            <p className="text-primary-light text-xs sm:text-sm">Conakry, Guinée</p>
                                        </div>
                                    </motion.div>
                                    <motion.div 
                                        className="flex items-center"
                                        variants={fadeInUp}
                                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 text-primary mr-3 sm:mr-4">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground text-sm sm:text-base">Date</h4>
                                            <p className="text-primary-light text-xs sm:text-sm">Du {dateEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au {dateFinalEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Compteur amélioré pour mobile avec animations */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideInRight}
                            className="relative mt-6 sm:mt-0"
                        >
                            <motion.div 
                                className="absolute -top-10 -right-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full opacity-30"
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                            ></motion.div>
                            <motion.div 
                                className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-primary/10 p-6 sm:p-10 relative"
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                    transition: { duration: 0.4 } 
                                }}
                            >
                                <motion.h3 
                                    className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-8"
                                    variants={fadeInUp}
                                >
                                    Candidatures ouvertes
                                </motion.h3>
                                <motion.p 
                                    className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6"
                                    variants={fadeInUp}
                                >
                                    Inscrivez-vous avant le {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </motion.p>
                                <motion.div 
                                    className="grid grid-cols-4 gap-2 sm:gap-4"
                                    variants={staggerContainer}
                                >
                                    {[
                                        { value: timeLeft.days, label: "Jours" },
                                        { value: timeLeft.hours, label: "Heures" },
                                        { value: timeLeft.minutes, label: "Minutes" },
                                        { value: timeLeft.seconds, label: "Secondes" }
                                    ].map((item, index) => (
                                        <motion.div 
                                            key={index}
                                            className="bg-gradient-to-br from-primary/5 to-primary/10 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow text-center"
                                            variants={fadeInUp}
                                            whileHover={{ 
                                                y: -5,
                                                scale: 1.05,
                                                transition: { type: "spring", stiffness: 400, damping: 10 }
                                            }}
                                        >
                                            <motion.div 
                                                className="text-2xl sm:text-4xl font-bold text-primary"
                                                animate={{ scale: item.value === 0 ? [1, 1.2, 1] : 1 }}
                                                transition={{ duration: 0.5, repeat: item.value === 0 ? 1 : 0 }}
                                            >
                                                {item.value.toString().padStart(2, '0')}
                                            </motion.div>
                                            <div className="text-[10px] sm:text-xs font-medium text-primary-dark mt-1 sm:mt-2">{item.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <motion.div variants={fadeInUp}>
                                    <Link
                                        href="/candidater"
                                        className="mt-6 sm:mt-10 flex justify-center w-full px-6 sm:px-8 py-4 sm:py-5 bg-primary hover:bg-primary-dark text-white font-bold text-center rounded-lg shadow-lg focus:outline-none transition-all duration-300"
                                    >
                                        S'inscrire maintenant
                                    </Link>
                                </motion.div>
                                <motion.div 
                                    className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground"
                                    variants={fadeInUp}
                                >
                                    Les candidatures feminines sont vivement encouragées
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                {/* Éléments décoratifs animés */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="absolute -top-10 -right-10 w-40 sm:w-80 h-40 sm:h-80 bg-primary opacity-5 rounded-full"
                        animate={{ 
                            x: [0, -20, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    ></motion.div>
                    <motion.div 
                        className="absolute top-40 left-10 w-20 sm:w-40 h-20 sm:h-40 bg-primary-dark opacity-5 rounded-full"
                        animate={{ 
                            x: [0, 20, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    ></motion.div>
                    <motion.div 
                        className="absolute bottom-20 right-20 w-30 sm:w-60 h-30 sm:h-60 bg-primary-light opacity-5 rounded-full"
                        animate={{ 
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    ></motion.div>
                </div>
            </div>

            {/* Section Catégories du Concours - design modernisé et adapté au mobile */}
            <div className="py-8 sm:py-16 bg-gradient-to-b from-white to-primary/10 relative overflow-hidden">
                <div className="absolute top-20 inset-x-0 h-90 bg-[url('https://img.freepik.com/free-vector/hand-drawn-abstract-outline-background_23-2150715642.jpg?t=st=1742300857~exp=1742304457~hmac=bccdd6664f4e76a1cda416c6cd11ee5497723564fc2afe1818ac23ff1ddd305a&w=1380')] bg-repeat-x opacity-5"></div>
                <div className="absolute bottom-0 inset-x-0 h-90 bg-[url('https://img.freepik.com/free-vector/hand-drawn-abstract-outline-background_23-2150715642.jpg?t=st=1742300857~exp=1742304457~hmac=bccdd6664f4e76a1cda416c6cd11ee5497723564fc2afe1818ac23ff1ddd305a&w=1380')] bg-repeat-x opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-6 sm:mb-10"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                            PARTICIPEZ AU CONCOURS
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                            Catégories du Grand Prix
                        </h2>
                        <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-3 sm:mb-4"></div>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                            Découvrez les différentes catégories pour lesquelles vous pouvez candidater
                        </p>
                    </motion.div>
                    
                    {/* Version tablette/desktop avec carrousel horizontal */}
                    <div className="hidden md:block pb-4 -mx-4 px-4">
                        <div className="flex space-x-4 min-w-max md:grid md:grid-cols-4 md:gap-4 md:min-w-0">
                            {FONIJ.categories.map((category, index) => (
                                <motion.div
                                    key={index}
                                    className="w-64 md:w-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, delay: index * 0.1 }
                                        }
                                    }}
                                >
                                    <div className="h-2 bg-gradient-fonij"></div>
                                    <div className="p-4 sm:p-5">
                                        <div className="flex items-center mb-3">
                                            <div className="bg-primary/10 p-2 rounded-lg inline-flex items-center justify-center w-10 h-10 mr-3">
                                                <category.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <h3 className="text-base font-bold text-foreground">{category.title}</h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                                        <Link href={`${route('categories')}#${category.slug}`} className="inline-flex items-center text-xs sm:text-sm text-primary hover:underline font-medium mt-1">
                                            En savoir plus
                                            <ChevronRight className="h-3 w-3 ml-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Version mobile avec accordéon */}
                    <div className="md:hidden space-y-3">
                        {FONIJ.categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.4, delay: index * 0.1 }
                                    }
                                }}
                            >
                                <motion.div 
                                    className="flex items-center p-3 cursor-pointer relative"
                                    whileTap={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                                    onClick={() => {
                                        const el = document.getElementById(`category-content-${index}`);
                                        const icon = document.getElementById(`category-icon-${index}`);
                                        if (el && icon) {
                                            el.classList.toggle('hidden');
                                            icon.classList.toggle('rotate-180');
                                        }
                                    }}
                                >
                                    <div className="bg-primary/10 p-2 rounded-lg inline-flex items-center justify-center w-8 h-8 mr-2">
                                        <category.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <h3 className="text-sm font-bold text-foreground flex-1">{category.title}</h3>
                                    <ChevronRight id={`category-icon-${index}`} className="h-4 w-4 text-primary transition-transform duration-300" />
                                </motion.div>
                                <div id={`category-content-${index}`} className="hidden px-3 pb-3 pt-0">
                                    <div className="pl-10">
                                        <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
                                        <Link href={`/categories/${category.slug}`} className="inline-flex items-center text-xs text-primary hover:underline font-medium mt-1">
                                            En savoir plus
                                            <ChevronRight className="h-3 w-3 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        <motion.div 
                            className="text-center mt-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/categories" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md text-sm font-medium shadow-sm hover:bg-primary-dark transition-colors">
                                Voir toutes les catégories
                                <ChevronRight className="h-3 w-3 ml-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Sponsors avec design amélioré pour mobile */}
            <div className="py-10 sm:py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147.avif')] opacity-5"></div>
                <div className="absolute inset-0 top-0 bg-[url('/images/covers/flat-black-white-halftone-background_23-2150550147-2.png')] bg-top opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-8 sm:mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            ILS NOUS SOUTIENNENT
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                            Nos Partenaires
                        </h2>
                        <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
                        <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
                            Ils sont déjà à nos côtés pour soutenir l'entrepreneuriat jeune en Guinée.
                            Et si vous rejoigniez, vous aussi, cette dynamique nationale en faveur de l'innovation et de l'avenir ?
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-8">
                        {FONIJ.partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-2xl overflow-hidden relative group"
                                whileHover={{ 
                                    y: -5, 
                                    scale: 1.03,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        transition: { delay: index * 0.05, duration: 0.3 } 
                                    }
                                }}
                            >
                                {/* Accent coloré au hasard en haut */}
                                <div className={`h-3 w-full bg-gradient-to-br from-primary-400 to-primary-900 transition-all duration-300 ease-in-out'
                                }`}></div>
                                
                                <div className="p-4 flex flex-col items-center justify-center">
                                    {/* Logo avec légère animation au survol */}
                                    <div className="h-10 md:h-14 flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform">
                                        <img 
                                            src={partner.image} 
                                            alt={partner.name}
                                            className="max-h-full max-w-full object-contain shadow-md" 
                                        />
                                    </div>
                                    
                                    {/* Nom du partenaire qui s'affiche avec transition au survol */}
                                    <div className="text-xs sm:text-sm font-medium text-center text-primary group-hover:text-primary-dark transition-colors">
                                        {partner.name}
                                    </div>
                                </div>
                                
                                {/* Overlay de brillance au survol */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/60 via-transparent to-transparent transition-opacity pointer-events-none"></div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* CTA pour inciter d'autres sponsors à s'associer */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }
                        }}
                        className="mt-12 sm:mt-16 bg-gradient-to-br from-transparent to-black/50 rounded-xl p-6 sm:p-10 text-center shadow-md"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                            Vous souhaitez vous associer au Grand Prix FONIJ 2025 ?
                        </h3>
                        <p className="text-sm sm:text-base text-black mb-6 max-w-2xl mx-auto">
                            Rejoignez nos partenaires et contribuez activement à faire émerger les talents de demain.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                            {FONIJ.contactInfo.unespace_phones.map((phone, index) => (

                                <motion.a
                                    href={`tel:${phone.unespace_phone}`}
                                    key={index}
                                    className="flex items-center w-full p-2 justify-center bg-primary/10 text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <PhoneCall className="h-4 w-4 mr-2 text-black" />
                                    {phone.phone}
                                </motion.a>
                            ))}
                        </div>
                        <motion.a
                            href={`mailto:${FONIJ.contactInfo.email}`}
                            className="inline-flex items-center w-full justify-center px-5 sm:px-6 py-3 sm:py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-xl"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Mail className="h-4 w-4 mr-2 text-black" />
                            {FONIJ.contactInfo.email}
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Jury avec design amélioré pour mobile */}
            <div className="py-10 sm:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/circuit-pattern.jpg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-8 sm:mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            PANEL D'EXPERTS
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                            Membres du Jury
                        </h2>
                        <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
                        <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
                            Le jury sera composé de personnalités reconnues pour leur expertise, leur rigueur et leur engagement envers la jeunesse.
                        </p>
                    </motion.div>
                    {/* Section Président du Jury - Design Premium */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-12 sm:mb-20"
                    >
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <Trophy className="h-4 w-4 mr-2" />
                                PRÉSIDENT DU JURY
                            </div>
                        </div>

                        {membresJuries.filter(item => item.isPresident).map((item, index) => (
                            <motion.div
                                key={index}
                                className="max-w-4xl mx-auto"
                                whileHover={{ scale: 1.02 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.8, delay: 0.2 }
                                    }
                                }}
                            >
                                <div className="bg-gradient-to-br from-white via-white to-primary/5 rounded-3xl shadow-2xl overflow-hidden border border-primary/10 relative">
                                    {/* Badge Président */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            PRÉSIDENT
                                        </div>
                                    </div>

                                    {/* Contenu Principal */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative h-80 sm:h-96 lg:h-full overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"></div>
                                            <img
                                                src={item.photo}
                                                alt={`Président du jury ${item.nom_complet}`}
                                                className="w-full h-full object-cover transition-transform duration-700 transform hover:scale-110"
                                            />
                                            {/* Overlay décoratif */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                        </div>

                                        {/* Informations */}
                                        <div className="p-8 sm:p-12 flex flex-col justify-center">
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4, duration: 0.6 }}
                                            >
                                                <div className="mb-6">
                                                    <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                                                        {item.nom_complet}
                                                    </h3>
                                                    {/* <p className="text-primary font-semibold text-lg mb-1">{item.post}</p> */}
                                                    <div className="flex items-center text-muted-foreground">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        <span>{item.countrie}</span>
                                                    </div>
                                                </div>

                                                <div className="w-16 h-1 bg-gradient-to-r from-primary to-yellow-400 mb-6"></div>

                                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Section Membres du Jury - Grid Moderne */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <div className="text-center mb-8 sm:mb-12">
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                Membres du Jury
                            </h3>
                            <div className="w-16 h-1 bg-primary mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {membresJuries.filter(item => !item.isPresident).map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
                                    whileHover={{ 
                                        y: -15,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, delay: index * 0.1 }
                                        }
                                    }}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 sm:h-72 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <img
                                            src={item.photo}
                                            alt={`Membre du jury ${item.nom_complet}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        
                                        {/* Badge Membre */}
                                        <div className="absolute top-3 right-3 z-20">
                                            <div className="bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded-full text-xs font-medium">
                                                Jury
                                            </div>
                                        </div>

                                        {/* Overlay Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h4 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {item.nom_complet}
                                        </h4>
                                        {/* <p className="text-primary font-medium text-sm mb-2">{item.post}</p> */}
                                        <div className="flex items-center text-muted-foreground text-xs">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {/* <span>{item.countrie}</span> */}
                                        </div>

                                        {/* Progress Bar Animation */}
                                        <div className="mt-4 h-1 bg-gray-100 rounded overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-colors duration-300"></div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Message complémentaire */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-center mt-12 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/10"
                        >
                            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                                Notre jury d'exception rassemble des experts reconnus dans leurs domaines respectifs, 
                                garantissant une évaluation rigoureuse et équitable de tous les projets entrepreneuriaux.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Agenda modernisé et adapté au mobile */}
            {/* <div id="agenda" className="py-10 sm:py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-8 sm:mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            PROGRAMME
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                            Agenda Grand Prix FONIJ {currentYear}
                        </h2>
                        <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
                        <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
                            Découvrez le programme complet de l'événement sur deux jours
                        </p>
                    </motion.div>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100">
                        <div className="flex border-b">
                            <button className="flex-1 py-3 sm:py-5 font-medium text-center text-sm sm:text-base bg-primary text-background">JOUR 1</button>
                            <button className="flex-1 py-3 sm:py-5 font-medium text-center text-sm sm:text-base text-muted-foreground hover:bg-muted">JOUR 2</button>
                        </div>
                        <div className="p-4 sm:p-8">
                            {[
                                { time: "08h00 - 09h00", event: "Arrivée des invités & Check-in", description: "Accueil et enregistrement des participants" },
                                { time: "09h00 - 09h30", event: "Bienvenue/Installation", description: "Accueil des participants et installation des stands" },
                                { time: "10h00 - 10h15", event: "Discours de Bienvenue", description: "Message de bienvenue et introduction du jury" },
                                { time: "10h15 - 10h45", event: "Keynotes de nos Partenaires", description: "Invitation de nos partenaires pour présenter leurs activités" },
                                { time: "11h00 - 12h00", event: "Panel 1 : Vue globale de l'Écosystème Entrepreneurial Guinéen", description: "Discussion sur l'écosystème entrepreneurial en Guinée" },
                                { time: "12h00 - 13h00", event: "Pause Déjeuner Visite Officielle des Stands", description: "Pause déjeuner et visite des stands des partenaires" },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row py-3 sm:py-4 border-b border-gray-100 last:border-0">
                                    <div className="w-full sm:w-36 font-medium text-primary text-sm sm:text-base mb-1 sm:mb-0">{item.time}</div>
                                    <div className="flex-1 text-foreground text-sm sm:text-base">{item.event}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Programme d'Accélération - adapté au mobile */}
            <div className="py-10 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-16">
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            ACCOMPAGNEMENT
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                            Programme d'Accélération
                        </h2>
                        <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
                        <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
                            Un accompagnement complet en trois phases pour assurer le succès de votre projet entrepreneurial
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                        {FONIJ.programmes.map((phase, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-5 sm:p-8 relative"
                                whileHover={{ y: -10 }}
                            >
                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary/10 text-primary rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-4 flex items-center">
                                    <span className="text-primary">{phase.title}</span>
                                </h3>
                                <div className="flex items-center mb-3 sm:mb-4 text-xs sm:text-sm text-primary-dark">
                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    <span>Durée : {phase.duration}</span>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{phase.description}</p>
                                <ul className="space-y-2 mb-4 sm:mb-6">
                                    {phase.features.map((step, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground text-sm sm:text-base">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                                    <Link href={`${route('accompagnement')}#${phase.slug}`} className="inline-flex items-center text-primary hover:text-primary-dark text-sm sm:text-base">
                                        Détails du programme
                                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section CTA - adaptée au mobile */}
            <div className="relative bg-gradient-to-b from-primary-500 to-black py-10 sm:py-20">
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 sm:w-64 h-32 sm:h-64 bg-white/30 rounded-full"></div>
                    <div className="absolute top-20 left-90 w-32 sm:w-64 h-32 sm:h-64 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-0 left-5 w-16 sm:w-32 h-16 sm:h-32 bg-white/30 rounded-full"></div>
                </div>
                
                <div className="absolute inset-0 bg-grid-white/[0.5] bg-[length:16px_16px]" />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                            Souhaitez-vous participer au Grand Prix FONIJ ?
                        </h2>
                        <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-10 px-2">
                            Rejoignez la communauté des entrepreneurs innovants et contribuez au développement de la Guinée.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link
                                href="/candidater"
                                className="inline-flex justify-center items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-lg sm:rounded-xl text-primary bg-background hover:bg-primary/10 transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl w-full sm:w-auto"
                            >
                                Déposer ma candidature
                                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex justify-center items-center px-6 sm:px-8 py-3 sm:py-4 border border-background text-base sm:text-lg font-medium rounded-lg sm:rounded-xl text-white hover:bg-background/10 transition-all duration-300 w-full sm:w-auto"
                            >
                                Nous contacter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

         
{/* Animations et autres styles CSS */}
<style>
    {`
    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeIn {
        animation: fadeIn 1.2s ease-out forwards;
    }

    .animation-delay-300 {
        animation-delay: 300ms;
    }

    .text-shadow-sm {
        text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }

    .text-shadow-lg {
        text-shadow: 0 2px 4px rgba(0,0,0,0.6);
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