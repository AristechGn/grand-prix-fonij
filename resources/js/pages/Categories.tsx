import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

const categories = [
    {
        id: 1,
        title: "Promotion de l'esprit d'entreprise",
        description: "Cette catégorie récompense les initiatives au niveau national qui visent à promouvoir une culture entrepreneuriale, en particulier chez les jeunes.",
        icon: "🏢",
        criteria: [
            "Innovation dans la promotion de l'entrepreneuriat",
            "Impact sur la communauté locale",
            "Durabilité du projet",
            "Potentiel de croissance"
        ]
    },
    {
        id: 2,
        title: "Éducation aux compétences",
        description: "Cette catégorie récompense les initiatives qui améliorent les compétences entrepreneuriales, managériales et des employés.",
        icon: "📚",
        criteria: [
            "Qualité de la formation",
            "Accessibilité aux groupes défavorisés",
            "Pertinence des compétences enseignées",
            "Méthodologie pédagogique"
        ]
    },
    {
        id: 3,
        title: "Transition numérique",
        description: "Cette catégorie accompagne la transition numérique des entreprises leur permettant de développer, commercialiser et utiliser des Nouvelles Technologies.",
        icon: "💻",
        criteria: [
            "Innovation technologique",
            "Impact sur la transformation digitale",
            "Accessibilité et inclusion",
            "Potentiel de déploiement"
        ]
    },
    {
        id: 4,
        title: "Entrepreneuriat agricole",
        description: "Cette catégorie récompense les initiatives agricoles qui assurent la pérennité des systèmes de productions répondant à des enjeux sociaux, économiques et écologiques.",
        icon: "🌱",
        criteria: [
            "Durabilité environnementale",
            "Innovation agricole",
            "Impact social",
            "Viabilité économique"
        ]
    }
];

export default function Categories() {
    return (
        <MainLayout>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Catégories du Grand Prix FONIJ
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Découvrez les différentes catégories pour lesquelles vous pouvez candidater
                        </p>
                    </div>

                    <div className="mt-12 space-y-12">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="flex items-center">
                                        <div className="text-4xl mr-4">{category.icon}</div>
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                {category.title}
                                            </h3>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h4 className="text-sm font-medium text-gray-500">Critères d'évaluation</h4>
                                        <ul className="mt-4 space-y-2">
                                            {category.criteria.map((criterion, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-sm text-gray-700">{criterion}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="px-4 py-4 sm:px-6 bg-gray-50">
                                    <Link
                                        href="/candidater"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Candidater pour cette catégorie
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 