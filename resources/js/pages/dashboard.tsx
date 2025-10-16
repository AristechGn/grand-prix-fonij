import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UsersIcon, FileTextIcon, BarChart3Icon, AwardIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';

interface DashboardProps {
    stats: {
        total_users: number;
        total_applications: number;
        total_editions: number;
        pending_applications: number;
        validated_applications: number;
        selected_applications: number;
        finalist_applications: number;
        winner_applications: number;
    };
    userStats: {
        candidates: number;
        jury: number;
        admins: number;
        super_admins: number;
        regular_users: number;
    };
    applicationStats: {
        promotion_entreprise: number;
        education_competences: number;
        transition_numerique: number;
        entrepreneuriat_agricole: number;
        grand_prix_jury: number;
    };
    regionStats: Array<{ region: string; count: number }>;
    genderStats: Array<{ gender: string; count: number }>;
    educationStats: Array<{ education_level: string; count: number }>;
    recentApplications: Array<{
        id: number;
        application_number: string;
        first_name: string;
        last_name: string;
        project_name: string;
        status: string;
        category: number;
        city: string;
        region: string;
        created_at: string;
        edition_name: string;
    }>;
    recentUsers: Array<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        city: string;
        created_at: string;
    }>;
    monthlyStats: Array<{
        month: string;
        applications: number;
        users: number;
    }>;
    topCities: Array<{ city: string; count: number }>;
    topProfessions: Array<{ profession: string; count: number }>;
    isAdmin: boolean;
    userRole: string;
}

const Dashboard: React.FC<DashboardProps> = ({
    stats,
    userStats,
    applicationStats,
    regionStats,
    genderStats,
    educationStats,
    recentApplications,
    recentUsers,
    monthlyStats,
    topCities,
    topProfessions,
    isAdmin,
    userRole
}) => {
    const mainStats = [
        {
            title: 'Total Candidatures',
            count: stats.total_applications.toString(),
            icon: <FileTextIcon className="h-8 w-8 text-blue-500" />,
            description: 'Candidatures soumises'
        },
        {
            title: 'Candidats',
            count: userStats.candidates.toString(),
            icon: <UsersIcon className="h-8 w-8 text-green-500" />,
            description: 'Utilisateurs candidats'
        },
        {
            title: 'Éditions',
            count: stats.total_editions.toString(),
            icon: <AwardIcon className="h-8 w-8 text-purple-500" />,
            description: 'Éditions disponibles'
        }
    ];

    const statusStats = [
        {
            title: 'En attente',
            count: stats.pending_applications,
            icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
            color: 'text-yellow-600'
        },
        {
            title: 'Validées',
            count: stats.validated_applications,
            icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
            color: 'text-green-600'
        },
        {
            title: 'Sélectionnées',
            count: stats.selected_applications,
            icon: <BarChart3Icon className="h-6 w-6 text-blue-500" />,
            color: 'text-blue-600'
        },
        {
            title: 'Finalistes',
            count: stats.finalist_applications,
            icon: <AwardIcon className="h-6 w-6 text-purple-500" />,
            color: 'text-purple-600'
        },
        {
            title: 'Gagnants',
            count: stats.winner_applications,
            icon: <AwardIcon className="h-6 w-6 text-yellow-500" />,
            color: 'text-yellow-600'
        }
    ];

    return (
        <AppLayout>
            <Head title="Tableau de bord" />
            
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
                        <div className="text-sm text-gray-500">
                            Connecté en tant que: <span className="font-medium capitalize">{userRole}</span>
                        </div>
                    </div>
                    
                    {/* Statistiques principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {mainStats.map((stat, index) => (
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
                                        <span className="text-sm text-gray-600 mt-2">{stat.description}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Statistiques par statut */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {statusStats.map((stat, index) => (
                            <Card key={index} className="shadow-md">
                                <CardContent className="p-4 text-center">
                                    <div className="flex justify-center mb-2">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold mb-1">{stat.count}</div>
                                    <div className={`text-sm font-medium ${stat.color}`}>{stat.title}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Candidatures récentes */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Candidatures récentes</CardTitle>
                                <CardDescription>Dernières candidatures soumises</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentApplications.slice(0, 5).map((application) => (
                                        <div key={application.id} className="flex items-start space-x-4 py-2">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <FileTextIcon className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold">
                                                    {application.first_name} {application.last_name}
                                                </h4>
                                                <p className="text-sm text-gray-600">{application.project_name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {application.city} • {application.created_at}
                                                </p>
                                            </div>
                                            <div className="text-xs">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    application.status === 'validated' ? 'bg-green-100 text-green-800' :
                                                    application.status === 'selected' ? 'bg-blue-100 text-blue-800' :
                                                    application.status === 'finalist' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Statistiques par région */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">Répartition par région</CardTitle>
                                <CardDescription>Candidatures par région</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {regionStats.slice(0, 5).map((region, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{region.region}</span>
                                            <span className="text-sm text-gray-600">{region.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Statistiques détaillées */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Top villes */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Top 5 des villes</CardTitle>
                                <CardDescription>Candidatures par ville</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {topCities.map((city, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{city.city}</span>
                                            <span className="text-sm text-gray-600">{city.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Répartition par genre */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Répartition par genre</CardTitle>
                                <CardDescription>Candidatures par genre</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {genderStats.map((gender, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-sm font-medium">
                                                {gender.gender === 'M' ? 'Homme' : 'Femme'}
                                            </span>
                                            <span className="text-sm text-gray-600">{gender.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top professions */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Top 5 des professions</CardTitle>
                                <CardDescription>Professions les plus représentées</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {topProfessions.map((profession, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{profession.profession}</span>
                                            <span className="text-sm text-gray-600">{profession.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;