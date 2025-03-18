import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Trophy, Rocket, Award, ChevronRight, Pause, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { LucideIcon } from 'lucide-react';
import type { Swiper as SwiperRef } from 'swiper/types';

// Ajout des types pour les slides
// interface Slide {
//     title: string;
//     subtitle: string;
//     description: string;
//     image: string;
//     buttonText: string;
//     buttonLink: string;
//     icon: LucideIcon;
// }

// interface HeroProps {
//     slides: Slide[];
// }

const Hero = () => {
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const swiperRef = useRef<SwiperRef>(null);
    const autoplayDuration = 3000;
    const slides = [
        {
            // title: "Mamadi Doubouya, Président",
            subtitle: "Leader Visionnaire",
            description: "Mamadi Doubouya, en tant que président, a su guider la Guinée vers une ère de prospérité et d'innovation. Son leadership exemplaire et son engagement envers le développement durable ont transformés le paysage entrepreneurial et social de la Guinée.",
            image: "https://mamriguinee.com/images/hero/CoverSite-PRG.jpg",
            buttonText: null,
            buttonLink: null,
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ 2024",
            subtitle: "Édition Spéciale Innovation",
            description: "Participez à la plus grande compétition entrepreneuriale de Guinée et transformez vos idées en succès !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.42.jpeg",
            buttonText: "Je candidate",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Innovez pour la Guinée",
            subtitle: "Programme d'Accompagnement",
            description: "Bénéficiez d'un mentorat personnalisé, d'une formation intensive et d'un financement jusqu'à 500 millions GNF",
            image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.43-1.jpeg",
            buttonText: "Découvrir le programme",
            buttonLink: "/programme",
            icon: Rocket
        },
        {
            title: "Impact & Excellence",
            subtitle: "Catégories Spéciales",
            description: "5 catégories pour valoriser les projets innovants dans l'agriculture, le numérique, l'éducation et plus encore",
            image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.44.jpeg",
            buttonText: "Explorer les catégories",
            buttonLink: "/categories",
            icon: Award
        },
        {
            title: "Rejoignez l'Élite",
            subtitle: "Réseau d'Excellence",
            description: "Intégrez un réseau de plus de 1000 entrepreneurs innovants et contribuez au développement de la Guinée",
            image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.45.jpeg",
            buttonText: "Rejoindre le réseau",
            buttonLink: "/reseau",
            icon: Trophy
        },
        {
            title: "Formation Intensive",
            subtitle: "Boost Entrepreneur",
            description: "12 mois d'accompagnement intensif pour accélérer votre projet et maximiser vos chances de succès",
            image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.46.jpeg",
            buttonText: "S'inscrire maintenant",
            buttonLink: "/formation",
            icon: Rocket
        }
    ];

    // Utilisation des icônes importées pour la navigation
    const navigationIcons = {
        prev: <ArrowLeft className="w-6 h-6 text-white" />,
        next: <ArrowRight className="w-6 h-6 text-white" />,
        play: <Play className="w-6 h-6 text-white" />,
        pause: <Pause className="w-6 h-6 text-white" />
    };

    // Amélioration du contrôle de l'autoplay
    const toggleAutoplay = () => {
        if (swiperRef.current) {
            if (isAutoplayPaused) {
                swiperRef.current.autoplay.start();
            } else {
                swiperRef.current.autoplay.stop();
            }
            setIsAutoplayPaused(!isAutoplayPaused);
            setProgress(0);
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: "easeOut"
            }
        }),
        exit: { opacity: 0, y: -30, transition: { duration: 0.5 } }
    };

    return (
        <section className="relative h-screen overflow-hidden">
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                speed={1500}
                autoplay={{
                    delay: autoplayDuration,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                fadeEffect={{ crossFade: true }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => 
                        `<span class="${className} w-3 h-3"></span>`
                }}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div className="relative h-full w-full">
                                <div
                                    className="absolute inset-0 transition-transform duration-[5s] ease-out"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                                
                                <div className="relative h-full flex items-center px-6">
                                    <div className="max-w-6xl mx-auto w-full text-center sm:text-left">
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-8"
                                                >
                                                    <motion.div
                                                        variants={textVariants}
                                                        custom={0}
                                                        className="mb-8 inline-flex items-center justify-center sm:justify-start px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
                                                    >
                                                        <slide.icon className="h-5 w-5 mr-2" />
                                                        <span>{slide.subtitle}</span>
                                                    </motion.div>

                                                    <motion.h1
                                                        variants={textVariants}
                                                        custom={1}
                                                        className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight sm:max-w-3xl"
                                                    >
                                                        {slide.title}
                                                    </motion.h1>

                                                    <motion.p
                                                        variants={textVariants}
                                                        custom={2}
                                                        className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 sm:max-w-2xl font-medium"
                                                    >
                                                        {slide.description}
                                                    </motion.p>

                                                    <motion.div
                                                        variants={textVariants}
                                                        custom={3}
                                                        className="flex justify-center sm:justify-start"
                                                    >
                                                        {slide.buttonLink && (
                                                            <Link
                                                                href={slide?.buttonLink || '#'}
                                                                className="inline-flex items-center px-8 py-4 
                                                                bg-white text-gray-900 rounded-xl 
                                                                hover:bg-gray-100 transition-all duration-300
                                                                font-semibold shadow-lg transform hover:scale-105
                                                                hover:shadow-xl active:scale-95 relative overflow-hidden group"
                                                            >
                                                                <ChevronRight className="mr-2" size={20} />
                                                                <span className="relative z-10">{slide.buttonText}</span>
                                                            </Link>
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}

                {/* Navigation améliorée avec les icônes */}
                <div className="absolute inset-y-0 left-6 z-10 flex items-center">
                    <button className="swiper-button-prev w-14 h-14 flex items-center justify-center 
                        rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50
                        transition-all duration-300 group">
                        {navigationIcons.prev}
                    </button>
                </div>

                <div className="absolute inset-y-0 right-6 z-10 flex items-center">
                    <button className="swiper-button-next w-14 h-14 flex items-center justify-center 
                        rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50
                        transition-all duration-300 group">
                        {navigationIcons.next}
                    </button>
                </div>

                {/* Contrôle de lecture avec indicateur de progression */}
                <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
                    <button
                        onClick={toggleAutoplay}
                        className="relative w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm
                            flex items-center justify-center hover:bg-black/50 transition-all duration-300"
                    >
                        {isAutoplayPaused ? navigationIcons.play : navigationIcons.pause}
                        {!isAutoplayPaused && (
                            <svg className="absolute w-full h-full" viewBox="0 0 44 44">
                                <circle
                                    cx="22" cy="22" r="20"
                                    fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"
                                />
                                <circle
                                    cx="22" cy="22" r="20"
                                    fill="none" stroke="white" strokeWidth="2"
                                    strokeDasharray="126"
                                    strokeDashoffset={126 - (126 * progress) / 100}
                                    transform="rotate(-90 22 22)"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </Swiper>
        </section>
    );
};

export default Hero;