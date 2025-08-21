import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <div className="relative bg-blue-600 text-white h-90">
                <div className="absolute inset-0 h-screen">
                    <img
                        className="w-full h-full object-cover opacity-20"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Entrepreneurship"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Grand Prix FONIJ
                    </h1>
                    <p className="mt-6 text-xl max-w-3xl">
                        Récompensez l'excellence en matière de promotion de l'esprit d'entreprise en Guinée.
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/candidater"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                        >
                            Candidater maintenant
                        </Link>
                    </div>
                </div>
            </div>

            {/* Présentation du Concours */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            À propos du Grand Prix FONIJ
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Une initiative exceptionnelle pour promouvoir l'entrepreneuriat jeune en Guinée
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Innovation
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                Projets innovants
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Impact
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                Création d'emplois
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Communauté
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                Réseau d'entrepreneurs
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message du Président */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Message du Président
                        </h2>
                        <div className="mt-8 max-w-3xl mx-auto">
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://via.placeholder.com/150"
                                                alt="Président"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Général d'Armée Mamadi DOUMBOUYA
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Président de la République de Guinée
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <p className="text-gray-700 italic">
                                        "L'entrepreneuriat jeune constitue une priorité pour notre pays. Le Grand Prix FONIJ est une initiative exceptionnelle qui permettra d'encourager et de soutenir les jeunes entrepreneurs guinéens dans leur quête d'excellence."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Catégories */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Catégories du Concours
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Découvrez les différentes catégories pour lesquelles vous pouvez candidater
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Promotion de l'esprit d'entreprise",
                                description: "Initiatives visant à promouvoir une culture entrepreneuriale",
                                icon: "🏢"
                            },
                            {
                                title: "Éducation aux compétences",
                                description: "Formation et développement des compétences entrepreneuriales",
                                icon: "📚"
                            },
                            {
                                title: "Transition numérique",
                                description: "Innovation et transformation digitale",
                                icon: "💻"
                            },
                            {
                                title: "Entrepreneuriat agricole",
                                description: "Projets agricoles durables et innovants",
                                icon: "🌱"
                            }
                        ].map((category, index) => (
                            <div key={index} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="text-4xl mb-4">{category.icon}</div>
                                    <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 