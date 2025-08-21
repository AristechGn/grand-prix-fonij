import { CheckCircle, Circle, ArrowRight, Sparkles, Clock, User, FileText, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

// Icônes pour chaque étape
const stepIcons = [
  User,      // Étape 1: Informations personnelles
  FileText,  // Étape 2: Projet
  FileText,  // Étape 3: Documents
  Send       // Étape 4: Soumission
];

export default function FormProgress({ currentStep, totalSteps, steps }: FormProgressProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepIndex: number) => {
    if (currentStep > stepIndex + 1) return 'completed';
    if (currentStep === stepIndex + 1) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepIndex: number, status: string) => {
    const Icon = stepIcons[stepIndex] || Circle;
    
    if (status === 'completed') {
      return <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />;
    }
    
    return <Icon className="h-4 w-4 md:h-5 md:w-5" />;
  };

  return (
    <div id="form-progress" className="mb-6 md:mb-12">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background card */}
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 md:p-8 overflow-hidden">
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>

          {/* Header avec titre et statistiques */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <motion.h2 
                className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1"
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {steps[currentStep - 1]}
              </motion.h2>
              <motion.p 
                className="text-sm md:text-base text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Étape {currentStep} sur {totalSteps}
              </motion.p>
            </div>
            
            {/* Stats box */}
            <motion.div 
              className="bg-gradient-fonij rounded-2xl p-4 text-white text-center min-w-32"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-xs opacity-90">Complété</div>
            </motion.div>
          </div>

          {/* Progress bar container */}
          <div className="relative mb-8">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 w-full h-2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              {/* Animated progress fill */}
              <motion.div 
                className="h-full bg-gradient-to-r from-primary via-primary-700 to-secondary rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                  style={{ transform: 'skewX(-15deg)' }}
                />
              </motion.div>
            </div>

            {/* Step indicators */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                const isHovered = hoveredStep === index;
                
                return (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center relative group cursor-pointer"
                    onHoverStart={() => setHoveredStep(index)}
                    onHoverEnd={() => setHoveredStep(null)}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.7 + index * 0.1,
                      type: "spring", 
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    {/* Step circle */}
                    <motion.div 
                      className={`
                        relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10
                        border-3 transition-all duration-300 overflow-hidden
                        ${status === 'completed' 
                          ? 'bg-gradient-to-br from-primary-400 to-primary-600 border-primary-400 text-white shadow-lg shadow-primary/25' 
                          : status === 'current'
                            ? 'bg-gradient-to-br from-primary to-secondary border-primary-400 text-white shadow-lg shadow-primary/25'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                        }
                        ${isHovered && status !== 'completed' ? 'scale-110 shadow-xl' : ''}
                      `}
                      whileHover={{ 
                        scale: status === 'completed' ? 1.05 : 1.1,
                        rotate: status === 'current' ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Pulsing ring for current step */}
                      {status === 'current' && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary-400"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}

                      {/* Sparkles for completed steps */}
                      {status === 'completed' && isHovered && (
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
                          <Sparkles className="w-3 h-3 text-secondary-300" />
                        </motion.div>
                      )}

                      {/* Loading spinner for current step */}
                      {status === 'current' && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                        />
                      )}

                      <motion.div
                        animate={status === 'current' ? {
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ 
                          duration: 1.5, 
                          repeat: status === 'current' ? Infinity : 0
                        }}
                      >
                        {getStepIcon(index, status)}
                      </motion.div>
                    </motion.div>

                    {/* Connection line to next step */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="hidden lg:block absolute top-1/2 left-full w-8 -translate-y-1/2 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: status === 'completed' ? 1 : 0.3 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        <ArrowRight className={`
                          w-4 h-4 
                          ${status === 'completed' ? 'text-primary-400' : 'text-gray-300 dark:text-gray-600'}
                        `} />
                      </motion.div>
                    )}

                    {/* Step label - Hidden on mobile, visible on desktop */}
                    <motion.div 
                      className="hidden md:block mt-3 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <span className={`
                        text-xs lg:text-sm font-medium transition-colors duration-300
                        ${status === 'completed' 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : status === 'current'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }
                        ${isHovered ? 'text-primary-700 dark:text-primary-300' : ''}
                      `}>
                        {step}
                      </span>
                      
                      {/* Status indicator */}
                      <div className="flex items-center justify-center mt-1">
                        {status === 'completed' && (
                          <motion.span 
                            className="text-xs text-primary-600 dark:text-primary-400 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                          >
                            ✓ Terminé
                          </motion.span>
                        )}
                        {status === 'current' && (
                          <motion.div 
                            className="flex items-center text-xs text-primary-600 dark:text-primary-400 font-medium"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            En cours
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Tooltip on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20 md:hidden"
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                            {step}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Current step info for mobile */}
          <motion.div 
            className="md:hidden text-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Étape actuelle
              </span>
            </div>
            <p className="text-primary-700 dark:text-primary-300 font-medium">
              {steps[currentStep - 1]}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}