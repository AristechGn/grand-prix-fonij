import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    isSubmit?: boolean;
    isNextDisabled?: boolean;
    submitting?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentStep,
    totalSteps,
    onNext,
    onPrevious,
    isSubmit = false,
    isNextDisabled = false,
    submitting = false
}) => {
    const [isHoveredNext, setIsHoveredNext] = useState(false);
    const [isHoveredPrev, setIsHoveredPrev] = useState(false);
    
    return (
        <div className="flex justify-between mt-8 mb-16">
            {currentStep > 1 ? (
                <motion.button
                    onClick={onPrevious}
                    className={`
                        relative
                        flex items-center gap-1 sm:gap-2
                        px-4 py-2 sm:px-6 sm:py-3
                        rounded-xl
                        bg-white
                        border border-slate-200
                        text-slate-700
                        shadow-sm
                        hover:shadow-md hover:border-slate-300
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-slate-500/50
                    `}
                    onHoverStart={() => setIsHoveredPrev(true)}
                    onHoverEnd={() => setIsHoveredPrev(false)}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.span
                        animate={isHoveredPrev ? { x: -3 } : { x: 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </motion.span>
                    <span className="hidden sm:inline">Étape précédente</span>
                    <span className="sm:hidden">Retour</span>
                </motion.button>
            ) : (
                <div></div> // Espace vide pour maintenir le flex justify-between
            )}
            
            <motion.button
                onClick={onNext}
                className={`
                    relative
                    flex items-center gap-1 sm:gap-2
                    px-4 py-2 sm:px-6 sm:py-3
                    rounded-xl
                    bg-gradient-to-br from-primary to-primary-600
                    text-white
                    shadow-md shadow-primary/20
                    hover:shadow-xl hover:shadow-primary/25
                    focus:outline-none focus:ring-2 focus:ring-primary/50
                    ${isNextDisabled || submitting 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:shadow-2xl'
                    }
                    transition-all duration-200
                `}
                onHoverStart={() => setIsHoveredNext(true)}
                onHoverEnd={() => setIsHoveredNext(false)}
                whileHover={{ scale: isNextDisabled ? 1 : 1.05, x: isNextDisabled ? 0 : 5 }}
                whileTap={{ scale: isNextDisabled ? 1 : 0.95 }}
                disabled={isNextDisabled || submitting}
                type={isSubmit ? "submit" : "button"}
            >
                {/* Loading spinner */}
                <AnimatePresence>
                    {submitting && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <span className={`relative z-10 text-sm sm:text-base transition-opacity ${submitting ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="hidden sm:inline">
                        {isSubmit ? 'Soumettre ma candidature' : 'Étape suivante'}
                    </span>
                    <span className="sm:hidden">
                        {isSubmit ? 'Soumettre' : 'Suivant'}
                    </span>
                </span>
                
                <motion.span
                    animate={isHoveredNext && !isNextDisabled ? { x: 3 } : { x: 0 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`transition-opacity ${submitting ? 'opacity-0' : 'opacity-100'}`}
                >
                    {isSubmit ? (
                        <Send className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </motion.span>
            </motion.button>
        </div>
    );
};

export default NavigationButtons;