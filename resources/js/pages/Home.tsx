import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import { Link } from '@inertiajs/react';
import { Award, Lightbulb, Users, Rocket, BookOpen, Laptop, Sprout, ChevronRight, CheckCircle, Trophy } from 'lucide-react';

export default function Home() {
    const slides = [
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        {
            title: "Grand Prix FONIJ",
            subtitle: "L'événement phare pour l'entrepreneuriat jeune en Guinée",
            description: "Innovez, impactez, et transformez votre idée en réalité !",
            image: "https://fonijguinee.org/wp-content/uploads/2024/12/469564208_981550340671968_1634689967950541985_n.jpg",
            buttonText: "Candidater maintenant",
            buttonLink: "/candidater",
            icon: Trophy
        },
        // ... autres slides
    ];

    return (
        <MainLayout>
            <Hero slides={slides} />

            {/* Nouvelle Section : Témoignages */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                            Ils ont participé au Grand Prix FONIJ
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Découvrez les témoignages inspirants de nos anciens participants
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Aïssatou Diallo",
                                role: "Fondatrice de AgroTech",
                                quote: "Le Grand Prix FONIJ a été un tremplin pour mon entreprise. Grâce au programme d'accélération, j'ai pu structurer mon projet et obtenir des financements.",
                                image: "https://randomuser.me/api/portraits/women/44.jpg"
                            },
                            {
                                name: "Mamadou Bah",
                                role: "CEO de EduConnect",
                                quote: "Une expérience enrichissante qui m'a permis de rencontrer des mentors exceptionnels et de développer mon réseau professionnel.",
                                image: "https://randomuser.me/api/portraits/men/32.jpg"
                            },
                            {
                                name: "Fatoumata Camara",
                                role: "Co-fondatrice de GreenCycle",
                                quote: "Le programme Youth'Incuba nous a aidés à développer notre MVP et à valider notre concept sur le marché. Une aventure incroyable !",
                                image: "https://randomuser.me/api/portraits/women/68.jpg"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center mb-6">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

            {/* Nouvelle Section : Partenaires */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                            Nos Partenaires Stratégiques
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Le Grand Prix FONIJ est soutenu par des institutions et entreprises engagées dans le développement de l'entrepreneuriat jeune
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                        {[
                            "https://via.placeholder.com/150",
                            "https://via.placeholder.com/150",
                            "https://via.placeholder.com/150",
                            "https://via.placeholder.com/150",
                            "https://via.placeholder.com/150",
                            "https://via.placeholder.com/150"
                        ].map((logo, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                <img src={logo} alt={`Partenaire ${index + 1}`} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Stats */}
            <div className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div className="bg-emerald-50 p-6 rounded-xl text-center">
                            <div className="text-4xl font-bold text-emerald-600">164</div>
                            <div className="text-sm text-gray-600 mt-2">Projets en compétition</div>
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-xl text-center">
                            <div className="text-4xl font-bold text-emerald-600">4</div>
                            <div className="text-sm text-gray-600 mt-2">Catégories</div>
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-xl text-center">
                            <div className="text-4xl font-bold text-emerald-600">5</div>
                            <div className="text-sm text-gray-600 mt-2">Prix majeurs</div>
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-xl text-center">
                            <div className="text-4xl font-bold text-emerald-600">35</div>
                            <div className="text-sm text-gray-600 mt-2">Âge maximum</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Présentation du Concours */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                            À propos du Grand Prix FONIJ
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Une initiative exceptionnelle du Fonds National pour l'Insertion des Jeunes (FONIJ) pour promouvoir l'entrepreneuriat jeune en Guinée et récompenser l'excellence entrepreneuriale.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="h-3 bg-emerald-500 w-full"></div>
                            <div className="p-8">
                                <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-6 group-hover:bg-emerald-200 transition-colors">
                                    <Lightbulb className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                                <p className="text-gray-600">Nous encourageons les projets innovants qui répondent aux défis actuels de la société guinéenne et qui ont un impact positif sur l'économie locale.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="h-3 bg-emerald-500 w-full"></div>
                            <div className="p-8">
                                <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-6 group-hover:bg-emerald-200 transition-colors">
                                    <Rocket className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                                <p className="text-gray-600">Nous valorisons les initiatives qui génèrent un impact significatif sur l'emploi, le développement économique et la transition écologique.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="h-3 bg-emerald-500 w-full"></div>
                            <div className="p-8">
                                <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-6 group-hover:bg-emerald-200 transition-colors">
                                    <Users className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Communauté</h3>
                                <p className="text-gray-600">Nous créons un réseau d'entrepreneurs dynamiques qui peuvent échanger, collaborer et grandir ensemble pour contribuer au développement de la Guinée.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Programme d'Accélération */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                            Programme d'Accélération
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Un accompagnement complet en trois phases pour assurer le succès de votre projet entrepreneurial
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-8 relative">
                            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="mr-3 text-emerald-500">SMART Entrepreneur</span>
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Destiné aux porteurs de projet pour les aider à structurer leur idée et sécuriser le lancement de leur activité.
                            </p>
                            <ul className="space-y-2">
                                {["Élaboration du business plan", "Identification du potentiel", "Construction du pitch"].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 relative">
                            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="mr-3 text-emerald-500">Youth'Incuba</span>
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Pour les entrepreneurs avancés qui souhaitent prototyper et obtenir rapidement une preuve de concept.
                            </p>
                            <ul className="space-y-2">
                                {["Validation de l'idée", "Découverte des réseaux", "Développement du MVP"].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 relative">
                            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="mr-3 text-emerald-500">Boost Entrepreneur</span>
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Un accélérateur dédié aux jeunes dirigeants pour développer et booster leurs activités.
                            </p>
                            <ul className="space-y-2">
                                {["Restructuration du plan d'action", "Optimisation de la gestion", "Affinement de la stratégie commerciale"].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Catégories */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                            Catégories du Concours
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Découvrez les différentes catégories pour lesquelles vous pouvez candidater
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Promotion de l'esprit d'entreprise",
                                description: "Initiatives visant à promouvoir une culture entrepreneuriale",
                                icon: Award
                            },
                            {
                                title: "Éducation aux compétences",
                                description: "Formation et développement des compétences entrepreneuriales",
                                icon: BookOpen
                            },
                            {
                                title: "Transition numérique",
                                description: "Innovation et transformation digitale",
                                icon: Laptop
                            },
                            {
                                title: "Entrepreneuriat agricole",
                                description: "Projets agricoles durables et innovants",
                                icon: Sprout
                            }
                        ].map((category, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-6">
                                    <category.icon className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                                <p className="text-gray-600">{category.description}</p>
                                <Link href={`/categories/${index + 1}`} className="inline-flex items-center mt-6 text-emerald-600 hover:text-emerald-700">
                                    En savoir plus
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section CTA */}
            <div className="relative bg-emerald-600 py-20">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                            Prêt à participer au Grand Prix FONIJ ?
                        </h2>
                        <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-10">
                            Rejoignez la communauté des entrepreneurs innovants et contribuez au développement de la Guinée.
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