import MainLayout from '@/layouts/MainLayout';
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FONIJ } from '@/utils';

// Composants
import CandidatureHero from '@/components/candidature/CandidatureHero';
import FormProgress from '@/components/candidature/FormProgress';
import CategorySelector from '@/components/candidature/CategorySelector';
import PersonalInfoForm from '@/components/candidature/PersonalInfoForm';
import ProjectInfoForm from '@/components/candidature/ProjectInfoForm';
import ProgramSelector from '@/components/candidature/ProgramSelector';
import DocumentsForm from '@/components/candidature/DocumentsForm';
import FinalizationForm from '@/components/candidature/FinalizationForm';
import NavigationButtons from '@/components/candidature/NavigationButtons';
import ContactSection from '@/components/candidature/ContactSection';

// Utiliser les catégories depuis FONIJ
const categories = FONIJ.categories.map(cat => ({
    id: cat.id,
    name: cat.title,
    description: cat.description,
    icon: cat.textColor,  // Utiliser la couleur comme référence pour l'icône
    details: cat.crochets || [],
    image: cat.image,
}));

const niveauxEtudes = [
    "Primaire", "Collège", "Lycée", "Baccalauréat", 
    "Licence/Bachelor", "Master", "Doctorat", "Formation professionnelle", "Autodidacte"
];

const regions = [
    "Conakry", "Kindia", "Boké", "Mamou", "Labé", 
    "Faranah", "Kankan", "Nzérékoré", "Autre"
];

// Styles communs pour les inputs, selects et textareas
const inputClass = "w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/50 backdrop-blur-sm shadow-sm text-foreground";
const textareaClass = "w-full px-4 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background/50 backdrop-blur-sm shadow-sm text-foreground";

// Styles pour les titres de section
const sectionTitleClass = "text-2xl md:text-3xl font-bold text-foreground mb-4 text-center";
const sectionDividerClass = "mx-auto h-1 w-20 bg-gradient-fonij mb-6";
const sectionDescriptionClass = "text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8";

interface Edition {
    id: number;
    name: string;
    year: number;
    registrationDeadline: string;
}

interface CandidaterProps {
    edition: Edition | null;
}

