import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    PlusIcon, 
    TrashIcon, 
    PencilIcon, 
    SearchIcon, 
    UserIcon,
    EyeIcon,
    MoreHorizontalIcon,
    FilterIcon,
    UsersIcon,
    DownloadIcon,
    ShieldCheckIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ShieldIcon,
    BadgeIcon,
    BellIcon,
    ArchiveIcon
} from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';

interface UsersPageProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function Users({ users }: UsersPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    
    const roleColors: Record<string, string> = {
        super_admin: 'bg-green-800 text-green-200 hover:bg-green-700',
        admin: 'bg-green-100 text-green-800 hover:bg-green-200',
        jury: 'bg-green-100 text-green-800 hover:bg-green-200',
        user: 'bg-slate-100 text-slate-800 hover:bg-slate-200'
    };
    
    const roleIcons: Record<string, React.ReactElement> = {
        admin: <ShieldIcon className="h-3 w-3 mr-1" />,
        super_admin: <ShieldCheckIcon className="h-3 w-3 mr-1" />,
        jury: <BadgeIcon className="h-3 w-3 mr-1" />,
        user: <UserIcon className="h-3 w-3 mr-1" />
    };

    const filteredUsers = users.data.filter(user => {
        const matchesSearch = 
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.phone && user.phone.includes(searchQuery));
            
        const matchesFilter = selectedFilter === 'all' || user.role === selectedFilter;
        
        return matchesSearch && matchesFilter;
    });
    
    const getStatusIndicator = (userId: number) => {
        // Simuler une activité en ligne basée sur l'ID utilisateur
        return userId % 3 === 0 ? (
            <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                En ligne
            </span>
        ) : (
            <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-gray-300 mr-2"></span>
                Hors ligne
            </span>
        );
    };

    return (
        <AppLayout>
            <Head title="Gestion des utilisateurs" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="shadow-lg border-t-4 border-t-green-500">
                        <CardHeader className="bg-slate-50 border-b">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl flex items-center">
                                        <UsersIcon className="h-6 w-6 mr-2 text-green-500" />
                                        Gestion des utilisateurs
                                    </CardTitle>
                                    <CardDescription className="text-slate-500">
                                        {users.total} utilisateurs enregistrés au total
                                    </CardDescription>
                                </div>
                                <div className="flex space-x-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center">
                                                <DownloadIcon className="h-4 w-4 mr-2" />
                                                Exporter
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Export CSV
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Export Excel
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Export PDF
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    
                                    <Link href={route('admin.users.trashed')}>
                                        <Button variant="outline" className="flex items-center">
                                            <ArchiveIcon className="h-4 w-4 mr-2" />
                                            Utilisateurs supprimés
                                        </Button>
                                    </Link>
                                    
                                    <Link href={route('admin.users.create')}>
                                        <Button className="flex items-center bg-green-600 hover:bg-green-700">
                                            <PlusIcon className="h-4 w-4 mr-2" />
                                            Nouvel utilisateur
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                                <div className="relative flex-1 min-w-[250px]">
                                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Rechercher un utilisateur..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button 
                                        variant={selectedFilter === 'all' ? 'default' : 'outline'}
                                        onClick={() => setSelectedFilter('all')}
                                        className="flex items-center"
                                    >
                                        <FilterIcon className="h-4 w-4 mr-2" />
                                        Tous
                                    </Button>
                                    <Button 
                                        variant={selectedFilter === 'admin' ? 'default' : 'outline'}
                                        onClick={() => setSelectedFilter('admin')}
                                        className="flex items-center"
                                    >
                                        <ShieldIcon className="h-4 w-4 mr-2" />
                                        Administrateurs
                                    </Button>
                                    <Button 
                                        variant={selectedFilter === 'jury' ? 'default' : 'outline'}
                                        onClick={() => setSelectedFilter('jury')}
                                        className="flex items-center"
                                    >
                                        <BadgeIcon className="h-4 w-4 mr-2" />
                                        Jury
                                    </Button>
                                    <Button 
                                        variant={selectedFilter === 'user' ? 'default' : 'outline'}
                                        onClick={() => setSelectedFilter('user')}
                                        className="flex items-center"
                                    >
                                        <UserIcon className="h-4 w-4 mr-2" />
                                        Utilisateurs
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-lg border overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="text-slate-700 font-semibold">Utilisateur</TableHead>
                                            <TableHead className="text-slate-700 font-semibold">Contact</TableHead>
                                            <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
                                            <TableHead className="text-slate-700 font-semibold">Rôle</TableHead>
                                            <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user) => (
                                                <TableRow key={user.id} className="hover:bg-slate-50">
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                                                                {user.first_name[0]}{user.last_name[0]}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold">
                                                                    {user.first_name} {user.last_name}
                                                                </div>
                                                                <div className="text-sm text-slate-500">
                                                                    ID: {user.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center text-sm">
                                                                <BellIcon className="h-3 w-3 mr-2 text-slate-400" />
                                                                {user.email}
                                                            </div>
                                                            <div className="flex items-center text-sm text-slate-500">
                                                                {user.phone || 'Pas de téléphone'}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusIndicator(user.id)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={`${roleColors[user.role] || 'bg-gray-100 text-gray-800'} flex items-center`}>
                                                            {roleIcons[user.role]}
                                                            {user.role === 'super_admin' ? 'Super Admin' : 
                                                            user.role === 'admin' ? 'Administrateur' : 
                                                             user.role === 'jury' ? 'Jury' : 'Utilisateur'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link href={route('admin.users.show', user.id)}>
                                                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                                    <EyeIcon className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            
                                                            <Link href={route('admin.users.edit', user.id)}>
                                                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                                        <MoreHorizontalIcon className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={route('admin.users.show', user.id)}>
                                                                            <EyeIcon className="h-4 w-4 mr-2" />
                                                                            Voir le profil
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={route('admin.users.edit', user.id)}>
                                                                            <PencilIcon className="h-4 w-4 mr-2" />
                                                                            Modifier
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem asChild>
                                                                        <Link 
                                                                            href={route('admin.users.destroy', user.id)} 
                                                                            method="delete" 
                                                                            as="button"
                                                                            className="text-red-500 w-full text-left"
                                                                            data-confirm="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action peut être annulée."
                                                                        >
                                                                            <TrashIcon className="h-4 w-4 mr-2" />
                                                                            Supprimer
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8">
                                                    <div className="flex flex-col items-center justify-center text-slate-500">
                                                        <SearchIcon className="h-10 w-10 mb-2" />
                                                        <h3 className="text-lg font-medium">Aucun utilisateur trouvé</h3>
                                                        <p className="max-w-sm mt-1">
                                                            Aucun utilisateur ne correspond à vos critères de recherche. Essayez de modifier votre recherche.
                                                        </p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm text-slate-500">
                                    Affichage de {filteredUsers.length} sur {users.total} utilisateurs
                                </div>
                                
                                {users.links && users.links.length > 3 && (
                                    <div className="flex justify-center sm:justify-end space-x-1">
                                        <Button
                                            variant="outline"
                                            onClick={() => window.location.href = users.links[0].url || ''}
                                            disabled={!users.links[0].url}
                                            className="flex items-center"
                                            size="sm"
                                        >
                                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                                            Première
                                        </Button>
                                        
                                        {users.links.slice(1, -1).map((link, i) => {
                                            // Afficher seulement un nombre limité de pages
                                            const currentPage = users.current_page;
                                            const pageNumber = parseInt(link.label);
                                            
                                            if (isNaN(pageNumber)) return null; // Ignorer les liens qui ne sont pas des numéros
                                            
                                            // Afficher seulement les pages proches de la page actuelle
                                            if (
                                                pageNumber === 1 || 
                                                pageNumber === users.last_page ||
                                                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                                            ) {
                                                return (
                                                    <Button
                                                        key={i}
                                                        variant={link.active ? "default" : "outline"}
                                                        onClick={() => window.location.href = link.url || ''}
                                                        disabled={!link.url}
                                                        size="sm"
                                                        className={`${link.active ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                                    >
                                                        {link.label.replace(/&laquo;|&raquo;/g, '')}
                                                    </Button>
                                                );
                                            }
                                            
                                            // Afficher des points de suspension pour les pages non affichées
                                            if (
                                                (pageNumber === currentPage - 3 && currentPage > 4) ||
                                                (pageNumber === currentPage + 3 && currentPage < users.last_page - 3)
                                            ) {
                                                return (
                                                    <Button
                                                        key={i}
                                                        variant="outline"
                                                        disabled
                                                        size="sm"
                                                    >
                                                        ...
                                                    </Button>
                                                );
                                            }
                                            
                                            return null;
                                        })}
                                        
                                        <Button
                                            variant="outline"
                                            onClick={() => window.location.href = users.links[users.links.length - 1].url || ''}
                                            disabled={!users.links[users.links.length - 1].url}
                                            className="flex items-center"
                                            size="sm"
                                        >
                                            Dernière
                                            <ArrowRightIcon className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}