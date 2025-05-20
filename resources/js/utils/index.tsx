import { link } from 'fs';
import {
    Linkedin,
    Twitter,
    Facebook,
    Award,
    BookOpen,
    Laptop,
    Sprout,
    Trophy,
    Flag,
    LineChart,
    Presentation,
    Book,
    Search,
    Calendar,
} from 'lucide-react';

export const FONIJ = {
    categories: [
        {
            id: 1,
            title: "Promotion de l'esprit d'entreprise",
            slug: "promotion-de-l-esprit-d-entreprise",
            description: "Cette catégorie récompense les initiatives portées par des jeunes qui contribuent activement à diffuser la culture entrepreneuriale, à susciter l’envie d’entreprendre chez leurs pairs, ou à dynamiser l’écosystème local. Elle met en valeur les projets à vocation inclusive, éducative ou inspirante qui créent un environnement favorable à l’entrepreneuriat.",
            icon: Award,
            color: "from-amber-500 to-yellow-500",
            textColor: "text-amber-600",
            image: "/images/categories/1.jpg",
            crochet: "Faire naître l’esprit d’entreprise dans la société\nInspirer et mobiliser la jeunesse à entreprendre\nValoriser les initiatives qui donnent envie d’oser,\nValoriser les initiatives qui donnent envie d’oser",
            crochets: [
                "Faire naître l’esprit d’entreprise dans la société",
                "Inspirer et mobiliser la jeunesse à entreprendre",
                "Valoriser les initiatives qui donnent envie d’oser",
                "Valoriser les initiatives qui donnent envie d’oser",
            ],
        },
        {
            id: 2,
            title: "Éducation aux compétences entrepreneuriales",
            slug: "education-aux-competences-entrepreneuriales",
            description: "Cette catégorie met à l’honneur les projets qui développent les savoir-faire nécessaires à l’entrepreneuriat : gestion, leadership, numérique, marketing, comptabilité, etc. Elle reconnaît aussi les initiatives qui rendent ces compétences accessibles aux jeunes, aux femmes, aux personnes handicapées ou marginalisées.",
            icon: BookOpen,
            color: "from-blue-500 to-indigo-500",
            textColor: "text-blue-600",
            image: "/images/categories/2.jpg",
            crochet: "Former les entrepreneurs de demain\nÉduquer, accompagner, renforcer les capacités\nInclure les plus vulnérables dans la dynamique entrepreneuriale",
            crochets: [
                "Former les entrepreneurs de demain",
                "Éduquer, accompagner, renforcer les capacités",
                "Inclure les plus vulnérables dans la dynamique entrepreneuriale",
            ],
        },
        {
            id: 3,
            title: "Transition numérique",
            slug: "transition-numerique",
            description: "Elle récompense les projets qui utilisent les technologies numériques pour créer, transformer ou améliorer des produits, services ou modèles économiques. Cette catégorie valorise l’innovation technologique comme levier d’impact social et économique.",
            icon: Laptop,
            color: "from-purple-500 to-pink-500",
            textColor: "text-purple-600",
            image: "/images/categories/3.jpg",
            crochets: [
                "Booster l’entrepreneuriat par la tech",
                "Digitaliser pour innover et impacter",
                "Valoriser les solutions numériques made in Guinée",
            ],
        },
        {
            id: 4,
            title: "Entrepreneuriat agricole durable",
            slug: "entrepreneuriat-agricole-durable",
            description: "Cette catégorie est dédiée aux jeunes entrepreneurs du secteur agricole qui s’engagent pour une agriculture innovante, durable, et respectueuse de l’environnement. Elle met en lumière les projets qui assurent sécurité alimentaire, création de revenus en zone rurale, ou réponse aux défis climatiques.",
            icon: Sprout,
            color: "from-green-500 to-emerald-500",
            textColor: "text-green-600",
            image: "/images/categories/4.jpg",
            crochets: [
                "Produire mieux, durablement et localement",
                "Valoriser les ressources rurales avec innovation",
                "Réconcilier agriculture, économie et écologie",
            ],
        },
        {
            id: 5,
            title: "Grand prix du jury (initiative la plus créative)",
            slug: "grand-prix-du-jury-initiative-la-plus-creative",
            description: "Le Grand Prix du jury est attribué à une initiative exceptionnelle, toutes catégories confondues. Il récompense l’audace, la créativité et l’impact global d’un projet qui se démarque par sa vision originale et sa capacité à transformer les choses.",
            icon: Trophy,
            color: "from-red-500 to-orange-500",
            textColor: "text-red-600",
            image: "/images/fonij/logo-transparent.png",
            crochets: [
                "Récompenser l’excellence hors norme",
                "Mettre à l’honneur la créativité entrepreneuriale",
                "Valoriser l’idée qui change la donne",
            ],
        }
    ],
    programmes: [
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
    ],
    partners: [
        {
            name: "Ministère du Plan et de la Coopération Internationale",
            image: "/images/partners/ministere-plan.jpg",
        },
        {
            name: "Ambassade du Japon",
            image: "/images/partners/ambassade-japon.jpg",
        },
        {
            name: "Conseil National de la transition (CNT)",
            image: "/images/partners/cnt.jpeg",
        },
        {
            name: "Ministère de la Jeunesse et des Sports",
            image: "/images/partners/mjs.jpg",
        },
    ],
    contactInfo: {
        phone: "+224 626 754 150",
        phones: ["+224 626 754 150", "+224 622 023 909", "+224 628 862 002"],
        unespace_phones: [
            {
                phone: '+224 626 754 150',
                unespace_phone: '+224626754150'
            },
            {
                phone: '+224 622 023 909',
                unespace_phone: '+224622023909'
            },
            {
                phone: '+224 628 862 002',
                unespace_phone: '+224628862002'
            },
        ],
        address: "Kaloum",
        quartier: "Kaloum",
        repere: "Rond-point de la Gare",
        repere_map: "https://maps.app.goo.gl/1234567890",
        hours: {
            weekdays: "08:00 - 17:00",
            saturday: "08:00 - 12:00",
            sunday: "Fermé",
        },

        email: "fonijguinee@gmail.com",
        social: [
            { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/cguitech" },
            { name: "Twitter", icon: Twitter, url: "https://twitter.com/cguitech" },
            { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/cguitech" },,
        ],
    },
};