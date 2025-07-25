import {
    Linkedin,
    Twitter,
    Facebook,
    Award,
    BookOpen,
    Laptop,
    Sprout,
    Trophy,
    Zap,
    Youtube,
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
            title: "SMART Entrepreneur",
            slug: "smart-entrepreneur",
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
            image: "/images/programmes/SMART-Entrepreneur.jpg"
        },
        {
            id: 2,
            title: "Youth'Incuba",
            slug: "youth-incuba",
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
            image: "/images/programmes/Youth-Incuba.jpg"
        },
        {
            id: 3,
            title: "Boost Entrepreneurs",
            slug: "boost-entrepreneurs",
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
            image: "/images/programmes/Boost-Entrepreneurs.jpg"
        }
    ],
    partners: [
        {
            name: "Président de la République",
            image: "/images/partners/presidence.png",
        },
        {
            name: "Ministère de la Jeunesse et des Sports",
            image: "/images/partners/mjs.jpg",
        },
        {
            name: "Ministère du Plan et de la Coopération Internationale",
            image: "/images/partners/ministere-plan.jpg",
        },
        {
            name: "Conseil National de la Transition (CNT)",
            image: "/images/partners/cnt.jpeg",
        },
        {
            name: "Ambassade du Japon en Guinée",
            image: "/images/partners/ambassade-japon.jpg",
        },
    ],
    contactInfo: {
        phone: "+224 612 96 96 96",
        unespace_phone: "+224612969696",
        phones: ["+224 612 96 96 96", "+224 622 02 39 09", "+224 628 86 20 02"],
        unespace_phones: [
            {
                phone: '+224 612 96 96 96',
                unespace_phone: '+224612969696'
            },
            {
                phone: '+224 622 02 39 09',
                unespace_phone: '+224622023909'
            },
            {
                phone: '+224 628 86 20 02',
                unespace_phone: '+224628862002'
            },
        ],
        address: "102-316 Av. de la République, Conakry, Guinée",
        quartier: "Kaloum",
        repere: "Kaloum, en face du Ministère de l'Agriculture et l'élevage",
        repere_map: "https://maps.app.goo.gl/f1WjwZaZrjXzN7ii7",
        hours: {
            weekdays: "08:00 - 17:00",
            saturday: "08:00 - 12:00",
            sunday: "Fermé",
        },

        email: "fonijguinee@gmail.com",
        social: [
            { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/fonijguinee/", color: "blue-600" },
            { name: "Youtube", icon: Youtube, url: "https://www.youtube.com/@fonijguinee3261", color: "red-600" },
            { name: "Twitter", icon: Twitter, url: "https://x.com/FONIJGUINEE", color: "blue-600" },
            { name: "LinkedIn", icon: Linkedin, url: "https://gn.linkedin.com/company/fonij-guin%C3%A9e", color: "blue-600" },
        ],
    },
};