import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, Download, Share2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ApplicationConfirmationProps {
    reference: string;
}

export default function ApplicationConfirmation({ reference }: ApplicationConfirmationProps) {
    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-muted/5 pt-20 pb-16">
                <div className="container mx-auto px-4">
                    {/* Section principale */}
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Icône de succès animée */}
                        <motion.div
                            className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
                            >
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </motion.div>
                        </motion.div>

                        {/* Titre */}
                        <motion.h1
                            className="text-4xl font-bold text-foreground mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Candidature soumise avec succès !
                        </motion.h1>

                        {/* Sous-titre */}
                        <motion.p
                            className="text-xl text-muted-foreground mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Votre candidature a été enregistrée sous la référence :
                        </motion.p>

                        {/* Numéro de référence */}
                        <motion.div
                            className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 mb-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-2xl font-mono font-bold text-primary">{reference}</p>
                        </motion.div>

                        {/* Message d'information */}
                        <motion.div
                            className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h2 className="text-lg font-semibold text-blue-800 mb-2">Prochaines étapes :</h2>
                            <ul className="text-blue-700 space-y-2">
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Un email de confirmation vous a été envoyé avec les détails de votre candidature.</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Notre équipe examinera votre dossier et vous contactera dans les plus brefs délais.</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Vous pouvez suivre l'état de votre candidature en utilisant votre numéro de référence.</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Boutons d'action */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Link
                                href={route('home')}
                                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Retour à l'accueil
                            </Link>
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center px-6 py-3 bg-white border-2 border-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Imprimer la confirmation
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(reference);
                                    alert('Référence copiée !');
                                }}
                                className="inline-flex items-center px-6 py-3 bg-white border-2 border-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                Copier la référence
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
} 