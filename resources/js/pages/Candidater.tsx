import MainLayout from '@/layouts/MainLayout';
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FONIJ } from '@/utils';
import axios from 'axios';
import { toast } from 'sonner';
import InputError from '@/components/input-error';

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
    icon: cat.textColor,
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
    edition: Edition;
}

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    isSubmit?: boolean;
    isNextDisabled?: boolean;
    submitting?: boolean;
}

export default function Candidater({ edition }: CandidaterProps) {
    // Vérifier si l'édition est valide
    if (!edition?.id) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Édition non disponible</h1>
                        <p className="text-gray-600">Aucune édition active n'est disponible pour les candidatures.</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const [formData, setFormData] = useState({
        edition_id: edition.id,
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
        category: '',
        program: '',
        
        // Informations du projet
        project_name: '',
        project_summary: '',
        problem_solved: '',
        expected_impact: '',
        target_audience: '',
        project_launched: 'non',
        project_start_date: '',
        prototype_exists: 'non',
        
        // Disponibilités
        availability_morning: false,
        availability_afternoon: false,
        availability_evening: false,
        
        // Déclaration
        certification_accuracy: false,
        free_participation: false,
        communication_authorization: false,
        
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
        
        // Créer un FormData pour envoyer les fichiers
        const formDataObj = new FormData();
        
        // Ajouter les données du formulaire
        formDataObj.append('edition_id', formData.edition_id.toString());
        formDataObj.append('first_name', formData.nom);
        formDataObj.append('last_name', formData.prenom);
        formDataObj.append('birth_date', formData.dateNaissance);
        formDataObj.append('gender', formData.genre);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.telephone);
        formDataObj.append('city', formData.ville);
        formDataObj.append('region', formData.region);
        formDataObj.append('education_level', formData.niveauEtudes);
        formDataObj.append('profession', formData.profession);
        formDataObj.append('category', formData.category);
        formDataObj.append('program', formData.program);
        formDataObj.append('project_name', formData.project_name);
        formDataObj.append('project_summary', formData.project_summary);
        formDataObj.append('problem_solved', formData.problem_solved);
        formDataObj.append('expected_impact', formData.expected_impact);
        formDataObj.append('target_audience', formData.target_audience);
        formDataObj.append('project_launched', formData.project_launched);
        
        if (formData.project_start_date) {
            formDataObj.append('project_start_date', formData.project_start_date);
        }
        
        formDataObj.append('prototype_exists', formData.prototype_exists);
        formDataObj.append('availability_morning', formData.availability_morning.toString());
        formDataObj.append('availability_afternoon', formData.availability_afternoon.toString());
        formDataObj.append('availability_evening', formData.availability_evening.toString());
        
        if (formData.videoPresentation) {
            formDataObj.append('videoPresentation', formData.videoPresentation);
        }
        
        formDataObj.append('certification_accuracy', formData.certification_accuracy.toString());
        formDataObj.append('free_participation', formData.free_participation.toString());
        formDataObj.append('communication_authorization', formData.communication_authorization.toString());
        
        // Ajouter les fichiers si présents
        if (formData.pieceIdentite) {
            formDataObj.append('pieceIdentite', formData.pieceIdentite);
        }
        
        if (formData.businessPlan) {
            formDataObj.append('businessPlan', formData.businessPlan);
        }
        
        if (formData.photoProjet) {
            formDataObj.append('photoProjet', formData.photoProjet);
        }
        
        // Réinitialiser les erreurs
        setErrors({});
        setSubmitting(true);
        
        // Soumettre le formulaire
        axios.post(route('candidater.store'), formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            }
        })
        .then(response => {
            // Rediriger vers la page de confirmation
            if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                toast.success('Votre candidature a été soumise avec succès!');
                // Réinitialiser le formulaire
                reset();
            }
        })
        .catch(error => {
            setSubmitting(false);
            
            if (error.response) {
                // Erreurs de validation
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors || {});
                    
                    // Afficher le message d'erreur général
                    toast.error(error.response.data.message || 'Veuillez corriger les erreurs dans le formulaire.');
                    
                    // Revenir à la première étape avec une erreur
                    const firstErrorStep = getFirstErrorStep(error.response.data.errors);
                    if (firstErrorStep) {
                        setCurrentStep(firstErrorStep);
                    }
                } else {
                    // Autres erreurs
                    toast.error(error.response.data.message || 'Une erreur est survenue lors de la soumission de votre candidature.');
                }
            } else {
                toast.error('Une erreur de connexion est survenue. Veuillez réessayer plus tard.');
            }
        });
    };
    
    // Fonction wrapper pour utiliser dans les boutons de navigation
    const handleSubmitWrapper = () => {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    };

    // Déterminer la première étape contenant une erreur
    const getFirstErrorStep = (errors: Record<string, string[]>) => {
        const errorFields = Object.keys(errors);
        
        if (errorFields.some(field => ['category'].includes(field))) {
            return 1; // Étape Catégorie
        }
        
        if (errorFields.some(field => ['first_name', 'last_name', 'birth_date', 'gender', 'email', 'phone', 'city', 'region', 'education_level', 'profession'].includes(field))) {
            return 2; // Étape Informations personnelles
        }
        
        if (errorFields.some(field => ['project_name', 'project_summary', 'problem_solved', 'expected_impact', 'target_audience', 'project_launched', 'project_start_date', 'prototype_exists'].includes(field))) {
            return 3; // Étape Projet
        }
        
        if (errorFields.some(field => ['program'].includes(field))) {
            return 4; // Étape Programme
        }
        
        if (errorFields.some(field => ['pieceIdentite', 'businessPlan', 'photoProjet', 'videoPresentation'].includes(field))) {
            return 5; // Étape Documents
        }
        
        if (errorFields.some(field => ['certification_accuracy', 'free_participation', 'communication_authorization'].includes(field))) {
            return 6; // Étape Finalisation
        }
        
        return 1; // Par défaut, revenir à la première étape
    };

    // État pour les erreurs et la soumission
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [submitting, setSubmitting] = useState(false);
    
    // Réinitialiser le formulaire
    const reset = () => {
        setFormData({
            // Réinitialiser toutes les valeurs du formulaire
            edition_id: edition.id,
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
            category: '',
            program: '',
            project_name: '',
            project_summary: '',
            problem_solved: '',
            expected_impact: '',
            target_audience: '',
            project_launched: 'non',
            project_start_date: '',
            prototype_exists: 'non',
            availability_morning: false,
            availability_afternoon: false,
            availability_evening: false,
            certification_accuracy: false,
            free_participation: false,
            communication_authorization: false,
            pieceIdentite: null,
            businessPlan: null,
            photoProjet: null,
            videoPresentation: ''
        });
        setCurrentStep(1);
        setErrors({});
    };
    
    // Fonction pour vérifier si un champ a une erreur
    const hasError = (field: string): boolean => {
        return !!errors[field];
    };
    
    // Fonction pour obtenir le message d'erreur d'un champ
    const getError = (field: string): string => {
        return errors[field] ? errors[field][0] : '';
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

    const handleCategorySelect = (categoryId: string) => {
        console.log('Catégorie sélectionnée:', categoryId);
        setFormData(prev => ({
            ...prev,
            category: categoryId
        }));
        // Réinitialiser les erreurs lors de la sélection d'une catégorie
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.category;
            return newErrors;
        });
    };

    const goToNextStep = () => {
        console.log('État actuel du formulaire:', formData);
        
        setSubmitting(true);
        
        switch (currentStep) {
            case 1: // Catégorie
                console.log('Validation de la catégorie:', formData.category);
                
                // Validation côté serveur de la catégorie
                axios.post(route('api.validate-step'), {
                    step: currentStep,
                    categorie: formData.category
                })
                .then((response: any) => {
                    setErrors({});
                    setCurrentStep(current => Math.min(current + 1, totalSteps));
                    scrollToTop();
                })
                .catch((error: any) => {
                    if (error.response && error.response.status === 422) {
                        setErrors(error.response.data.errors || {});
                        toast.error('Veuillez sélectionner une catégorie');
                    } else {
                        toast.error('Une erreur est survenue lors de la validation');
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
                return;

            case 2: // Informations personnelles
                const personalInfoData = {
                    first_name: formData.nom,
                    last_name: formData.prenom,
                    birth_date: formData.dateNaissance,
                    gender: formData.genre,
                    email: formData.email,
                    phone: formData.telephone,
                    city: formData.ville,
                    region: formData.region,
                    education_level: formData.niveauEtudes,
                    profession: formData.profession
                };

                // Validation côté serveur
                axios.post(route('api.validate-step'), {
                    step: currentStep,
                    ...personalInfoData
                })
                .then((response: any) => {
                    setErrors({});
                    setCurrentStep(current => Math.min(current + 1, totalSteps));
                    scrollToTop();
                })
                .catch((error: any) => {
                    if (error.response && error.response.status === 422) {
                        setErrors(error.response.data.errors || {});
                        toast.error('Veuillez corriger les erreurs dans le formulaire');
                    } else {
                        toast.error('Une erreur est survenue lors de la validation');
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
                return;

            case 3: // Projet
                const projectData = {
                    project_name: formData.project_name,
                    project_summary: formData.project_summary,
                    problem_solved: formData.problem_solved,
                    expected_impact: formData.expected_impact,
                    target_audience: formData.target_audience,
                    project_launched: formData.project_launched,
                    project_start_date: formData.project_start_date,
                    prototype_exists: formData.prototype_exists
                };

                axios.post(route('api.validate-step'), {
                    step: currentStep,
                    ...projectData
                })
                .then((response: any) => {
                    setErrors({});
                    setCurrentStep(current => Math.min(current + 1, totalSteps));
                    scrollToTop();
                })
                .catch((error: any) => {
                    if (error.response && error.response.status === 422) {
                        setErrors(error.response.data.errors || {});
                    } else {
                        toast.error('Une erreur est survenue lors de la validation');
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
                return;

            case 4: // Programme
                const programData = {
                    program: formData.program
                };

                axios.post(route('api.validate-step'), {
                    step: currentStep,
                    ...programData
                })
                .then((response: any) => {
                    setErrors({});
                    setCurrentStep(current => Math.min(current + 1, totalSteps));
                    scrollToTop();
                })
                .catch((error: any) => {
                    if (error.response && error.response.status === 422) {
                        setErrors(error.response.data.errors || {});
                    } else {
                        toast.error('Une erreur est survenue lors de la validation');
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
                return;

            case 5: // Documents
                let hasErrors = false;
                let newErrors: Record<string, string[]> = {};
                
                if (!formData.pieceIdentite) {
                    newErrors.pieceIdentite = ['Une pièce d\'identité est requise'];
                    hasErrors = true;
                }
                
                if (!formData.businessPlan) {
                    newErrors.businessPlan = ['Un business plan est requis'];
                    hasErrors = true;
                }
                
                if (!formData.photoProjet) {
                    newErrors.photoProjet = ['Une photo du projet est requise'];
                    hasErrors = true;
                }
                
                if (formData.videoPresentation && !formData.videoPresentation.startsWith('http')) {
                    newErrors.videoPresentation = ['L\'URL de la vidéo doit commencer par http:// ou https://'];
                    hasErrors = true;
                }
                
                if (hasErrors) {
                    setErrors(newErrors);
                    setSubmitting(false);
                    return;
                }
                
                // Si pas d'erreurs, passer à l'étape suivante
                setCurrentStep(current => Math.min(current + 1, totalSteps));
                setSubmitting(false);
                scrollToTop();
                return;
        }
    };
        
    // Fonction pour faire défiler jusqu'en haut du formulaire
    const scrollToTop = () => {
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
                            selectedCategory={formData.category}
                            onSelectCategory={handleCategorySelect}
                        />
                        {hasError('category') && (
                            <div className="mt-4 text-center text-red-600">
                                <InputError message={getError('category')} />
                            </div>
                        )}
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
                            errors={errors}
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
                            errors={errors}
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
                            selectedProgram={formData.program}
                            onSelectProgram={(programId) => handleSelectChange('program', programId)}
                        />
                        {hasError('program') && (
                            <div className="mt-2 text-center">
                                <InputError message={getError('program')} />
                            </div>
                        )}
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
                            errors={errors}
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
                            errors={errors}
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
            <CandidatureHero edition={edition} errors={errors} />

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

                    {/* Message d'erreur général */}
                    {Object.keys(errors).length > 0 && (
                        <motion.div 
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="font-medium">Veuillez corriger les erreurs suivantes avant de continuer</p>
                            </div>
                            
                            {/* Afficher les erreurs spécifiques */}
                            {errors.category && (
                                <div className="mt-2 text-sm text-red-600">
                                    {errors.category}
                                </div>
                            )}
                        </motion.div>
                    )}

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
                            submitting={submitting}
                        />
                    ) : (
                        <NavigationButtons 
                            currentStep={currentStep} 
                            totalSteps={totalSteps} 
                            onNext={handleSubmitWrapper} 
                            onPrevious={goToPreviousStep} 
                            isSubmit={true}
                            isNextDisabled={!formData.certification_accuracy || !formData.free_participation || !formData.communication_authorization}
                            submitting={submitting}
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