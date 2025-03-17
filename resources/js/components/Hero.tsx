import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Trophy, Rocket, Award, ChevronRight, Pause, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { LucideIcon } from 'lucide-react';
import { Swiper as SwiperType } from 'swiper/types';

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const swiperRef = useRef<{ swiper?: SwiperType }>(null);
    const autoplayDuration = 5000;
    const slides = [
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        // ... autres slides
    ];

    // Utilisation des icônes importées pour la navigation
    const navigationIcons = {
        prev: <ArrowLeft className="w-6 h-6 text-white" />,
        next: <ArrowRight className="w-6 h-6 text-white" />,
        play: <Play className="w-6 h-6 text-white" />,
        pause: <Pause className="w-6 h-6 text-white" />
    };

    // Ajout des badges avec les icônes Trophy, Rocket et Award
    const badges = [
        { icon: Trophy, label: "Prix d'excellence" },
        { icon: Rocket, label: "Innovation" },
        { icon: Award, label: "Reconnaissance" }
    ];

    // Utilisation de l'activeIndex pour afficher les badges
    useEffect(() => {
        if (activeIndex >= 0) {
            const currentBadge = badges[activeIndex % badges.length];
            // Vous pouvez utiliser currentBadge ici si nécessaire
        }
    }, [activeIndex]);

    // Amélioration du contrôle de l'autoplay
    const toggleAutoplay = () => {
        if (swiperRef.current?.swiper) {
            if (isAutoplayPaused) {
                swiperRef.current.swiper.autoplay.start();
            } else {
                swiperRef.current.swiper.autoplay.stop();
            }
            setIsAutoplayPaused(!isAutoplayPaused);
            setProgress(0);
        }
    };

    // Ajout d'une section de badges en haut du slider
    const renderBadges = () => (
        <div className="absolute top-4 left-4 z-20 flex space-x-4">
            {badges.map((badge, index) => (
                <div
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full 
                    ${activeIndex % badges.length === index 
                        ? 'bg-white text-[#1B4D3E]' 
                        : 'bg-white/20 text-white'} 
                    backdrop-blur-sm transition-all duration-300`}
                >
                    <badge.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{badge.label}</span>
                </div>
            ))}
        </div>
    );

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
            {renderBadges()}
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
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                    setProgress(0);
                }}
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
                                <div className="absolute inset-0 bg-gradient-to-b from-[#1B4D3E]/60 via-[#1B4D3E]/40 to-[#1B4D3E]/80" />
                                
                                <div className="relative h-full flex items-center justify-center px-6">
                                    <div className="max-w-6xl mx-auto text-center">
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
                                                        className="mb-8 inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium"
                                                    >
                                                        <slide.icon className="h-5 w-5 mr-2" />
                                                        <span>{slide.subtitle}</span>
                                                    </motion.div>

                                                    <motion.h1
                                                        variants={textVariants}
                                                        custom={1}
                                                        className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                                                    >
                                                        {slide.title}
                                                    </motion.h1>

                                                    <motion.p
                                                        variants={textVariants}
                                                        custom={2}
                                                        className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-medium"
                                                    >
                                                        {slide.description}
                                                    </motion.p>

                                                    <motion.div
                                                        variants={textVariants}
                                                        custom={3}
                                                        className="flex justify-center"
                                                    >
                                                        <Link
                                                            href={slide.buttonLink}
                                                            className="inline-flex items-center px-8 py-4 
                                                            bg-white text-[#1B4D3E] rounded-xl 
                                                            hover:bg-[#1B4D3E]/10 transition-all duration-300
                                                            font-semibold shadow-lg transform hover:scale-105
                                                            hover:shadow-xl active:scale-95 relative overflow-hidden group"
                                                        >
                                                            <ChevronRight className="mr-2" size={20} />
                                                            <span className="relative z-10">{slide.buttonText}</span>
                                                        </Link>
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
                        rounded-full bg-black/20 backdrop-blur-sm hover:bg-[#1B4D3E]/70
                        transition-all duration-300 group">
                        {navigationIcons.prev}
                    </button>
                </div>

                <div className="absolute inset-y-0 right-6 z-10 flex items-center">
                    <button className="swiper-button-next w-14 h-14 flex items-center justify-center 
                        rounded-full bg-black/20 backdrop-blur-sm hover:bg-[#1B4D3E]/70
                        transition-all duration-300 group">
                        {navigationIcons.next}
                    </button>
                </div>

                {/* Contrôle de lecture avec indicateur de progression */}
                <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
                    <button
                        onClick={toggleAutoplay}
                        className="relative w-14 h-14 rounded-full bg-black/20 backdrop-blur-sm
                            flex items-center justify-center hover:bg-[#1B4D3E]/70 transition-all duration-300"
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