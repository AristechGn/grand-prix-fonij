import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, Video, CheckCircle, X, FileText, Camera, Play, HelpCircle, Shield, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface DocumentsFormData {
    pieceIdentite: File | null;
    businessPlan: File | null;
    photoProjet: File | null;
    videoPresentation: string;
}

interface DocumentsFormProps {
    formData: DocumentsFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Record<string, string[]>;
}

interface FileUploadZoneProps {
    name: string;
    accept: string;
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    description: string;
    icon: React.ReactNode;
    maxSize: string;
    required?: boolean;
}

function FileUploadZone({ 
    name, 
    accept, 
    file, 
    onFileChange, 
    title, 
    description, 
    icon, 
    maxSize, 
    required = false 
}: FileUploadZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            const mockEvent = {
                target: {
                    name,
                    files: e.dataTransfer.files
                }
            } as React.ChangeEvent<HTMLInputElement>;
            onFileChange(mockEvent);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        const mockEvent = {
            target: {
                name,
                files: null
            }
        } as any;
        onFileChange(mockEvent);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                {title}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            <motion.div
                className={`
                    relative border-2 border-dashed rounded-2xl p-6 cursor-pointer
                    transition-all duration-300 overflow-hidden
                    ${isDragOver 
                        ? 'border-primary bg-primary-50 dark:bg-primary-900/20 scale-[1.02]' 
                        : file 
                            ? 'border-primary bg-primary-50 dark:bg-primary-900/20' 
                            : isHovered 
                                ? 'border-primary-300 bg-primary-25 dark:bg-primary-900/10 scale-[1.01]' 
                                : 'border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50'
                    }
                    hover:shadow-lg active:scale-[0.99]
                    backdrop-blur-sm
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                layout
            >
                {/* Animated background effect */}
                <AnimatePresence>
                    {(isDragOver || isHovered) && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </AnimatePresence>

                <input
                    ref={fileInputRef}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={onFileChange}
                    className="hidden"
                />

                <AnimatePresence mode="wait">
                    {file ? (
                        <motion.div
                            key="file-selected"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CheckCircle className="w-6 h-6 text-primary dark:text-primary-400" />
                                </motion.div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                onClick={removeFile}
                                className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file-empty"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center"
                        >
                            <motion.div
                                className={`
                                    w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
                                    ${isDragOver 
                                        ? 'bg-primary-200 dark:bg-primary-800' 
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }
                                    transition-colors duration-300
                                `}
                                animate={isDragOver ? { 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                } : isHovered ? {
                                    scale: 1.05
                                } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    animate={isDragOver ? { y: [-2, 2, -2] } : {}}
                                    transition={{ duration: 1, repeat: isDragOver ? Infinity : 0 }}
                                >
                                    {icon}
                                </motion.div>
                            </motion.div>
                            
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {isDragOver ? 'Déposez votre fichier ici' : 'Glissez-déposez ou cliquez'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {description}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                                    Taille max: {maxSize}
                                </p>
                            </div>

                            {/* Upload animation */}
                            <motion.div
                                className="absolute top-2 right-2"
                                animate={isDragOver ? {
                                    y: [-5, 5, -5],
                                    opacity: [0.5, 1, 0.5]
                                } : {}}
                                transition={{ duration: 1, repeat: isDragOver ? Infinity : 0 }}
                            >
                                <Upload className="w-5 h-5 text-gray-400" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default function DocumentsForm({ formData, handleChange, handleFileChange, errors }: DocumentsFormProps) {
    return (
        <motion.div 
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-6 sm:p-8 lg:p-10">
                <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.h2 
                            className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Documents requis
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 dark:text-gray-400"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Téléchargez vos documents en toute sécurité
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <FileUploadZone
                                name="pieceIdentite"
                                accept=".pdf,.jpg,.jpeg,.png"
                                file={formData.pieceIdentite}
                                onFileChange={handleFileChange}
                                title="Pièce d'identité"
                                description="CNI, passeport, etc. (PDF, JPG, PNG)"
                                icon={<FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />}
                                maxSize="10MB"
                                required
                            />
                            {errors['pieceIdentite'] && <InputError message={errors['pieceIdentite'][0]} />}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <FileUploadZone
                                name="businessPlan"
                                accept=".pdf,.doc,.docx,.ppt,.pptx"
                                file={formData.businessPlan}
                                onFileChange={handleFileChange}
                                title="Business Plan"
                                description="Présentation du projet (PDF, DOC, PPT)"
                                icon={<File className="w-8 h-8 text-gray-600 dark:text-gray-400" />}
                                maxSize="10MB"
                                required
                            />
                            {errors['businessPlan'] && <InputError message={errors['businessPlan'][0]} />}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <FileUploadZone
                                name="photoProjet"
                                accept=".jpg,.jpeg,.png"
                                file={formData.photoProjet}
                                onFileChange={handleFileChange}
                                title="Photo du projet"
                                description="Prototype ou visuel (JPG, PNG)"
                                icon={<Camera className="w-8 h-8 text-gray-600 dark:text-gray-400" />}
                                maxSize="5MB"
                                required
                            />
                            {errors['photoProjet'] && <InputError message={errors['photoProjet'][0]} />}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-3"
                        >
                            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                Vidéo de présentation (facultatif)
                            </label>
                            
                            <motion.div 
                                className="relative"
                                whileFocus={{ scale: 1.02 }}
                            >
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <Play className="w-5 h-5 text-gray-400" />
                                </div>
                                <Input
                                    type="url"
                                    name="videoPresentation"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={formData.videoPresentation}
                                    onChange={handleChange}
                                    className="
                                        w-full pl-12 pr-4 py-4 
                                        border-2 border-gray-200 dark:border-gray-600 
                                        rounded-2xl focus:ring-2 focus:ring-primary 
                                        focus:border-primary 
                                        bg-gray-50/50 dark:bg-gray-800/50 
                                        backdrop-blur-sm shadow-sm 
                                        text-gray-800 dark:text-gray-200
                                        placeholder-gray-400 dark:placeholder-gray-500
                                        transition-all duration-300
                                        hover:border-primary-300 dark:hover:border-primary-400
                                        hover:shadow-lg
                                    "
                                />
                                
                                {/* Success indicator */}
                                <AnimatePresence>
                                    {formData.videoPresentation && (
                                        <motion.div
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                        >
                                            <CheckCircle className="w-5 h-5 text-primary" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Video className="w-3 h-3 mr-1" />
                                Lien YouTube, Vimeo ou autre plateforme
                            </p>
                            {errors['videoPresentation'] && <InputError message={errors['videoPresentation'][0]} />}
                        </motion.div>
                    </div>

                    {/* Helpful message section */}
                    <motion.div 
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700">
                            <div className="flex items-start space-x-4">
                                <motion.div
                                    className="mt-1 flex-shrink-0"
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <HelpCircle className="w-6 h-6 text-primary" />
                                </motion.div>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Conseils pour vos documents
                                    </h3>
                                    
                                    <div className="space-y-3 text-gray-600 dark:text-gray-400">
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <p className="text-sm">
                                                <span className="font-medium">Pièce d'identité :</span> Assurez-vous que votre document est lisible et valide.
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <p className="text-sm">
                                                <span className="font-medium">Business Plan :</span> Incluez une description claire de votre projet, ses objectifs, son modèle économique et son impact attendu.
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <p className="text-sm">
                                                <span className="font-medium">Photo du projet :</span> Choisissez une image de haute qualité qui illustre clairement votre projet ou prototype.
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <p className="text-sm">
                                                <span className="font-medium">Vidéo :</span> Une courte présentation (2-3 minutes) peut augmenter significativement vos chances de sélection.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                                        <div className="mr-3">
                                            <Shield className="w-5 h-5 text-primary" />
                                        </div>
                                        <p className="text-xs text-gray-700 dark:text-gray-300">
                                            <span className="font-medium">Sécurité garantie :</span> Tous vos documents sont traités de manière confidentielle et sécurisée conformément à notre politique de confidentialité.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-amber-50/70 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
                                        <div className="mr-3">
                                            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <p className="text-xs text-amber-800 dark:text-amber-300">
                                            Des documents incomplets ou illisibles peuvent retarder le traitement de votre candidature. Assurez-vous de télécharger tous les documents requis dans un format de bonne qualité.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}