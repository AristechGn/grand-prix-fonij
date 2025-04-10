import MainLayout from '@/layouts/MainLayout';
import { useState, useEffect } from 'react';
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
const inputClass = "w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background shadow-sm text-foreground";
const selectClass = "w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background shadow-sm text-foreground";
const textareaClass = "w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background shadow-sm text-foreground";

export default function Candidater() {
    const [formData, setFormData] = useState({
        // Informations personnelles
        nom: '',
        prenom: '',
        dateNaissance: '',
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

    // Calculer l'âge en fonction de la date de naissance
    const calculerAge = (dateNaissance: string): string => {
        if (!dateNaissance) return '';
        
        const aujourdhui = new Date();
        const dateNaissanceObj = new Date(dateNaissance);
        
        let age = aujourdhui.getFullYear() - dateNaissanceObj.getFullYear();
        const moisDiff = aujourdhui.getMonth() - dateNaissanceObj.getMonth();
        
        // Si le mois de naissance n'est pas encore passé ou si c'est le même mois mais que le jour n'est pas encore passé
        if (moisDiff < 0 || (moisDiff === 0 && aujourdhui.getDate() < dateNaissanceObj.getDate())) {
            age--;
        }
        
        return age.toString();
    };

    // Mettre à jour l'âge lorsque la date de naissance change
    useEffect(() => {
        if (formData.dateNaissance) {
            const ageCalcule = calculerAge(formData.dateNaissance);
            setFormData(prev => ({
                ...prev,
                age: ageCalcule
            }));
        }
    }, [formData.dateNaissance]);

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

    const handleSelectChange = (name: string, value: string) => {
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
            const file = e.target.files[0];
            const maxSize = name === 'photoProjet' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB pour photo, 10MB pour les autres
            
            if (file.size > maxSize) {
                const sizeInMB = maxSize / 1024 / 1024;
                alert(`Le fichier est trop volumineux. La taille maximum est de ${sizeInMB}MB.`);
                e.target.value = ''; // Réinitialiser l'input
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                [name]: file
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
            if (!formData.nom || !formData.prenom || !formData.dateNaissance || !formData.email || !formData.telephone || !formData.region) {
                alert("Veuillez remplir tous les champs obligatoires");
                return;
            }
            
            // Vérifier que l'âge est entre 15 et 35 ans
            const age = parseInt(formData.age);
            if (isNaN(age) || age < 15 || age > 35) {
                alert("Vous devez avoir entre 15 et 35 ans pour participer");
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
            <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-b from-muted via-background to-muted">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    {/* En-tête */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
                            <span className="block">Grand Prix FONIJ</span>
                            <span className="block text-primary mt-2">Édition 2025</span>
                        </h1>
                        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                            Transformez votre idée en réalité ! Remplissez le formulaire ci-dessous pour soumettre votre projet au Grand Prix FONIJ.
                        </p>
                        <div className="mt-8 flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                                <span>15-35 ans</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                                <span>Projet innovant</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-primary mr-2" />
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
                                            ? 'bg-primary text-background'
                                            : currentStep === index + 1
                                                ? 'bg-primary/10 text-primary border-2 border-primary'
                                                : 'bg-muted text-muted-foreground'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-muted-foreground">{step}</span>
                                    {index < 4 && (
                                        <div className={`w-12 h-0.5 ml-4 ${
                                            currentStep > index + 1 ? 'bg-primary' : 'bg-border'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Étape 1: Choix de la catégorie */}
                    {currentStep === 1 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Choisissez votre catégorie</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {categories.map((category, index) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                            formData.categorie === category.id.toString() 
                                                ? 'bg-primary/10 border-2 border-primary'
                                                : 'bg-background border-2 border-border hover:border-primary/20'
                                        }`}
                                        onClick={() => setFormData({...formData, categorie: category.id.toString()})}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <span className="text-4xl">{category.icon}</span>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                                                <p className="mt-2 text-muted-foreground">{category.description}</p>
                                                <ul className="mt-4 space-y-2">
                                                    {category.details.map((detail, idx) => (
                                                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        {formData.categorie === category.id.toString() && (
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-primary text-background rounded-full p-2">
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
                        <div className="bg-background rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-foreground mb-8">Informations personnelles</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Date de naissance <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="date"
                                            name="dateNaissance"
                                            required
                                            max={new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
                                            min={new Date(new Date().getFullYear() - 35, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
                                            value={formData.dateNaissance}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                        {formData.age && (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Âge: <span className="font-medium text-primary">{formData.age} ans</span>
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Genre <span className="text-red-500">*</span>
                                        </label>
                                        <Select 
                                            name="genre"
                                            value={formData.genre}
                                            onValueChange={(value) => handleSelectChange("genre", value)}
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Région <span className="text-red-500">*</span>
                                            </label>
                                        <Select
                                            name="region"
                                            value={formData.region}
                                            onValueChange={(value) => handleSelectChange("region", value)}
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Niveau d'études <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            name="niveauEtudes"
                                            value={formData.niveauEtudes}
                                            onValueChange={(value) => handleSelectChange("niveauEtudes", value)}
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                        <div className="bg-background rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-foreground mb-8">Informations sur votre projet</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {formData.resumeProjet.length}/200 caractères
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                                    className="form-radio h-4 w-4 text-primary"
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
                                                    className="form-radio h-4 w-4 text-primary"
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                    {formData.projetLance === 'oui' && (
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
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
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                                    className="form-radio h-4 w-4 text-primary"
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
                                                    className="form-radio h-4 w-4 text-primary"
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
                            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Choisissez votre programme d'accélération</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div
                                    className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                        formData.programme === "1" 
                                            ? 'bg-primary/10 border-2 border-primary'
                                            : 'bg-background border-2 border-border hover:border-primary/20'
                                    }`}
                                    onClick={() => setFormData({...formData, programme: "1"})}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                                            <Award className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">SMART Entrepreneur</h3>
                                        <p className="text-muted-foreground mb-4">De l'idée au projet structuré. Idéal pour les projets en phase initiale.</p>
                                        <div className="bg-primary/10 w-full p-3 rounded-lg text-center mb-4">
                                            <span className="font-medium text-primary">3 mois</span>
                                        </div>
                                        <ul className="text-left w-full space-y-2 mb-4">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Transformer une idée en projet concret</span>
                                            </li>
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Définir un problème réel à résoudre</span>
                                            </li>
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Poser les bases d'un modèle économique</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {formData.programme === "1" && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-primary text-background rounded-full p-2">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                        formData.programme === "2" 
                                            ? 'bg-primary/10 border-2 border-primary'
                                            : 'bg-background border-2 border-border hover:border-primary/20'
                                    }`}
                                    onClick={() => setFormData({...formData, programme: "2"})}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                                            <BookOpen className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">Youth'Incuba</h3>
                                        <p className="text-muted-foreground mb-4">Incuber votre projet, le faire grandir. Pour les projets ayant déjà une structure de base.</p>
                                        <div className="bg-primary/10 w-full p-3 rounded-lg text-center mb-4">
                                            <span className="font-medium text-primary">6 mois</span>
                                        </div>
                                        <ul className="text-left w-full space-y-2 mb-4">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Coaching individuel avec des experts</span>
                                            </li>
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Accès à un espace de travail dynamique</span>
                                            </li>
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Développement du MVP</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {formData.programme === "2" && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-primary text-background rounded-full p-2">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`relative rounded-2xl p-8 cursor-pointer transition-all ${
                                        formData.programme === "3" 
                                            ? 'bg-primary/10 border-2 border-primary'
                                            : 'bg-background border-2 border-border hover:border-primary/20'
                                    }`}
                                    onClick={() => setFormData({...formData, programme: "3"})}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                                            <Zap className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">Boost Entrepreneurs</h3>
                                        <p className="text-muted-foreground mb-4">Accélérer le lancement de votre entreprise. Pour les projets matures prêts à décoller.</p>
                                        <div className="bg-primary/10 w-full p-3 rounded-lg text-center mb-4">
                                            <span className="font-medium text-primary">12 mois</span>
                                        </div>
                                        <ul className="text-left w-full space-y-2 mb-4">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Accompagnement à la levée de fonds</span>
                                            </li>
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Coaching avancé en stratégie</span>
                                            </li>
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                <span>Préparation au pitch pour investisseurs</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {formData.programme === "3" && (
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-primary text-background rounded-full p-2">
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
                            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Documents à joindre</h2>
                            <div className="bg-background rounded-2xl shadow-xl overflow-hidden">
                                <div className="p-8">
                                    <div className="grid grid-cols-1 gap-8">
                                        {/* Pièce d'identité */}
                                        <div className="relative">
                                            <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 transition-all hover:shadow-md">
                                                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                                    <span className="bg-primary/20 text-primary p-2 rounded-lg mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-id-card"><rect width="18" height="16" x="3" y="4" rx="2"/><path d="M9 10h1"/><path d="M9 14h1"/><path d="M14 10h1"/><path d="M14 14h1"/><path d="M3 8h18"/></svg>
                                                    </span>
                                                    Pièce d'identité <span className="text-red-500">*</span>
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                    Une pièce d'identité valide (carte d'identité, passeport, permis de conduire)
                                                </p>
                                                <div className="mt-2">
                                                    <label 
                                                        htmlFor="pieceIdentite" 
                                                        className={`flex flex-col items-center justify-center w-full px-6 pt-5 pb-6 border-2 ${formData.pieceIdentite ? 'border-primary bg-primary/5' : 'border-gray-300 border-dashed'} rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300`}
                                                    >
                                                        <div className="flex flex-col items-center justify-center text-center">
                                                            {formData.pieceIdentite ? (
                                                                <>
                                                                    <div className="p-3 rounded-full bg-primary/20 mb-3">
                                                                        <CheckCircle className="h-8 w-8 text-primary" />
                                                                    </div>
                                                                    <span className="font-medium text-primary">Fichier sélectionné</span>
                                                                    <p className="text-sm text-muted-foreground mt-1">{formData.pieceIdentite.name}</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        {(formData.pieceIdentite.size / 1024 / 1024).toFixed(2)} MB
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-10 h-10 mb-3 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                                    </svg>
                                                                    <p className="mb-2 text-sm text-foreground">
                                                                        <span className="font-semibold text-primary">Cliquez pour télécharger</span> ou glissez-déposez
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        PDF, JPG ou PNG (max. 10MB)
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
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
                                                    {formData.pieceIdentite && (
                                                        <div className="mt-3 flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => setFormData({...formData, pieceIdentite: null})}
                                                                className="text-sm text-red-500 hover:text-red-700 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Plan */}
                                        <div className="relative">
                                            <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 transition-all hover:shadow-md">
                                                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                                    <span className="bg-primary/20 text-primary p-2 rounded-lg mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                                                    </span>
                                                    Business Plan
                                                    <span className="ml-2 text-sm text-muted-foreground">(Recommandé)</span>
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                    Document détaillant votre modèle économique et votre stratégie de développement
                                                </p>
                                                <div className="mt-2">
                                                    <label 
                                                        htmlFor="businessPlan" 
                                                        className={`flex flex-col items-center justify-center w-full px-6 pt-5 pb-6 border-2 ${formData.businessPlan ? 'border-primary bg-primary/5' : 'border-gray-300 border-dashed'} rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300`}
                                                    >
                                                        <div className="flex flex-col items-center justify-center text-center">
                                                            {formData.businessPlan ? (
                                                                <>
                                                                    <div className="p-3 rounded-full bg-primary/20 mb-3">
                                                                        <CheckCircle className="h-8 w-8 text-primary" />
                                                                    </div>
                                                                    <span className="font-medium text-primary">Fichier sélectionné</span>
                                                                    <p className="text-sm text-muted-foreground mt-1">{formData.businessPlan.name}</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        {(formData.businessPlan.size / 1024 / 1024).toFixed(2)} MB
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-10 h-10 mb-3 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                                    </svg>
                                                                    <p className="mb-2 text-sm text-foreground">
                                                                        <span className="font-semibold text-primary">Cliquez pour télécharger</span> ou glissez-déposez
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        PDF, DOC ou DOCX (max. 10MB)
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                        <Input
                                                            id="businessPlan"
                                                            name="businessPlan"
                                                            type="file"
                                                            className="sr-only"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                    {formData.businessPlan && (
                                                        <div className="mt-3 flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => setFormData({...formData, businessPlan: null})}
                                                                className="text-sm text-red-500 hover:text-red-700 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Photo/Logo du projet */}
                                        <div className="relative">
                                            <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 transition-all hover:shadow-md">
                                                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                                    <span className="bg-primary/20 text-primary p-2 rounded-lg mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                                    </span>
                                                    Photo ou logo du projet
                                                    <span className="ml-2 text-sm text-muted-foreground">(Optionnel)</span>
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                    Une image représentative de votre projet ou votre logo
                                                </p>
                                                <div className="mt-2">
                                                    <label 
                                                        htmlFor="photoProjet" 
                                                        className={`flex flex-col items-center justify-center w-full px-6 pt-5 pb-6 border-2 ${formData.photoProjet ? 'border-primary bg-primary/5' : 'border-gray-300 border-dashed'} rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300`}
                                                    >
                                                        <div className="flex flex-col items-center justify-center text-center">
                                                            {formData.photoProjet ? (
                                                                <>
                                                                    <div className="relative w-24 h-24 mb-3 overflow-hidden rounded-lg border-2 border-primary/20">
                                                                        <img 
                                                                            src={URL.createObjectURL(formData.photoProjet)} 
                                                                            alt="Aperçu" 
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <span className="font-medium text-primary">Image sélectionnée</span>
                                                                    <p className="text-sm text-muted-foreground mt-1">{formData.photoProjet.name}</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        {(formData.photoProjet.size / 1024 / 1024).toFixed(2)} MB
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-10 h-10 mb-3 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                                    </svg>
                                                                    <p className="mb-2 text-sm text-foreground">
                                                                        <span className="font-semibold text-primary">Cliquez pour télécharger</span> ou glissez-déposez
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        JPG ou PNG (max. 5MB)
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                        <Input
                                                            id="photoProjet"
                                                            name="photoProjet"
                                                            type="file"
                                                            className="sr-only"
                                                            accept=".jpg,.jpeg,.png"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                    {formData.photoProjet && (
                                                        <div className="mt-3 flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => setFormData({...formData, photoProjet: null})}
                                                                className="text-sm text-red-500 hover:text-red-700 flex items-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Lien vidéo avec icône */}
                                        <div className="relative">
                                            <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 transition-all hover:shadow-md">
                                                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                                                    <span className="bg-primary/20 text-primary p-2 rounded-lg mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                                                    </span>
                                                    Vidéo de présentation
                                                    <span className="ml-2 text-sm text-muted-foreground">(Optionnel)</span>
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                    Une vidéo courte (2-3 minutes) présentant votre projet augmentera vos chances de sélection
                                                </p>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                                                    </div>
                                                    <Input
                                                        type="url"
                                                        name="videoPresentation"
                                                        value={formData.videoPresentation}
                                                        onChange={handleChange}
                                                        placeholder="https://youtube.com/..."
                                                        className={`${inputClass} pl-10`}
                                                    />
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                                    Lien YouTube, Vimeo ou toute autre plateforme de partage vidéo
                                                </p>
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
                            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Finalisation de votre candidature</h2>
                            <div className="bg-background rounded-2xl shadow-xl overflow-hidden">
                                <div className="p-8">
                                    <div className="space-y-8">
                                        {/* Disponibilités */}
                                        <div>
                                            <label className="block text-lg font-medium text-foreground mb-4">
                                                Disponibilités pour l'entretien
                                            </label>
                                            <p className="text-sm text-muted-foreground mb-4">
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
                                                            className="text-foreground absolute block w-6 h-6 rounded-full bg-background border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-primary"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.disponibiliteMatin ? 'bg-primary' : ''}`}></span>
                                                    </div>
                                                    <span className="text-foreground">Matin (9h - 12h)</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                        <Input 
                                                            type="checkbox"
                                                            name="disponibiliteApresMidi"
                                                            checked={formData.disponibiliteApresMidi}
                                                            onChange={handleCheckboxChange}
                                                            className="text-foreground absolute block w-6 h-6 rounded-full bg-background border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-primary"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.disponibiliteApresMidi ? 'bg-primary' : ''}`}></span>
                                                    </div>
                                                    <span className="text-foreground">Après-midi (14h - 17h)</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                        <Input 
                                                            type="checkbox"
                                                            name="disponibiliteSoir"
                                                            checked={formData.disponibiliteSoir}
                                                            onChange={handleCheckboxChange}
                                                            className="text-foreground absolute block w-6 h-6 rounded-full bg-background border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-primary"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.disponibiliteSoir ? 'bg-primary' : ''}`}></span>
                                                    </div>
                                                    <span className="text-foreground">Soir (17h - 19h)</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Déclaration sur l'honneur */}
                                        <div>
                                            <label className="block text-lg font-medium text-foreground mb-4">
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
                                                            className="text-foreground absolute block w-6 h-6 rounded-full bg-background border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-primary"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.certificationExactitude ? 'bg-primary' : ''}`}></span>
                                                    </div>
                                                    <span className="text-foreground">
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
                                                            className="text-foreground absolute block w-6 h-6 rounded-full bg-background border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-primary"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.participationGratuite ? 'bg-primary' : ''}`}></span>
                                                    </div>
                                                    <span className="text-foreground">
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
                                                            className="text-foreground absolute block w-6 h-6 rounded-full bg-background border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-primary"
                                                        />
                                                        <span className={`block overflow-hidden h-6 rounded-full bg-gray-300 ${formData.autorisationCommunication ? 'bg-primary' : ''}`}></span>
                                                    </div>
                                                    <span className="text-foreground">
                                                        J'autorise le FONIJ à utiliser les informations de mon projet à des fins de communication et de promotion
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Bouton de soumission */}
                                        <div className="mt-8 flex justify-center">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-background bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    className="inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md shadow-sm text-foreground bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Retour
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={goToNextStep}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-background bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Étape suivante
                            </button>
                        </div>
                    )}

                    {/* Section d'aide et contact */}
                    <div className="mt-16 bg-background rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Besoin d'aide ?</h2>
                        <p className="text-muted-foreground mb-6">
                            Notre équipe est là pour vous accompagner dans le processus de candidature.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-primary mr-3" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Téléphone</p>
                                    <p className="text-foreground">+224 123 456 789</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-primary mr-3" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-foreground">contact@fonij.org</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </MainLayout>
    );
} 