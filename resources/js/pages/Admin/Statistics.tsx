import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, DownloadIcon, FilterIcon, RefreshCcwIcon } from 'lucide-react';

const AdminStatistics = () => {
    return (
        <AppLayout>
            <Head title="Statistiques" />
            
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Statistiques</h1>
                        
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Derniers 30 jours
                            </Button>
                            <Button variant="outline" className="flex items-center">
                                <FilterIcon className="h-4 w-4 mr-2" />
                                Filtres
                            </Button>
                            <Button variant="outline" className="flex items-center">
                                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                                Actualiser
                            </Button>
                            <Button variant="outline" className="flex items-center">
                                <DownloadIcon className="h-4 w-4 mr-2" />
                                Exporter
                            </Button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Utilisateurs par rôle</CardTitle>
                                <CardDescription>Répartition des utilisateurs par type de rôle</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col space-y-4">
                                    {[
                                        { role: 'Administrateurs', count: 5, percentage: 10, color: 'bg-blue-500' },
                                        { role: 'Jurys', count: 12, percentage: 25, color: 'bg-green-500' },
                                        { role: 'Candidats', count: 24, percentage: 50, color: 'bg-amber-500' },
                                        { role: 'Utilisateurs', count: 7, percentage: 15, color: 'bg-purple-500' }
                                    ].map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{item.role}</span>
                                                <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className={`${item.color} h-2.5 rounded-full`} 
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Candidatures par statut</CardTitle>
                                <CardDescription>État des candidatures actuelles</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col space-y-4">
                                    {[
                                        { status: 'En attente', count: 45, percentage: 36, color: 'bg-amber-500' },
                                        { status: 'En vérification', count: 32, percentage: 26, color: 'bg-blue-500' },
                                        { status: 'Acceptées', count: 28, percentage: 22, color: 'bg-green-500' },
                                        { status: 'Rejetées', count: 19, percentage: 16, color: 'bg-red-500' }
                                    ].map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{item.status}</span>
                                                <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className={`${item.color} h-2.5 rounded-full`} 
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Activité mensuelle</CardTitle>
                                <CardDescription>Tendances d'activité sur les 6 derniers mois</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="h-80 flex items-end justify-between space-x-2">
                                    {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, index) => {
                                        const height = [60, 45, 70, 50, 80, 90][index];
                                        return (
                                            <div key={index} className="flex flex-col items-center flex-1">
                                                <div 
                                                    className="w-full bg-green-500 rounded-t-md transition-all hover:bg-green-600"
                                                    style={{ height: `${height}%` }}
                                                ></div>
                                                <div className="mt-2 text-sm">{month}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminStatistics; 