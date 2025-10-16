import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  SearchIcon,
  RotateCcwIcon,
  TrashIcon,
  MoreHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArchiveIcon,
  ShieldIcon,
  UserIcon,
  BadgeIcon,
  ShieldCheckIcon,
  EyeIcon
} from 'lucide-react';
import { User } from '@/types';

interface TrashedUsersPageProps {
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

export default function TrashedUsers({ users }: TrashedUsersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const filteredUsers = users.data.filter(user => {
    const matchesSearch = 
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery));
      
    return matchesSearch;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non spécifié';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppLayout>
      <Head title="Utilisateurs supprimés" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-red-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <ArchiveIcon className="h-6 w-6 mr-2 text-red-500" />
                    Utilisateurs supprimés
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    {users.total} utilisateur{users.total > 1 ? 's' : ''} supprimé{users.total > 1 ? 's' : ''}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Link href={route('admin.users.index')}>
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Retour aux utilisateurs
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
                    placeholder="Rechercher un utilisateur supprimé..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-slate-700 font-semibold">Utilisateur</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Contact</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Rôle</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Supprimé le</TableHead>
                      <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
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
                              <div className="text-sm">
                                {user.email}
                              </div>
                              <div className="text-sm text-slate-500">
                                {user.phone || 'Pas de téléphone'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${roleColors[user.role] || 'bg-gray-100 text-gray-800'} flex items-center`}>
                              {roleIcons[user.role]}
                              {user.role === 'super_admin' ? 'Super Admin' : 
                               user.role === 'admin' ? 'Administrateur' : 
                               user.role === 'jury' ? 'Jury' : 'Utilisateur'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(user.deleted_at)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Link href={route('admin.users.show', user.id)}>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <EyeIcon className="h-4 w-4" />
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
                                  <DropdownMenuSeparator />
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
                            <ArchiveIcon className="h-10 w-10 mb-2" />
                            <h3 className="text-lg font-medium">Aucun utilisateur supprimé trouvé</h3>
                            <p className="max-w-sm mt-1">
                              Aucun utilisateur supprimé ne correspond à vos critères de recherche.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {users.last_page > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    Affichage de {(users.current_page - 1) * users.per_page + 1} à {Math.min(users.current_page * users.per_page, users.total)} sur {users.total} utilisateurs supprimés
                  </div>
                  <div className="flex space-x-1">
                    <Link href={users.links[0].url || '#'} disabled={!users.links[0].url}>
                      <Button variant="outline" size="sm" disabled={!users.links[0].url}>
                        <ArrowLeftIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                    
                    {users.links.slice(1, -1).map((link, i) => (
                      <Link key={i} href={link.url || '#'} disabled={!link.url}>
                        <Button 
                          variant={link.active ? "default" : "outline"} 
                          size="sm"
                          disabled={!link.url}
                        >
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                    
                    <Link href={users.links[users.links.length - 1].url || '#'} disabled={!users.links[users.links.length - 1].url}>
                      <Button variant="outline" size="sm" disabled={!users.links[users.links.length - 1].url}>
                        <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
