import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Award, Target, Users, BookOpen, GraduationCap, ChevronRight, LightbulbIcon, ArrowUpRight, BrainCircuit } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function APropos() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <MainLayout>
            {/* Hero Section avec parallaxe */}
            <div className="w-full h-screen bg-fixed bg-center bg-cover relative flex items-center justify-center" style={{ backgroundImage: `url('https://simandou2040.gn/wp-content/uploads/2024/12/1bb49b26-eee7-436d-9806-f6eccfcda1f8-2550x1434-1.jpeg')`, }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30"></div>
                <div className="max-w-7xl w-full space-y-6 backdrop-blur-sm bg-black/40 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl z-10 mx-4">
                    <div className="space-y-3 text-center">
                        <span className="text-white/70 font-semibold text-lg md:text-xl uppercase tracking-wider">République de Guinée</span>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                            Grand Prix FONIJ
                        </h1>
                        <p className="text-xl md:text-2xl text-yellow-400 font-semibold tracking-wide">
                            <span className="text-red-500">Innovation</span> • Excellence • <span className="text-primary">Leadership</span>
                        </p>
                    </div>
                </div>
            </div>
            {/* Section Qu'est-ce que le Grand Prix FONIJ ? */}
            <div className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-1 bg-gradient-fonij rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Qu'est-ce que le Grand Prix FONIJ ?</h2>
                        </div>

                        <div className="space-y-6 text-lg text-muted-foreground">
                            <p>
                                Le Grand Prix FONIJ est un concours national porté par le Fonds National pour l'Insertion des Jeunes (FONIJ).
                            </p>
                            <p>
                                Il distingue chaque année les meilleurs projets entrepreneuriaux portés par la jeunesse guinéenne, avec pour objectif de stimuler l'innovation, renforcer l'insertion économique et célébrer l'excellence.
                            </p>
                            <p>
                                Lancé sous l'impulsion des plus hautes autorités du pays, le Grand Prix est devenu la référence en matière de promotion de l'entrepreneuriat en Guinée, avec un processus rigoureux de sélection et un accompagnement complet des lauréats.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-muted/30 p-6 rounded-xl border border-border">
                                <Award className="h-8 w-8 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                                <p className="text-muted-foreground">
                                    Reconnaissance des projets les plus innovants et à fort impact pour le développement de la Guinée.
                                </p>
                            </div>
                            <div className="bg-muted/30 p-6 rounded-xl border border-border">
                                <Target className="h-8 w-8 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Impact</h3>
                                <p className="text-muted-foreground">
                                    Soutien aux initiatives répondant aux enjeux prioritaires du développement national.
                                </p>
                            </div>
                            <div className="bg-muted/30 p-6 rounded-xl border border-border">
                                <Users className="h-8 w-8 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Inclusion</h3>
                                <p className="text-muted-foreground">
                                    Valorisation de la diversité des talents à travers tout le territoire guinéen.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Section Appui présidentiel et institutionnel */}
            <div className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block rounded-full bg-gradient-fonij px-4 py-1 text-sm font-medium text-white mb-6">
                                SOUTIEN AU PLUS HAUT NIVEAU
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Une initiative portée par une vision présidentielle forte
                            </h2>
                            <div className="mx-auto h-1 w-20 bg-gradient-fonij mb-8"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <img
                                    src="https://mjs.gov.gn/file/2024/03/Minstre-HABA1.png"
                                    alt="Président Mamadi Doumbouya"
                                    className="rounded-xl shadow-xl w-full h-auto"
                                />
                            </div>
                            <div className="space-y-6 text-lg text-muted-foreground">
                                <p>
                                    Ce projet s'aligne sur la vision du Président de la République, le Général de Corps d'Armée Mamadi Doumbouya, qui a placé la jeunesse au cœur de la Refondation nationale.
                                </p>
                                <p>
                                    Sous la tutelle du Ministère de la Jeunesse et des Sports, le FONIJ déploie ce projet structurant pour renforcer l'esprit d'entreprise chez les jeunes et favoriser leur contribution active à la construction d'une Guinée moderne et inclusive.
                                </p>
                                <p>
                                    Cette initiative s'inscrit dans la vision globale "Simandou 2040" qui place le développement des compétences et l'innovation au cœur de la transformation économique de la Guinée.
                                </p>
                                <div className="flex items-center gap-4 mt-8">
                                    <img
                                        src="https://mjs.gov.gn/file/2022/09/logo-MJS.png"
                                        alt="Ministère de la Jeunesse et des Sports"
                                        className="h-16 w-auto"
                                    />
                                    <img
                                        src="/images/fonij/logo-transparent.png"
                                        alt="FONIJ"
                                        className="h-16 w-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Section Le mot du Directeur Général du FONIJ */}
            <div className="py-16 md:py-24 bg-gradient-fonij text-white">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block rounded-full bg-white/10 backdrop-blur-sm px-4 py-1 text-sm font-medium text-white mb-6">
                                MESSAGE OFFICIEL
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Le mot du Directeur Général du FONIJ
                            </h2>
                            <div className="mx-auto h-1 w-20 bg-white/50 mb-8"></div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full md:w-1/3">
                                    <img
                                        src="https://fonijguinee.org/wp-content/uploads/2022/10/FONIJ-29-300x208-1.jpg"
                                        alt="Directeur Général du FONIJ"
                                        className="rounded-xl shadow-lg w-full h-auto object-cover aspect-square"
                                    />
                                </div>
                                <div className="w-full md:w-2/3 space-y-6">
                                    <p className="text-2xl text-white/90 italic font-light">
                                        "Le Grand Prix FONIJ n'est pas qu'un concours. C'est un levier de transformation, un incubateur de talents et une plateforme d'impact portée par la jeunesse guinéenne."
                                    </p>
                                    <div className="pt-4">
                                        <p className="font-bold text-xl">Bandjou KOUROUMA</p>
                                        <p className="text-white/80">Directeur Général du FONIJ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Section Objectifs du Grand Prix */}
            <div className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-6">
                                NOTRE MISSION
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Pourquoi le Grand Prix ?
                            </h2>
                            <div className="mx-auto h-1 w-20 bg-primary mb-8"></div>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                                Le Grand Prix FONIJ poursuit plusieurs objectifs stratégiques pour le développement économique et social de la Guinée.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-fonij flex items-center justify-center text-white">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Récompenser les meilleures initiatives jeunes</h3>
                                    <p className="text-muted-foreground">
                                        Identifier et valoriser les projets prometteurs portés par la jeunesse guinéenne dans toutes les régions du pays.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-fonij flex items-center justify-center text-white">
                                    <BrainCircuit className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Promouvoir l'innovation locale</h3>
                                    <p className="text-muted-foreground">
                                        Encourager les solutions créatives et adaptées aux défis spécifiques de la Guinée pour un développement endogène.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-fonij flex items-center justify-center text-white">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Valoriser le leadership féminin et inclusif</h3>
                                    <p className="text-muted-foreground">
                                        Assurer une représentation équitable des femmes et des personnes en situation de handicap dans l'écosystème entrepreneurial.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-fonij flex items-center justify-center text-white">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Créer une dynamique nationale</h3>
                                    <p className="text-muted-foreground">
                                        Fédérer les acteurs publics et privés autour de l'entrepreneuriat jeune pour générer un écosystème favorable à l'innovation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center bg-gradient-fonij rounded-2xl p-8 md:p-12 shadow-xl"
                    >
                        <div className="flex-1 text-white">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Rejoignez l'aventure FONIJ
                            </h3>
                            <p className="text-white/80 mb-6">
                                Participez à l'édition 2025-2026 du Grand Prix et transformez votre idée en une entreprise prospère pour contribuer au développement de la Guinée.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={route('candidater')}
                                    className="group inline-flex items-center justify-center gap-2 bg-gradient-fonij rounded-xl backdrop-blur-xl px-6 py-3 font-medium text-white border bord hover:border-gray-900 shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
                                >
                                    <span>Déposer ma candidature</span>
                                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href={route('deroulement')}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-fonij-gold border border-white px-6 py-3 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-yellow-500"
                                >
                                    Voir le déroulement
                                </Link>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-1/3">
                            <img
                                src="/images/fonij/logo-transparent.png"
                                alt="Logo FONIJ"
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
} 