import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <motion.div 
      className="mt-8 md:mt-16 backdrop-blur-sm bg-background/80 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-4">Besoin d'aide ?</h2>
          <div className="h-1 w-16 bg-gradient-fonij mb-3 md:mb-6"></div>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Notre équipe est là pour vous accompagner dans le processus de candidature.
          </p>
          <div className="flex flex-col gap-3 md:gap-4">
            <motion.a 
              href="tel:+224123456789" 
              className="flex items-center space-x-3 md:space-x-4 hover:bg-primary/5 p-2 rounded-lg transition-colors"
              whileHover={{ x: 5, backgroundColor: "rgba(var(--primary), 0.1)" }}
            >
              <motion.div 
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </motion.div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Téléphone</p>
                <p className="text-sm md:text-base text-foreground font-medium">+224 123 456 789</p>
              </div>
            </motion.a>
            <motion.a 
              href="mailto:contact@fonij.org" 
              className="flex items-center space-x-3 md:space-x-4 hover:bg-primary/5 p-2 rounded-lg transition-colors"
              whileHover={{ x: 5, backgroundColor: "rgba(var(--primary), 0.1)" }}
            >
              <motion.div 
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </motion.div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Email</p>
                <p className="text-sm md:text-base text-foreground font-medium">contact@fonij.org</p>
              </div>
            </motion.a>
          </div>
        </div>
        <div className="relative mt-4 md:mt-0 flex justify-center md:block">
          {/* Effets de lumière */}
          <motion.div 
            className="absolute -top-8 -right-8 w-16 h-16 md:w-32 md:h-32 bg-primary/10 rounded-full blur-xl md:blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-8 -left-8 w-16 h-16 md:w-32 md:h-32 bg-yellow-400/10 rounded-full blur-xl md:blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.img 
            src="/images/fonij/logo-transparent.png"
            alt="Logo FONIJ"
            className="w-48 md:w-full h-auto opacity-80 relative z-10"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
} 