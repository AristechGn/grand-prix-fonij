import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, CheckCircle, Clock, Users, MapPin, Trophy, Target, Sparkles, Zap, BookOpen, Award, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

const programmes = [
    {
        id: 1,
        title: "SMART Entrepreneur",
        description: "De l'idée au projet structuré. Ce programme aide les jeunes à clarifier leurs idées et à bâtir un projet solide dès le départ. Vous apprendrez comment transformer une idée en projet concret, définir un problème réel à résoudre dans la société, et poser les bases d'un modèle économique viable. Ce que vous gagnez : une vision claire, des bases solides, et la motivation pour aller plus loin.",
        icon: Award,
        features: [
            "Transformer une idée en projet concret",
            "Définir un problème réel à résoudre",
            "Poser les bases d'un modèle économique",
            "Mise au point du pitch",
            "Stratégie digitale",
            "Plan d'action commerciale"
        ],
        duration: "3 mois",
        color: "from-green-400 to-emerald-600",
        textColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        image: "https://img.freepik.com/free-photo/startup-business-problem-solving-meeting-concept_53876-167092.jpg?t=st=1742318294~exp=1742321894~hmac=e1c2f249a3c9ba0ea9e42c5036cbef8c36f9430d4fd5c73f3144e35b2cfb7f14&w=1380"
    },
    {
        id: 2,
        title: "Youth'Incuba",
        description: "Incuber votre projet, le faire grandir. Cette phase vous offre un accompagnement personnalisé pour développer votre solution, créer un prototype et tester votre projet dans des conditions réelles. Nous vous offrons un coaching individuel avec des experts, l'accès à un espace de travail dynamique, des formations spécialisées et un accompagnement à la création du MVP. Ce que vous gagnez : un projet structuré, testé et prêt à affronter le monde réel.",
        icon: BookOpen,
        features: [
            "Coaching individuel avec des experts",
            "Accès à un espace de travail dynamique",
            "Formations en gestion et marketing",
            "Développement du MVP",
            "Tests en conditions réelles"
        ],
        duration: "6 mois",
        color: "from-blue-400 to-indigo-600",
        textColor: "text-blue-600",
        bgColor: "bg-blue-50",
        image: "https://img.freepik.com/free-photo/business-people-discussing-company-data-tablet_53876-102425.jpg?t=st=1742318403~exp=1742322003~hmac=49c48faab6e28a9f6abe5f1b881e296fcaaa6bfa3f2f98f0ce9c4827a4eb7d5b&w=1380"
    },
    {
        id: 3,
        title: "Boost Entrepreneurs",
        description: "Accélérer le lancement de votre entreprise. C'est la dernière étape pour les projets matures prêts à décoller. Vous serez préparé à présenter votre projet à des investisseurs et à intégrer les réseaux d'entrepreneurs. Nous mettons à votre disposition un accompagnement à la levée de fonds, un coaching avancé en stratégie et croissance, et une préparation au pitch. Ce que vous gagnez : une entreprise prête à se lancer sur le marché, trouver ses clients, et créer de l'emploi.",
        icon: Zap,
        features: [
            "Accompagnement à la levée de fonds",
            "Coaching avancé en stratégie",
            "Participation à des événements de networking",
            "Préparation au pitch pour investisseurs",
            "Affinage du modèle économique"
        ],
        duration: "12 mois",
        color: "from-purple-400 to-violet-600",
        textColor: "text-purple-600",
        bgColor: "bg-purple-50",
        image: "https://img.freepik.com/free-photo/business-people-office-meeting_23-2148908929.jpg?t=st=1742318380~exp=1742321980~hmac=ea4fd56a0b52ae6b81e1d0a5b8e2129cd5e9ae6d83fb2577b5a9ea47c78f8c75&w=1380"
    }
];

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

// Impact Global du Programme d'Accélération
const impactGlobal = {
    title: "Notre Impact",
    points: [
        "Plus de 160 projets accompagnés à travers la Guinée",
        "Des jeunes de toutes les régions formés, accompagnés et valorisés",
        "Des dizaines d'emplois créés grâce à des projets issus du programme",
        "Une visibilité médiatique nationale (TV, radio, web)",
        "Une forte promotion de l'entrepreneuriat féminin et inclusif"
    ],
    summary: "Le Grand Prix FONIJ est votre tremplin pour passer à l'action. Nos programmes sont pensés pour vous accompagner étape par étape, jusqu'à la réussite."
};

