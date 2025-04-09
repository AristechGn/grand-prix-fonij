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
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
} from '@/components/ui/card';
import { 
  DownloadIcon,
  CalendarIcon, 
  UsersIcon, 
  SearchIcon,
  PencilIcon,
  TrashIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TimerIcon,
  EyeIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { EditionsPageProps } from '@/types';

export default function Editions({ editions }: EditionsPageProps) {
  // état pour la recherche
  const [search, setSearch] = useState('');
  
  // filtrer les éditions selon la recherche
  const filteredEditions = editions.data.filter(edition => 
    edition.name.toLowerCase().includes(search.toLowerCase()) ||
    edition.description?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    published: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    active: 'bg-green-100 text-green-800 hover:bg-green-200',
    completed: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    archived: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
  };
  
  const statusLabels: Record<string, string> = {
    draft: 'Brouillon',
    published: 'Publié',
    active: 'Actif',
    completed: 'Terminé',
    archived: 'Archivé'
  };

  // Fonction pour formater les dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <AppLayout>
      <Head title="Gestion des éditions" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-2 text-green-500" />
                    Gestion des éditions
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    {editions.total} édition{editions.total > 1 ? 's' : ''} au total
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
                  
                  <Link href={route('admin.editions.create')}>
                    <Button className="flex items-center bg-green-600 hover:bg-green-700">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Nouvelle édition
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
                    placeholder="Rechercher une édition..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-slate-700 font-semibold">Édition</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Période</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Inscriptions</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
                      <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEditions.length > 0 ? (
                      filteredEditions.map((edition) => (
                        <TableRow key={edition.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                                {edition.year.toString().slice(-2)}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {edition.name}
                                  {edition.is_current && (
                                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Courante</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-slate-500">
                                  Année: {edition.year}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <CalendarIcon className="h-3 w-3 mr-2 text-slate-400" />
                                Du {formatDate(edition.start_date)}
                              </div>
                              <div className="flex items-center text-sm text-slate-500">
                                <CalendarIcon className="h-3 w-3 mr-2 text-slate-400" />
                                Au {formatDate(edition.end_date)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <TimerIcon className="h-3 w-3 mr-2 text-slate-400" />
                                Fin: {formatDate(edition.registration_deadline)}
                              </div>
                              <div className="flex items-center text-sm text-slate-500">
                                <UsersIcon className="h-3 w-3 mr-2 text-slate-400" />
                                Max: {edition.max_participants} participants
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[edition.status] || 'bg-gray-100 text-gray-800'}`}>
                              {statusLabels[edition.status] || edition.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Link href={route('admin.editions.show', edition.id)}>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={route('admin.editions.edit', edition.id)}>
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
                                  <DropdownMenuItem>
                                    Définir comme courante
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Dupliquer
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Link 
                                      href={route('admin.editions.destroy', edition.id)} 
                                      method="delete" 
                                      as="button"
                                      className="w-full text-left flex items-center"
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
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          {search ? 'Aucune édition ne correspond à votre recherche' : 'Aucune édition trouvée'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {editions.last_page > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    Affichage de {(editions.current_page - 1) * editions.per_page + 1} à {Math.min(editions.current_page * editions.per_page, editions.total)} sur {editions.total} éditions
                  </div>
                  <div className="flex space-x-1">
                    <Link href={editions.links[0].url || '#'} disabled={!editions.links[0].url}>
                      <Button variant="outline" size="sm" disabled={!editions.links[0].url}>
                        <ArrowLeftIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                    
                    {editions.links.slice(1, -1).map((link, i) => (
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
                    
                    <Link href={editions.links[editions.links.length - 1].url || '#'} disabled={!editions.links[editions.links.length - 1].url}>
                      <Button variant="outline" size="sm" disabled={!editions.links[editions.links.length - 1].url}>
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