import MainLayout from '@/layouts/MainLayout';
import { FONIJ } from '@/utils/index';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Globe, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function contact() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const subject = formData.get('subject');
        const message = formData.get('message');
        const email = formData.get('email');
        const name = formData.get('name');

        const mailtoLink = `mailto:${FONIJ.contactInfo.email}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
        <MainLayout>
            {/* Hero Section avec Parallaxe */}
            <motion.div
                className="bg-primary relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div
                    className="relative flex min-h-[60vh] w-full items-center justify-center bg-cover bg-fixed bg-top md:min-h-[80vh]"
                    style={{ backgroundImage: `url('/images/covers/salle-informatique-fonij.jpg')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40"></div>
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
                    <div className="relative z-10 container mx-auto px-4">
                        <motion.div className="mx-auto max-w-4xl text-center" variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div
                                variants={itemVariants}
                                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-wide text-yellow-300 uppercase backdrop-blur-sm"
                            >
                                Grand Prix FONIJ
                            </motion.div>
                            <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                                Contactez-nous
                            </motion.h1>
                            <motion.p variants={itemVariants} className="mx-auto max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
                                Pour toutes vos questions sur le Grand Prix FONIJ et l'accompagnement entrepreneurial en Guinée
                            </motion.p>
                            <motion.div variants={itemVariants} className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                                <motion.a
                                    href="#contact-form"
                                    className="bg-gradient-fonij inline-flex items-center justify-center rounded-xl px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    
                                    Nous écrire <Send className="ml-2 h-5 w-5" />
                                </motion.a>
                                <motion.a
                                    href="#map-section"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    
                                    Nous localiser <MapPin className="ml-2 h-5 w-5" />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            {/* Section Principale */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
                
                <div className="container mx-auto px-4">
                    
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        
                        {/* Formulaire */}
                        <motion.div
                            id="contact-form"
                            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-10"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            
                            <motion.div
                                className="mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                
                                <div className="mb-2">
                                    
                                    <span className="text-primary bg-primary/10 inline-block rounded-full px-3 py-1 text-sm font-medium">
                                        Grand Prix FONIJ
                                    </span>
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-gray-900">Envoyez-nous un message</h2>
                                <p className="text-gray-600">
                                    
                                    Notre équipe est à votre disposition pour toutes questions concernant le Grand Prix FONIJ, les candidatures et
                                    l'accompagnement entrepreneurial.
                                </p>
                            </motion.div>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Votre nom"
                                            className="focus:ring-primary focus:border-primary w-full rounded-lg border border-gray-200 p-3 transition-all duration-200 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Adresse e-mail
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Votre e-mail"
                                            className="focus:ring-primary focus:border-primary w-full rounded-lg border border-gray-200 p-3 transition-all duration-200 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Sujet
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Sujet de votre message"
                                        className="focus:ring-primary focus:border-primary w-full rounded-lg border border-gray-200 p-3 transition-all duration-200 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Votre message"
                                        className="focus:ring-primary focus:border-primary w-full rounded-lg border border-gray-200 p-3 transition-all duration-200 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                        required
                                    ></textarea>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="bg-gradient-fonij flex w-full items-center justify-center rounded-lg px-6 py-4 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.03, y: -3 }}
                                    whileTap={{ scale: 0.97 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    
                                    Envoyer le message
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                        
                                        <Send className="ml-2 h-5 w-5" />
                                    </motion.span>
                                </motion.button>
                            </form>
                        </motion.div>
                        {/* Informations de contact */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            
                            <motion.div
                                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                
                                <div className="text-primary bg-primary/10 mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium">
                                    À votre service
                                </div>
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">Informations de contact</h3>
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
                                            className="text-primary bg-primary/10 dark:bg-primary/20 rounded-full p-3"
                                        >
                                            <MapPin className="h-6 w-6" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="mb-1 font-medium text-gray-900 dark:text-white">Adresse</h4>
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
                                            className="text-primary bg-primary/10 dark:bg-primary/20 rounded-full p-3"
                                        >
                                            <Phone className="h-6 w-6" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="mb-1 font-medium text-gray-900 dark:text-white">Téléphones</h4>
                                            <ul className="text-gray-600 dark:text-gray-300">
                                                {FONIJ.contactInfo.unespace_phones.map((phone, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="hover:text-primary dark:hover:text-primary-400 text-gray-600 transition-colors duration-200 dark:text-gray-300"
                                                    >
                                                        {phone.unespace_phone}
                                                    </li>
                                                ))}
                                            </ul>
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
                                            className="text-primary bg-primary/10 dark:bg-primary/20 rounded-full p-3"
                                        >
                                            <Mail className="h-6 w-6" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="mb-1 font-medium text-gray-900 dark:text-white">Email</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.email}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                
                                <div className="text-primary bg-primary/10 mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium">
                                    Disponibilité
                                </div>
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">Horaires d'ouverture</h3>
                                <div className="space-y-4">
                                    <motion.div
                                        className="from-primary/5 to-primary/10 hover:bg-primary/15 border-primary flex items-center justify-between rounded-lg border-l-4 bg-gradient-to-r p-4 transition-colors duration-300"
                                        whileHover={{ x: 5 }}
                                    >
                                        
                                        <span className="font-medium text-gray-900">Lundi - Vendredi</span>
                                        <span className="text-primary font-semibold">{FONIJ.contactInfo.hours.weekdays}</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                className="bg-gradient-fonij rounded-2xl border border-white/10 p-8 text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                
                                <div className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                                    Réseaux sociaux
                                </div>
                                <h3 className="mb-6 text-2xl font-bold">Suivez-nous</h3>
                                <div className="flex space-x-4">
                                    {FONIJ.contactInfo.social.map((platform, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={platform?.url || '#'}
                                            className={`rounded-full bg-white/10 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:shadow-md hover:scale-110 transform transition-all duration-200 text-${platform.color}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * idx + 0.7 }}
                                        >
                                            
                                            {platform?.icon && <platform.icon className="h-6 w-6" />}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Section Carte Interactive */}
            <section id="map-section" className="bg-gradient-to-b from-white to-gray-50 py-24">
                
                <div className="container mx-auto px-4">
                    
                    <div className="mx-auto max-w-6xl">
                        
                        <motion.div
                            className="mb-16 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            
                            <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium">
                                Notre localisation
                            </span>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Visitez nos bureaux</h2>
                            <p className="mx-auto max-w-2xl text-gray-600">
                                Rendez-nous visite dans nos bureaux à Conakry pour discuter de votre candidature au Grand Prix FONIJ ou pour en savoir
                                plus sur nos programmes d'accompagnement entrepreneurial
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                            {/* Carte */}
                            <motion.div
                                className="lg:col-span-2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="relative h-[450px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-shadow hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Overlay avec effet de scintillement au survol */}
                                    <div className="from-primary/20 dark:from-primary/30 pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>

                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d3934.990943108946!2d-13.712450281370472!3d9.509515630122673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d9.6305152!2d-13.611827199999999!4m3!3m2!1d9.50917!2d-13.7122!5e0!3m2!1sfr!2s!4v1747821316719!5m2!1sfr!2s"
                                        // referrerpolicy="no-referrer-when-downgrade"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        className="transition-opacity hover:opacity-90"
                                    ></iframe>
                                </motion.div>
                            </motion.div>

                            {/* Informations de localisation */}
                            <motion.div
                                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Comment nous trouver</h3>

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
                                            className="text-primary bg-primary/10 dark:bg-primary/20 rounded-full p-3"
                                        >
                                            <MapPin className="h-6 w-6 flex-shrink-0" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="mb-1 font-medium text-gray-900 dark:text-white">Adresse complète</h4>
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
                                            className="text-primary bg-primary/10 dark:bg-primary/20 rounded-full p-3"
                                        >
                                            <Clock className="h-6 w-6 flex-shrink-0" />
                                        </motion.div>
                                        <div className="ml-4">
                                            <h4 className="mb-1 font-medium text-gray-900 dark:text-white">Heures d'ouverture</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{FONIJ.contactInfo.hours.weekdays}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="border-primary rounded-lg border-l-4 bg-gray-50 p-5 transition-colors duration-300 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Points de repère</h4>
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
                                                    <ChevronRight className="mr-2 h-5 w-5" />
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
                                                    <ChevronRight className="mr-2 h-5 w-5" />
                                                </motion.span>
                                                <span>{FONIJ.contactInfo.quartier}</span>
                                            </motion.li>
                                        </ul>
                                    </motion.div>

                                    <motion.a
                                        href={FONIJ.contactInfo.repere_map}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary hover:bg-primary-700 shadow-primary/20 hover:shadow-primary/30 inline-flex w-full items-center justify-center rounded-lg px-6 py-4 text-white shadow-md transition-colors hover:shadow-lg dark:shadow-none dark:hover:shadow-none"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.9 }}
                                        viewport={{ once: true }}
                                    >
                                        <Globe className="mr-2 h-5 w-5" />
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
