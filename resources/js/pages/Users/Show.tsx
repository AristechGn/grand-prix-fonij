import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';

interface ShowProps {
    user: User;
}

export default function ShowUser({ user }: ShowProps) {
    const roleColors: Record<string, string> = {
        admin: 'bg-blue-500',
        jury: 'bg-green-500',
        user: 'bg-gray-500'
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Non spécifié';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    return (
        <AppLayout>
            <Head title={`${user.first_name} ${user.last_name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between">
                                <div>
                                    <CardTitle>{user.first_name} {user.last_name}</CardTitle>
                                    <CardDescription>
                                        <Badge className={roleColors[user.role] || 'bg-gray-500'}>
                                            {user.role}
                                        </Badge>
                                    </CardDescription>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={route('users.edit', user.id)}>
                                        <Button variant="outline">Modifier</Button>
                                    </Link>
                                    <Link 
                                        href={route('users.destroy', user.id)} 
                                        method="delete" 
                                        as="button"
                                    >
                                        <Button variant="destructive">Supprimer</Button>
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Informations personnelles</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-semibold">Email:</span> {user.email}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Téléphone:</span> {user.phone || 'Non spécifié'}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Date de naissance:</span> {formatDate(user.birth_date)}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Genre:</span> {
                                                user.gender === 'male' ? 'Homme' : 
                                                user.gender === 'female' ? 'Femme' : 
                                                user.gender === 'other' ? 'Autre' : 'Non spécifié'
                                            }
                                        </div>
                                        <div>
                                            <span className="font-semibold">Profession:</span> {user.profession || 'Non spécifié'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Adresse et compte</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-semibold">Adresse:</span> {user.address || 'Non spécifiée'}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Date de création:</span> {formatDate(user.created_at)}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Dernière mise à jour:</span> {formatDate(user.updated_at)}
                                        </div>
                                        {user.email_verified_at && (
                                            <div>
                                                <span className="font-semibold">Email vérifié le:</span> {formatDate(user.email_verified_at)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-right">
                                <Button
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Retour
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
