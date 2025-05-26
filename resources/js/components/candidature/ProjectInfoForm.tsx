import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Lightbulb, 
    Target, 
    Users, 
    Rocket, 
    Calendar, 
    Wrench, 
    CheckCircle, 
    Sparkles,
    TrendingUp,
    Heart,
    Globe
} from 'lucide-react';
import InputError from '@/components/input-error';

interface ProjectFormData {
    nomProjet: string;
    resumeProjet: string;
    problemeResolu: string;
    impactAttendu: string;
    publicCible: string;
    projetLance: string;
    dateDebutProjet: string;
    prototypeExistant: string;
}

interface ProjectInfoFormProps {
    formData: ProjectFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    errors: Record<string, string[]>;
}

interface FormFieldProps {
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
    description?: string;
    delay?: number;
}

function FormField({ label, required = false, icon, children, description, delay = 0 }: FormFieldProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="space-y-3"
        >
            <div className="flex items-center space-x-2">
                {icon && (
                    <motion.div
                        className="text-primary"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        {icon}
                    </motion.div>
                )}
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {label}
                    {required && (
                        <motion.span 
                            className="text-red-500 ml-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                        >
                            *
                        </motion.span>
                    )}
                </label>
            </div>
            {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    {description}
                </p>
            )}
            {children}
        </motion.div>
    );
}

interface ModernInputProps {
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
}

function ModernInput({ type = "text", name, value, onChange, placeholder, required, maxLength }: ModernInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <motion.div className="relative">
            <Input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                    w-full px-4 py-4 
                    border-2 rounded-2xl
                    bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                    text-gray-800 dark:text-gray-200
                    placeholder-gray-400 dark:placeholder-gray-500
                    transition-all duration-300 ease-out
                    ${isFocused 
                        ? 'border-primary shadow-lg shadow-primary/25 scale-[1.02]' 
                        : value 
                            ? 'border-primary-300 dark:border-primary-600' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-400'
                    }
                    hover:shadow-md focus:ring-0 focus:outline-none
                `}
            />
            
            {/* Success indicator */}
            <AnimatePresence>
                {value && !isFocused && (
                    <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                    >
                        <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Focus glow effect */}
            {isFocused && (
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-secondary-400/20 pointer-events-none -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                />
            )}
        </motion.div>
    );
}

interface ModernTextareaProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
    rows?: number;
    minLength?: number;
}

function ModernTextarea({ name, value, onChange, placeholder, required, maxLength, rows = 4, minLength = 0 }: ModernTextareaProps) {
    const [isFocused, setIsFocused] = useState(false);
    const isMinLengthReached = minLength > 0 ? value.length >= minLength : true;
    
    // Vérifier si maxLength est défini pour les conditions
    const isNearMaxLength = maxLength ? value.length > maxLength * 0.8 : false;
    const isAtMaxLength = maxLength ? value.length >= maxLength : false;
    
    return (
        <motion.div className="relative">
            <Textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                rows={rows}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                    w-full px-4 py-4 
                    border-2 rounded-2xl resize-none
                    bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                    text-gray-800 dark:text-gray-200
                    placeholder-gray-400 dark:placeholder-gray-500
                    transition-all duration-300 ease-out
                    ${isFocused 
                        ? 'border-primary shadow-lg shadow-primary/25 scale-[1.01]' 
                        : value 
                            ? isMinLengthReached 
                            ? 'border-primary-300 dark:border-primary-600' 
                                : 'border-orange-300 dark:border-orange-600'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-400'
                    }
                    hover:shadow-md focus:ring-0 focus:outline-none
                `}
            />
            
            {/* Character count */}
                <motion.div 
                    className={`
                        absolute bottom-3 right-3 text-xs font-medium
                    ${minLength > 0
                        ? value.length < minLength
                            ? 'text-orange-500'
                            : isNearMaxLength 
                                ? isAtMaxLength 
                                    ? 'text-red-500' 
                                    : 'text-orange-500'
                                : 'text-green-500'
                        : isNearMaxLength 
                            ? isAtMaxLength 
                                ? 'text-red-500' 
                                : 'text-orange-500'
                            : 'text-gray-400'
                        }
                    `}
                animate={isAtMaxLength ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3, repeat: isAtMaxLength ? Infinity : 0 }}
            >
                {value.length}{minLength > 0 ? `/${minLength} min` : ''}{maxLength ? `/${maxLength} max` : ''}
            </motion.div>
            
            {/* Min length indicator */}
            {minLength > 0 && value.length > 0 && (
                <motion.div 
                    className="absolute bottom-3 left-3 text-xs flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {value.length < minLength ? (
                        <span className="text-orange-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Minimum {minLength} caractères
                        </span>
                    ) : (
                        <span className="text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Longueur suffisante
                        </span>
                    )}
                </motion.div>
            )}

            {/* Success indicator */}
            <AnimatePresence>
                {value && !isFocused && !maxLength && (
                    <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                    >
                        <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Focus glow effect */}
            {isFocused && (
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-secondary-400/20 pointer-events-none -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                />
            )}
        </motion.div>
    );
}

interface RadioGroupProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: { value: string; label: string }[];
}

