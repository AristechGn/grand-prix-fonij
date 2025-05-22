import { CheckCircle, Sparkles, Rocket, Target, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FONIJ } from '@/utils';
import { useState } from 'react';

interface ProgramSelectorProps {
    selectedProgram: string;
    onSelectProgram: (programId: string) => void;
}

export default function ProgramSelector({ selectedProgram, onSelectProgram }: ProgramSelectorProps) {
    const [hoveredProgramId, setHoveredProgramId] = useState<string | null>(null);
    
    const selectedCount = selectedProgram ? 1 : 0;
    
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
                        <Rocket className="w-6 h-6 mr-2" />
                        Programme d'accélération
                    </motion.h2>
                    
                    <motion.p 
                        className="text-white/90 mb-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Choisissez le programme adapté à votre projet
                    </motion.p>

                    {/* Barre de progression */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Sélection</span>
                            <span>{selectedCount}/1 programme sélectionné</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2.5">
                            <motion.div 
                                className="bg-white h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: selectedCount ? '100%' : '0%' }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FONIJ.programmes.map((programme, index) => {
                        const isSelected = selectedProgram === programme.slug;
                        const isHovered = hoveredProgramId === programme.slug;
                        
                        return (
                            <motion.div
                                key={programme.id}
                                className={`
                                    relative p-6 rounded-xl cursor-pointer border-2 
                                    transition-all duration-300 overflow-hidden
                                    ${isSelected 
                                        ? 'bg-gradient-to-br from-primary-500 via-primary-700 to-secondary-500 text-white shadow-lg border-transparent' 
                                        : 'bg-white/80 dark:bg-gray-800/80 hover:border-primary-300 dark:hover:border-primary-600 border-gray-200 dark:border-gray-700'
                                    }
                                `}
                                onClick={() => onSelectProgram(programme.slug)}
                                onHoverStart={() => setHoveredProgramId(programme.slug)}
                                onHoverEnd={() => setHoveredProgramId(null)}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    delay: index * 0.1,
                                    duration: 0.4, 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
                                whileHover={{ y: -5, scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Animated background patterns for selected state */}
                                {isSelected && (
                                    <motion.div 
                                        className="absolute inset-0 opacity-20"
                                        animate={{
                                            background: [
                                                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                                                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                                                'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                                                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                                            ]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}

                                {/* Hover glow effect */}
                                <AnimatePresence>
                                    {isHovered && !isSelected && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </AnimatePresence>

                                <div className="relative z-10">
                                    <div className="mb-4">
                                        <motion.div 
                                            className={`
                                                w-16 h-16 rounded-xl flex items-center justify-center
                                                ${isSelected 
                                                    ? 'bg-white/20' 
                                                    : `${programme.bgColor || 'bg-gray-100 dark:bg-gray-700'}`
                                                }
                                            `}
                                            animate={isSelected ? {
                                                scale: [1, 1.05, 1],
                                                rotate: [0, 2, -2, 0]
                                            } : isHovered ? {
                                                y: [-2, 2, -2]
                                            } : {}}
                                            transition={{ 
                                                duration: 2,
                                                repeat: (isSelected || isHovered) ? Infinity : 0,
                                                repeatType: "reverse",
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <programme.icon className={`
                                                h-8 w-8
                                                ${isSelected 
                                                    ? 'text-white' 
                                                    : programme.textColor || 'text-gray-800 dark:text-gray-200'
                                                }
                                            `} />
                                        </motion.div>
                                    </div>
                                    
                                    <motion.h3 
                                        className={`
                                            text-xl font-bold mb-2
                                            ${isSelected ? 'text-white' : 'text-gray-800 dark:text-gray-200'}
                                        `}
                                        animate={isSelected ? {
                                            textShadow: ["0 0 0px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
                                        } : {}}
                                        transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                                    >
                                        {programme.title}
                                    </motion.h3>
                                    
                                    <p className={`
                                        text-sm mb-4
                                        ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}
                                    `}>
                                        Durée: {programme.duration}
                                    </p>
                                    
                                    <div className={`
                                        text-sm
                                        ${isSelected ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}
                                    `}>
                                        <ul className="space-y-3">
                                            {programme.features.slice(0, 3).map((feature, idx) => (
                                                <motion.li 
                                                    key={idx} 
                                                    className="flex items-start gap-3"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <motion.div
                                                        animate={isSelected ? { 
                                                            scale: [1, 1.2, 1]
                                                        } : {}}
                                                        transition={{ 
                                                            duration: 2, 
                                                            repeat: isSelected ? Infinity : 0, 
                                                            delay: idx * 0.5
                                                        }}
                                                    >
                                                        <CheckCircle className={`
                                                            h-4 w-4 mt-1 flex-shrink-0
                                                            ${isSelected ? 'text-secondary-300' : 'text-primary dark:text-primary-400'}
                                                        `} />
                                                    </motion.div>
                                                    <span>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                
                                    {/* Selected indicator */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div 
                                                className="absolute -top-2 -right-2"
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                            >
                                                <motion.div 
                                                    className="bg-white rounded-full p-2 shadow-lg"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 0 0 rgba(255,255,255,0.4)",
                                                            "0 0 0 8px rgba(255,255,255,0)",
                                                            "0 0 0 0 rgba(255,255,255,0)"
                                                        ]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    {/* Change success icon animation on selection */}
                                                    <motion.div
                                                        animate={{ rotate: [0, 360] }}
                                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Sparkles className="h-5 w-5 text-secondary" />
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Helpful message */}
                <motion.div 
                    className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="flex items-center space-x-3">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <Trophy className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                Un programme adapté à vos besoins
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Chaque programme offre un accompagnement spécifique. Choisissez celui qui correspond le mieux à vos objectifs.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
} 