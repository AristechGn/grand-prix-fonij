import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Trophy, Award, ChevronRight, Pause, Play, ArrowLeft, ArrowRight, BookOpen, Laptop, Sprout } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { LucideIcon } from 'lucide-react';
import SwiperCore from 'swiper';


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

const CategorieHero = () => {
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const swiperRef = useRef<SwiperCore | null>(null);
    const autoplayDuration = 3000;
    const slides = [
        {
            title: "Grand Prix FONIJ 2024",
            subtitle: "Toutes Catégories",
            description: "Rejoignez l'élite entrepreneuriale de la Guinée ! Plus de 1000 entrepreneurs, 4 catégories d'excellence, et un accompagnement sur mesure pour réussir votre projet.",
            image: "https://img.freepik.com/free-photo/people-office-work-day_23-2150690154.jpg?t=st=1742307630~exp=1742311230~hmac=9b97c3630a4ba569a98dc23d18fb51110d38ef49e340670989b70353383b3e93&w=1380",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Award
        },
        {
            title: "Promotion de l'Esprit d'Entreprise",
            subtitle: "Catégorie Excellence",
            description: "Transformez vos initiatives innovantes en success stories ! Cette catégorie récompense les projets qui façonnent la culture entrepreneuriale en Guinée avec un financement allant jusqu'à 500M GNF.",
            // image: "https://img.freepik.com/premium-photo/woman-using-sewing-machine-working-workshop_1048944-18734432.jpg?w=1380",
            buttonText: "Postuler dans cette catégorie",
            buttonLink: "/candidater?category=1",
            icon: Trophy
        },
        {
            title: "Éducation aux Compétences",
            subtitle: "Formation & Développement",
            description: "Renforcez les compétences de demain ! Un programme complet avec mentorat expert, support technique et accès aux ressources pédagogiques pour former la nouvelle génération.",
            // image: "https://img.freepik.com/free-photo/development-knowledge-study-education-concept_53876-144838.jpg?t=st=1742306869~exp=1742310469~hmac=fc5f725e7137d2b12fe6937fa9405e730bc034cea22ba24e85ee0dbc78434e88&w=1380",
            buttonText: "Découvrir les opportunités",
            buttonLink: "/candidater?category=2",
            icon: BookOpen
        },
        {
            title: "Transition Numérique",
            subtitle: "Innovation Technologique",
            description: "Propulsez la Guinée vers l'ère digitale ! Accompagnement personnalisé pour les projets numériques innovants avec accès aux outils et formations spécialisées.",
            image: "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041864.jpg?t=st=1742307154~exp=1742310754~hmac=53f11f67cf4b0e906ec71d95521312b99ec3d7b61afe4bcbbe930c74955e9fe4&w=1380",
            buttonText: "Lancer votre projet digital",
            buttonLink: "/candidater?category=3",
            icon: Laptop
        },
        {
            title: "Entrepreneuriat Agricole",
            subtitle: "Agriculture Durable",
            description: "Cultivez l'avenir de la Guinée ! Soutenez l'innovation agricole avec des solutions durables et un impact environnemental positif. Financement et accompagnement technique garantis.",
            image: "https://img.freepik.com/free-photo/medium-shot-man-holding-vegetables_23-2148761604.jpg?t=st=1742307379~exp=1742310979~hmac=0c4124fab8d8935fe82cae63d1e5d68de46baba0581b7fc7f5b3b05b3ff7d02e&w=1380",
            buttonText: "Développer votre projet agricole",
            buttonLink: "/candidater?category=4",
            icon: Sprout
        },
    ];

    // Utilisation des icônes importées pour la navigation
    const navigationIcons = {
        prev: <ArrowLeft className="w-6 h-6 text-white" />,
        next: <ArrowRight className="w-6 h-6 text-white" />,
        play: <Play className="w-6 h-6 text-white" />,
        pause: <Pause className="w-6 h-6 text-white" />
    };

    // Mise à jour des badges pour correspondre aux catégories
    const badges = [
        { icon: Trophy, label: "Esprit d'Entreprise" },
        { icon: BookOpen, label: "Formation" },
        { icon: Laptop, label: "Numérique" },
        { icon: Sprout, label: "Agriculture" },
        { icon: Award, label: "Excellence" }
    ];


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
        <section className="relative h-screen overflow-hidden bg-gradient-to-r from-[#026200] to-[#024C00]">
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
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
                                <div className="absolute inset-0 bg-black/30" />
                                
                                <div className="relative h-full flex items-center justify-center px-6">
                                    <div className="max-w-6xl mx-auto text-center">
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="space-y-4 sm:space-y-8"
                                                >
                                                    <motion.div
                                                        variants={textVariants}
                                                        custom={0}
                                                        className="mb-4 sm:mb-8 inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-medium"
                                                    >
                                                        <slide.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                        <span>{slide.subtitle}</span>
                                                    </motion.div>

                                                    <motion.h1
                                                        variants={textVariants}
                                                        custom={1}
                                                        className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                                                    >
                                                        {slide.title}
                                                    </motion.h1>

                                                    <motion.p
                                                        variants={textVariants}
                                                        custom={2}
                                                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-10 max-w-3xl mx-auto font-medium px-4 sm:px-0"
                                                    >
                                                        {slide.description}
                                                    </motion.p>

                                                    <motion.div
                                                        variants={textVariants}
                                                        custom={3}
                                                        className="flex justify-center px-4 sm:px-0"
                                                    >
                                                        <Link
                                                            href={slide.buttonLink}
                                                            className="inline-flex items-center px-4 sm:px-8 py-3 sm:py-4 
                                                            bg-white text- -900 rounded-xl text-sm sm:text-base
                                                            hover:bg- -100 transition-all duration-300
                                                            font-semibold shadow-lg transform hover:scale-105
                                                            hover:shadow-xl active:scale-95 relative overflow-hidden group w-full sm:w-auto"
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
                <div className="absolute inset-y-0 left-2 sm:left-6 z-10 flex items-center">
                    <button className="swiper-button-prev w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center 
                        rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30
                        transition-all duration-300 group border border-white/10">
                        {navigationIcons.prev}
                    </button>
                </div>

                <div className="absolute inset-y-0 right-2 sm:right-6 z-10 flex items-center">
                    <button className="swiper-button-next w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center 
                        rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30
                        transition-all duration-300 group border border-white/10">
                        {navigationIcons.next}
                    </button>
                </div>

                {/* Contrôle de lecture avec indicateur de progression */}
                <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 flex items-center space-x-4">
                    <button
                        onClick={toggleAutoplay}
                        className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/20 backdrop-blur-sm
                            flex items-center justify-center hover:bg-black/30 transition-all duration-300 border border-white/10"
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

                {/* Badges responsifs */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 hidden md:flex flex-wrap gap-2 sm:gap-4 max-w-[calc(100%-4rem)]">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full 
                            ${activeIndex % badges.length === index 
                                ? 'bg-white/90 text- -900' 
                                : 'bg-black/20 text-white'} 
                            backdrop-blur-sm transition-all duration-300`}
                        >
                            <badge.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-medium truncate">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </Swiper>
        </section>
    );
};

export default CategorieHero;