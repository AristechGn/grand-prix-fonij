import MainLayout from '@/layouts/MainLayout';
import CategorieHero from '@/components/CategorieHero';
import { Link } from '@inertiajs/react';
import { Award, BookOpen, Laptop, Sprout, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        title: "Promotion de l'entrepreneuriat",
        description: "Initiatives nationales qui favorisent la culture entrepreneuriale, particulièrement chez les jeunes talents de demain.",
        icon: Award,
        image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.42.jpeg",
        criteria: [
            "Innovation dans les approches de sensibilisation",
            "Impact mesurable sur la communauté ciblée",
            "Durabilité et viabilité à long terme",
            "Potentiel de croissance et d'adaptation"
        ],
        benefits: [
            "Programme de mentorat personnalisé",
            "Couverture médiatique nationale",
            "Accès au réseau d'entrepreneurs établis"
        ],
        requirements: [
            "Candidats âgés de 15 à 35 ans",
            "Projet innovant avec modèle clair",
            "Démonstration d'impact social"
        ]
    },
    {
        id: 2,
        title: "Éducation aux compétences",
        description: "Programmes qui développent les compétences entrepreneuriales essentielles et préparent la main-d'œuvre de demain.",
        icon: BookOpen,
        image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.43-1.jpeg",
        criteria: [
            "Excellence pédagogique et méthodologique",
            "Inclusion des groupes sous-représentés",
            "Adéquation avec les besoins du marché",
            "Innovation dans l'approche d'apprentissage"
        ],
        benefits: [
            "Ressources techniques spécialisées",
            "Accompagnement par des experts sectoriels",
            "Bibliothèque de ressources éducatives"
        ],
        requirements: [
            "Curriculum structuré et cohérent",
            "Démarche inclusive documentée",
            "Méthodologie pédagogique innovante"
        ]
    },
    {
        id: 3,
        title: "Transformation numérique",
        description: "Solutions qui accélèrent la transition numérique des organisations et démocratisent l'accès aux technologies.",
        icon: Laptop,
        image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.44.jpeg",
        criteria: [
            "Caractère novateur de la solution proposée",
            "Contribution à la transformation digitale",
            "Accessibilité et facilité d'adoption",
            "Potentiel de déploiement à grande échelle"
        ],
        benefits: [
            "Accompagnement technique approfondi",
            "Suite d'outils numériques premium",
            "Formation spécialisée en technologies"
        ],
        requirements: [
            "Solution technologique fonctionnelle",
            "Modèle extensible et adaptable",
            "Métriques d'impact digital claires"
        ]
    },
    {
        id: 4,
        title: "Agriculture durable",
        description: "Initiatives agricoles innovantes qui concilient production efficace, respect de l'environnement et équité sociale.",
        icon: Sprout,
        image: "https://fonijguinee.org/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-09-at-13.31.45.jpeg",
        criteria: [
            "Empreinte environnementale positive",
            "Innovation dans les pratiques agricoles",
            "Bénéfices sociaux pour les communautés",
            "Viabilité économique à long terme"
        ],
        benefits: [
            "Expertise technique agricole dédiée",
            "Accès privilégié aux ressources rurales",
            "Intégration au réseau d'agri-entrepreneurs"
        ],
        requirements: [
            "Projet agricole écologiquement viable",
            "Impact environnemental quantifiable",
            "Plan d'affaires réaliste et durable"
        ]
    }
];

export default function Categories() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <CategorieHero />

            {/* Categories Section */}
            <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {categories.map((category, index) => (
                            <motion.div 
                                key={category.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        transition: { duration: 0.5, delay: index * 0.1 } 
                                    }
                                }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                            >
                                {/* Image de la catégorie */}
                                <div className="relative h-48 md:h-64 w-full overflow-hidden">
                                    <img 
                                        src={category.image} 
                                        alt={category.title}
                                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                                                    <category.icon className="h-6 w-6 text-white" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-white">
                                                    {category.title}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex flex-col lg:flex-row lg:items-start">
                                        <div className="flex-1">
                                            <p className="text-lg text-gray-600 mb-8">
                                                {category.description}
                                            </p>

                                            {/* Grid Layout for Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {/* Critères */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                                                        Critères d'évaluation
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {category.criteria.map((criterion, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <span className="text-gray-400 mr-2">•</span>
                                                                <span className="text-gray-600">{criterion}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Avantages */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                                                        Avantages
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {category.benefits.map((benefit, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <span className="text-gray-400 mr-2">•</span>
                                                                <span className="text-gray-600">{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Conditions */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                                                        Conditions requises
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {category.requirements.map((requirement, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <span className="text-gray-400 mr-2">•</span>
                                                                <span className="text-gray-600">{requirement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Section */}
                                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                                            Date limite : <span className="font-semibold text-gray-700">15 septembre 2024</span>
                                        </div>
                                        <Link
                                            href={`/candidater?category=${category.id}`}
                                            className="inline-flex items-center px-5 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-all duration-200"
                                        >
                                            Candidater
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Besoin d'aide pour choisir votre catégorie ?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Notre équipe est disponible pour vous orienter vers la catégorie la plus adaptée à votre projet innovant.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-gray-800 text-base font-medium rounded-md text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-200"
                    >
                        Nous contacter
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}