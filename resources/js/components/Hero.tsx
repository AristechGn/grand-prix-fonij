import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Trophy, Rocket, Award, ChevronRight, Pause, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const swiperRef = useRef<SwiperType | null>(null);
    const autoplayDuration = 5000; // Augmenté pour donner plus de temps pour lire le contenu
    const progressInterval = useRef<number | null>(null);
    
    const slides = [
        {
            title: "Grand Prix FONIJ 2025",
            subtitle: "Édition Spéciale Innovation",
            description: "Participez à la plus grande compétition entrepreneuriale de Guinée et transformez vos idées en succès !",
            image: null,
            buttonText: "Je candidate",
            buttonLink: "/candidater",
            icon: Trophy,
            textPosition: 'center', // Position par défaut
            hideText: false,
            mobileTextPosition: 'center'
        },
        {
            title: "Mamadi Doubouya, Président",
            subtitle: "Leader Visionnaire",
            description: "Mamadi Doubouya, en tant que président, a su guider la Guinée vers une ère de prospérité et d'innovation. Son leadership exemplaire et son engagement envers le développement durable ont transformés le paysage entrepreneurial et social de la Guinée.",
            image: "/images/fonij/cover.jpg",
            buttonText: null,
            buttonLink: null,
            icon: Trophy,
            textPosition: 'left',
            hideText: false,
            mobileTextPosition: 'bottom'
        },
        {
            title: "Innovez pour la Guinée",
            subtitle: "Programme d'Accompagnement",
            description: "Bénéficiez d'un mentorat personnalisé, d'une formation intensive et d'un financement jusqu'à 500 millions GNF",
            image: "https://fonijguinee.org/wp-content/uploads/2025/02/JE-VEUX-UN-STAGE-DE-FORMATION-OU-DE-PERFECTIONNEMENT-600x600.jpg",
            buttonText: "Découvrir le programme",
            buttonLink: "/programme",
            icon: Rocket,
            textPosition: 'center',
            hideText: false,
            mobileTextPosition: 'center'
        },
        {
            title: "Impact & Excellence",
            subtitle: "Catégories Spéciales",
            description: "5 catégories pour valoriser les projets innovants dans l'agriculture, le numérique, l'éducation et plus encore",
            image: "https://img.freepik.com/free-photo/photorealistic-woman-organic-sustainable-garden-harvesting-produce_23-2151463016.jpg?t=st=1742303393~exp=1742306993~hmac=70a77847898f48ec321c789db8d23cfe6c90c4ab6ba26d29dee63f835d152b9f&w=1380",
            buttonText: "Explorer les catégories",
            buttonLink: "/categories",
            icon: Award,
            textPosition: 'center',
            hideText: false,
            mobileTextPosition: 'center'
        },
        {
            title: "Rejoignez l'Élite",
            subtitle: "Réseau d'Excellence",
            description: "Intégrez un réseau de plus de 1000 entrepreneurs innovants et contribuez au développement de la Guinée",
            image: "https://img.freepik.com/free-photo/university-students-learning-accounting-principles-financial-analysis_482257-113378.jpg?t=st=1742303490~exp=1742307090~hmac=2a9be7d3eae384a01f6956bc8f3aa035ebbb858ab7ef07277f96bc5154c4567d&w=1380",
            buttonText: "Rejoindre le réseau",
            buttonLink: "/reseau",
            icon: Trophy,
            textPosition: 'center',
            hideText: false,
            mobileTextPosition: 'center'
        },
        {
            title: "Formation Intensive",
            subtitle: "Boost Entrepreneur",
            description: "12 mois d'accompagnement intensif pour accélérer votre projet et maximiser vos chances de succès",
            image: "https://img.freepik.com/free-photo/black-male-female-colleagues-sitting-office-looking-computer-screen-together_1098-20605.jpg?t=st=1742303732~exp=1742307332~hmac=a281d581c0cc1586137a02402c815597b60d8d2afc19d53958ea6a70352d35f8&w=1380",
            buttonText: "S'inscrire maintenant",
            buttonLink: "/formation",
            icon: Rocket,
            textPosition: 'bottom',
            hideText: false,
            mobileTextPosition: 'bottom'
        }
    ];

    // Gérer la taille de fenêtre
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Gestion améliorée du timer de progression
    useEffect(() => {
        if (!isAutoplayPaused) {
            setProgress(0);
            if (progressInterval.current) clearInterval(progressInterval.current);
            
            const intervalId = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) return 0;
                    return prev + (100 / autoplayDuration) * 100;
                });
            }, 100);
            
            progressInterval.current = intervalId as unknown as number;
            return () => clearInterval(intervalId);
        }
    }, [isAutoplayPaused]);

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
        <section className="relative h-[90vh] overflow-hidden bg-gradient-to-r from-[#026200] to-[#024C00] focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200">
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
                        `<span class="${className} w-3 h-3 opacity-70 hover:opacity-100 transition-opacity"></span>`
                }}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                loop={true}
                className="h-full w-full"
                onAutoplayTimeLeft={(s, time, progress) => {
                    setProgress((1 - progress) * 100);
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div className="relative h-[90vh]">
                                {/* Background with improved image handling */}
                                {slide.image && (
                                <div className="absolute inset-0">
                                    <img
                                        src={slide.image}
                                        alt={slide.title || "Slide image"}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{
                                            objectPosition: '50% 50%',
                                            maxHeight: '90vh'
                                        }}
                                    />
                                    {/* Overlay gradient optimized for wide screens */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                                </div>
                                )}
                                
                                {/* Content container with dynamic positioning */}
                                <div className={`relative h-full flex ${
                                    slide.hideText ? 'hidden' : 'flex'
                                } ${
                                    slide.textPosition === 'center' ? 'items-center justify-center' :
                                    slide.textPosition === 'top' ? 'items-start pt-20' :
                                    slide.textPosition === 'bottom' ? 'items-end pb-20' :
                                    slide.textPosition === 'right' ? 'items-center justify-end' :
                                    'items-center' // default left
                                }`}>
                                    <div className={`container mx-auto px-6 lg:px-16 xl:px-24 2xl:px-32 ${
                                        slide.textPosition === 'center' ? 'text-center' :
                                        slide.textPosition === 'right' ? 'text-right' :
                                        'text-left'
                                    }`}>
                                        <div className={`grid grid-cols-1 ${
                                            slide.textPosition === 'center' ? '' :
                                            slide.textPosition === 'right' ? 'lg:grid-cols-2 gap-12 items-center' :
                                            'lg:grid-cols-2 gap-12 items-center'
                                        }`}>
                                            {/* Conditional left empty column for right-aligned text */}
                                            {slide.textPosition === 'right' && <div className="hidden lg:block"></div>}
                                            
                                            {/* Content column with dynamic alignment */}
                                            <div className={`${
                                                slide.textPosition === 'center' ? 'text-center' :
                                                slide.textPosition === 'right' ? 'text-right lg:text-right' :
                                                'text-center lg:text-left'
                                            }`}>
                                                <AnimatePresence mode="wait">
                                                    {isActive && !slide.hideText && (
                                                        <motion.div
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="space-y-8"
                                                        >
                                                            {slide.subtitle && (
                                                                <motion.div
                                                                    variants={textVariants}
                                                                    custom={0}
                                                                    className="mb-8 inline-flex items-center justify-center sm:justify-start px-4 py-2 rounded-full bg-black/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium"
                                                                >
                                                                    <slide.icon className="h-5 w-5 mr-2" />
                                                                    <span>{slide.subtitle}</span>
                                                                </motion.div>
                                                            )}

                                                            {slide.title && (
                                                                <motion.h1
                                                                    variants={textVariants}
                                                                    custom={1}
                                                                    className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
                                                                >
                                                                    {slide.title}
                                                                </motion.h1>
                                                            )}

                                                            {slide.description && (
                                                                <motion.p
                                                                    variants={textVariants}
                                                                    custom={2}
                                                                    className="text-lg sm:text-xl xl:text-2xl text-white/90 mb-10 font-medium max-w-2xl mx-auto lg:mx-0"
                                                                >
                                                                    {slide.description}
                                                                </motion.p>
                                                            )}

                                                            {slide.buttonLink && (
                                                                <motion.div
                                                                    variants={textVariants}
                                                                    custom={3}
                                                                    className="flex justify-center lg:justify-start"
                                                                >
                                                                    <Link
                                                                        href={slide.buttonLink}
                                                                        className="inline-flex items-center px-8 py-4 
                                                                        bg-white text-gray-900 rounded-xl 
                                                                        hover:bg-gray-100 transition-all duration-300
                                                                        font-semibold shadow-lg transform hover:-translate-y-1
                                                                        hover:shadow-xl active:scale-95 relative overflow-hidden group"
                                                                    >
                                                                        <span className="relative z-10">{slide.buttonText}</span>
                                                                        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                                                    </Link>
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}

                {/* Navigation améliorée avec les icônes et position optimisée */}
                <div className="absolute inset-y-0 left-4 md:left-8 xl:left-16 z-10 flex items-center">
                    <button className="swiper-button-prev w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                        rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50
                        transition-all duration-300 group border border-white/10 hover:border-white/30">
                        {navigationIcons.prev}
                    </button>
                </div>

                <div className="absolute inset-y-0 right-4 md:right-8 xl:right-16 z-10 flex items-center">
                    <button className="swiper-button-next w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                        rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50
                        transition-all duration-300 group border border-white/10 hover:border-white/30">
                        {navigationIcons.next}
                    </button>
                </div>

                {/* Contrôle de lecture avec indicateur de progression amélioré */}
                <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
                    <button
                        onClick={toggleAutoplay}
                        className="relative w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm
                            flex items-center justify-center hover:bg-black/50 transition-all duration-300
                            border border-white/10 hover:border-white/30"
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
                                    fill="none" stroke="white" strokeWidth="2.5"
                                    strokeDasharray="126"
                                    strokeDashoffset={126 - (126 * progress) / 100}
                                    transform="rotate(-90 22 22)"
                                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                />
                            </svg>
                        )}
                    </button>
                </div>
                
                {/* Pagination améliorée pour écrans larges */}
                <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
                    <div className="swiper-pagination !bottom-0"></div>
                </div>
            </Swiper>
        </section>
    );
};

export default Hero;