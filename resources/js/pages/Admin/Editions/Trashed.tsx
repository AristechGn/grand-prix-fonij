import React, { useState, useCallback, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
  CalendarIcon,
  EyeIcon,
  FileTextIcon
} from 'lucide-react';
import { EditionsPageProps } from '@/types';

const TrashedEditions = React.memo(function TrashedEditions({ editions }: EditionsPageProps) {
  const [search, setSearch] = useState('');
  
  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    archived: 'bg-amber-100 text-amber-800'
  };
  
  const statusLabels: Record<string, string> = {
    draft: 'Brouillon',
    published: 'Publié',
    active: 'Actif',
    completed: 'Terminé',
    archived: 'Archivé'
  };

  // filtrer les éditions selon la recherche (optimisé avec useMemo)
  const filteredEditions = useMemo(() => {
    if (!search.trim()) return editions.data;
    
    const searchLower = search.toLowerCase();
    return editions.data.filter(edition => 
      edition.name.toLowerCase().includes(searchLower) ||
      edition.description?.toLowerCase().includes(searchLower)
    );
  }, [editions.data, search]);

  // Handlers optimisés avec useCallback
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleRestore = useCallback((editionId: number) => {
    router.post(route('admin.editions.restore', editionId), {}, {
      onSuccess: () => {
        // Optionnel: afficher un message de succès
      },
      onError: (errors) => {
        console.error('Erreur lors de la restauration:', errors);
      }
    });
  }, []);

  const handleForceDelete = useCallback((editionId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette édition ? Cette action est irréversible.')) {
      router.delete(route('admin.editions.force-delete', editionId), {
        onSuccess: () => {
          // Optionnel: afficher un message de succès
        },
        onError: (errors) => {
          console.error('Erreur lors de la suppression définitive:', errors);
        }
      });
    }
  }, []);

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
      <Head title="Éditions supprimées" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-red-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <ArchiveIcon className="h-6 w-6 mr-2 text-red-500" />
                    Éditions supprimées
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    {editions.total} édition{editions.total > 1 ? 's' : ''} supprimée{editions.total > 1 ? 's' : ''}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Link href={route('admin.editions.index')}>
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Retour aux éditions
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
                    placeholder="Rechercher une édition supprimée..."
                    className="pl-10"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-slate-700 font-semibold">Édition</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Période</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Candidatures</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Supprimée le</TableHead>
                      <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEditions.length > 0 ? (
                      filteredEditions.map((edition) => (
                        <TableRow key={edition.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
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
                            <div className="flex items-center text-sm">
                              <FileTextIcon className="h-4 w-4 mr-2 text-blue-500" />
                              <span className="font-medium">{edition.applications_count || 0}</span>
                              <span className="text-slate-500 ml-1">candidature{(edition.applications_count || 0) > 1 ? 's' : ''}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[edition.status] || 'bg-gray-100 text-gray-800'}`}>
                              {statusLabels[edition.status] || edition.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(edition.deleted_at)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Link href={route('admin.editions.show', edition.id)}>
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
                                    <Link href={route('admin.editions.show', edition.id)}>
                                      <EyeIcon className="h-4 w-4 mr-2" />
                                      Voir les détails
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleRestore(edition.id)}>
                                    <RotateCcwIcon className="h-4 w-4 mr-2" />
                                    Restaurer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-500" 
                                    onClick={() => handleForceDelete(edition.id)}
                                  >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Supprimer définitivement
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <ArchiveIcon className="h-10 w-10 mb-2" />
                            <h3 className="text-lg font-medium">Aucune édition supprimée trouvée</h3>
                            <p className="max-w-sm mt-1">
                              Aucune édition supprimée ne correspond à vos critères de recherche.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {editions.last_page > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    Affichage de {(editions.current_page - 1) * editions.per_page + 1} à {Math.min(editions.current_page * editions.per_page, editions.total)} sur {editions.total} éditions supprimées
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
});

export default TrashedEditions;
