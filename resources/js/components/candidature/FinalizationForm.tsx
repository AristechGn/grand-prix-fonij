import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Shield, Lock, AlertCircle, Sparkles, Award } from 'lucide-react';
import { useState } from 'react';

interface FinalizationFormData {
    certificationExactitude: boolean;
    participationGratuite: boolean;
    autorisationCommunication: boolean;
}

interface FinalizationFormProps {
    formData: FinalizationFormData;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export default function FinalizationForm({ formData, handleCheckboxChange }: FinalizationFormProps) {
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
            {/* Header avec design FONIJ */}
            <div className="bg-gradient-fonij p-6 text-white relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                    <motion.h2 
                        className="text-2xl font-bold mb-2 flex items-center"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Award className="w-6 h-6 mr-2" />
                        Finalisation de votre candidature
                    </motion.h2>
                    
                    <motion.p 
                        className="text-white/90 mb-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Dernière étape avant de rejoindre l'aventure
                    </motion.p>

                    {/* Barre de progression */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{completedChecks}/{totalChecks} vérifications</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2.5">
                            <motion.div 
                                className="bg-white h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
                <div className="space-y-6">
                    <ModernCheckbox
                        name="certificationExactitude"
                        checked={formData.certificationExactitude}
                        onChange={handleCheckboxChange}
                        label="Je certifie que les informations fournies sont exactes et complètes"
                        icon={<Shield className="w-5 h-5" />}
                        required
                        delay={0.1}
                    />
                    
                    <ModernCheckbox
                        name="participationGratuite"
                        checked={formData.participationGratuite}
                        onChange={handleCheckboxChange}
                        label="Je comprends que la participation au programme est gratuite"
                        icon={<Award className="w-5 h-5" />}
                        required
                        delay={0.2}
                    />
                    
                    <ModernCheckbox
                        name="autorisationCommunication"
                        checked={formData.autorisationCommunication}
                        onChange={handleCheckboxChange}
                        label="J'autorise FONIJ à utiliser mes informations pour communiquer sur le programme"
                        icon={<Lock className="w-5 h-5" />}
                        required
                        delay={0.3}
                    />

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