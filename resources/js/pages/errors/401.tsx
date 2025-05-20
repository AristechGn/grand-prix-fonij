import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ChevronRight, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Error401() {
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

    // Effet de particules flottantes
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

    return (
        <MainLayout>
            {/* Hero Section */}
            <motion.div 
                className="relative w-full bg-primary overflow-hidden min-h-[85vh]" 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Overlay avec dégradé pour un meilleur contraste */}
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/fonij/cover_3.png')] bg-cover bg-center bg-no-repeat opacity-10"></div>
                
                {/* Éléments décoratifs */}
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
                        className="absolute bottom-1/4 right-5 w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full bg-orange-500/20 blur-xl"
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
                </div>
                
                {/* Conteneur de particules */}
                <div id="particles-container" className="absolute inset-0 z-10 overflow-hidden pointer-events-none"></div>
                
                {/* Contenu */}
                <motion.div 
                    className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-4 md:px-12"
                    variants={staggerContainer}
                >
                    <div className="max-w-4xl text-center">
                        <motion.div 
                            className="mb-6 sm:mb-8 inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-500/50 backdrop-blur-sm"
                            variants={fadeInUp}
                        >
                            <UserX className="h-12 w-12 sm:h-16 sm:w-16 text-white" strokeWidth={1.5} />
                        </motion.div>
                        
                        <motion.h1 
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-shadow-lg drop-shadow-2xl"
                            variants={fadeInUp}
                        >
                            401
                        </motion.h1>
                        
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-shadow-sm drop-shadow-lg"
                            variants={fadeInUp}
                        >
                            Non Autorisé
                        </motion.h2>
                        
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto text-shadow-sm drop-shadow-lg"
                            variants={fadeInUp}
                        >
                            Vous devez vous authentifier pour accéder à cette ressource.
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                            variants={fadeInUp}
                        >
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Link
                                    href={route('login')}
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 shadow-lg hover:shadow-xl block w-full sm:w-auto"
                                >
                                    Se connecter
                                </Link>
                            </motion.div>
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Link
                                    href="/"
                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 block w-full sm:w-auto"
                                >
                                    Retour à l'accueil
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
        </MainLayout>
    );
} 