export default function Accompagnement() {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
            {/* Hero Section avec overlay */}
            <div className="relative bg-gradient-fonij py-16 md:py-24">
                <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/perspective-grid-pattern_1409-1826.jpg')] bg-cover bg-no-repeat opacity-10"></div>
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-block bg-background/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-background mb-6">
                            DÉVELOPPEZ VOTRE ENTREPRISE
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-background mb-6">
                            Programmes d'Accélération FONIJ
                        </h1>
                        <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
                            Accompagner les jeunes vers le succès entrepreneurial. Un parcours complet pour transformer votre idée en une entreprise solide et durable.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <Link 
                                href="#programmes"
                                className="px-6 py-3 bg-background text-primary font-medium rounded-full hover:shadow-lg transition-all"
                            >
                                Découvrir nos programmes
                            </Link>
                            <Link 
                                href="/contact"
                                className="px-6 py-3 bg-transparent border border-background text-background font-medium rounded-full hover:bg-background/10 transition-all"
                            >
                                Nous contacter
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bande d'infos */}
            <div className="bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 py-4 text-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-background/70" />
                            <span>3 à 12 mois d'accompagnement</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-background/70" />
                            <span>Conakry, Guinée</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-background/70" />
                            <span>+250 Entrepreneurs accompagnés</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-background/70" />
                            <span>3 Parcours spécialisés</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section présentation et compteur */}
            <div className="relative py-24 bg-background overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/perspective-grid-pattern_1409-1826.jpg?t=st=1742299998~exp=1742303598~hmac=464dc3235d10687053fa3b8ea6dc31a56e4b1bdfbc504e7fabc13067dbe31a84&w=1380')] bg-cover bg-no-repeat opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* À propos */}
                        <div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                                    POURQUOI NOUS REJOINDRE
                                </div>
                                <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
                                    Développez votre projet avec un <span className="text-primary">accompagnement d'excellence</span>
                                </h2>
                                <div className="w-24 h-1 bg-primary mb-8"></div>
                                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                    Les programmes d'accélération du FONIJ offrent aux entrepreneurs guinéens un parcours structuré pour développer
                                    leur projet, de l'idée jusqu'à la croissance. Notre approche combine formation, mentorat et réseautage.
                                </p>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    Chaque participant bénéficie d'un suivi personnalisé, d'ateliers pratiques et d'un accès privilégié à un réseau
                                    d'experts et d'investisseurs locaux et internationaux.
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Objectif</h4>
                                            <p className="text-muted-foreground">Pérennisation des entreprises</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-4">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Bénéfice</h4>
                                            <p className="text-muted-foreground">Taux de réussite de 87%</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Compteur d'intérêt */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="relative"
                        >
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full"></div>
                            <div className="bg-background rounded-2xl shadow-2xl border border-border p-10 relative">
                                <h3 className="text-3xl font-bold text-foreground mb-8">Rejoignez notre communauté</h3>
                                <div className="mb-10">
                                    <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-fonij rounded-full transition-all duration-1000"
                                            style={{ width: `${(participants.count / participants.target) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                        <span>0 entrepreneurs</span>
                                        <span>{participants.target} places disponibles</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-primary mb-2">{participants.count}</div>
                                    <p className="text-muted-foreground mb-8">Entrepreneurs déjà inscrits pour 2025</p>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="/inscription"
                                        className="inline-flex items-center justify-center px-6 py-4 bg-primary text-background font-medium rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                                    >
                                        S'inscrire maintenant
                                    </Link>
                                </div>
                                <div className="mt-6 text-center text-sm text-muted-foreground">
                                    Inscriptions ouvertes jusqu'au 15 septembre 2025
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-80 h-80 bg-primary opacity-5 rounded-full"></div>
                    <div className="absolute top-40 left-10 w-40 h-40 bg-primary opacity-5 rounded-full"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary opacity-5 rounded-full"></div>
                </div>
            </div>

            {/* Programmes Cards */}
            <div id="programmes" className="py-24 bg-gradient-to-b from-background to-muted relative overflow-hidden">
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
                            NOS PROGRAMMES
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Choisissez votre parcours d'accélération
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Découvrez les différents programmes conçus pour accompagner chaque étape 
                            de votre développement entrepreneurial
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programmes.map((programme, index) => (
                            <motion.div
                                key={programme.id}
                                className="bg-background rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/40"
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
                                        <programme.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-4">{programme.title}</h3>
                                    <p className="text-muted-foreground mb-6">{programme.description}</p>
                                    <div className="space-y-3 mb-8">
                                        {programme.features.slice(0, 3).map((feature, i) => (
                                            <div key={i} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                                <span className="text-foreground/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center text-sm text-primary">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span className="font-medium">{programme.duration}</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">12 places disponibles</span>
                                    </div>
                                    <Link href={`/programmes/${programme.id}`} className="inline-flex w-full items-center justify-center px-5 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-medium">
                                        En savoir plus
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Témoignages */}
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
                            TÉMOIGNAGES
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            Ce qu'en disent nos participants
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Découvrez comment nos programmes ont aidé des entrepreneurs à développer leur activité
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-background rounded-xl shadow-md p-8 relative border border-border"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-primary text-4xl mb-4">"</div>
                                <p className="text-muted-foreground mb-6 italic">{testimonial.quote}</p>
                                <div className="flex items-center">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Stats */}
            <div className="py-16 bg-muted">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "87%", label: "Taux de réussite", icon: Target },
                            { value: "250+", label: "Entrepreneurs accompagnés", icon: Users },
                            { value: "3", label: "Programmes spécialisés", icon: BookOpen },
                            { value: "12", label: "Mois max. d'accompagnement", icon: Calendar }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-background p-6 rounded-xl text-center shadow-sm border border-border/40"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
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

            {/* Impact Global du Programme d'Accélération */}
            <div className="py-24 bg-muted">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
                            NOTRE IMPACT
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-6">
                            {impactGlobal.title}
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
                        
                        <div className="flex flex-col items-center justify-center mb-10">
                            {impactGlobal.points.map((point, index) => (
                                <div key={index} className="flex items-center bg-background py-3 px-6 rounded-lg shadow-sm mb-3 max-w-xl w-full border border-border/40">
                                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-foreground/80">{point}</span>
                                </div>
                            ))}
                        </div>
                        
                        <p className="text-lg text-foreground font-medium max-w-3xl mx-auto">
                            {impactGlobal.summary}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section amélioré */}
            <div className="relative bg-gradient-fonij py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-background sm:text-4xl mb-6">
                            Rejoignez le Mouvement
                        </h2>
                        <p className="text-lg text-background/80 max-w-2xl mx-auto mb-10">
                            Vous avez une idée, un rêve, ou un projet ? C'est le moment. Transformez votre vision en impact réel.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link
                                href="/candidater"
                                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-primary bg-background hover:bg-background/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Postulez dès maintenant
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 border border-background text-lg font-medium rounded-xl text-background hover:bg-background/10 transition-all duration-300"
                            >
                                En savoir plus
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 