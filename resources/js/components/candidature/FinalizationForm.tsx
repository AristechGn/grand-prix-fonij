import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Shield, Lock, AlertCircle, Sparkles, Award, FileCheck } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';

interface FinalizationFormData {
    certificationExactitude: boolean;
    participationGratuite: boolean;
    autorisationCommunication: boolean;
}

interface FinalizationFormProps {
    formData: FinalizationFormData;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Record<string, string[]>;
}

interface ModernCheckboxProps {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    icon: React.ReactNode;
    required?: boolean;
    delay?: number;
}

function ModernCheckbox({ name, checked, onChange, label, icon, required = false, delay = 0 }: ModernCheckboxProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${checked 
                    ? 'border-primary-400 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.01, y: -2 }}
        >
            {/* Animated background effect */}
            <AnimatePresence>
                {(checked || isHovered) && (
                    <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/5 to-secondary-400/5 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
            
            <div className="flex items-start">
                <div className="flex items-center h-6 mt-0.5">
                    <div className="relative">
                        <input
                            type="checkbox"
                            name={name}
                            checked={checked}
                            onChange={onChange}
                            className="sr-only"
                            id={name}
                        />
                        
                        <motion.div
                            className={`
                                w-6 h-6 rounded-md border-2 flex items-center justify-center
                                ${checked 
                                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 border-transparent' 
                                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                                }
                                transition-colors duration-200
                            `}
                            whileTap={{ scale: 0.9 }}
                            animate={isHovered && !checked ? { y: [-1, 1, -1] } : {}}
                            transition={{ duration: 1, repeat: isHovered && !checked ? Infinity : 0 }}
                        >
                            <AnimatePresence>
                                {checked && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: "spring", stiffness: 500 }}
                                    >
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
                
                <div className="ml-3 flex-1">
                    <div className="flex items-center">
                        <motion.div 
                            className="text-primary dark:text-primary-400 mr-2"
                            animate={checked ? { 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            } : isHovered ? {
                                rotate: [0, 5, -5, 0] 
                            } : {}}
                            transition={{ duration: 1, repeat: checked || isHovered ? Infinity : 0, repeatDelay: 2 }}
                        >
                            {icon}
                        </motion.div>
                        
                        <label 
                            htmlFor={name} 
                            className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer"
                        >
                            {label}
                            {required && (
                                <motion.span 
                                    className="text-red-500 ml-1"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    *
                                </motion.span>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function FinalizationForm({ formData, handleCheckboxChange, errors }: FinalizationFormProps) {
    const completedChecks = Object.values(formData).filter(Boolean).length;
    const totalChecks = Object.values(formData).length;
    const progressPercentage = (completedChecks / totalChecks) * 100;
    
    return (
        <motion.div 
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="p-6 sm:p-8 lg:p-10">
                <div className="space-y-6">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 mt-1">
                                <FileCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">Certification d'exactitude</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Je certifie l'exactitude des informations fournies dans ce formulaire.
                                </p>
                                
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="certificationExactitude"
                                        name="certificationExactitude"
                                        checked={formData.certificationExactitude}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                        required
                                    />
                                    <label htmlFor="certificationExactitude" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Je certifie que toutes les informations fournies sont exactes et complètes
                                    </label>
                                </div>
                                {errors['certification_accuracy'] && <InputError message={errors['certification_accuracy'][0]} />}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mt-1">
                                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">Participation gratuite</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Je comprends que ma participation au Grand Prix FONIJ est entièrement gratuite.
                                </p>
                                
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="participationGratuite"
                                        name="participationGratuite"
                                        checked={formData.participationGratuite}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                        required
                                    />
                                    <label htmlFor="participationGratuite" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Je comprends que la participation est gratuite et qu'aucun frais ne me sera demandé
                                    </label>
                                </div>
                                {errors['free_participation'] && <InputError message={errors['free_participation'][0]} />}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 mt-1">
                                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">Autorisation de communication</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    J'autorise le FONIJ à utiliser les informations fournies à des fins de communication.
                                </p>
                                
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="autorisationCommunication"
                                        name="autorisationCommunication"
                                        checked={formData.autorisationCommunication}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                        required
                                    />
                                    <label htmlFor="autorisationCommunication" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        J'autorise le FONIJ à communiquer sur mon projet via ses différents canaux
                                    </label>
                                </div>
                                {errors['communication_authorization'] && <InputError message={errors['communication_authorization'][0]} />}
                            </div>
                        </div>
                    </div>

                    {/* Message de confirmation */}
                    <motion.div 
                        className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-start space-x-4">
                            <motion.div
                                animate={{ 
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <AlertCircle className="w-6 h-6 text-primary mt-0.5" />
                            </motion.div>
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                    Dernière vérification
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    En cliquant sur "Soumettre", votre candidature sera envoyée pour évaluation. 
                                    Notre équipe vous contactera dans les meilleurs délais.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Message de succès si tous les champs sont cochés */}
                    <AnimatePresence>
                        {completedChecks === totalChecks && (
                            <motion.div 
                                className="mt-4 p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-center"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div 
                                    className="flex justify-center mb-2"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <Sparkles className="text-primary h-6 w-6" />
                                </motion.div>
                                <p className="text-primary-800 dark:text-primary-300 font-medium">
                                    Parfait ! Vous êtes prêt à soumettre votre candidature.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
} 