function RadioGroup({ name, value, onChange, options }: RadioGroupProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {options.map((option, index) => (
                <motion.label
                    key={option.value}
                    className={`
                        relative flex items-center space-x-3 px-4 py-3 rounded-2xl cursor-pointer
                        transition-all duration-300 border-2
                        ${value === option.value 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-transparent shadow-lg' 
                            : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-400'
                        }
                        hover:shadow-md backdrop-blur-sm
                    `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        className="sr-only"
                    />
                    
                    <motion.div
                        className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${value === option.value 
                                ? 'border-white bg-white/20' 
                                : 'border-gray-300 dark:border-gray-500'
                            }
                        `}
                        animate={value === option.value ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        {value === option.value && (
                            <motion.div
                                className="w-2 h-2 bg-white rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                            />
                        )}
                    </motion.div>
                    
                    <span className="font-medium">{option.label}</span>
                    
                    {/* Selection sparkle */}
                    {value === option.value && (
                        <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                        >
                            <Sparkles className="w-4 h-4 text-secondary-300" />
                        </motion.div>
                    )}
                </motion.label>
            ))}
        </div>
    );
}

export default function ProjectInfoForm({ formData, handleChange, errors }: ProjectInfoFormProps) {
    const completedFields = Object.values(formData).filter(value => 
        value !== '' && value !== undefined && value !== null
    ).length;
    const totalFields = 8;
    const progressPercentage = (completedFields / totalFields) * 100;

    return (
        <motion.div 
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="p-6 sm:p-8 lg:p-10">
                <div className="space-y-8">
                    <FormField 
                        label="Nom du projet" 
                        required 
                        icon={<Lightbulb className="w-5 h-5" />}
                        delay={0.1}
                    >
                        <ModernInput
                            name="nomProjet"
                            value={formData.nomProjet}
                            onChange={handleChange}
                            placeholder="Donnez un nom accrocheur à votre projet..."
                            required
                        />
                        {errors['project_name'] && <InputError message={errors['project_name'][0]} />}
                    </FormField>

                    <FormField 
                        label="Résumé du projet" 
                        required 
                        icon={<Target className="w-5 h-5" />}
                        description="Décrivez votre projet en quelques phrases percutantes (min. 100 caractères)"
                        delay={0.2}
                    >
                        <ModernTextarea
                            name="resumeProjet"
                            value={formData.resumeProjet}
                            onChange={handleChange}
                            placeholder="Votre projet en quelques mots..."
                            required
                            maxLength={5000}
                            minLength={100}
                            rows={4}
                        />
                        {errors['project_summary'] && <InputError message={errors['project_summary'][0]} />}
                    </FormField>

                    <FormField 
                        label="Quel problème votre projet résout-il ?" 
                        required 
                        icon={<TrendingUp className="w-5 h-5" />}
                        description="Identifiez clairement le défi que vous relevez (min. 100 caractères)"
                        delay={0.3}
                    >
                        <ModernTextarea
                            name="problemeResolu"
                            value={formData.problemeResolu}
                            onChange={handleChange}
                            placeholder="Décrivez le problème que vous résolvez..."
                            required
                            minLength={100}
                            maxLength={5000}
                            rows={4}
                        />
                        {errors['problem_solved'] && <InputError message={errors['problem_solved'][0]} />}
                    </FormField>

                    <FormField 
                        label="Quel est l'impact attendu ?" 
                        required 
                        icon={<Heart className="w-5 h-5" />}
                        description="Impact social, économique, environnemental... (min. 100 caractères)"
                        delay={0.4}
                    >
                        <ModernTextarea
                            name="impactAttendu"
                            value={formData.impactAttendu}
                            onChange={handleChange}
                            placeholder="Décrivez l'impact positif de votre projet..."
                            required
                            minLength={100}
                            maxLength={5000}
                            rows={4}
                        />
                        {errors['expected_impact'] && <InputError message={errors['expected_impact'][0]} />}
                    </FormField>

                    <FormField 
                        label="Public ciblé" 
                        required 
                        icon={<Users className="w-5 h-5" />}
                        description="Qui sont vos utilisateurs/bénéficiaires ? (min. 50 caractères)"
                        delay={0.5}
                    >
                        <ModernTextarea
                            name="publicCible"
                            value={formData.publicCible}
                            onChange={handleChange}
                            placeholder="Jeunes entrepreneurs, agriculteurs, étudiants..."
                            required
                            minLength={50}
                            maxLength={2000}
                            rows={3}
                        />
                        {errors['target_audience'] && <InputError message={errors['target_audience'][0]} />}
                    </FormField>

                    <FormField 
                        label="Votre projet est-il déjà lancé ?" 
                        required 
                        icon={<Globe className="w-5 h-5" />}
                        delay={0.6}
                    >
                        <RadioGroup
                            name="projetLance"
                            value={formData.projetLance}
                            onChange={handleChange}
                            options={[
                                { value: "oui", label: "Oui, c'est parti !" },
                                { value: "non", label: "Pas encore" }
                            ]}
                        />
                    </FormField>

                    <AnimatePresence>
                        {formData.projetLance === 'oui' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FormField 
                                    label="Depuis quand ?" 
                                    required 
                                    icon={<Calendar className="w-5 h-5" />}
                                    delay={0.1}
                                >
                                    <ModernInput
                                        type="date"
                                        name="dateDebutProjet"
                                        value={formData.dateDebutProjet}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormField>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <FormField 
                        label="Avez-vous déjà un prototype ?" 
                        required 
                        icon={<Wrench className="w-5 h-5" />}
                        delay={0.7}
                    >
                        <RadioGroup
                            name="prototypeExistant"
                            value={formData.prototypeExistant}
                            onChange={handleChange}
                            options={[
                                { value: "oui", label: "Oui, j'ai un prototype" },
                                { value: "non", label: "Pas encore de prototype" }
                            ]}
                        />
                    </FormField>

                    {/* Motivation message */}
                    <motion.div 
                        className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center space-x-3">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Sparkles className="w-6 h-6 text-primary" />
                            </motion.div>
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                    Votre projet peut changer le monde !
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Chaque grande innovation a commencé par une idée. Continuez, vous êtes sur la bonne voie !
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}