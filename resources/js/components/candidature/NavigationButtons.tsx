import { ChevronLeft, ChevronRight, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isSubmit?: boolean;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

export default function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious,
  isSubmit = false,
  isNextDisabled = false,
  isLoading = false
}: NavigationButtonsProps) {
  const [isHoveredNext, setIsHoveredNext] = useState(false);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);
  const [rippleNext, setRippleNext] = useState(false);
  const [ripplePrev, setRipplePrev] = useState(false);

  const handleNextClick = () => {
    setRippleNext(true);
    setTimeout(() => setRippleNext(false), 600);
    onNext();
  };

  const handlePrevClick = () => {
    setRipplePrev(true);
    setTimeout(() => setRipplePrev(false), 600);
    onPrevious();
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round(progressPercentage)}% complété
          </span>
        </div>
        
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '400%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            style={{ transform: 'skewX(-15deg)' }}
          />
        </div>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div 
        className="flex justify-between items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Previous button */}
        <AnimatePresence>
          {currentStep > 1 ? (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative"
            >
              <motion.button
                type='button'
                onClick={handlePrevClick}
                onHoverStart={() => setIsHoveredPrev(true)}
                onHoverEnd={() => setIsHoveredPrev(false)}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative group overflow-hidden
                  h-12 sm:h-14 px-4 sm:px-6 
                  bg-white/80 dark:bg-gray-800/80 
                  border-2 border-gray-200 dark:border-gray-600
                  rounded-2xl backdrop-blur-md
                  text-gray-700 dark:text-gray-300
                  font-medium transition-all duration-300
                  hover:border-primary-300 dark:hover:border-primary-500
                  hover:shadow-lg hover:shadow-primary/25
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2
                `}
              >
                {/* Ripple effect */}
                <AnimatePresence>
                  {ripplePrev && (
                    <motion.div
                      className="absolute inset-0 bg-primary-400/30 rounded-2xl"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                {/* Background hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHoveredPrev ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  animate={isHoveredPrev ? { x: -3 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
                
                <span className="relative z-10 text-sm sm:text-base">
                  <span className="hidden sm:inline">Retour</span>
                  <span className="sm:hidden">Retour</span>
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="w-24 sm:w-32" /> // Spacer for layout
          )}
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <motion.div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index + 1 < currentStep 
                  ? 'bg-primary' 
                  : index + 1 === currentStep 
                    ? 'bg-primary w-6' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }
              `}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {index + 1 < currentStep && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full h-full rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Next/Submit button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
          className="relative"
        >
          <motion.button
            onClick={handleNextClick}
            onHoverStart={() => setIsHoveredNext(true)}
            onHoverEnd={() => setIsHoveredNext(false)}
            whileHover={{ scale: isNextDisabled ? 1 : 1.05, x: isNextDisabled ? 0 : 5 }}
            whileTap={{ scale: isNextDisabled ? 1 : 0.95 }}
            disabled={isNextDisabled || isLoading}
            type={isSubmit ? "submit" : "button"}
            className={`
              relative group overflow-hidden
              h-12 sm:h-14 px-4 sm:px-6 
              ${isSubmit 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700' 
                : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600'
              }
              text-white font-semibold rounded-2xl
              shadow-lg transition-all duration-300
              hover:shadow-xl hover:shadow-primary/25
              focus:outline-none focus:ring-2 focus:ring-primary/50
              ${isNextDisabled || isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-2xl'
              }
              flex items-center justify-center space-x-2
            `}
          >
            {/* Ripple effect */}
            <AnimatePresence>
              {rippleNext && !isNextDisabled && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-2xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            {/* Shimmer effect on hover */}
            <AnimatePresence>
              {isHoveredNext && !isNextDisabled && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ transform: 'skewX(-15deg)' }}
                />
              )}
            </AnimatePresence>

            {/* Loading spinner */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <span className={`relative z-10 text-sm sm:text-base transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              <span className="hidden sm:inline">
                {isSubmit ? 'Soumettre ma candidature' : 'Étape suivante'}
              </span>
              <span className="sm:hidden">
                {isSubmit ? 'Soumettre' : 'Suivant'}
              </span>
            </span>
            
            <motion.div
              animate={isHoveredNext && !isNextDisabled ? { x: 3 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
              {isSubmit ? (
                <motion.div
                  animate={isSubmit ? { 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  }}
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              ) : (
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </motion.div>

            {/* Success sparkles for submit button */}
            {isSubmit && isHoveredNext && !isNextDisabled && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ 
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-4 h-4 text-secondary-300" />
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Help text */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {isSubmit 
            ? "Vérifiez vos informations avant de soumettre" 
            : currentStep === 1 
              ? "Commençons par les informations de base" 
              : "Continuez pour compléter votre candidature"
          }
        </p>
      </motion.div>
    </div>
  );
}