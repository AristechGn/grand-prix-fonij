import { CheckCircle, ChevronRight, ArrowDown, Sparkles, Clock, Star, Zap, Rocket, Trophy } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, px, animate, delay } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';

interface Edition {
  name: string;
  year: number;
  registrationDeadline: string;
}

interface CandidatureHeroProps {
  edition: Edition | null;
  errors?: Record<string, string[]>;
}

// Composant de particules flottantes amélioré
const FloatingParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const createParticle = () => {
      const particles = document.getElementById('hero-particles');
      if (!particles) return;
      
      const size = Math.random() * 6 + 2;
      const particle = document.createElement('div');
      
      particle.className = "particle";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.8}`;
      
      // Couleurs variées pour les particules
      const colors = ['rgba(255, 255, 255, 0.6)', 'rgba(255, 215, 0, 0.5)', 'rgba(255, 105, 180, 0.4)', 'rgba(0, 255, 255, 0.4)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;
      
      particles.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 8000);
    };
    
    const particleInterval = setInterval(createParticle, 600);
    
    return () => {
      clearInterval(particleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="hero-particles" className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {/* Particule suivant la souris */}
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-60 blur-sm"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
};

// Éléments flottants décoratifs améliorés
const FloatingElement = ({ 
  children, 
  delay = 0, 
  className = "", 
  intensity = 1 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  intensity?: number 
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      style={{ zIndex: 5 }}
    >
      <motion.div
        animate={{
          y: [0, -15 * intensity, 0],
          rotate: [0, 5 * intensity, 0, -5 * intensity, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
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

// Nouveau composant pour les formes géométriques animées
const GeometricShape = ({ type, className, delay = 0 }: { type: 'circle' | 'triangle' | 'square', className: string, delay?: number }) => {
  const shapeVariants = {
    circle: "rounded-full",
    triangle: "clip-triangle",
    square: "rounded-lg rotate-45"
  };

  return (
    <motion.div
      className={`absolute ${className} ${shapeVariants[type]} backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3], 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
};

