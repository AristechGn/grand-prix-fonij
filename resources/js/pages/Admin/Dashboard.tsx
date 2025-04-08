import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UsersIcon, FileTextIcon, BarChart3Icon, ChevronRightIcon } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        {
            title: 'Utilisateurs',
            count: '48',
            icon: <UsersIcon className="h-8 w-8 text-green-500" />,
            link: route('admin.users.index'),
            change: '+12% ce mois'
        },
        {
            title: 'Candidatures',
            count: '124',
            icon: <FileTextIcon className="h-8 w-8 text-green-500" />,
            link: '#',
            change: '+18% ce mois'
        },
        {
            title: 'Évaluations',
            count: '78',
            icon: <BarChart3Icon className="h-8 w-8 text-green-500" />,
            link: '#',
            change: '+5% ce mois'
        }
    ];

    return (
        <AppLayout>
            <Head title="Tableau de bord d'administration" />
            
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold mb-6">Tableau de bord d'administration</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
                                        {stat.icon}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold">{stat.count}</span>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-green-600">{stat.change}</span>
                                            <a href={stat.link} className="text-sm text-green-600 flex items-center">
                                                Voir <ChevronRightIcon className="h-4 w-4 ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Activité récente</CardTitle>
                                <CardDescription>Dernières actions effectuées sur la plateforme</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div key={item} className="flex items-start space-x-4 py-2">
                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <UsersIcon className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold">Un utilisateur a été créé</h4>
                                                <p className="text-sm text-gray-500">
                                                    {`Il y a ${item} heure${item > 1 ? 's' : ''}`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Actions rapides</CardTitle>
                                <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="bg-green-50 border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
                                        <CardContent className="p-4 flex flex-col items-center">
                                            <UsersIcon className="h-8 w-8 text-green-600 mb-2" />
                                            <span className="text-center font-medium">Ajouter un utilisateur</span>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-green-50 border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
                                        <CardContent className="p-4 flex flex-col items-center">
                                            <FileTextIcon className="h-8 w-8 text-green-600 mb-2" />
                                            <span className="text-center font-medium">Gérer les candidatures</span>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-green-50 border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
                                        <CardContent className="p-4 flex flex-col items-center">
                                            <BarChart3Icon className="h-8 w-8 text-green-600 mb-2" />
                                            <span className="text-center font-medium">Voir les statistiques</span>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-green-50 border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
                                        <CardContent className="p-4 flex flex-col items-center">
                                            <UsersIcon className="h-8 w-8 text-green-600 mb-2" />
                                            <span className="text-center font-medium">Gérer les rôles</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminDashboard; 