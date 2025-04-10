import MainLayout from '@/layouts/MainLayout';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Calendar, Target, Search, Book, Presentation, Award, LineChart, Flag, LucideIcon, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IconCalendarEvent, IconUsers, IconTrophy, IconClock, IconBrightnessDown, IconBrightnessUp, IconCaretRightFilled, IconCaretUpFilled, IconChevronUp, IconMicrophone, IconMoon, IconPlayerSkipForward, IconPlayerTrackNext, IconPlayerTrackPrev, IconTable, IconVolume, IconVolume2, IconVolume3, IconSearch, IconWorld, IconCommand, IconCaretLeftFilled, IconCaretDownFilled } from '@tabler/icons-react';
import { useRef, useEffect, useState } from 'react';

// Fonction utilitaire pour fusionner les classes CSS
const cn = (...inputs: (string | undefined)[]) => {
    return twMerge(clsx(inputs));
};

// Logo FONIJ pour le MacBook
const FonijLogo = () => {
    return (
        <img src="/images/fonij/logo-brands-2.png" alt="FONIJ Logo" className="h-10 w-10" />
    );
};

// Composant pour le MacbookScroll
const MacbookScroll = ({
    src,
    showGradient = true,
    title,
    badge,
}: {
    src?: string;
    showGradient?: boolean;
    title?: string | React.ReactNode;
    badge?: React.ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window && window.innerWidth < 768) {
            setIsMobile(true);
        }
    }, []);

    const scaleX = useTransform(
        scrollYProgress,
        [0, 0.3],
        [1.2, isMobile ? 1 : 1.5]
    );
    const scaleY = useTransform(
        scrollYProgress,
        [0, 0.3],
        [0.6, isMobile ? 1 : 1.5]
    );
    const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
    const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
    const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div
            ref={ref}
            className="flex min-h-[200vh] shrink-0 scale-[0.35] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100 md:py-40"
        >
            <motion.h2
                style={{
                    translateY: textTransform,
                    opacity: textOpacity,
                }}
                className="mb-20 text-center text-3xl font-bold text-foreground dark:text-white"
            >
                {title || (
                    <span>
                        Calendrier du Grand Prix FONIJ <br /> Édition 2025-2026
                    </span>
                )}
            </motion.h2>
            {/* Lid */}
            <Lid
                src={src}
                scaleX={scaleX}
                scaleY={scaleY}
                rotate={rotate}
                translate={translate}
            />
            {/* Base area */}
            <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-muted dark:bg-[#272729]">
                {/* above keyboard bar */}
                <div className="relative h-10 w-full">
                    <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
                </div>
                <div className="relative flex">
                    <div className="mx-auto h-full w-[10%] overflow-hidden">
                        <SpeakerGrid />
                    </div>
                    <div className="mx-auto h-full w-[80%]">
                        <Keypad />
                    </div>
                    <div className="mx-auto h-full w-[10%] overflow-hidden">
                        <SpeakerGrid />
                    </div>
                </div>
                <Trackpad />
                <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
                {showGradient && (
                    <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-background via-background to-transparent dark:from-black dark:via-black"></div>
                )}
                {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
            </div>
        </div>
    );
};

