import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

const programmes = [
    {
        id: 1,
        title: "SMART Entrepreneur",
        description: "Programme destiné aux porteurs de projet pour les aider à démarrer et sécuriser le lancement de leur activité.",
        icon: "🚀",
        features: [
            "Formalisation du business plan",
            "Test sur le terrain du produit ou service",
            "Choix du statut juridique",
            "Mise au point du pitch",
            "Stratégie digitale",
            "Plan d'action commerciale"
        ],
        duration: "3 mois"
    },
    {
        id: 2,
        title: "Youth'Incuba",
        description: "Programme d'incubation pour prototyper et obtenir rapidement une preuve de concept.",
        icon: "💡",
        features: [
            "Validation de l'idée d'entreprise",
            "Découverte des réseaux et aides spécifiques",
            "Développement du MVP",
            "Définition du business modèle",
            "Développement des capacités de pitch"
        ],
        duration: "6 mois"
    },
    {
        id: 3,
        title: "Boost Entrepreneurs",
        description: "Programme d'accélération pour développer et booster les activités des jeunes dirigeants d'entreprise.",
        icon: "⚡",
        features: [
            "Restructuration du plan d'action",
            "Optimisation de la gestion",
            "Affinement de la stratégie commerciale",
            "Développement du pitch",
            "Accompagnement personnalisé"
        ],
        duration: "3 mois"
    }
];

export default function Programmes() {
    return (
        <MainLayout>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Programmes d'Accélération
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Découvrez nos trois programmes d'accompagnement adaptés à chaque étape de votre projet
                        </p>
                    </div>

                    <div className="mt-12 space-y-12">
                        {programmes.map((programme) => (
                            <div key={programme.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="flex items-center">
                                        <div className="text-4xl mr-4">{programme.icon}</div>
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                {programme.title}
                                            </h3>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                {programme.description}
                                            </p>
                                            <p className="mt-2 text-sm text-blue-600">
                                                Durée : {programme.duration}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h4 className="text-sm font-medium text-gray-500">Services inclus</h4>
                                        <ul className="mt-4 space-y-2">
                                            {programme.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
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
                                        Postuler pour ce programme
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Comment postuler ?
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Pour postuler à l'un de nos programmes d'accélération, remplissez le formulaire de candidature en précisant le programme qui vous intéresse.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/candidater"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Commencer ma candidature
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 