export default function Candidater({ edition }: CandidaterProps) {
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
    
    // Étapes du formulaire
    const formSteps = [
        "Catégorie",
        "Informations personnelles",
        "Projet",
        "Programme",
        "Documents",
        "Finalisation"
    ];
    
    // Calculer l'année de l'édition actuelle ou utiliser l'année en cours
    const currentYear = edition ? edition.year : new Date().getFullYear();

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
        
        // Préparer les données à envoyer
        const submitData = {
            ...formData,
            edition_id: edition?.id || null, // Inclure l'ID de l'édition si disponible
            edition_name: edition?.name || '',
            year: currentYear
        };
        
        // Logique de soumission du formulaire
        console.log(submitData);
        
        // Ici, vous pouvez ajouter le code pour envoyer les données au serveur
        // par exemple avec fetch ou axios
        
        alert("Votre candidature a été soumise avec succès !");
    };
    
    const handleSubmitWrapper = () => {
        // Créer un événement synthétique pour handleSubmit
        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
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
        
            // Faire défiler jusqu'à la position des étapes du formulaire (juste après le héros)
        setTimeout(() => {
            const stepsElement = document.querySelector('.form-progress');
            if (stepsElement) {
                const stepsPosition = stepsElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: stepsPosition, behavior: 'smooth' });
            }
        }, 100);
    };

    const goToPreviousStep = () => {
        setCurrentStep(current => Math.max(current - 1, 1));
        
            // Faire défiler jusqu'à la position des étapes du formulaire (juste après le héros)
        setTimeout(() => {
            const stepsElement = document.querySelector('.form-progress');
            if (stepsElement) {
                const stepsPosition = stepsElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: stepsPosition, behavior: 'smooth' });
            }
        }, 100);
    };

    // Rendu des étapes du formulaire en fonction de currentStep
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
    return (
                    <div className="mb-8 md:mb-16">
                        <h2 className={sectionTitleClass}>Choisissez votre catégorie</h2>
                        <div className={sectionDividerClass}></div>
                        <p className={sectionDescriptionClass}>
                            Sélectionnez la catégorie qui correspond le mieux à votre projet.
                        </p>
                        <CategorySelector 
                            categories={categories} 
                            selectedCategory={formData.categorie}
                            onSelectCategory={(categoryId) => setFormData({...formData, categorie: categoryId})}
                            defaultCategory="1"
                        />
                        </div>
                );
            case 2:
                return (
                    <div className="mb-8 md:mb-16">
                        <h2 className={sectionTitleClass}>Informations personnelles</h2>
                        <div className={sectionDividerClass}></div>
                        <p className={sectionDescriptionClass}>
                            Ces informations nous aideront à mieux connaître votre profil et à vous contacter.
                        </p>
                        <PersonalInfoForm 
                            formData={formData}
                            handleChange={handleChange}
                            handleSelectChange={handleSelectChange}
                            regions={regions}
                            niveauxEtudes={niveauxEtudes}
                        />
                                    </div>
                );
            case 3:
                return (
                                    <motion.div
                        className="mb-8 md:mb-16"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={sectionTitleClass}>Informations sur votre projet</h2>
                        <div className={sectionDividerClass}></div>
                        <p className={sectionDescriptionClass}>
                            Décrivez votre projet avec précision pour nous permettre de mieux l'évaluer.
                        </p>
                        <ProjectInfoForm
                            formData={formData}
                            handleChange={handleChange}
                        />
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div
                        className="mb-8 md:mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={sectionTitleClass}>Programme d'accélération</h2>
                        <div className={sectionDividerClass}></div>
                        <p className={sectionDescriptionClass}>
                            Sélectionnez le programme qui correspond le mieux à vos besoins.
                        </p>
                        <ProgramSelector
                            selectedProgram={formData.programme}
                            onSelectProgram={(programId) => handleSelectChange('programme', programId)}
                        />
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div
                        className="mb-8 md:mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={sectionTitleClass}>Documents requis</h2>
                        <div className={sectionDividerClass}></div>
                        <p className={sectionDescriptionClass}>
                            Veuillez joindre les documents nécessaires pour compléter votre candidature.
                        </p>
                        <DocumentsForm
                            formData={formData}
                            handleChange={handleChange}
                            handleFileChange={handleFileChange}
                        />
                    </motion.div>
                );
            case 6:
                return (
                        <motion.div 
                        className="mb-8 md:mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={sectionTitleClass}>Finalisation</h2>
                        <div className={sectionDividerClass}></div>
                        <p className={sectionDescriptionClass}>
                            Veuillez confirmer les informations suivantes pour soumettre votre candidature.
                        </p>
                        <FinalizationForm
                            formData={formData}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <CandidatureHero edition={edition} />

            <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-muted/50 pt-8 md:pt-16">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Indicateur de progression */}
                    <div className="form-progress">
                        <FormProgress 
                            currentStep={currentStep} 
                            totalSteps={totalSteps} 
                            steps={formSteps} 
                        />
                    </div>

                    {/* Contenu de l'étape actuelle */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderStepContent()}
                        </motion.div>

                    {/* Navigation entre les étapes */}
                    {currentStep < totalSteps ? (
                        <NavigationButtons 
                            currentStep={currentStep} 
                            totalSteps={totalSteps} 
                            onNext={goToNextStep} 
                            onPrevious={goToPreviousStep} 
                        />
                    ) : (
                        <NavigationButtons 
                            currentStep={currentStep} 
                            totalSteps={totalSteps} 
                            onNext={handleSubmitWrapper} 
                            onPrevious={goToPreviousStep} 
                            isSubmit={true}
                            isNextDisabled={!formData.certificationExactitude || !formData.participationGratuite || !formData.autorisationCommunication}
                        />
                    )}

                    {/* Section d'aide et contact */}
                    <ContactSection />
                    
                    {/* Particules en arrière-plan pour un effet visuel */}
                    <div className="fixed inset-0 pointer-events-none -z-10">
                        {Array.from({ length: 10 }).map((_, index) => (
                        <motion.div 
                                key={index}
                                className="absolute h-2 w-2 rounded-full bg-primary/30"
                                style={{ 
                                    top: `${Math.random() * 100}%`, 
                                    left: `${Math.random() * 100}%`,
                                    filter: 'blur(1px)' 
                                }}
                                animate={{ 
                                    y: [0, -100, 0],
                                    opacity: [0, 0.5, 0],
                                    scale: [0, 1, 0]
                                }}
                                transition={{ 
                                    duration: 10 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            />
                        ))}
                    </div>
                </div>
            </form>
        </MainLayout>
    );
} 