import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
    PencilIcon, 
    TrashIcon, 
    RotateCcwIcon, 
    MoreHorizontalIcon,
    ShieldIcon,
    UserIcon,
    BadgeIcon,
    ShieldCheckIcon
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';

interface ShowProps {
    user: User;
}

export default function ShowUser({ user }: ShowProps) {
    const roleColors: Record<string, string> = {
        super_admin: 'bg-red-100 text-red-800',
        admin: 'bg-blue-100 text-blue-800',
        jury: 'bg-green-100 text-green-800',
        user: 'bg-gray-100 text-gray-800'
    };

    const roleIcons: Record<string, React.ReactElement> = {
        super_admin: <ShieldCheckIcon className="h-3 w-3 mr-1" />,
        admin: <ShieldIcon className="h-3 w-3 mr-1" />,
        jury: <BadgeIcon className="h-3 w-3 mr-1" />,
        user: <UserIcon className="h-3 w-3 mr-1" />
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
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                                            {user.first_name[0]}{user.last_name[0]}
                                        </div>
                                        <div>
                                            {user.first_name} {user.last_name}
                                            {user.deleted_at && (
                                                <Badge className="ml-2 bg-red-100 text-red-800">
                                                    Supprimé
                                                </Badge>
                                            )}
                                        </div>
                                    </CardTitle>
                                    <CardDescription className="mt-2">
                                        <Badge className={`${roleColors[user.role] || 'bg-gray-100 text-gray-800'} flex items-center`}>
                                            {roleIcons[user.role]}
                                            {user.role === 'super_admin' ? 'Super Administrateur' : 
                                             user.role === 'admin' ? 'Administrateur' : 
                                             user.role === 'jury' ? 'Jury' : 'Utilisateur'}
                                        </Badge>
                                    </CardDescription>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={route('admin.users.edit', user.id)}>
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <PencilIcon className="h-4 w-4" />
                                            Modifier
                                        </Button>
                                    </Link>
                                    
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center gap-2">
                                                <MoreHorizontalIcon className="h-4 w-4" />
                                                Actions
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {user.deleted_at ? (
                                                <>
                                                    <DropdownMenuItem asChild>
                                                        <Link 
                                                            href={route('admin.users.restore', user.id)} 
                                                            method="post" 
                                                            as="button"
                                                            className="w-full text-left flex items-center"
                                                        >
                                                            <RotateCcwIcon className="h-4 w-4 mr-2" />
                                                            Restaurer
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link 
                                                            href={route('admin.users.force-delete', user.id)} 
                                                            method="delete" 
                                                            as="button"
                                                            className="text-red-500 w-full text-left flex items-center"
                                                            data-confirm="Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ? Cette action est irréversible."
                                                        >
                                                            <TrashIcon className="h-4 w-4 mr-2" />
                                                            Supprimer définitivement
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </>
                                            ) : (
                                                <DropdownMenuItem asChild>
                                                    <Link 
                                                        href={route('admin.users.destroy', user.id)} 
                                                        method="delete" 
                                                        as="button"
                                                        className="text-red-500 w-full text-left flex items-center"
                                                        data-confirm="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action peut être annulée."
                                                    >
                                                        <TrashIcon className="h-4 w-4 mr-2" />
                                                        Supprimer
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
                                                user.gender === 'Homme' ? 'Homme' : 
                                                user.gender === 'Femme' ? 'Femme' : 
                                                user.gender || 'Non spécifié'
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
                                        {user.deleted_at && (
                                            <div>
                                                <span className="font-semibold">Supprimé le:</span> {formatDate(user.deleted_at)}
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
