import MainLayout from '@/layouts/MainLayout';
import CategorieHero from '@/components/CategorieHero';
import { Link } from '@inertiajs/react';
import { Award, BookOpen, Laptop, Sprout, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        title: "Promotion de l'entrepreneuriat",
        description: "Initiatives nationales qui favorisent la culture entrepreneuriale, particulièrement chez les jeunes talents de demain.",
        icon: Award,
        color: "from-amber-500 to-yellow-500",
        textColor: "text-amber-600",
        image: "https://img.freepik.com/premium-photo/woman-using-sewing-machine-working-workshop_1048944-18734432.jpg?w=1380",
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
        color: "from-blue-500 to-indigo-500",
        textColor: "text-blue-600",
        image: "https://img.freepik.com/free-photo/development-knowledge-study-education-concept_53876-144838.jpg?t=st=1742306869~exp=1742310469~hmac=fc5f725e7137d2b12fe6937fa9405e730bc034cea22ba24e85ee0dbc78434e88&w=1380",
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
        color: "from-purple-500 to-pink-500",
        textColor: "text-purple-600",
        image: "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041864.jpg?t=st=1742307154~exp=1742310754~hmac=53f11f67cf4b0e906ec71d95521312b99ec3d7b61afe4bcbbe930c74955e9fe4&w=1380",
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
        color: "from-green-500 to-emerald-500",
        textColor: "text-green-600",
        image: "https://img.freepik.com/free-photo/medium-shot-man-holding-vegetables_23-2148761604.jpg?t=st=1742307379~exp=1742310979~hmac=0c4124fab8d8935fe82cae63d1e5d68de46baba0581b7fc7f5b3b05b3ff7d02e&w=1380",
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

            {/* Introduction et présentation */}
            <div className="bg-gradient-to-b from-[#026200] to-[#024C00] text-white py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Catégories du Grand Prix</h2>
                        <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8">
                            Explorez nos quatre catégories d'excellence et trouvez celle qui correspond le mieux à votre projet innovant pour transformer la Guinée.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-2xl mx-auto">
                            {categories.map((cat, index) => (
                                <motion.a
                                    href={`#category-${cat.id}`}
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 flex flex-col items-center transition-all duration-300"
                                >
                                    <cat.icon className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
                                    <span className="text-xs md:text-sm text-center font-medium">{cat.title}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categories Section avec nouveau design */}
            <div className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="space-y-20 md:space-y-32">
                        {categories.map((category, index) => (
                            <motion.div 
                                id={`category-${category.id}`}
                                key={category.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { duration: 0.8 } }
                                }}
                                className="relative"
                            >
                                {/* Index number */}
                                <div className="absolute -top-10 md:-top-16 left-0 md:left-10 z-10">
                                    <div className={`bg-gradient-to-r ${category.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg`}>
                                        {category.id}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    {/* Image side for mobile (always show at top) */}
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { 
                                                opacity: 1, 
                                                y: 0, 
                                                transition: { duration: 0.8, delay: 0.2 } 
                                            }
                                        }}
                                        className="relative md:hidden"
                                    >
                                        <div className="relative h-[250px] w-full overflow-hidden rounded-2xl shadow-xl">
                                            <img 
                                                src={category.image} 
                                                alt={category.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} opacity-20`}></div>
                                        </div>
                                        <div className={`absolute top-4 right-4 bg-gradient-to-r ${category.color} rounded-full p-3 shadow-lg`}>
                                            <category.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </motion.div>
                                    
                                    {/* Image side for desktop (alternating) */}
                                    {index % 2 === 0 ? (
                                        <motion.div 
                                            variants={{
                                                hidden: { opacity: 0, x: -50 },
                                                visible: { 
                                                    opacity: 1, 
                                                    x: 0, 
                                                    transition: { duration: 0.8, delay: 0.2 } 
                                                }
                                            }}
                                            className="relative hidden md:block"
                                        >
                                            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                                                <img 
                                                    src={category.image} 
                                                    alt={category.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} opacity-20`}></div>
                                            </div>
                                            <div className={`absolute top-6 left-6 bg-gradient-to-r ${category.color} rounded-full p-4 shadow-lg`}>
                                                <category.icon className="h-8 w-8 text-white" />
                                            </div>
                                        </motion.div>
                                    ) : null}

                                    {/* Content side */}
                                    <motion.div 
                                        variants={{
                                            hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
                                            visible: { 
                                                opacity: 1, 
                                                x: 0, 
                                                transition: { duration: 0.8, delay: 0.4 } 
                                            }
                                        }}
                                        className="space-y-4 md:space-y-6 mt-4 md:mt-0"
                                    >
                                        <h2 className={`text-2xl md:text-4xl font-bold ${category.textColor}`}>
                                            {category.title}
                                        </h2>
                                        <p className="text-base md:text-xl text-gray-600">
                                            {category.description}
                                        </p>
                                        
                                        {/* Tabs for details */}
                                        <div className="mt-4 md:mt-8 space-y-4 md:space-y-6">
                                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                                <div className="p-4 md:p-6">
                                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center mb-3 md:mb-4">
                                                        <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 md:mr-3 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                                                            <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </span>
                                                        Critères d'évaluation
                                                    </h3>
                                                    <ul className="space-y-1 md:space-y-2">
                                                        {category.criteria.map((criterion, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <span className={`text-base md:text-lg ${category.textColor} mr-2`}>•</span>
                                                                <span className="text-sm md:text-base text-gray-700">{criterion}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                                    <div className="p-4 md:p-6">
                                                        <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center mb-3 md:mb-4">
                                                            <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 md:mr-3 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                                                                <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                            </span>
                                                            Avantages
                                                        </h3>
                                                        <ul className="space-y-1 md:space-y-2">
                                                            {category.benefits.map((benefit, i) => (
                                                                <li key={i} className="flex items-start">
                                                                    <span className={`text-base md:text-lg ${category.textColor} mr-2`}>•</span>
                                                                    <span className="text-sm md:text-base text-gray-700">{benefit}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                                    <div className="p-4 md:p-6">
                                                        <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center mb-3 md:mb-4">
                                                            <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 md:mr-3 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                                                                <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                            </span>
                                                            Conditions requises
                                                        </h3>
                                                        <ul className="space-y-1 md:space-y-2">
                                                            {category.requirements.map((requirement, i) => (
                                                                <li key={i} className="flex items-start">
                                                                    <span className={`text-base md:text-lg ${category.textColor} mr-2`}>•</span>
                                                                    <span className="text-sm md:text-base text-gray-700">{requirement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* CTA */}
                                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="text-xs md:text-sm text-gray-500">
                                                Date limite : <span className="font-semibold text-gray-700">15 septembre 2025</span>
                                            </div>
                                            <Link
                                                href={`/candidater?category=${category.id}`}
                                                className={`inline-flex items-center px-4 md:px-5 py-2 md:py-3 bg-gradient-to-r ${category.color} text-white font-medium rounded-full w-full sm:w-auto justify-center sm:justify-start hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                            >
                                                Candidater
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                    
                                    {/* Image side for odd indexes (desktop only) */}
                                    {index % 2 !== 0 ? (
                                        <motion.div 
                                            variants={{
                                                hidden: { opacity: 0, x: 50 },
                                                visible: { 
                                                    opacity: 1, 
                                                    x: 0, 
                                                    transition: { duration: 0.8, delay: 0.2 } 
                                                }
                                            }}
                                            className="relative hidden md:block"
                                        >
                                            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                                                <img 
                                                    src={category.image} 
                                                    alt={category.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} opacity-20`}></div>
                                            </div>
                                            <div className={`absolute top-6 right-6 bg-gradient-to-r ${category.color} rounded-full p-4 shadow-lg`}>
                                                <category.icon className="h-8 w-8 text-white" />
                                            </div>
                                        </motion.div>
                                    ) : null}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#026200] to-[#024C00] py-12 md:py-20">
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
                                Besoin d'aide pour choisir votre catégorie ?
                            </h2>
                            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-6 md:mb-8">
                                Notre équipe est disponible pour vous orienter vers la catégorie la plus adaptée à votre projet innovant.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-[#026200] text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Nous contacter
                                <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}