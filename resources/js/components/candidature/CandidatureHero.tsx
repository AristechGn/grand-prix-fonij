import { CheckCircle, ChevronRight, ArrowDown, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

interface Edition {
  name: string;
  year: number;
  registrationDeadline: string;
}

interface CandidatureHeroProps {
  edition: Edition | null;
}

// Composant de particules flottantes
const FloatingParticles = () => {
  useEffect(() => {
    const createParticle = () => {
      const particles = document.getElementById('hero-particles');
      if (!particles) return;
      
      const size = Math.random() * 4 + 2;
      const particle = document.createElement('div');
      
      particle.className = "particle";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5}`;
      particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      
      particles.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };
    
    const particleInterval = setInterval(createParticle, 800);
    
    return () => clearInterval(particleInterval);
  }, []);

  return <div id="hero-particles" className="absolute inset-0 z-10 overflow-hidden pointer-events-none"></div>;
};

// Éléments flottants décoratifs
const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ zIndex: 5 }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

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
    <div className="relative overflow-hidden bg-primary">
      {/* Image d'arrière-plan avec effet parallaxe */}
      <div 
        className="relative flex min-h-[60vh] md:min-h-[80vh] w-full items-center justify-center bg-cover bg-fixed bg-center"
        style={{ 
          backgroundImage: `url('/images/fonij/logo-transparent.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay avec gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/10"></div>

        {/* Effets visuels avancés */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Formes décoratives animées */}
        <motion.div
          className="bg-primary absolute top-20 left-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
        <motion.div
          className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-yellow-500 opacity-15 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        ></motion.div>

        {/* Particules flottantes */}
        <FloatingParticles />

        {/* Éléments flottants décoratifs - uniquement visibles sur desktop */}
        <div className="hidden md:block">
          <FloatingElement className="opacity-15 top-[15%] left-[10%]" delay={0.3}>
            <div className="w-20 h-20 rounded-full bg-primary/30 backdrop-blur-sm"></div>
          </FloatingElement>
          <FloatingElement className="opacity-15 top-[35%] right-[5%]" delay={0.8}>
            <div className="w-32 h-32 rounded-full bg-secondary/20 backdrop-blur-sm"></div>
          </FloatingElement>
          <FloatingElement className="opacity-15 bottom-[20%] left-[20%]" delay={1.2}>
            <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm"></div>
          </FloatingElement>
          <FloatingElement className="opacity-15 bottom-[30%] right-[25%]" delay={1.5}>
            <Clock className="w-10 h-10 text-white/30" />
          </FloatingElement>
          <FloatingElement className="opacity-15 top-[25%] left-[30%]" delay={1.8}>
            <CheckCircle className="w-12 h-12 text-white/30" />
          </FloatingElement>
          <FloatingElement className="opacity-15 top-[40%] right-[30%]" delay={2.0}>
            <Sparkles className="w-8 h-8 text-secondary/50" />
          </FloatingElement>
        </div>

        {/* Contenu principal */}
        <div className="relative container mx-auto px-4 z-10">
          <motion.div 
            className="max-w-3xl mx-auto space-y-3 md:space-y-6 text-center backdrop-blur-sm bg-black/40 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              className="text-white/70 font-semibold text-sm md:text-lg uppercase tracking-wider block"
              variants={itemVariants}
            >
              Fonds National pour l'Insertion des Jeunes
            </motion.span>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight text-white"
              variants={itemVariants}
            >
              Grand Prix FONIJ
              <motion.span 
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
                <Sparkles className="w-6 h-6 text-secondary" />
              </motion.span>
            </motion.h1>

            {edition && (
              <motion.div 
                className="flex justify-center gap-3 mt-2"
                variants={itemVariants}
              >
                <div className="bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full inline-flex">
                  <span className="text-white font-semibold text-sm md:text-base">{edition.name}</span>
                </div>
                <div className="bg-secondary/20 backdrop-blur-sm py-1 px-3 rounded-full inline-flex">
                  <span className="text-secondary font-semibold text-sm md:text-base">Édition {currentYear}</span>
                </div>
              </motion.div>
            )}

            <motion.div
              className="w-20 h-1 bg-gradient-fonij mx-auto my-2"
              variants={itemVariants}
            />

            <motion.p 
              className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary to-primary-300 font-bold"
              variants={itemVariants}
            >
              Déposez votre candidature
            </motion.p>

            <motion.p 
              className="text-sm md:text-lg text-white/90 max-w-xl mx-auto border-t border-white/20 pt-3 mt-3"
              variants={itemVariants}
            >
              Transformez votre idée en entreprise et participez à l'édition {currentYear}
            </motion.p>

            <motion.div 
              className="mt-6 md:mt-8 flex flex-wrap justify-center items-center gap-3 text-xs md:text-sm text-white/90"
              variants={itemVariants}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-secondary mr-2" />
                <span>15-35 ans</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-secondary mr-2" />
                <span>Projet innovant</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-secondary mr-2" />
                <span className="text-xs md:text-sm">Date limite: {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              variants={itemVariants}
            >
              <a
                href="#form-progress"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-fonij text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-base transform hover:-translate-y-1"
              >
                Commencer ma candidature
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#contact-section"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 text-base transform hover:-translate-y-1 border border-white/20"
              >
                Besoin d'aide ?
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,101.3C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Styles pour les animations des particules */}
      <style>{`
        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: floatParticle 5s ease-in-out forwards;
        }
        
        @keyframes floatParticle {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.2;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) translateX(20px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 