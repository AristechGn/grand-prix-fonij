import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Sparkles, Globe, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FONIJ } from '@/utils';
import { useEffect } from 'react';

// Composant pour les particules flottantes
const FloatingParticles = () => {
  useEffect(() => {
    const createParticle = () => {
      const particles = document.getElementById('contact-particles-container');
      if (!particles) return;
      
      const size = Math.random() * 4 + 2;
      const particle = document.createElement('div');
      
      particle.className = "contact-particle";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.3}`;
      particle.style.background = Math.random() > 0.5 
        ? `rgba(255, 215, 0, ${Math.random() * 0.4})` 
        : `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      
      particles.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 5000);
    };
    
    const particleInterval = setInterval(createParticle, 1000);
    
    return () => clearInterval(particleInterval);
  }, []);

  return <div id="contact-particles-container" className="absolute inset-0 z-0 overflow-hidden pointer-events-none"></div>;
};

// Éléments flottants décoratifs
const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
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

export default function ContactSection() {
  // Récupération des données de contact du FONIJ
  const { contactInfo } = FONIJ;
  const email = contactInfo.email;

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <motion.div 
      id="contact-section"
      className="mt-8 md:mt-16 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Formes décoratives */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary/25 mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-secondary/25 mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />

      {/* Particules flottantes */}
      <FloatingParticles />

      {/* Éléments flottants décoratifs */}
      <div className="hidden md:block">
        <FloatingElement className="top-[15%] left-[5%] opacity-40" delay={0.3}>
          <Star className="w-8 h-8 text-secondary" />
        </FloatingElement>
        <FloatingElement className="bottom-[20%] right-[8%] opacity-40" delay={0.8}>
          <Sparkles className="w-6 h-6 text-secondary" />
        </FloatingElement>
      </div>
      
      {/* Conteneur principal avec effet de verre */}
      <motion.div 
        className="relative bg-gradient-to-br from-primary-700 to-primary-900 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/20 shadow-2xl z-10 text-background"
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Colonne gauche - Informations de contact */}
          <motion.div variants={containerVariants}>
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-gradient-to-b from-secondary to-secondary-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-background">Besoin d'aide ?</h2>
            </motion.div>
            
            <motion.div variants={itemVariants} className="h-1 w-20 bg-gradient-fonij-gold mb-6"></motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-background/80 mb-8 border-l-2 border-secondary/30 pl-4"
            >
              Notre équipe est là pour vous accompagner dans votre candidature au Grand Prix FONIJ.
            </motion.p>
            
            <motion.div variants={containerVariants} className="space-y-4">
              {/* Afficher tous les numéros de téléphone */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-secondary" />
                  <h3 className="font-semibold text-background">Nos contacts téléphoniques</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                  {contactInfo.phones.map((phone, index) => (
                    <motion.a 
                      key={index}
                      href={`tel:${phone}`}
                      className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors group"
                      whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/25 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <span className="text-xs font-medium text-secondary">{index + 1}</span>
                      </motion.div>
                      <p className="text-sm md:text-base text-background font-medium group-hover:text-secondary transition-colors">
                        {phone}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              {/* Email */}
              <motion.a 
                href={`mailto:${email}`}
                className="flex items-center space-x-3 md:space-x-4 hover:bg-white/10 p-3 rounded-lg transition-all group"
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-secondary/25 to-secondary/15 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                </motion.div>
                <div>
                  <p className="text-xs md:text-sm text-background/80">Email</p>
                  <p className="text-sm md:text-base text-background font-medium group-hover:text-secondary transition-colors">{email}</p>
                </div>
              </motion.a>
              
              {/* Adresse avec animation */}
              <motion.div
                className="flex items-center space-x-3 md:space-x-4 p-3 bg-white/10 rounded-lg border border-white/20"
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-secondary/25 to-secondary/15 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                </motion.div>
                <div>
                  <p className="text-xs md:text-sm text-background/80 mb-1">Adresse</p>
                  <p className="text-sm md:text-base font-medium text-background">{contactInfo.address}</p>
                  <p className="text-xs text-background/80 mt-1">{contactInfo.repere}</p>
                </div>
              </motion.div>
              
              {/* Horaires avec animation */}
              <motion.div
                className="flex items-center space-x-3 md:space-x-4 p-3 bg-white/10 rounded-lg border border-white/20"
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-secondary/25 to-secondary/15 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                </motion.div>
                <div>
                  <p className="text-xs md:text-sm text-background/80 mb-1">Horaires d'ouverture</p>
                  <p className="text-sm md:text-base font-medium text-background">{contactInfo.hours.weekdays}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Colonne droite - Logo et réseaux sociaux */}
          <motion.div variants={containerVariants} className="relative flex flex-col items-center justify-center">
            {/* Effets de lumière */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-secondary/25 to-secondary/15 rounded-full filter blur-xl md:blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-secondary/25 to-secondary/15 rounded-full filter blur-xl md:blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Logo avec animation */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-secondary/25 to-secondary/15 rounded-full filter blur-xl opacity-50"
                animate={{ 
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.img 
                src="/images/fonij/logo-transparent.png"
                alt="Logo FONIJ"
                className="w-48 md:w-72 h-auto relative z-10"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
              />
              
              {/* Étoiles décoratives */}
              <motion.div 
                className="absolute top-5 right-5"
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <Sparkles className="h-6 w-6 text-secondary" />
              </motion.div>
            </motion.div>
            
            {/* Réseaux sociaux */}
            <motion.div 
              className="mt-8 flex justify-center gap-4"
              variants={itemVariants}
            >
              <motion.p 
                className="text-background/80 text-sm mb-3 bg-white/10 backdrop-blur-sm py-1 px-3 rounded-full border border-white/20"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Suivez-nous
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex justify-center gap-3 flex-wrap max-w-xs mx-auto"
              variants={containerVariants}
            >
              {contactInfo.social.map((platform, idx) => {
                const Icon = platform.icon;
                return (
                  <motion.a
                    key={idx}
                    href={platform.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-secondary/25 to-secondary/15 hover:from-secondary/35 hover:to-secondary/25 p-3 rounded-full transition-all duration-300 border border-white/20 shadow-sm"
                    variants={itemVariants}
                    whileHover={{ scale: 1.15, y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 text-background" />
                  </motion.a>
                );
              })}
            </motion.div>
            
            {/* Bouton de contact supplémentaire */}
            <motion.a
              href="https://fonijguinee.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gradient-fonij-gold text-primary font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-base transform"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="mr-2 h-5 w-5" />
              Visitez notre site web
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Styles pour les animations de particules */}
      <style>{`
        .contact-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: floatContactParticle 5s ease-in-out forwards;
        }
        
        @keyframes floatContactParticle {
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
    </motion.div>
  );
} 