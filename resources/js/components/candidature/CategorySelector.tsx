import { CheckCircle, Info, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  details: string[];
  image: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  defaultCategory?: string;
}

export default function CategorySelector({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  defaultCategory 
}: CategorySelectorProps) {
  const [expandedDetails, setExpandedDetails] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedCategory && defaultCategory) {
      onSelectCategory(defaultCategory);
      
      const categoryIndex = categories.findIndex(cat => cat.id.toString() === defaultCategory);
      if (categoryIndex !== -1 && window.innerWidth < 768) {
        setExpandedDetails(categoryIndex);
      }
    }
  }, [defaultCategory, selectedCategory, categories, onSelectCategory]);

  const toggleDetails = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDetails(expandedDetails === index ? null : index);
  };

  const handleCardClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const categoryIndex = categories.findIndex(cat => cat.id.toString() === categoryId);
    if (categoryIndex !== -1 && window.innerWidth < 768) {
      setExpandedDetails(categoryIndex);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
      {categories.map((category, index) => {
        const isSelected = selectedCategory === category.id.toString();
        const isExpanded = expandedDetails === index;
        const isHovered = hoveredCard === index;
        
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.08,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className={`
              relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer
              transform-gpu transition-all duration-300 ease-out
              ${isSelected 
                ? 'bg-gradient-to-br from-primary via-primary-800 to-secondary shadow-2xl shadow-primary/25 scale-[1.02]' 
                : 'bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50'
              }
              ${isHovered && !isSelected ? 'scale-[1.01] shadow-xl' : ''}
              backdrop-blur-md active:scale-[0.98] sm:active:scale-[0.99]
            `}
            onClick={() => handleCardClick(category.id.toString())}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            whileTap={{ scale: 0.97 }}
            layout
          >
            {isSelected && (
              <>
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
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute top-4 right-4 opacity-30">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </>
            )}

            <div className="relative p-4 sm:p-5 md:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <motion.div 
                  className={`
                    relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                    rounded-2xl sm:rounded-3xl overflow-hidden
                    ${isSelected 
                      ? 'ring-4 ring-white/30 shadow-2xl' 
                      : 'ring-2 ring-gray-200/50 dark:ring-gray-600/50 shadow-lg'
                    }
                    transition-all duration-300
                  `}
                  animate={isSelected ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: isSelected ? Infinity : 0,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                    animate={isSelected ? {
                      filter: ["brightness(1.1) saturate(1.2)", "brightness(1.2) saturate(1.3)", "brightness(1.1) saturate(1.2)"]
                    } : {}}
                    transition={{ duration: 2, repeat: isSelected ? Infinity : 0, repeatType: "reverse" }}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={isHovered || isSelected ? {
                      x: ['-100%', '100%']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    style={{ transform: 'translateX(-100%) skewX(-15deg)' }}
                  />

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.h3 
                    className={`
                      text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2
                      ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}
                      transition-colors duration-300
                    `}
                    animate={isSelected ? {
                      textShadow: ["0 0 0px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
                    } : {}}
                    transition={{ duration: 2, repeat: isSelected ? Infinity : 0, repeatType: "reverse" }}
                  >
                    {category.name}
                  </motion.h3>
                  
                  <p className={`
                    text-sm sm:text-base leading-relaxed
                    ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}
                    transition-colors duration-300
                  `}>
                    {category.description}
                  </p>

                  <div className="mt-3 sm:mt-4 md:hidden">
                    <Button 
                      type='button'
                      variant="ghost" 
                      size="sm"
                      className={`
                        text-xs sm:text-sm px-0 h-auto font-medium
                        ${isSelected ? 'text-white/90 hover:text-white' : 'text-primary hover:text-primary-700'}
                        transition-colors duration-300
                      `}
                      onClick={(e) => toggleDetails(index, e)}
                    >
                      <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                      {isExpanded ? "Masquer" : "Détails"}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                      </motion.div>
                    </Button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden mt-3 overflow-hidden"
                      >
                        <div className="space-y-2 pt-2 border-t border-white/20">
                          {category.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <motion.div
                                animate={{ scale: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                              >
                                <CheckCircle className={`
                                  h-4 w-4 mt-0.5 flex-shrink-0
                                  ${isSelected ? 'text-secondary-300' : 'text-primary'}
                                `} />
                              </motion.div>
                              <span className={`
                                text-xs sm:text-sm leading-relaxed
                                ${isSelected ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}
                              `}>
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="hidden md:block mt-4 space-y-3">
                    {category.details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          animate={isSelected ? { 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360, 0]
                          } : {}}
                          transition={{ 
                            duration: 3, 
                            repeat: isSelected ? Infinity : 0, 
                            delay: idx * 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <CheckCircle className={`
                            h-4 w-4 mt-1 flex-shrink-0
                            ${isSelected ? 'text-secondary-300' : 'text-primary'}
                            transition-colors duration-300
                          `} />
                        </motion.div>
                        <span className={`
                          text-sm leading-relaxed
                          ${isSelected ? 'text-white/85' : 'text-gray-600 dark:text-gray-300'}
                          transition-colors duration-300
                        `}>
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isSelected && (
                <motion.div 
                  className="absolute top-3 right-3 sm:top-4 sm:right-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.div 
                    className="bg-white/20 backdrop-blur-md text-white rounded-full p-2 shadow-lg"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255,255,255,0.4)",
                        "0 0 0 8px rgba(255,255,255,0)",
                        "0 0 0 0 rgba(255,255,255,0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isHovered && !isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}