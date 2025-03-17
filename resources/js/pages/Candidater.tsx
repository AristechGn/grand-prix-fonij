import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';

const categories = [
    { id: 1, name: "Promotion de l'esprit d'entreprise" },
    { id: 2, name: "Éducation aux compétences" },
    { id: 3, name: "Transition numérique" },
    { id: 4, name: "Entrepreneuriat agricole" }
];

const programmes = [
    { id: 1, name: "SMART Entrepreneur" },
    { id: 2, name: "Youth'Incuba" },
    { id: 3, name: "Boost Entrepreneurs" }
];

export default function Candidater() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        ville: '',
        categorie: '',
        programme: '',
        nomProjet: '',
        descriptionProjet: '',
        businessPlan: '',
        document: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                document: e.target.files![0]
            }));
        }
    };

    return (
        <MainLayout>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Candidater au Grand Prix FONIJ
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Remplissez le formulaire ci-dessous pour soumettre votre candidature
                        </p>
                    </div>

                    <div className="mt-12 max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Informations personnelles */}
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Informations personnelles
                                    </h3>
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                id="nom"
                                                required
                                                value={formData.nom}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                id="prenom"
                                                required
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                                Téléphone
                                            </label>
                                            <input
                                                type="tel"
                                                name="telephone"
                                                id="telephone"
                                                required
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
                                                Date de naissance
                                            </label>
                                            <input
                                                type="date"
                                                name="dateNaissance"
                                                id="dateNaissance"
                                                required
                                                value={formData.dateNaissance}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                                                Ville
                                            </label>
                                            <input
                                                type="text"
                                                name="ville"
                                                id="ville"
                                                required
                                                value={formData.ville}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Informations du projet */}
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Informations du projet
                                    </h3>
                                    <div className="mt-6 space-y-6">
                                        <div>
                                            <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">
                                                Catégorie
                                            </label>
                                            <select
                                                name="categorie"
                                                id="categorie"
                                                required
                                                value={formData.categorie}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">Sélectionnez une catégorie</option>
                                                {categories.map(category => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="programme" className="block text-sm font-medium text-gray-700">
                                                Programme d'accélération
                                            </label>
                                            <select
                                                name="programme"
                                                id="programme"
                                                required
                                                value={formData.programme}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option value="">Sélectionnez un programme</option>
                                                {programmes.map(programme => (
                                                    <option key={programme.id} value={programme.id}>
                                                        {programme.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="nomProjet" className="block text-sm font-medium text-gray-700">
                                                Nom du projet
                                            </label>
                                            <input
                                                type="text"
                                                name="nomProjet"
                                                id="nomProjet"
                                                required
                                                value={formData.nomProjet}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="descriptionProjet" className="block text-sm font-medium text-gray-700">
                                                Description du projet
                                            </label>
                                            <textarea
                                                name="descriptionProjet"
                                                id="descriptionProjet"
                                                rows={4}
                                                required
                                                value={formData.descriptionProjet}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="businessPlan" className="block text-sm font-medium text-gray-700">
                                                Business Plan
                                            </label>
                                            <textarea
                                                name="businessPlan"
                                                id="businessPlan"
                                                rows={6}
                                                required
                                                value={formData.businessPlan}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                                                Document complémentaire (PDF)
                                            </label>
                                            <input
                                                type="file"
                                                name="document"
                                                id="document"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-blue-50 file:text-blue-700
                                                    hover:file:bg-blue-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Soumettre ma candidature
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 