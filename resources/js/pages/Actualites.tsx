import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Tag } from 'lucide-react';

const actualites = [
    {
        id: 1,
        title: "Lancement de la 2ème édition du Grand Prix FONIJ",
        excerpt: "Le Ministère de la Jeunesse et des Sports annonce le lancement de la deuxième édition du Grand Prix FONIJ pour la promotion de l'esprit d'entreprise.",
        date: "15 Mars 2025",
        category: "Événement",
        color: "from-emerald-500 to-green-600",
        textColor: "text-emerald-600",
        bgColor: "bg-emerald-100",
        image: "https://img.freepik.com/free-photo/business-people-clapping-hands-during-meeting_23-2147880484.jpg?t=st=1742313879~exp=1742317479~hmac=e3aab1f471ff01a984c46878abb1b0f9edcbfc24a81e74d1fc14f9d49dfa3e7d&w=1380"
    },
    {
        id: 2,
        title: "Les lauréats de la première édition témoignent",
        excerpt: "Découvrez les témoignages des jeunes entrepreneurs qui ont bénéficié du programme d'accélération FONIJ et comment cette expérience a transformé leurs projets.",
        date: "10 Mars 2025",
        category: "Témoignage",
        color: "from-blue-500 to-indigo-600",
        textColor: "text-blue-600",
        bgColor: "bg-blue-100",
        image: "https://img.freepik.com/free-photo/happy-business-colleagues-sharing-ideas-with-each-other_23-2147664593.jpg?t=st=1742313803~exp=1742317403~hmac=5ca953a09c3f1a89649bc67cd3adde7bcc2cba7969bb7292f1a4aa8b34c44c97&w=1380"
    },
    {
        id: 3,
        title: "Nouveau partenariat avec l'Ambassade du Japon",
        excerpt: "Le FONIJ renforce son partenariat avec l'Ambassade du Japon pour soutenir l'entrepreneuriat jeune en Guinée avec de nouveaux programmes de financement.",
        date: "5 Mars 2025",
        category: "Partenariat",
        color: "from-purple-500 to-violet-600",
        textColor: "text-purple-600",
        bgColor: "bg-purple-100",
        image: "https://img.freepik.com/free-photo/business-partnership-meeting_1421-90.jpg?t=st=1742313929~exp=1742317529~hmac=6f30850c0bb9af0ce0717f92c39b3c8a38c41abe3ee2b8eeb7d30df64fa12ade&w=1380"
    },
    {
        id: 4,
        title: "Formation des jurys pour l'édition 2025",
        excerpt: "Les membres du jury ont participé à une session de formation pour affiner les critères d'évaluation des candidatures et garantir un processus de sélection équitable.",
        date: "1 Mars 2025",
        category: "Formation",
        color: "from-amber-500 to-orange-600",
        textColor: "text-amber-600",
        bgColor: "bg-amber-100",
        image: "https://img.freepik.com/free-photo/businesspeople-working-together_23-2147639238.jpg?t=st=1742313974~exp=1742317574~hmac=8cf2b1dc92c1ef2d7a6f8b45acf2c9d3fccb7f61d8c98b1ebc99022b49d28d9c&w=1380"
    }
];

export default function Actualites() {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

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
                            RESTEZ INFORMÉ
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Actualités et Événements
                        </h1>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            Suivez les dernières nouvelles du Grand Prix FONIJ, les témoignages, les événements à venir et nos partenariats stratégiques
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filtres par catégorie */}
            <div className="bg-white py-8 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button className="px-4 py-2 bg-[#026200] text-white rounded-full text-sm font-medium">
                            Tous
                        </button>
                        {["Événement", "Témoignage", "Partenariat", "Formation"].map((category, index) => (
                            <button 
                                key={index}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Articles */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                    >
                        {actualites.map((actualite, index) => (
                            <motion.article 
                                key={actualite.id}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={actualite.image}
                                        alt={actualite.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${actualite.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                        {actualite.category}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {actualite.date}
                                    </div>
                                    <h3 className={`font-bold text-xl mb-3 ${actualite.textColor}`}>
                                        {actualite.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 flex-1">
                                        {actualite.excerpt}
                                    </p>
                                    <Link
                                        href={`/actualites/${actualite.id}`}
                                        className={`inline-flex items-center text-sm font-medium ${actualite.textColor} hover:underline mt-auto`}
                                    >
                                        Lire la suite
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center space-x-2">
                            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                                <ChevronRight className="h-4 w-4 text-gray-600 transform rotate-180" />
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        page === 1 
                                        ? 'bg-[#026200] text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#026200] to-[#024C00] py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                                Restez informé de toutes nos actualités
                            </h2>
                            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-6 md:mb-8">
                                Inscrivez-vous à notre newsletter pour recevoir nos dernières informations et ne rien manquer du Grand Prix FONIJ 2025
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center max-w-md mx-auto">
                                <input 
                                    type="email" 
                                    placeholder="Votre adresse email"
                                    className="w-full px-5 py-3 rounded-full bg-white text-gray-800 outline-none mb-3 sm:mb-0 sm:mr-3"
                                />
                                <button className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors">
                                    S'abonner
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}