// Composant pour l'écran du MacBook
const Lid = ({
    scaleX,
    scaleY,
    rotate,
    translate,
    src,
}: {
    scaleX: MotionValue<number>;
    scaleY: MotionValue<number>;
    rotate: MotionValue<number>;
    translate: MotionValue<number>;
    src?: string;
}) => {
    return (
        <div className="relative [perspective:800px]">
            <div
                style={{
                    transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                }}
                className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
            >
                <div
                    style={{
                        boxShadow: "0px 2px 0px 2px #171717 inset",
                    }}
                    className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/20"
                >
                    <span className="text-white">
                        <FonijLogo />
                    </span>
                </div>
            </div>
            <motion.div
                style={{
                    translateY: translate,
                    rotateX: rotate,
                    transformStyle: "preserve-3d",
                    transformOrigin: "bottom",
                    scaleX: scaleX,
                    scaleY: scaleY,
                }}
                className="absolute inset-0 z-10 h-[12rem] w-[32rem] rounded-2xl bg-primary/10 p-2"
            >
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-background">
                    {src ? (
                        <img
                            src={src}
                            alt="Image"
                            className="h-full w-full object-contain object-center"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-fonij">
                            <div className="relative z-10 p-8 text-background">
                                <h3 className="mb-4 text-2xl font-bold">Les 7 phases du Grand Prix FONIJ</h3>
                                <p className="mb-6">De l'appel à candidatures jusqu'à la remise des prix</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-background/10 p-3">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            <span className="font-medium">Phase 1</span>
                                        </div>
                                        <p className="text-sm">Lancement de l'appel à candidatures - 15 juin 2025</p>
                                    </div>
                                    <div className="rounded-lg bg-background/10 p-3">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Search className="h-5 w-5" />
                                            <span className="font-medium">Phase 2</span>
                                        </div>
                                        <p className="text-sm">Sélection des candidatures - Sept 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

// Trackpad du MacBook
const Trackpad = () => {
    return (
        <div 
            className="mx-auto my-1 h-32 w-[40%] rounded-xl"
            style={{
                boxShadow: "0px 0px 1px 1px #00000020 inset",
            }}
        ></div>
    );
};

// Grille d'enceintes pour le MacBook
const SpeakerGrid = () => {
    return (
        <div
            className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
            style={{
                backgroundImage:
                    "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
                backgroundSize: "3px 3px",
            }}
        ></div>
    );
};

// Composant OptionKey
const OptionKey = ({ className }: { className: string }) => {
    return (
        <svg
            fill="none"
            version="1.1"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className={className}
        >
            <rect
                stroke="currentColor"
                strokeWidth={2}
                x="18"
                y="5"
                width="10"
                height="2"
            />
            <polygon
                stroke="currentColor"
                strokeWidth={2}
                points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
            />
            <rect
                id="_Transparent_Rectangle_"
                className="st0"
                width="32"
                height="32"
                stroke="none"
            />
        </svg>
    );
};

// Clavier du MacBook
const Keypad = () => {
    return (
        <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
            {/* First Row */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                <KBtn
                    className="w-10 items-end justify-start pb-[2px] pl-[4px]"
                    childrenClassName="items-start"
                >
                    esc
                </KBtn>
                <KBtn>
                    <IconBrightnessDown className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F1</span>
                </KBtn>
                <KBtn>
                    <IconBrightnessUp className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F2</span>
                </KBtn>
                <KBtn>
                    <IconTable className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F3</span>
                </KBtn>
                <KBtn>
                    <IconSearch className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F4</span>
                </KBtn>
                <KBtn>
                    <IconMicrophone className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F5</span>
                </KBtn>
                <KBtn>
                    <IconMoon className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F6</span>
                </KBtn>
                <KBtn>
                    <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F7</span>
                </KBtn>
                <KBtn>
                    <IconPlayerSkipForward className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F8</span>
                </KBtn>
                <KBtn>
                    <IconPlayerTrackNext className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F9</span>
                </KBtn>
                <KBtn>
                    <IconVolume3 className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F10</span>
                </KBtn>
                <KBtn>
                    <IconVolume2 className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F11</span>
                </KBtn>
                <KBtn>
                    <IconVolume className="h-[6px] w-[6px]" />
                    <span className="mt-1 inline-block">F12</span>
                </KBtn>
                <KBtn>
                    <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
                        <div className="h-full w-full rounded-full bg-black" />
                    </div>
                </KBtn>
            </div>

            {/* Row simplifiés pour alléger le code */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                {/* Touches simplifiées */}
                {Array(14).fill(0).map((_, index) => (
                    <KBtn key={index}></KBtn>
                ))}
            </div>

            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                {/* Touches simplifiées */}
                {Array(14).fill(0).map((_, index) => (
                    <KBtn key={index}></KBtn>
                ))}
            </div>

            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                {/* Touches simplifiées */}
                {Array(13).fill(0).map((_, index) => (
                    <KBtn key={index}></KBtn>
                ))}
            </div>

            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                {/* Touches simplifiées */}
                {Array(12).fill(0).map((_, index) => (
                    <KBtn key={index}></KBtn>
                ))}
            </div>

            {/* Dernière rangée */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <span className="block">fn</span>
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <IconWorld className="h-[6px] w-[6px]" />
                    </div>
                </KBtn>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <IconChevronUp className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">control</span>
                    </div>
                </KBtn>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-end pr-1">
                        <OptionKey className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">option</span>
                    </div>
                </KBtn>
                <KBtn
                    className="w-8"
                    childrenClassName="h-full justify-between py-[4px]"
                >
                    <div className="flex w-full justify-end pr-1">
                        <IconCommand className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">command</span>
                    </div>
                </KBtn>
                <KBtn className="w-[8.2rem]"></KBtn>
                <KBtn
                    className="w-8"
                    childrenClassName="h-full justify-between py-[4px]"
                >
                    <div className="flex w-full justify-start pl-1">
                        <IconCommand className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">command</span>
                    </div>
                </KBtn>
                <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
                    <div className="flex w-full justify-start pl-1">
                        <OptionKey className="h-[6px] w-[6px]" />
                    </div>
                    <div className="flex w-full justify-start pl-1">
                        <span className="block">option</span>
                    </div>
                </KBtn>
                <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
                    <KBtn className="h-3 w-6">
                        <IconCaretUpFilled className="h-[6px] w-[6px]" />
                    </KBtn>
                    <div className="flex">
                        <KBtn className="h-3 w-6">
                            <IconCaretLeftFilled className="h-[6px] w-[6px]" />
                        </KBtn>
                        <KBtn className="h-3 w-6">
                            <IconCaretDownFilled className="h-[6px] w-[6px]" />
                        </KBtn>
                        <KBtn className="h-3 w-6">
                            <IconCaretRightFilled className="h-[6px] w-[6px]" />
                        </KBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant bouton du clavier
const KBtn = ({
    className,
    children,
    childrenClassName,
    backlit = true,
}: {
    className?: string;
    children?: React.ReactNode;
    childrenClassName?: string;
    backlit?: boolean;
}) => {
    // Définir les classes conditionnellement
    const backlitClass = backlit ? "bg-primary/20 shadow-xl shadow-primary/10" : "";
    const textClass = backlit ? "text-primary-foreground" : "";
    
    return (
        <div
            className={cn(
                "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
                backlitClass
            )}
        >
            <div
                className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
                    className,
                )}
                style={{
                    boxShadow:
                        "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
                }}
            >
                <div
                    className={cn(
                        "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
                        childrenClassName,
                        textClass
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

// Types pour les couleurs et leurs variantes
type ColorName = "emerald" | "blue" | "indigo" | "purple" | "amber" | "rose" | "teal";

type ColorVariant = {
    bg: string;
    border: string;
    icon: string;
    title: string;
    date: string;
    line: string;
};

type ColorVariants = Record<ColorName, ColorVariant>;

type Phase = {
    id: number;
    title: string;
    date: string;
    icon: LucideIcon;
    color: ColorName;
    activites: string[];
    objectif?: string;
    lieu?: string;
};

export default function Deroulement() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            } 
        }
    };

    // Stats pour la bande d'infos
    const stats = [
        { 
            icon: IconCalendarEvent, 
            label: "7 phases clés",
            color: "text-emerald-300"
        },
        { 
            icon: IconClock, 
            label: "11 mois de programme",
            color: "text-emerald-300"
        },
        { 
            icon: IconUsers, 
            label: "4 lauréats sélectionnés",
            color: "text-emerald-300"
        },
        { 
            icon: IconTrophy, 
            label: "500M GNF par projet",
            color: "text-emerald-300"
        }
    ];

    const phases: Phase[] = [
        {
            id: 1,
            title: "Lancement de l'appel à candidatures",
            date: "15 juin 2025",
            icon: Calendar,
            color: "emerald",
            activites: [
                "Publication officielle du concours",
                "Ouverture du site de candidatures",
                "Diffusion sur les réseaux sociaux, radios et médias partenaires",
                "Sessions d'information dans les régions"
            ],
            objectif: "Informer, motiver, et orienter les jeunes pour qu'ils soumettent leur dossier."
        },
        {
            id: 2,
            title: "Sélection des candidatures",
            date: "16 septembre - 10 octobre 2025",
            icon: Search,
            color: "blue",
            activites: [
                "Analyse des dossiers par un comité d'experts",
                "Évaluation selon des critères : innovation, impact, faisabilité, durabilité",
                "Pré-sélection des meilleurs projets dans chaque catégorie"
            ],
            objectif: "Identifier les projets les plus prometteurs."
        },
        {
            id: 3,
            title: "Bootcamp d'accélération",
            date: "15 - 22 octobre 2025",
            lieu: "Conakry (hébergement pour les candidats régionaux pris en charge)",
            icon: Book,
            color: "indigo",
            activites: [
                "Formation intensive pour les finalistes",
                "Ateliers pratiques (pitch, gestion, business model, communication, etc.)",
                "Coaching par des mentors expérimentés",
                "Préparation à la soutenance finale"
            ],
            objectif: "Renforcer les compétences des candidats pour la réussite de leur projet."
        },
        {
            id: 4,
            title: "Journée de présentation des projets (Demo Day)",
            date: "25 octobre 2025",
            icon: Presentation,
            color: "purple",
            activites: [
                "Présentation publique des projets devant un jury",
                "Présence des partenaires, médias et investisseurs",
                "Sélection des lauréats (1 par catégorie)",
                "Chaque candidat dispose de 5 minutes de pitch + 5 minutes de questions-réponses"
            ],
            objectif: "Valoriser les projets et permettre un retour professionnel."
        },
        {
            id: 5,
            title: "Cérémonie de remise des prix",
            date: "26 octobre 2025",
            icon: Award,
            color: "amber",
            activites: [
                "Annonce officielle des 4 lauréats",
                "Remise des prix (jusqu'à 500 millions GNF par projet)",
                "Allocutions des autorités, partenaires, anciens lauréats",
                "Spectacle culturel, animations",
                "Prix spéciaux pour l'impact social, l'innovation féminine ou la durabilité"
            ]
        },
        {
            id: 6,
            title: "Suivi & Accompagnement post-prix",
            date: "Novembre 2025 - Avril 2026",
            icon: LineChart,
            color: "rose",
            activites: [
                "Intégration dans un programme d'incubation",
                "Suivi technique et financier personnalisé",
                "Mise en relation avec des partenaires d'affaires et investisseurs",
                "Suivi d'impact (évaluation à 3, 6 et 12 mois)"
            ],
            objectif: "Garantir la réussite durable des projets primés."
        },
        {
            id: 7,
            title: "Clôture de l'édition & Lancement de la suivante",
            date: "Mai 2026",
            icon: Flag,
            color: "teal",
            activites: [
                "Bilan de l'édition",
                "Témoignages des lauréats",
                "Annonce de la prochaine édition du Grand Prix FONIJ"
            ]
        }
    ];

    const colorVariants: ColorVariants = {
        emerald: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            icon: "bg-emerald-100 text-emerald-600",
            title: "text-emerald-700",
            date: "bg-emerald-100 text-emerald-700",
            line: "bg-emerald-300"
        },
        blue: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            icon: "bg-blue-100 text-blue-600",
            title: "text-blue-700",
            date: "bg-blue-100 text-blue-700",
            line: "bg-blue-300"
        },
        indigo: {
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            icon: "bg-indigo-100 text-indigo-600",
            title: "text-indigo-700",
            date: "bg-indigo-100 text-indigo-700",
            line: "bg-indigo-300"
        },
        purple: {
            bg: "bg-purple-50",
            border: "border-purple-200",
            icon: "bg-purple-100 text-purple-600",
            title: "text-purple-700",
            date: "bg-purple-100 text-purple-700",
            line: "bg-purple-300"
        },
        amber: {
            bg: "bg-amber-50",
            border: "border-amber-200",
            icon: "bg-amber-100 text-amber-600",
            title: "text-amber-700",
            date: "bg-amber-100 text-amber-700",
            line: "bg-amber-300"
        },
        rose: {
            bg: "bg-rose-50",
            border: "border-rose-200",
            icon: "bg-rose-100 text-rose-600",
            title: "text-rose-700",
            date: "bg-rose-100 text-rose-700",
            line: "bg-rose-300"
        },
        teal: {
            bg: "bg-teal-50",
            border: "border-teal-200",
            icon: "bg-teal-100 text-teal-600",
            title: "text-teal-700",
            date: "bg-teal-100 text-teal-700",
            line: "bg-teal-300"
        }
    };

    return (
        <MainLayout>
            {/* Hero Section avec MacbookScroll */}
            <div className="bg-gradient-to-b from-muted to-background">
                <MacbookScroll
                    title={
                        <div>
                            <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-6">
                                GRAND PRIX FONIJ ÉDITION 2025-2026
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                                Calendrier du Programme
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Découvrez les étapes clés pour participer au Grand Prix FONIJ
                            </p>
                        </div>
                    }
                    badge={
                        <div className="flex items-center gap-2 bg-primary text-background px-3 py-1.5 rounded-full text-sm font-medium">
                            <Calendar className="h-4 w-4" />
                            Juin 2025 - Mai 2026
                        </div>
                    }
                    src="/images/fonij/logo-transparent.png"
                />
            </div>

            {/* Bande d'infos avec design moderne */}
            <div className="bg-background border-b border-border py-6 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                        {stats.map((stat, index) => (
            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <div className="mb-2 rounded-full bg-primary/10 p-3">
                                    <stat.icon className="h-6 w-6 text-primary" stroke={1.5} />
                                </div>
                                <span className="text-sm font-medium text-foreground md:text-base">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Objectif */}
            <div className="bg-background py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-6">
                            NOTRE MISSION
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                            Accompagner l'innovation guinéenne
                        </h2>
                        <div className="mx-auto mb-8 h-1 w-20 bg-primary"></div>
                        <p className="mx-auto text-lg text-muted-foreground">
                            Le Grand Prix FONIJ vise à identifier, soutenir et accompagner les projets innovants 
                            portés par les jeunes guinéens, pour créer un impact durable sur le développement économique du pays.
                        </p>
            </motion.div>
                </div>
            </div>

            {/* Section des phases avec timeline simple */}
            <div className="bg-gray-50 py-20 -mt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-48">
                        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-800 mb-6">
                            CHRONOLOGIE
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                            Les 7 phases du programme
                        </h2>
                        <div className="mx-auto mb-8 h-1 w-20 bg-emerald-500"></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-300 to-emerald-600"></div>
                        
                        {phases.map((phase, index) => (
                            <motion.div
                                key={phase.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeInUp}
                                className="mb-16 relative"
                            >
                                <div className={`flex flex-col md:flex-row items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 z-10">
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white",
                                            colorVariants[phase.color].icon
                                        )}>
                                            <phase.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    
                                    <div className={cn(
                                        "md:w-5/12",
                                        index % 2 === 1 ? 'md:pr-16 ml-auto text-right' : 'md:pl-16'
                                    )}>
                                        <div className={cn(
                                            "bg-background rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border",
                                            index % 2 === 0 ? 'ml-4 md:ml-0' : 'mr-4 md:mr-0',
                                            "border-border"
                                        )}>
                                            <div className="p-6">
                                                <div className={cn(
                                                    "inline-block px-3 py-1 rounded-full text-sm font-medium mb-3",
                                                    "bg-primary/10 text-primary"
                                                )}>
                                                    {phase.date}
                                                </div>
                                                <h3 className={cn(
                                                    "text-xl font-bold mb-3",
                                                    "text-foreground"
                                                )}>
                                                    Phase {phase.id} : {phase.title}
                                                </h3>
                                                {phase.lieu && (
                                                    <p className="text-gray-700 flex items-center gap-2 mb-4">
                                                        <Target className="w-4 h-4" />
                                                        {phase.lieu}
                                                    </p>
                                                )}
                                                <ul className="space-y-2">
                                                    {phase.activites.map((activite, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-gray-700">
                                                            <div className={cn(
                                                                "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                                                                colorVariants[phase.color].line
                                                            )}></div>
                                                            <span>{activite}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden bg-gradient-fonij">
                <div className="absolute inset-0 bg-grid-white/10 opacity-20"></div>
                <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold text-background sm:text-4xl">
                            Prêt à relever le défi ?
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-background/80">
                            Saisissez cette opportunité unique de développer votre projet entrepreneurial 
                            et de bénéficier d'un accompagnement d'exception !
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a 
                                href={route('candidater')}
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-background px-8 py-4 font-medium text-primary shadow-lg transition-all duration-300 hover:bg-background/90 hover:shadow-xl"
                            >
                                <span>Déposer ma candidature</span>
                                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a 
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-background px-8 py-4 font-medium text-background transition-all duration-300 hover:bg-background/10"
                            >
                                Nous contacter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}