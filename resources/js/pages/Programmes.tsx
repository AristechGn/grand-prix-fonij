import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, CheckCircle, Clock, Users, ArrowRight, MapPin, Trophy, Target, Sparkles, Zap, BookOpen, Award, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

const programmes = [
    {
        id: 1,
        title: "SMART Entrepreneur",
        description: "Programme destiné aux porteurs de projet pour les aider à démarrer et sécuriser le lancement de leur activité.",
        icon: Award,
        features: [
            "Formalisation du business plan",
            "Test sur le terrain du produit ou service",
            "Choix du statut juridique",
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
        description: "Programme d'incubation pour prototyper et obtenir rapidement une preuve de concept.",
        icon: BookOpen,
        features: [
            "Validation de l'idée d'entreprise",
            "Découverte des réseaux et aides spécifiques",
            "Développement du MVP",
            "Définition du business modèle",
            "Développement des capacités de pitch"
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
        description: "Programme d'accélération pour développer et booster les activités des jeunes dirigeants d'entreprise.",
        icon: Zap,
        features: [
            "Restructuration du plan d'action",
            "Optimisation de la gestion",
            "Affinement de la stratégie commerciale",
            "Développement du pitch",
            "Accompagnement personnalisé"
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

export default function Programmes() {
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
            {/* Hero Section avec overlay vert */}
            <div className="relative bg-gradient-to-r from-[#026200] to-[#024C00] py-16 md:py-24">
                <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/perspective-grid-pattern_1409-1826.jpg')] bg-cover bg-no-repeat opacity-10"></div>
                <div className="container mx-auto px-4 md:px-8 relative">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-white mb-6">
                            DÉVELOPPEZ VOTRE ENTREPRISE
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Programmes d'Accélération FONIJ
                        </h1>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            Des parcours d'accompagnement sur mesure pour transformer votre idée en entreprise prospère
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <Link 
                                href="#programmes"
                                className="px-6 py-3 bg-white text-[#026200] font-medium rounded-full hover:shadow-lg transition-all"
                            >
                                Découvrir nos programmes
                            </Link>
                            <Link 
                                href="/contact"
                                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-all"
                            >
                                Nous contacter
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bande d'infos */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-md hover:shadow-lg transition-all duration-200 py-4 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-emerald-300" />
                            <span>3 à 12 mois d'accompagnement</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-emerald-300" />
                            <span>Conakry, Guinée</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-emerald-300" />
                            <span>+250 Entrepreneurs accompagnés</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-emerald-300" />
                            <span>3 Parcours spécialisés</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section présentation et compteur */}
            <div className="relative py-24 bg-white relative overflow-hidden border-b">
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
                                <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                                    POURQUOI NOUS REJOINDRE
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                    Développez votre projet avec un <span className="text-emerald-600">accompagnement d'excellence</span>
                                </h2>
                                <div className="w-24 h-1 bg-emerald-500 mb-8"></div>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Les programmes d'accélération du FONIJ offrent aux entrepreneurs guinéens un parcours structuré pour développer
                                    leur projet, de l'idée jusqu'à la croissance. Notre approche combine formation, mentorat et réseautage.
                                </p>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Chaque participant bénéficie d'un suivi personnalisé, d'ateliers pratiques et d'un accès privilégié à un réseau
                                    d'experts et d'investisseurs locaux et internationaux.
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Objectif</h4>
                                            <p className="text-gray-600">Pérennisation des entreprises</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Bénéfice</h4>
                                            <p className="text-gray-600">Taux de réussite de 87%</p>
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
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100 rounded-full opacity-30"></div>
                            <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 p-10 relative">
                                <h3 className="text-3xl font-bold text-gray-900 mb-8">Rejoignez notre communauté</h3>
                                <div className="mb-10">
                                    <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000"
                                            style={{ width: `${(participants.count / participants.target) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                                        <span>0 entrepreneurs</span>
                                        <span>{participants.target} places disponibles</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-emerald-600 mb-2">{participants.count}</div>
                                    <p className="text-gray-600 mb-8">Entrepreneurs déjà inscrits pour 2025</p>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="/inscription"
                                        className="inline-flex items-center justify-center px-6 py-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                                    >
                                        S'inscrire maintenant
                                    </Link>
                                </div>
                                <div className="mt-6 text-center text-sm text-gray-500">
                                    Inscriptions ouvertes jusqu'au 15 septembre 2025
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500 opacity-5 rounded-full"></div>
                    <div className="absolute top-40 left-10 w-40 h-40 bg-emerald-700 opacity-5 rounded-full"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-emerald-300 opacity-5 rounded-full"></div>
                </div>
            </div>

            {/* Programmes Cards */}
            <div id="programmes" className="py-24 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
                <div className="absolute top-20 inset-x-0 h-90 bg-[url('https://img.freepik.com/free-vector/hand-drawn-abstract-outline-background_23-2150715642.jpg?t=st=1742300857~exp=1742304457~hmac=bccdd6664f4e76a1cda416c6cd11ee5497723564fc2afe1818ac23ff1ddd305a&w=1380')] bg-repeat-x opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                            NOS PROGRAMMES
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Choisissez votre parcours d'accélération
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Découvrez les différents programmes conçus pour accompagner chaque étape 
                            de votre développement entrepreneurial
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programmes.map((programme, index) => (
                            <motion.div
                                key={programme.id}
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
                                <div className={`h-2 bg-gradient-to-r ${programme.color}`}></div>
                                <div className="p-8">
                                    <div className="bg-emerald-100 p-4 rounded-xl inline-flex items-center justify-center w-16 h-16 mb-6">
                                        <programme.icon className="h-8 w-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{programme.title}</h3>
                                    <p className="text-gray-600 mb-6">{programme.description}</p>
                                    <div className="space-y-3 mb-8">
                                        {programme.features.slice(0, 3).map((feature, i) => (
                                            <div key={i} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center text-sm text-emerald-600">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span className="font-medium">{programme.duration}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">12 places disponibles</span>
                                    </div>
                                    <Link href={`/programmes/${programme.id}`} className="inline-flex w-full items-center justify-center px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium">
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
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                            TÉMOIGNAGES
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Ce qu'en disent nos participants
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Découvrez comment nos programmes ont aidé des entrepreneurs à développer leur activité
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-8 relative border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-emerald-500 text-4xl mb-4">"</div>
                                <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
                                <div className="flex items-center">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Stats */}
            <div className="py-16 bg-gray-50">
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
                                className="bg-emerald-50 p-6 rounded-xl text-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <stat.icon className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="text-4xl font-bold text-emerald-600">{stat.value}</div>
                                <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comment ça marche */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                            MÉTHODOLOGIE
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Comment fonctionnent nos programmes
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Une approche structurée en 4 phases pour maximiser vos chances de réussite
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[
                            { 
                                number: "01", 
                                title: "Diagnostic", 
                                description: "Évaluation approfondie de votre projet et identification des besoins spécifiques",
                                icon: <Info className="h-8 w-8 text-white" />,
                                color: "from-blue-400 to-blue-600"
                            },
                            { 
                                number: "02", 
                                title: "Formation", 
                                description: "Ateliers pratiques et séminaires théoriques adaptés à votre niveau et à votre secteur",
                                icon: <BookOpen className="h-8 w-8 text-white" />,
                                color: "from-emerald-400 to-emerald-600"
                            },
                            { 
                                number: "03", 
                                title: "Mentorat", 
                                description: "Accompagnement individuel par des experts et entrepreneurs expérimentés",
                                icon: <Users className="h-8 w-8 text-white" />,
                                color: "from-amber-400 to-amber-600"
                            },
                            { 
                                number: "04", 
                                title: "Networking", 
                                description: "Mise en relation avec des partenaires, investisseurs et autres entrepreneurs",
                                icon: <Target className="h-8 w-8 text-white" />,
                                color: "from-purple-400 to-purple-600"
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
                                <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                                    {step.icon}
                                </div>
                                <div className="bg-white rounded-xl shadow-md p-6 pl-16 pt-14 border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-2">{step.number}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 left-full w-12 h-2 -translate-y-1/2 -translate-x-6">
                                        <div className="w-full h-0.5 bg-gray-200 relative">
                                            <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-gray-200 transform rotate-45"></div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section - avec le style de Home.tsx */}
            <div className="relative bg-emerald-600 py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                            Prêt à développer votre projet avec le FONIJ ?
                        </h2>
                        <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-10">
                            Rejoignez l'un de nos programmes d'accélération et bénéficiez d'un accompagnement sur mesure pour réussir votre aventure entrepreneuriale.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link
                                href="/candidater"
                                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-emerald-600 bg-white hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Déposer ma candidature
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-300"
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