export default function CandidatureHero({ edition, errors }: CandidatureHeroProps) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Hook de scroll pour l'effet parallaxe renforcé
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transformations parallaxe plus prononcées
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Effet de rotation pour le logo
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  // Springs pour des animations plus fluides
  const springConfig = { damping: 25, stiffness: 120 };
  const bgYSpring = useSpring(bgY, springConfig);
  const logoYSpring = useSpring(logoY, springConfig);
  const contentYSpring = useSpring(contentY, springConfig);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const dateFinInscriptions = edition ? new Date(edition.registrationDeadline) : new Date('2025-04-23T00:00:00');
  const currentYear = edition ? edition.year : new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-primary-800 min-h-screen">
      {/* Arrière-plan avec effet parallaxe renforcé */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: bgYSpring,
          backgroundImage: `url(/images/fonij/cover.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '150%',
          opacity: 0.4
        }}
      />

      {/* Couche d'arrière-plan supplémentaire avec motif en mouvement */}
      <motion.div
        className="absolute inset-0 z-1"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,215,0,0.1) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px'
        }}
      />

      {/* Logo avec effet parallaxe et rotation */}
      <motion.div 
        className="absolute inset-0 z-2 flex items-center justify-center"
        style={{ 
          y: logoYSpring,
          rotate: logoRotate,
          width: '100%',
          height: '150%',
        }}
      >
        <motion.div 
          className="w-full h-full opacity-20"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            backgroundImage: `url(/images/fonij/logo-transparent.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </motion.div>

      {/* Formes géométriques animées */}
      <div className="absolute inset-0 z-3">
        <GeometricShape type="circle" className="top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-pink-400/30" delay={0} />
        <GeometricShape type="triangle" className="top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-purple-400/30" delay={1} />
        <GeometricShape type="square" className="bottom-32 left-20 w-20 h-20 bg-gradient-to-r from-green-400/30 to-teal-400/30" delay={2} />
        <GeometricShape type="circle" className="bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-orange-400/30 to-red-400/30" delay={1.5} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-40 container mx-auto px-4 pt-28 pb-16 md:pt-40 md:pb-24 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
              Grand Prix FONIJ {currentYear}
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-yellow-300"
            variants={itemVariants}
          >
            {edition ? edition.name : "Édition de l'entrepreneuriat jeune"}
          </motion.h2>
          
          {/* Affichage de l'erreur si elle existe */}
          {errors && errors['edition_id'] && (
            <motion.div 
              className="mb-8 mx-auto max-w-2xl p-4 bg-red-50 border-2 border-red-300 rounded-lg text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg text-red-700 font-bold">{errors['edition_id'][0]}</p>
              <p className="text-sm text-red-600 mt-1">Veuillez réessayer ultérieurement.</p>
            </motion.div>
          )}

          {/* Card principale avec effet glassmorphism */}
          <motion.div 
            className="backdrop-blur-xl bg-white/10 p-8 md:p-16 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            {/* Effet de brillance qui traverse la card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
              style={{ transform: 'skewX(-20deg)' }}
            />
            
            <motion.span 
              className="text-white/80 font-bold text-sm md:text-xl uppercase tracking-wider block mb-4"
              variants={itemVariants}
            >
              Fonds National pour l'Insertion des Jeunes
            </motion.span>

            <motion.h1 
              className="text-5xl md:text-7xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white relative"
              variants={itemVariants}
            >
              Grand Prix FONIJ
              <motion.div 
                className="absolute -top-2 -right-2"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.h1>

            {edition && (
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mt-6"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm py-2 px-6 rounded-full border border-white/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                >
                  <span className="text-white font-bold text-sm md:text-lg">{edition.name}</span>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 backdrop-blur-sm py-2 px-6 rounded-full border border-yellow-400/50"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,215,0,0.4)" }}
                >
                  <span className="text-yellow-100 font-bold text-sm md:text-lg">Édition {currentYear}</span>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mx-auto my-6 rounded-full"
              variants={itemVariants}
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.p 
              className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 font-black"
              variants={itemVariants}
            >
              Déposez votre candidature
            </motion.p>

            <motion.p 
              className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto border-t border-white/30 pt-6 mt-6 font-medium"
              variants={itemVariants}
            >
              Transformez votre idée révolutionnaire en entreprise à succès et participez à l'édition {currentYear}
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center items-center gap-4 text-sm md:text-base text-white/95"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-400 mr-2" />
                <span className="font-semibold">15-35 ans</span>
              </motion.div>
              <motion.div 
                className="flex items-center bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-400 mr-2" />
                <span className="font-semibold">Projet innovant</span>
              </motion.div>
              <motion.div 
                className="flex items-center bg-gradient-to-r from-red-400/20 to-pink-400/20 backdrop-blur-sm rounded-full px-4 py-2 border border-red-400/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="font-semibold">
                  Limite: {dateFinInscriptions.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => {
                  const formProgressElement = document.getElementById('form-progress');
                  if (formProgressElement) {
                    formProgressElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-2xl shadow-2xl text-lg relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Commencer ma candidature</span>
                <ChevronRight className="ml-2 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de scroll animé */}
      <motion.button 
        onClick={() => {
          const formProgressElement = document.getElementById('form-progress');
          if (formProgressElement) {
            formProgressElement.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </motion.button>

      {/* Vague décorative animée */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-20">
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-auto"
          animate={{ 
            d: [
              "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,101.3C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,208C672,203,768,181,864,170.7C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,101.3C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path fill="#ffffff" fillOpacity="1" />
        </motion.svg>
      </div>

      {/* Styles améliorés pour les animations */}
      <style>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: floatParticle 8s ease-in-out forwards;
        }
        
        @keyframes floatParticle {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.5);
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) translateX(50px) rotate(720deg) scale(1.5);
          }
        }
        
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
}