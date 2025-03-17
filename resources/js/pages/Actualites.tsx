import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

const actualites = [
    {
        id: 1,
        title: "Lancement de la 2ème édition du Grand Prix FONIJ",
        excerpt: "Le Ministère de la Jeunesse et des Sports annonce le lancement de la deuxième édition du Grand Prix FONIJ pour la promotion de l'esprit d'entreprise.",
        date: "15 Mars 2024",
        category: "Actualité",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
        id: 2,
        title: "Les lauréats de la première édition témoignent",
        excerpt: "Découvrez les témoignages des jeunes entrepreneurs qui ont bénéficié du programme d'accélération FONIJ.",
        date: "10 Mars 2024",
        category: "Témoignage",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
        id: 3,
        title: "Nouveau partenariat avec l'Ambassade du Japon",
        excerpt: "Le FONIJ renforce son partenariat avec l'Ambassade du Japon pour soutenir l'entrepreneuriat jeune en Guinée.",
        date: "5 Mars 2024",
        category: "Partenariat",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
        id: 4,
        title: "Formation des jurys pour l'édition 2024",
        excerpt: "Les membres du jury ont participé à une session de formation pour l'évaluation des candidatures.",
        date: "1 Mars 2024",
        category: "Formation",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
];

export default function Actualites() {
    return (
        <MainLayout>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Actualités
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Restez informé des dernières nouvelles du Grand Prix FONIJ
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                        {actualites.map((actualite) => (
                            <article key={actualite.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="relative pb-2/3">
                                    <img
                                        src={actualite.image}
                                        alt={actualite.title}
                                        className="absolute h-full w-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {actualite.category}
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500">
                                            {actualite.date}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                        {actualite.title}
                                    </h3>
                                    <p className="mt-2 text-gray-500">
                                        {actualite.excerpt}
                                    </p>
                                    <div className="mt-4">
                                        <Link
                                            href={`/actualites/${actualite.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Lire la suite →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/actualites"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Voir toutes les actualités
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 