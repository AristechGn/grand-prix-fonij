import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import { CheckCircle, Phone, Mail, Award, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const categories = [
    { 
        id: 1, 
        name: "Promotion de l'entrepreneuriat",
        description: "Initiatives qui favorisent la culture entrepreneuriale, particulièrement chez les jeunes.",
        icon: "💡",
        details: [
            "Projets innovants d'entrepreneuriat",
            "Solutions pour le développement des PME",
            "Plateformes de mentorat entrepreneurial",
            "Initiatives de formation professionnelle"
        ]
    },
    { 
        id: 2, 
        name: "Éducation aux compétences",
        description: "Programmes qui développent les compétences entrepreneuriales essentielles.",
        icon: "📚",
        details: [
            "Formations techniques et professionnelles",
            "Programmes de développement des soft skills",
            "Solutions d'apprentissage innovantes",
            "Plateformes éducatives numériques"
        ]
    },
    { 
        id: 3, 
        name: "Transformation numérique",
        description: "Solutions qui accélèrent la transition numérique des organisations.",
        icon: "💻",
        details: [
            "Applications mobiles innovantes",
            "Solutions de commerce électronique",
            "Outils de digitalisation des processus",
            "Technologies blockchain et IA"
        ]
    },
    { 
        id: 4, 
        name: "Agriculture durable",
        description: "Initiatives agricoles innovantes respectant l'environnement et l'équité sociale.",
        icon: "🌱",
        details: [
            "Agriculture intelligente",
            "Solutions d'irrigation durables",
            "Transformation des produits agricoles",
            "Chaînes de valeur agricoles innovantes"
        ]
    }
];

const niveauxEtudes = [
    "Primaire", "Collège", "Lycée", "Baccalauréat", 
    "Licence/Bachelor", "Master", "Doctorat", "Formation professionnelle", "Autodidacte"
];

const regions = [
    "Conakry", "Kindia", "Boké", "Mamou", "Labé", 
    "Faranah", "Kankan", "Nzérékoré", "Autre"
];

// Style commun pour les inputs et selects
const inputClass = "w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm text-black";
const selectClass = "w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm text-black";
const textareaClass = "w-full px-4 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm text-black";

type SimulatedChangeEvent = {
    target: {
        name: string;
        value: string;
    }
};

export default function Candidater() {
    const [formData, setFormData] = useState({
        // Informations personnelles
        nom: '',
        prenom: '',
        age: '',
        genre: '',
        email: '',
        telephone: '',
        ville: '',
        region: '',
        niveauEtudes: '',
        profession: '',
        
        // Catégorie et programme
        categorie: '',
        programme: '',
        
        // Informations du projet
        nomProjet: '',
        resumeProjet: '',
        problemeResolu: '',
        impactAttendu: '',
        publicCible: '',
        projetLance: 'non',
        dateDebutProjet: '',
        prototypeExistant: 'non',
        
        // Disponibilités
        disponibiliteMatin: false,
        disponibiliteApresMidi: false,
        disponibiliteSoir: false,
        
        // Déclaration
        certificationExactitude: false,
        participationGratuite: false,
        autorisationCommunication: false,
        
        // Fichiers
        pieceIdentite: null as File | null,
        businessPlan: null as File | null,
        photoProjet: null as File | null,
        videoPresentation: '' as string
    });

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log(formData);
        alert("Votre candidature a été soumise avec succès !");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const { name } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: e.target.files![0]
            }));
        }
    };

    const goToNextStep = () => {
        // Validation pour chaque étape
        if (currentStep === 1) {
            // Validation de la catégorie
            if (!formData.categorie) {
                alert("Veuillez sélectionner une catégorie");
                return;
            }
        } else if (currentStep === 2) {
            // Validation des informations personnelles
            if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.region) {
                alert("Veuillez remplir tous les champs obligatoires");
                return;
            }
        } else if (currentStep === 3) {
            // Validation des informations du projet
            if (!formData.nomProjet || !formData.resumeProjet || !formData.problemeResolu || !formData.impactAttendu) {
                alert("Veuillez remplir tous les champs obligatoires concernant votre projet");
                return;
            }
        } else if (currentStep === 4) {
            // Validation du programme
            if (!formData.programme) {
                alert("Veuillez sélectionner un programme d'accélération");
                return;
            }
        } else if (currentStep === 5) {
            // Validation des documents
            if (!formData.pieceIdentite || !formData.businessPlan || !formData.photoProjet) {
                alert("Veuillez joindre tous les documents requis");
                return;
            }
        }
        
        setCurrentStep(current => Math.min(current + 1, totalSteps));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToPreviousStep = () => {
        setCurrentStep(current => Math.max(current - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <MainLayout>
            <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    {/* En-tête */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Grand Prix FONIJ</span>
                            <span className="block text-emerald-600 mt-2">Édition 2025</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
                            Transformez votre idée en réalité ! Remplissez le formulaire ci-dessous pour soumettre votre projet au Grand Prix FONIJ.
                        </p>
                        <div className="mt-8 flex justify-center items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                                <span>15-35 ans</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                                <span>Projet innovant</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                                <span>Date limite: 15 sept. 2025</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Indicateur de progression */}
                    <div className="mb-8">
                        <div className="flex justify-center items-center space-x-4">
                            {[
                                "Catégorie",
                                "Informations personnelles",
                                "Projet",
                                "Programme",
                                "Documents"
                            ].map((step, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        currentStep > index + 1 
                                            ? 'bg-emerald-500 text-white'
                                            : currentStep === index + 1
                                                ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500'
                                                : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-500">{step}</span>
                                    {index < 4 && (
                                        <div className={`w-12 h-0.5 ml-4 ${
                                            currentStep > index + 1 ? 'bg-emerald-500' : 'bg-gray-200'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Étape 1: Choix de la catégorie */}
                    {currentStep === 1 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choisissez votre catégorie</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {categories.map((category, index) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                            formData.categorie === category.id.toString() 
                                                ? 'bg-emerald-50 border-2 border-emerald-500'
                                                : 'bg-white border-2 border-gray-100 hover:border-emerald-200'
                                        }`}
                                        onClick={() => setFormData({...formData, categorie: category.id.toString()})}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <span className="text-4xl">{category.icon}</span>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                                                <p className="mt-2 text-gray-600">{category.description}</p>
                                                <ul className="mt-4 space-y-2">
                                                    {category.details.map((detail, idx) => (
                                                        <li key={idx} className="flex items-center text-sm text-gray-500">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        {formData.categorie === category.id.toString() && (
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-emerald-500 text-white rounded-full p-2">
                                                    <CheckCircle className="h-6 w-6" />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Étape 2: Informations personnelles */}
                    {currentStep === 2 && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Informations personnelles</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            name="nom"
                                            required
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            name="prenom"
                                            required
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Âge <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="number"
                                            name="age"
                                            required
                                            min="15"
                                            max="35"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Genre <span className="text-red-500">*</span>
                                        </label>
                                        <Select 
                                            name="genre"
                                            value={formData.genre}
                                            onValueChange={(value) => {
                                                const event = { target: { name: "genre", value } };
                                                handleChange(event as SimulatedChangeEvent);
                                            }}
                                        >
                                            <SelectTrigger className={selectClass}>
                                                <SelectValue placeholder="Sélectionner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="homme">Homme</SelectItem>
                                                <SelectItem value="femme">Femme</SelectItem>
                                                <SelectItem value="autre">Autre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="tel"
                                            name="telephone"
                                            required
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Région <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            name="region"
                                            value={formData.region}
                                            onValueChange={(value) => {
                                                const event = { target: { name: "region", value } };
                                                handleChange(event as SimulatedChangeEvent);
                                            }}
                                        >
                                            <SelectTrigger className={selectClass}>
                                                <SelectValue placeholder="Sélectionner votre région" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regions.map((region) => (
                                                    <SelectItem key={region} value={region}>{region}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ville <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            name="ville"
                                            required
                                            value={formData.ville}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Niveau d'études <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            name="niveauEtudes"
                                            value={formData.niveauEtudes}
                                            onValueChange={(value) => {
                                                const event = { target: { name: "niveauEtudes", value } };
                                                handleChange(event as SimulatedChangeEvent);
                                            }}
                                        >
                                            <SelectTrigger className={selectClass}>
                                                <SelectValue placeholder="Sélectionner votre niveau" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {niveauxEtudes.map((niveau) => (
                                                    <SelectItem key={niveau} value={niveau}>{niveau}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Profession actuelle
                                        </label>
                                        <Input
                                            type="text"
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="Si applicable"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape 3: Informations sur le projet */}
                    {currentStep === 3 && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Informations sur votre projet</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom du projet <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            name="nomProjet"
                                            required
                                            value={formData.nomProjet}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Résumé du projet (200 mots maximum) <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            name="resumeProjet"
                                            required
                                            maxLength={200}
                                            value={formData.resumeProjet}
                                            onChange={handleChange}
                                            rows={4}
                                            className={textareaClass}
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            {formData.resumeProjet.length}/200 caractères
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quel problème votre projet résout-il ? <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            name="problemeResolu"
                                            required
                                            value={formData.problemeResolu}
                                            onChange={handleChange}
                                            rows={4}
                                            className={textareaClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quel est l'impact attendu ? (social, économique, environnemental) <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            name="impactAttendu"
                                            required
                                            value={formData.impactAttendu}
                                            onChange={handleChange}
                                            rows={4}
                                            className={textareaClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Public ciblé <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            name="publicCible"
                                            required
                                            value={formData.publicCible}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Votre projet est-il déjà lancé ? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex space-x-4">
                                            <label className="inline-flex items-center">
                                                <Input
                                                    type="radio"
                                                    name="projetLance"
                                                    value="oui"
                                                    checked={formData.projetLance === 'oui'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-emerald-500"
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <Input
                                                    type="radio"
                                                    name="projetLance"
                                                    value="non"
                                                    checked={formData.projetLance === 'non'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-emerald-500"
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                    {formData.projetLance === 'oui' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Depuis quand ? <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                type="date"
                                                name="dateDebutProjet"
                                                required
                                                value={formData.dateDebutProjet}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Avez-vous déjà un prototype ? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex space-x-4">
                                            <label className="inline-flex items-center">
                                                <Input
                                                    type="radio"
                                                    name="prototypeExistant"
                                                    value="oui"
                                                    checked={formData.prototypeExistant === 'oui'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-emerald-500"
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <Input
                                                    type="radio"
                                                    name="prototypeExistant"
                                                    value="non"
                                                    checked={formData.prototypeExistant === 'non'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-emerald-500"
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape 4: Programme d'accélération */}
                    {currentStep === 4 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choisissez votre programme d'accélération</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div
                                    className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                        formData.programme === "1" 
                                            ? 'bg-emerald-50 border-2 border-emerald-500'
                                            : 'bg-white border-2 border-gray-100 hover:border-emerald-200'
                                    }`}
                                    onClick={() => setFormData({...formData, programme: "1"})}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-emerald-100 p-4 rounded-full mb-4">
                                            <Award className="h-8 w-8 text-emerald-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">SMART Entrepreneur</h3>
                                        <p className="text-gray-600 mb-4">De l'idée au projet structuré. Idéal pour les projets en phase initiale.</p>
                                        <div className="bg-emerald-50 w-full p-3 rounded-lg text-center mb-4">
                                            <span className="font-medium text-emerald-700">3 mois</span>
                                        </div>
                                        <ul className="text-left w-full space-y-2 mb-4">
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                                                <span>Transformer une idée en projet concret</span>
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                                                <span>Définir un problème réel à résoudre</span>
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                                                <span>Poser les bases d'un modèle économique</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {formData.programme === "1" && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-emerald-500 text-white rounded-full p-2">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                        formData.programme === "2" 
                                            ? 'bg-emerald-50 border-2 border-emerald-500'
                                            : 'bg-white border-2 border-gray-100 hover:border-emerald-200'
                                    }`}
                                    onClick={() => setFormData({...formData, programme: "2"})}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-blue-100 p-4 rounded-full mb-4">
                                            <BookOpen className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Youth'Incuba</h3>
                                        <p className="text-gray-600 mb-4">Incuber votre projet, le faire grandir. Pour les projets ayant déjà une structure de base.</p>
                                        <div className="bg-blue-50 w-full p-3 rounded-lg text-center mb-4">
                                            <span className="font-medium text-blue-700">6 mois</span>
                                        </div>
                                        <ul className="text-left w-full space-y-2 mb-4">
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                                <span>Coaching individuel avec des experts</span>
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                                <span>Accès à un espace de travail dynamique</span>
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                                <span>Développement du MVP</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {formData.programme === "2" && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-emerald-500 text-white rounded-full p-2">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                        formData.programme === "3" 
                                            ? 'bg-emerald-50 border-2 border-emerald-500'
                                            : 'bg-white border-2 border-gray-100 hover:border-emerald-200'
                                    }`}
                                    onClick={() => setFormData({...formData, programme: "3"})}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-purple-100 p-4 rounded-full mb-4">
                                            <Zap className="h-8 w-8 text-purple-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Boost Entrepreneurs</h3>
                                        <p className="text-gray-600 mb-4">Accélérer le lancement de votre entreprise. Pour les projets matures prêts à décoller.</p>
                                        <div className="bg-purple-50 w-full p-3 rounded-lg text-center mb-4">
                                            <span className="font-medium text-purple-700">12 mois</span>
                                        </div>
                                        <ul className="text-left w-full space-y-2 mb-4">
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                                                <span>Accompagnement à la levée de fonds</span>
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                                                <span>Coaching avancé en stratégie</span>
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500">
                                                <CheckCircle className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                                                <span>Préparation au pitch pour investisseurs</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {formData.programme === "3" && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-emerald-500 text-white rounded-full p-2">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape 5: Documents à joindre */}
                    {currentStep === 5 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Documents à joindre</h2>
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="p-8">
                                    <div className="grid grid-cols-1 gap-8">
                                        {/* Pièce d'identité */}
                                        <div className="relative">
                                            <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-100">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                    Pièce d'identité <span className="text-red-500">*</span>
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    Une pièce d'identité valide (carte d'identité, passeport, permis de conduire)
                                                </p>
                                                <div className="mt-2">
                                                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-300 transition-colors">
                                                        <div className="space-y-2 text-center">
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="pieceIdentite" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                                                    <span>Téléverser un fichier</span>
                                                                    <Input
                                                                        id="pieceIdentite"
                                                                        name="pieceIdentite"
                                                                        type="file"
                                                                        required
                                                                        className="sr-only"
                                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                                        onChange={handleFileChange}
                                                                    />
                                                                </label>
                                                                <p className="pl-1">ou glisser-déposer</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PDF, JPG ou PNG jusqu'à 10MB</p>
                                                        </div>
                                                    </div>
                                                    {formData.pieceIdentite && (
                                                        <div className="mt-4 flex items-center text-sm text-emerald-600">
                                                            <CheckCircle className="h-5 w-5 mr-2" />
                                                            <span>Fichier sélectionné : {formData.pieceIdentite.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Plan */}
                                        <div className="relative">
                                            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                    Business Plan
                                                    <span className="ml-2 text-sm text-gray-500">(Recommandé)</span>
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    Document détaillant votre modèle économique et votre stratégie de développement
                                                </p>
                                                <div className="mt-2">
                                                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-300 transition-colors">
                                                        <div className="space-y-2 text-center">
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="businessPlan" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                                    <span>Téléverser un fichier</span>
                                                                    <Input
                                                                        id="businessPlan"
                                                                        name="businessPlan"
                                                                        type="file"
                                                                        className="sr-only"
                                                                        accept=".pdf,.doc,.docx"
                                                                        onChange={handleFileChange}
                                                                    />
                                                                </label>
                                                                <p className="pl-1">ou glisser-déposer</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PDF, DOC ou DOCX jusqu'à 10MB</p>
                                                        </div>
                                                    </div>
                                                    {formData.businessPlan && (
                                                        <div className="mt-4 flex items-center text-sm text-blue-600">
                                                            <CheckCircle className="h-5 w-5 mr-2" />
                                                            <span>Fichier sélectionné : {formData.businessPlan.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Photo/Logo du projet */}
                                        <div className="relative">
                                            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-100">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                    Photo ou logo du projet
                                                    <span className="ml-2 text-sm text-gray-500">(Optionnel)</span>
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    Une image représentative de votre projet ou votre logo
                                                </p>
                                                <div className="mt-2">
                                                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-300 transition-colors">
                                                        <div className="space-y-2 text-center">
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="photoProjet" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                                                                    <span>Téléverser un fichier</span>
                                                                    <Input
                                                                        id="photoProjet"
                                                                        name="photoProjet"
                                                                        type="file"
                                                                        className="sr-only"
                                                                        accept=".jpg,.jpeg,.png"
                                                                        onChange={handleFileChange}
                                                                    />
                                                                </label>
                                                                <p className="pl-1">ou glisser-déposer</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">JPG ou PNG jusqu'à 5MB</p>
                                                        </div>
                                                    </div>
                                                    {formData.photoProjet && (
                                                        <div className="mt-4 flex items-center text-sm text-purple-600">
                                                            <CheckCircle className="h-5 w-5 mr-2" />
                                                            <span>Fichier sélectionné : {formData.photoProjet.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lien vidéo */}
                                        <div className="relative">
                                            <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-100">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                    Vidéo de présentation
                                                    <span className="ml-2 text-sm text-gray-500">(Optionnel)</span>
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    Une vidéo courte (2-3 minutes) présentant votre projet augmentera vos chances de sélection
                                                </p>
                                                <div className="mt-2">
                                                    <Input
                                                        type="url"
                                                        name="videoPresentation"
                                                        value={formData.videoPresentation}
                                                        onChange={handleChange}
                                                        placeholder="https://youtube.com/..."
                                                        className={inputClass}
                                                    />
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Lien YouTube, Vimeo ou toute autre plateforme de partage vidéo
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape 6: Finalisation de la candidature */}
                    {currentStep === 6 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finalisation de votre candidature</h2>
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="p-8">
                                    <div className="space-y-8">
                                        {/* Disponibilités */}
                                        <div>
                                            <label className="block text-lg font-medium text-gray-900 mb-4">
                                                Disponibilités pour l'entretien
                                            </label>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Les entretiens auront lieu entre le 20 et le 30 septembre 2025. 
                                                Veuillez indiquer vos créneaux de disponibilité :
                                            </p>
                                            <div className="space-y-4">
                                                <label className="flex items-center space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                        <Input 
                                                            type="checkbox"
                                                            name="disponibiliteMatin"
                                                            checked={formData.disponibiliteMatin}
                                                            onChange={handleCheckboxChange}
                                                            className="text-black absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-emerald-500"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.disponibiliteMatin ? 'bg-emerald-500' : ''}`}></span>
                                                    </div>
                                                    <span className="text-gray-700">Matin (9h - 12h)</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                        <Input 
                                                            type="checkbox"
                                                            name="disponibiliteApresMidi"
                                                            checked={formData.disponibiliteApresMidi}
                                                            onChange={handleCheckboxChange}
                                                            className="text-black absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-emerald-500"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.disponibiliteApresMidi ? 'bg-emerald-500' : ''}`}></span>
                                                    </div>
                                                    <span className="text-gray-700">Après-midi (14h - 17h)</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                        <Input 
                                                            type="checkbox"
                                                            name="disponibiliteSoir"
                                                            checked={formData.disponibiliteSoir}
                                                            onChange={handleCheckboxChange}
                                                            className="text-black absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-emerald-500"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.disponibiliteSoir ? 'bg-emerald-500' : ''}`}></span>
                                                    </div>
                                                    <span className="text-gray-700">Soir (17h - 19h)</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Déclaration sur l'honneur */}
                                        <div>
                                            <label className="block text-lg font-medium text-gray-900 mb-4">
                                                Déclaration sur l'honneur
                                            </label>
                                            <div className="space-y-4">
                                                <label className="flex items-start space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
                                                        <Input
                                                            type="checkbox"
                                                            name="certificationExactitude"
                                                            required
                                                            checked={formData.certificationExactitude}
                                                            onChange={handleCheckboxChange}
                                                            className="text-black absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-emerald-500"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.certificationExactitude ? 'bg-emerald-500' : ''}`}></span>
                                                    </div>
                                                    <span className="text-gray-700">
                                                        Je certifie sur l'honneur l'exactitude des informations fournies dans ce formulaire
                                                    </span>
                                                </label>
                                                <label className="flex items-start space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
                                                        <Input
                                                            type="checkbox"
                                                            name="participationGratuite"
                                                            required
                                                            checked={formData.participationGratuite}
                                                            onChange={handleCheckboxChange}
                                                            className="text-black absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-emerald-500"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.participationGratuite ? 'bg-emerald-500' : ''}`}></span>
                                                    </div>
                                                    <span className="text-gray-700">
                                                        Je comprends que la participation au Grand Prix FONIJ est gratuite et m'engage à suivre le processus jusqu'à son terme
                                                    </span>
                                                </label>
                                                <label className="flex items-start space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
                                                        <Input
                                                            type="checkbox"
                                                            name="autorisationCommunication"
                                                            required
                                                            checked={formData.autorisationCommunication}
                                                            onChange={handleCheckboxChange}
                                                            className="text-black absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-emerald-500"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.autorisationCommunication ? 'bg-emerald-500' : ''}`}></span>
                                                    </div>
                                                    <span className="text-gray-700">
                                                        J'autorise le FONIJ à utiliser les informations de mon projet à des fins de communication et de promotion
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Bouton de soumission */}
                                        <div className="mt-8 flex justify-center">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!formData.certificationExactitude || !formData.participationGratuite || !formData.autorisationCommunication}
                                            >
                                                Soumettre ma candidature
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation entre les étapes */}
                    {currentStep < 6 && (
                        <div className="mt-8 flex justify-between">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={goToPreviousStep}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    Retour
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={goToNextStep}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Étape suivante
                            </button>
                        </div>
                    )}

                    {/* Section d'aide et contact */}
                    <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Besoin d'aide ?</h2>
                        <p className="text-gray-600 mb-6">
                            Notre équipe est là pour vous accompagner dans le processus de candidature.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-emerald-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Téléphone</p>
                                    <p className="text-gray-900">+224 123 456 789</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-emerald-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900">contact@fonij.org</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </MainLayout>
    );
}