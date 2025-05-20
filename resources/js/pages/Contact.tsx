import {
    MapPin, Phone, Mail, Clock, Globe,
    Send, ChevronRight
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { FONIJ } from '@/utils/index';
import { motion } from 'framer-motion';

export default function contact() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const subject = formData.get('subject');
        const message = formData.get('message');
        const email = formData.get('email');
        const name = formData.get('name');

        const mailtoLink = `mailto:${FONIJ.contactInfo.email}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;
    };

    // Variants d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <MainLayout>
                        {/* Hero Section avec Parallaxe */}            <motion.div                 className="relative bg-primary overflow-hidden"                initial={{ opacity: 0 }}                animate={{ opacity: 1 }}                transition={{ duration: 0.8 }}            >                <div                     className="w-full min-h-[60vh] md:min-h-[80vh] bg-fixed bg-center bg-cover relative flex items-center justify-center"                     style={{                        backgroundImage: `url('https://simandou2040.gn/wp-content/uploads/2024/12/1bb49b26-eee7-436d-9806-f6eccfcda1f8-2550x1434-1.jpeg')`,                    }}                >                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40"></div>                                    {/* Formes décoratives animées */}                    <motion.div                         className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary opacity-20 blur-3xl"                        animate={{                             scale: [1, 1.2, 1],                            opacity: [0.2, 0.3, 0.2]                        }}                        transition={{                            duration: 8,                            repeat: Infinity,                            ease: "easeInOut"                        }}                    ></motion.div>                    <motion.div                         className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-yellow-500 opacity-15 blur-3xl"                        animate={{                             scale: [1, 1.3, 1],                            opacity: [0.1, 0.2, 0.1]                        }}                        transition={{                            duration: 10,                            repeat: Infinity,                            ease: "easeInOut",                            delay: 1                        }}                    ></motion.div>                                        {/* Particules scintillantes */}                    <div className="absolute inset-0 overflow-hidden">                        {Array.from({ length: 20 }).map((_, index) => (                            <motion.div                                key={index}                                className="absolute w-2 h-2 rounded-full bg-white"                                style={{                                    top: `${Math.random() * 100}%`,                                    left: `${Math.random() * 100}%`,                                }}                                animate={{                                    opacity: [0, 1, 0],                                    scale: [0, 1, 0],                                }}                                transition={{                                    duration: 2 + Math.random() * 3,                                    repeat: Infinity,                                    delay: Math.random() * 2,                                }}                            />                        ))}                    </div>                                        <div className="relative container mx-auto px-4 z-10">                        <motion.div                             className="max-w-4xl mx-auto text-center"                            variants={containerVariants}                            initial="hidden"                            animate="visible"                        >                            <motion.div                                variants={itemVariants}                                className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-yellow-300 text-sm font-medium uppercase tracking-wide mb-4"                            >                                Grand Prix FONIJ                            </motion.div>                            <motion.h1                                 variants={itemVariants}                                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"                            >                                Contactez-nous                            </motion.h1>                            <motion.p                                 variants={itemVariants}                                className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"                            >                                Pour toutes vos questions sur le Grand Prix FONIJ et l'accompagnement entrepreneurial en Guinée                            </motion.p>                            <motion.div                                variants={itemVariants}                                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"                            >                                <motion.a                                    href="#contact-form"                                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-fonij text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"                                    whileHover={{ scale: 1.05, y: -5 }}                                    whileTap={{ scale: 0.95 }}                                >                                    Nous écrire                                    <Send className="ml-2 w-5 h-5" />                                </motion.a>                                <motion.a                                    href="#map-section"                                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all duration-300"                                    whileHover={{ scale: 1.05, y: -5 }}                                    whileTap={{ scale: 0.95 }}                                >                                    Nous localiser                                    <MapPin className="ml-2 w-5 h-5" />                                </motion.a>                            </motion.div>                        </motion.div>                    </div>                </div>            </motion.div>

                        {/* Section Principale */}            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">                <div className="container mx-auto px-4">                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">                        {/* Formulaire */}                        <motion.div                             id="contact-form"                            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"                            initial={{ opacity: 0, x: -50 }}                            whileInView={{ opacity: 1, x: 0 }}                            transition={{ duration: 0.6 }}                            viewport={{ once: true, margin: "-100px" }}                        >                            <motion.div                                 className="mb-8"                                initial={{ opacity: 0, y: 20 }}                                whileInView={{ opacity: 1, y: 0 }}                                transition={{ duration: 0.5, delay: 0.2 }}                                viewport={{ once: true }}                            >                                <div className="mb-2">                                    <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Grand Prix FONIJ</span>                                </div>                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Envoyez-nous un message</h2>                                <p className="text-gray-600">                                    Notre équipe est à votre disposition pour toutes questions concernant le Grand Prix FONIJ, les candidatures et l'accompagnement entrepreneurial.                                </p>                            </motion.div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Votre nom"
                                            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                            Adresse e-mail
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Votre e-mail"
                                            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                                            required
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Sujet
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Sujet de votre message"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Votre message"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                                        required
                                    ></textarea>
                                </motion.div>

                                                                <motion.button                                    type="submit"                                    className="w-full bg-gradient-fonij text-white font-medium py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl"                                    whileHover={{ scale: 1.03, y: -3 }}                                    whileTap={{ scale: 0.97 }}                                    initial={{ opacity: 0, y: 20 }}                                    whileInView={{ opacity: 1, y: 0 }}                                    transition={{ duration: 0.5, delay: 0.7 }}                                    viewport={{ once: true }}                                >                                    Envoyer le message                                    <motion.span                                        animate={{ x: [0, 5, 0] }}                                        transition={{ duration: 1.5, repeat: Infinity }}                                    >                                        <Send className="ml-2 w-5 h-5" />                                    </motion.span>                                </motion.button>
                            </form>
                        </motion.div>

                                                {/* Informations de contact */}                        <motion.div                             className="space-y-8"                            initial={{ opacity: 0, x: 50 }}                            whileInView={{ opacity: 1, x: 0 }}                            transition={{ duration: 0.6, delay: 0.2 }}                            viewport={{ once: true, margin: "-100px" }}                        >                            <motion.div                                 className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"                                whileHover={{ y: -5 }}                                transition={{ duration: 0.3 }}                            >                                <div className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">À votre service</div>                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
                                <div className="space-y-6">
                                    <motion.div 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="text-primary p-3 bg-primary/10 dark:bg-primary/20 rounded-full"
                                        >
                                            <MapPin className="w-6 h-6" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Adresse</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.address}</p>
                                        </div>
                                    </motion.div>
                                    <motion.div 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="text-primary p-3 bg-primary/10 dark:bg-primary/20 rounded-full"
                                        >
                                            <Phone className="w-6 h-6" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Téléphones</h4>
                                            <ul className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.unespace_phones.map((phone, idx) => (
                                                <li key={idx} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200">{phone.unespace_phone}</li>
                                            ))}</ul>
                                        </div>
                                    </motion.div>
                                    <motion.div 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="text-primary p-3 bg-primary/10 dark:bg-primary/20 rounded-full"
                                        >
                                            <Mail className="w-6 h-6" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Email</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.email}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                                        <motion.div                                 className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"                                whileHover={{ y: -5 }}                                initial={{ opacity: 0, y: 20 }}                                whileInView={{ opacity: 1, y: 0 }}                                transition={{ duration: 0.5, delay: 0.4 }}                                viewport={{ once: true }}                            >                                <div className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">Disponibilité</div>                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Horaires d'ouverture</h3>
                                <div className="space-y-4">
                                                                        <motion.div                                         className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg hover:bg-primary/15 transition-colors duration-300 border-l-4 border-primary"                                        whileHover={{ x: 5 }}                                    >                                        <span className="font-medium text-gray-900">Lundi - Vendredi</span>                                        <span className="text-primary font-semibold">{FONIJ.contactInfo.hours.weekdays}</span>                                    </motion.div>
                                </div>
                            </motion.div>

                                        <motion.div                                 className="bg-gradient-fonij p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 text-white"                                whileHover={{ y: -5 }}                                initial={{ opacity: 0, y: 20 }}                                whileInView={{ opacity: 1, y: 0 }}                                transition={{ duration: 0.5, delay: 0.5 }}                                viewport={{ once: true }}                            >                                <div className="inline-block text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4">Réseaux sociaux</div>                                <h3 className="text-2xl font-bold mb-6">Suivez-nous</h3>
                                <div className="flex space-x-4">
                                    {FONIJ.contactInfo.social.map((platform, idx) => (
                                                                                <motion.a                                            key={idx}                                            href={platform?.url || '#'}                                            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 shadow-sm hover:shadow-md"                                            target="_blank"                                            rel="noopener noreferrer"                                            whileHover={{ scale: 1.2, rotate: 10, y: -5 }}                                            whileTap={{ scale: 0.9 }}                                            initial={{ opacity: 0, y: 10 }}                                            animate={{ opacity: 1, y: 0 }}                                            transition={{ delay: 0.1 * idx + 0.7 }}                                        >                                            {platform?.icon && <platform.icon className="w-6 h-6" />}                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

                        {/* Section Carte Interactive */}            <section id="map-section" className="py-24 bg-gradient-to-b from-white to-gray-50">                <div className="container mx-auto px-4">                    <div className="max-w-6xl mx-auto">                        <motion.div                             className="text-center mb-16"                            initial={{ opacity: 0, y: 30 }}                            whileInView={{ opacity: 1, y: 0 }}                            transition={{ duration: 0.7 }}                            viewport={{ once: true, margin: "-100px" }}                        >                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Notre localisation</span>                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visitez nos bureaux</h2>                            <p className="text-gray-600 max-w-2xl mx-auto">Rendez-nous visite dans nos bureaux à Conakry pour discuter de votre candidature au Grand Prix FONIJ ou pour en savoir plus sur nos programmes d'accompagnement entrepreneurial</p>                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Carte */}
                            <motion.div 
                                className="lg:col-span-2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <motion.div 
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-[450px] hover:shadow-2xl transition-shadow relative border border-gray-100 dark:border-gray-700"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Overlay avec effet de scintillement au survol */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent dark:from-primary/30 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                                    
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d983.4745300420633!2d-13.64765413105491!3d9.604040511577853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd67291a2ca73%3A0xbd6887e5f4a4dc82!2sConakry%2C%20Guin%C3%A9e!5e0!3m2!1sfr!2s!4v1746447724810!5m2!1sfr!2s" 
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0 }} 
                                        allowFullScreen={true}
                                        loading="lazy" 
                                        className="hover:opacity-90 transition-opacity"
                                    >
                                    </iframe>
                                </motion.div>
                            </motion.div>

                            {/* Informations de localisation */}
                            <motion.div 
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comment nous trouver</h3>

                                <div className="space-y-6">
                                    <motion.div 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="text-primary p-3 bg-primary/10 dark:bg-primary/20 rounded-full"
                                        >
                                            <MapPin className="w-6 h-6 flex-shrink-0" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Adresse complète</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.address}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="text-primary p-3 bg-primary/10 dark:bg-primary/20 rounded-full"
                                        >
                                            <Clock className="w-6 h-6 flex-shrink-0" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Heures d'ouverture</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.hours.weekdays}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 border-l-4 border-primary"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Points de repère</h4>
                                        <ul className="space-y-3">
                                            <motion.li 
                                                className="flex items-center text-gray-600 dark:text-gray-300"
                                                initial={{ opacity: 0, x: 10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.7 }}
                                                viewport={{ once: true }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <motion.span
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="text-primary dark:text-primary-400"
                                                >
                                                    <ChevronRight className="w-5 h-5 mr-2" />
                                                </motion.span>
                                                <span>{FONIJ.contactInfo.repere}</span>
                                            </motion.li>
                                            <motion.li 
                                                className="flex items-center text-gray-600 dark:text-gray-300"
                                                initial={{ opacity: 0, x: 10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.8 }}
                                                viewport={{ once: true }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <motion.span
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                    className="text-primary dark:text-primary-400"
                                                >
                                                    <ChevronRight className="w-5 h-5 mr-2" />
                                                </motion.span>
                                                <span>{FONIJ.contactInfo.quartier}</span>
                                            </motion.li>
                                        </ul>
                                    </motion.div>

                                    <motion.a
                                        href={FONIJ.contactInfo.repere_map}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 dark:shadow-none dark:hover:shadow-none"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.9 }}
                                        viewport={{ once: true }}
                                    >
                                        <Globe className="w-5 h-5 mr-2" />
                                        Ouvrir dans Google Maps
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}