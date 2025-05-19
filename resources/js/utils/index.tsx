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
            name: "Ministère du Plan et de la Coopération Internationale",
            image: "/images/partners/ministere-plan.jpg",
        },
        {
            name: "Ministère du Plan et de la Coopération Internationale",
            image: "/images/partners/ministere-plan.jpg",
        },
    ],
    contactInfo: {
        phone: "+224 626 754 150",
        phones: ["+224 626 754 150", "+224 622 023 909", "+224 628 862 002"],
        unespace_phones: ["+224626754150", "+224622023909", "+224628862002"],

        email: "fonijguinee@gmail.com",
        social: [
            { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/cguitech" },
            { name: "Twitter", icon: Twitter, url: "https://twitter.com/cguitech" },
            { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/cguitech" },,
        ],
    },
};