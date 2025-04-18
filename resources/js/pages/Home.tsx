import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Award, BookOpen, Laptop, Sprout, ChevronRight, CheckCircle, Trophy, Calendar, MapPin, Clock, User, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

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
        { nom_complet: "Membre du juri 1", photo: "https://fonijguinee.org/wp-content/uploads/2024/12/DSC06175-500x500.jpg", post:"ADMINSTRATEUR - INCUBA", countrie:"GUINEE", description: "Accueil et enregistrement des participants" },
        { nom_complet: "Membre du juri 2", photo: "https://fonijguinee.org/wp-content/uploads/2025/01/FONIJ-14-500x500.jpg", post:"RESPONSABLE IT - CGUITECH", countrie:"GUINEE", description: "Accueil des participants et installation des stands" },
        { nom_complet: "Membre du juri 3", photo: "https://fonijguinee.org/wp-content/uploads/2025/01/76ab3ee7-520f-4843-af77-5b3b510846b0-500x500.jpeg", post:"COMPTABLE - GUINEE ACCOMPTE", countrie:"GUINEE", description: "Message de bienvenue et introduction du jury" },
        { nom_complet: "Membre du juri 4", photo: "https://fonijguinee.org/wp-content/uploads/2022/10/FONIJ-29-300x208-1.jpg", post:"DIRECTEUR GENERAl - FONIJ", countrie:"GUINEE", description: "Invitation de nos partenaires pour présenter leurs activités" },
        // { nom_complet: "Membre du juri 5", photo: "https://fonijguinee.org/wp-content/uploads/2023/05/DSC06167-500x500.jpg", post:"", countrie:"", description: "Discussion sur l'écosystème entrepreneurial en Guinée" },
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

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Extraire l'année de l'édition actuelle
    const currentYear = edition ? edition.year : new Date().getFullYear();

    return (
        <MainLayout>
            {/* Hero Section améliorée pour afficher l'image exactement comme la référence */}
            <div className="w-full bg-primary flex justify-center items-center">
                <div className="w-full max-h-screen overflow-hidden justify-center mx-auto items-center">
                    <img 
                        src="/images/fonij/cover.jpg"
                        alt="Grand Prix FONIJ"
                        className="mx-auto w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Bande d'infos */}
            <div className="relative z-20 mx-4 sm:mx-8 lg:mx-auto w-full">
                <div className="bg-gradient-fonij hover:bg-primary-900 shadow-xl transition-all duration-300 py-4 text-white">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-primary-light" />
                                <span>Du {dateEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au {dateFinalEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-primary-light" />
                                <span>Conakry, Guinée</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-primary-light" />
                                <span>+1000 Participants</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Trophy className="h-5 w-5 text-primary-light" />
                                <span>5 Prix Majeurs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section SIMANDOU */}
            <section className="py-16 bg-gradient-to-r from-primary-dark to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-full max-w-4xl animate-[pulse_4s_ease-in-out_infinite]">
                            <img
                                src="/images/simandou2024.png"
                                alt="Programme SIMANDOU 2040"
                                className="w-[full] h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Compteur et Présentation - inspiré de GFW */}
            <div className="py-24 bg-white relative overflow-hidden border-b">
                <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/perspective-grid-pattern_1409-1826.jpg?t=st=1742299998~exp=1742303598~hmac=464dc3235d10687053fa3b8ea6dc31a56e4b1bdfbc504e7fabc13067dbe31a84&w=1380')] bg-cover bg-no-repeat opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* À propos amélioré */}
                        <div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                                    ÉDITION {currentYear}
                                </div>
                                <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
                                    Rejoignez le mouvement de <span className="text-primary">l'innovation entrepreneuriale</span> en Guinée
                                </h2>
                                <div className="w-24 h-1 bg-primary mb-8"></div>
                                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                    Le Grand Prix FONIJ est le rendez-vous incontournable de l'entrepreneuriat jeune en Guinée.
                                    Initié par le Fonds National pour l'Insertion des Jeunes (FONIJ), cet événement distingue et
                                    récompense les initiatives exceptionnelles pour la promotion de l'esprit d'entreprise.
                                </p>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    Notre objectif est de rassembler les jeunes entrepreneurs, les investisseurs et les décideurs
                                    politiques pour discuter des dernières tendances en matière d'innovation et de développement économique.
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Lieu</h4>
                                            <p className="text-primary-light">Conakry, Guinée</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Date</h4>
                                            <p className="text-primary-light">Du {dateEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au {dateFinalEvenement.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Compteur amélioré */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="relative"
                        >
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full opacity-30"></div>
                            <div className="bg-white rounded-2xl shadow-2xl border border-primary/10 p-10 relative">
                                <h3 className="text-3xl font-bold text-foreground mb-8">Fin des inscriptions dans</h3>
                                <p className="text-base text-muted-foreground mb-6">Jusqu'au {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl shadow text-center">
                                        <div className="text-4xl font-bold text-primary">{timeLeft.days.toString().padStart(2, '0')}</div>
                                        <div className="text-xs font-medium text-primary-dark mt-2">Jours</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl shadow text-center">
                                        <div className="text-4xl font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}</div>
                                        <div className="text-xs font-medium text-primary-dark mt-2">Heures</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl shadow text-center">
                                        <div className="text-4xl font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                                        <div className="text-xs font-medium text-primary-dark mt-2">Minutes</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl shadow text-center">
                                        <div className="text-4xl font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                                        <div className="text-xs font-medium text-primary-dark mt-2">Secondes</div>
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-center">
                                    <a
                                        href={route('candidater')}
                                        className="inline-flex items-center justify-center px-6 py-4 bg-primary text-background font-medium rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                                    >
                                        S'inscrire maintenant
                                    </a>
                                </div>
                                <div className="mt-6 text-center text-sm text-muted-foreground">
                                    Vous pouvez vous inscrire avant la fin du compte à rebours
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-80 h-80 bg-primary opacity-5 rounded-full"></div>
                    <div className="absolute top-40 left-10 w-40 h-40 bg-primary-dark opacity-5 rounded-full"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary-light opacity-5 rounded-full"></div>
                </div>
            </div>

            {/* Section Catégories du Concours - design modernisé inspiré de GFW */}
            <div className="py-24 bg-gradient-to-b from-white to-primary relative overflow-hidden">
                <div className="absolute top-20 inset-x-0 h-90 bg-[url('https://img.freepik.com/free-vector/hand-drawn-abstract-outline-background_23-2150715642.jpg?t=st=1742300857~exp=1742304457~hmac=bccdd6664f4e76a1cda416c6cd11ee5497723564fc2afe1818ac23ff1ddd305a&w=1380')] bg-repeat-x opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            PARTICIPEZ AU CONCOURS
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Catégories du Grand Prix
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Découvrez les différentes catégories pour lesquelles vous pouvez candidater
                            et montrer votre talent entrepreneurial
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Promotion de l'esprit d'entreprise",
                                description: "Initiatives visant à promouvoir une culture entrepreneuriale",
                                icon: Award,
                                criteria: [
                                    "Création d'emplois",
                                    "Innovation dans le secteur",
                                    "Impact communautaire"
                                ],
                                color: "from-green-400 to-primary"
                            },
                            {
                                title: "Éducation aux compétences",
                                description: "Formation et développement des compétences entrepreneuriales",
                                icon: BookOpen,
                                criteria: [
                                    "Programmes de mentorat",
                                    "Formation technique",
                                    "Accès aux marchés"
                                ],
                                color: "from-blue-400 to-indigo-600"
                            },
                            {
                                title: "Transition numérique",
                                description: "Innovation et transformation digitale",
                                icon: Laptop,
                                criteria: [
                                    "Solutions technologiques",
                                    "Accessibilité numérique",
                                    "Impact économique"
                                ],
                                color: "from-purple-400 to-violet-600"
                            },
                            {
                                title: "Entrepreneuriat agricole",
                                description: "Projets agricoles durables et innovants",
                                icon: Sprout,
                                criteria: [
                                    "Pratiques durables",
                                    "Sécurité alimentaire",
                                    "Adaptation climatique"
                                ],
                                color: "from-yellow-400 to-amber-600"
                            }
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                                whileHover={{ y: -10 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, delay: index * 0.1 }
                                    }
                                }}
                            >
                                <div className={`h-2 bg-gradient-fonij`}></div>
                                <div className="p-8">
                                    <div className="bg-primary/10 p-4 rounded-xl inline-flex items-center justify-center w-16 h-16 mb-6">
                                        <category.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-4">{category.title}</h3>
                                    <p className="text-muted-foreground mb-6">{category.description}</p>
                                    <div className="space-y-3 mb-8">
                                        {category.criteria.map((criterion, i) => (
                                            <div key={i} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                                <span className="text-foreground">{criterion}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href={`/categories/${index + 1}`} className="inline-flex items-center px-5 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium">
                                        En savoir plus
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sponsors avec design amélioré */}
            <div className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/flat-black-white-halftone-background_23-2150550147.jpg?t=st=1742300094~exp=1742303694~hmac=a69654010f82a68b4035be03bb84816dfb54215fdc3f172dd5deb10cf750258b&w=1380')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            ILS NOUS SOUTIENNENT
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Nos Partenaires
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Le Grand Prix FONIJ est soutenu par des organisations prestigieuses
                            qui partagent notre vision de l'entrepreneuriat en Guinée
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
                        {[...Array(5)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { delay: index * 0.1 } }
                                }}
                            >
                                <img src={`http://ambaguitokyo.org/wp-content/uploads/2023/07/Japan-Guinea-fond-blan-1.jpg`} alt={`Sponsor ${index + 1}`}
                                    className="max-h-16 transition-opacity hover:opacity-80" />
                            </motion.div>
                        ))}
                    </div>
                    {/* <div className="text-center mt-10">
                        <Link href="/sponsors" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                            Voir tous nos partenaires
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Jury avec design amélioré */}
            <div className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/circuit-pattern.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            PANEL D'EXPERTS
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Membres du Jury
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Un panel d'experts reconnus pour évaluer les projets entrepreneuriaux
                            et sélectionner les plus innovants
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {membresJuries.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                                whileHover={{ y: -10 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, delay: index * 0.1 }
                                    }
                                }}
                            >
                                <div className="relative h-80 w-full overflow-hidden">
                                    <img
                                        src={item.photo}
                                        alt={`Membre du jury ${item.nom_complet}`}
                                        className="w-full h-full object-cover object-center transition-transform duration-500 transform hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                        <div className="p-6 text-white">
                                            <h3 className="font-bold text-xl mb-1">{item.nom_complet}</h3>
                                            <p className="text-secondary font-medium text-sm">{item.post}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-muted-foreground mb-4">{item.description}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-primary-light text-sm">{item.countrie}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Agenda modernisé */}
            <div id="agenda" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            PROGRAMME
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Agenda Grand Prix FONIJ {currentYear}
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Découvrez le programme complet de l'événement sur deux jours
                        </p>
                    </motion.div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="flex border-b">
                            <button className="flex-1 py-5 font-medium text-center bg-primary text-background">JOUR 1</button>
                            <button className="flex-1 py-5 font-medium text-center text-muted-foreground hover:bg-muted">JOUR 2</button>
                        </div>
                        <div className="p-8">
                            {[
                                { time: "08h00 - 09h00", event: "Arrivée des invités & Check-in", description: "Accueil et enregistrement des participants" },
                                { time: "09h00 - 09h30", event: "Bienvenue/Installation", description: "Accueil des participants et installation des stands" },
                                { time: "10h00 - 10h15", event: "Discours de Bienvenue", description: "Message de bienvenue et introduction du jury" },
                                { time: "10h15 - 10h45", event: "Keynotes de nos Partenaires", description: "Invitation de nos partenaires pour présenter leurs activités" },
                                { time: "11h00 - 12h00", event: "Panel 1 : Vue globale de l'Écosystème Entrepreneurial Guinéen", description: "Discussion sur l'écosystème entrepreneurial en Guinée" },
                                { time: "12h00 - 13h00", event: "Pause Déjeuner Visite Officielle des Stands", description: "Pause déjeuner et visite des stands des partenaires" },
                            ].map((item, index) => (
                                <div key={index} className="flex py-4 border-b border-gray-100 last:border-0">
                                    <div className="w-36 font-medium text-primary">{item.time}</div>
                                    <div className="flex-1 text-foreground">{item.event}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Programme d'Accélération - avec style card GFW */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                            Programme d'Accélération
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Un accompagnement complet en trois phases pour assurer le succès de votre projet entrepreneurial
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "SMART Entrepreneur",
                                description: "Destiné aux porteurs de projet pour les aider à structurer leur idée et sécuriser le lancement de leur activité.",
                                duration: "3 mois",
                                steps: ["Élaboration du business plan", "Identification du potentiel", "Construction du pitch"]
                            },
                            {
                                title: "Youth'Incuba",
                                description: "Pour les entrepreneurs avancés qui souhaitent prototyper et obtenir rapidement une preuve de concept.",
                                duration: "6 mois",
                                steps: ["Validation de l'idée", "Découverte des réseaux", "Développement du MVP"]
                            },
                            {
                                title: "Boost Entrepreneur",
                                description: "Un accélérateur dédié aux jeunes dirigeants pour développer et booster leurs activités.",
                                duration: "12 mois",
                                steps: ["Restructuration du plan d'action", "Optimisation de la gestion", "Affinement de la stratégie commerciale"]
                            }
                        ].map((phase, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 relative"
                                whileHover={{ y: -10 }}
                            >
                                <div className="absolute top-4 right-4 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                                    <span className="text-primary">{phase.title}</span>
                                </h3>
                                <div className="flex items-center mb-4 text-sm text-primary-dark">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Durée : {phase.duration}</span>
                                </div>
                                <p className="text-muted-foreground mb-6">{phase.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {phase.steps.map((step, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 border-t border-gray-100">
                                    <Link href={`/acceleration/${index + 1}`} className="inline-flex items-center text-primary hover:text-primary-dark">
                                        Détails du programme
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Stats - avec style GFW */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "164", label: "Projets en compétition", icon: User },
                            { value: "4", label: "Catégories", icon: Award },
                            { value: "5", label: "Prix majeurs", icon: Trophy },
                            { value: "35", label: "Âge maximum", icon: User }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-primary/10 p-6 rounded-xl text-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-primary-dark mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section CTA - avec le style GFW */}
            <div className="relative bg-primary py-20">
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/30 rounded-full"></div>
                    <div className="absolute top-20 left-90 w-64 h-64 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/30 rounded-full"></div>
                </div>
                
                <div className="absolute inset-0 bg-grid-white/[0.5] bg-[length:16px_16px]" />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                            Prêt à participer au Grand Prix FONIJ ?
                        </h2>
                        <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-10">
                            Rejoignez la communauté des entrepreneurs innovants et contribuez au développement de la Guinée.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link
                                href="/candidater"
                                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-primary bg-background hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Déposer ma candidature
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 border border-background text-lg font-medium rounded-xl text-background hover:bg-background/10 transition-all duration-300"
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