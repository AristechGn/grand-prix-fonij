import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Edition {
  name: string;
  year: number;
  registrationDeadline: string;
}

interface CandidatureHeroProps {
  edition: Edition | null;
}

export default function CandidatureHero({ edition }: CandidatureHeroProps) {
  // Utiliser la date limite d'inscription de l'édition actuelle ou une date par défaut
  const dateFinInscriptions = edition ? new Date(edition.registrationDeadline) : new Date('2025-04-23T00:00:00');
  
  // Calculer l'année de l'édition actuelle ou utiliser l'année en cours
  const currentYear = edition ? edition.year : new Date().getFullYear();

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full bg-primary relative">
      <div className="w-full h-[50vh] md:min-h-[60vh] md:max-h-[80vh] overflow-hidden">
        <img 
          src="https://img.freepik.com/free-photo/young-african-american-entrepreneur-reviewing-her-startup-business-strategy_23-2149089985.jpg"
          alt="Grand Prix FONIJ - Candidater"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80">
          {/* Motifs d'innovation en arrière-plan */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="absolute top-10 right-10 w-16 h-16 md:w-32 md:h-32 border-2 md:border-4 border-white rounded-full"
              animate={{ 
                x: [0, 10, 0],
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 left-10 w-12 h-12 md:w-20 md:h-20 border border-white rounded-full"
              animate={{ 
                x: [0, -10, 0],
                y: [0, 10, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/4 w-10 h-10 md:w-16 md:h-16 border border-white transform rotate-45"
              animate={{ 
                rotate: [45, 60, 45],
                scale: [1, 0.9, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </motion.div>
          
          {/* Particules scintillantes */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute h-2 w-2 rounded-full bg-white"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>
          
          <div className="flex justify-center items-center mx-auto px-4 h-full">
            <motion.div 
              className="max-w-md md:max-w-2xl space-y-3 md:space-y-6 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span 
                className="text-white/70 font-semibold text-sm md:text-lg uppercase tracking-wider"
                variants={itemVariants}
              >
                Fonds National pour l'Insertion des Jeunes
              </motion.span>
              <motion.h1 
                className="text-3xl md:text-5xl font-bold leading-tight text-white"
                variants={itemVariants}
              >
                Grand Prix FONIJ
              </motion.h1>
              {edition && (
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full inline-flex"
                  variants={itemVariants}
                >
                  <span className="text-white font-semibold text-sm md:text-base">{edition.name}</span>
                </motion.div>
              )}
              <motion.p 
                className="text-lg md:text-2xl text-yellow-400 font-semibold max-w-xs md:max-w-xl mx-auto"
                variants={itemVariants}
              >
                Déposez votre candidature
              </motion.p>
              <motion.p 
                className="text-sm md:text-lg text-white/90 max-w-xs md:max-w-xl mx-auto border-t border-white/20 pt-3 mt-3"
                variants={itemVariants}
              >
                Transformez votre idée en entreprise et participez à l'édition {currentYear}
              </motion.p>
              <motion.div 
                className="mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-xs md:text-sm text-white/90"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 mr-2" />
                  <span>15-35 ans</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 mr-2" />
                  <span>Projet innovant</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 mr-2" />
                  <span className="text-xs md:text-sm">Date limite: {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 