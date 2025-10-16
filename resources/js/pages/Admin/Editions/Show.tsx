import React, { useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  CheckIcon, 
  PencilIcon,
  TrashIcon,
  SettingsIcon,
  InfoIcon,
  StarIcon,
  FileTextIcon,
  RotateCcwIcon,
  MoreHorizontalIcon
} from 'lucide-react';
import { ShowEditionProps } from '@/types';

const ShowEdition = React.memo(function ShowEdition({ edition }: ShowEditionProps) {
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

  // Handlers optimisés avec useCallback
  const handleDelete = useCallback(() => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette édition ?')) {
      router.delete(route('admin.editions.destroy', edition.id), {
        onSuccess: () => {
          // Optionnel: afficher un message de succès
        },
        onError: (errors) => {
          console.error('Erreur lors de la suppression:', errors);
        }
      });
    }
  }, [edition.id]);

  const handleRestore = useCallback(() => {
    router.post(route('admin.editions.restore', edition.id), {}, {
      onSuccess: () => {
        // Optionnel: afficher un message de succès
      },
      onError: (errors) => {
        console.error('Erreur lors de la restauration:', errors);
      }
    });
  }, [edition.id]);

  const handleForceDelete = useCallback(() => {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette édition ? Cette action est irréversible.')) {
      router.delete(route('admin.editions.force-delete', edition.id), {
        onSuccess: () => {
          // Optionnel: afficher un message de succès
        },
        onError: (errors) => {
          console.error('Erreur lors de la suppression définitive:', errors);
        }
      });
    }
  }, [edition.id]);

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
      <Head title={`Édition ${edition.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <Card className="border-t-4 border-t-green-500 shadow-lg">
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      <CalendarIcon className="h-6 w-6 mr-2 text-green-500" />
                      {edition.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge className={statusColors[edition.status] || 'bg-gray-100'}>
                        {statusLabels[edition.status] || edition.status}
                      </Badge>
                      {edition.is_current && (
                        <Badge className="bg-green-100 text-green-800">
                          <StarIcon className="h-3 w-3 mr-1" />
                          Édition courante
                        </Badge>
                      )}
                      {edition.deleted_at && (
                        <Badge className="bg-red-100 text-red-800">
                          Supprimée
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={route('admin.editions.edit', edition.id)}>
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
                        {edition.deleted_at ? (
                          <>
                            <DropdownMenuItem onClick={handleRestore}>
                              <RotateCcwIcon className="h-4 w-4 mr-2" />
                              Restaurer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-500" 
                              onClick={handleForceDelete}
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Supprimer définitivement
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem 
                            className="text-red-500" 
                            onClick={handleDelete}
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <Tabs defaultValue="informations" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="informations" className="flex items-center gap-2">
                      <InfoIcon size={16} />
                      <span>Informations</span>
                    </TabsTrigger>
                    <TabsTrigger value="statistiques" className="flex items-center gap-2">
                      <UsersIcon size={16} />
                      <span>Statistiques</span>
                    </TabsTrigger>
                    <TabsTrigger value="parametres" className="flex items-center gap-2">
                      <SettingsIcon size={16} />
                      <span>Configuration</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="informations" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <InfoIcon className="h-5 w-5 mr-2 text-slate-500" />
                          Détails de l'édition
                        </h3>
                        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                          <div>
                            <span className="font-medium text-slate-700">Nom:</span> {edition.name}
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Année:</span> {edition.year}
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Description:</span>
                            <p className="mt-1 text-slate-600">
                              {edition.description || 'Aucune description fournie'}
                            </p>
                          </div>
                          {edition.deleted_at && (
                            <div>
                              <span className="font-medium text-slate-700">Supprimée le:</span>
                              <p className="mt-1 text-red-600">
                                {formatDate(edition.deleted_at)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <CalendarIcon className="h-5 w-5 mr-2 text-slate-500" />
                          Dates importantes
                        </h3>
                        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span className="font-medium text-slate-700 w-40">Date de début:</span> 
                            {formatDate(edition.start_date)}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-red-500" />
                            <span className="font-medium text-slate-700 w-40">Date de fin:</span> 
                            {formatDate(edition.end_date)}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium text-slate-700 w-40">Début des inscriptions:</span> 
                            {formatDate(edition.registration_start_date)}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="font-medium text-slate-700 w-40">Fin des inscriptions:</span> 
                            {formatDate(edition.registration_deadline)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 flex items-center justify-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                              <CalendarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">Phases</p>
                              <p className="text-2xl font-bold">{edition.phases_count || 0}</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4 flex items-center justify-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                              <StarIcon className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">Prix</p>
                              <p className="text-2xl font-bold">{edition.prizes_count || 0}</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4 flex items-center justify-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                              <UsersIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">Participants</p>
                              <p className="text-2xl font-bold">{edition.participants_count || 0}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="statistiques" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Statistiques de participation</CardTitle>
                        <CardDescription>Données de participation pour cette édition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="py-6 text-center text-slate-500">
                          Cette section affichera des graphiques et statistiques détaillées une fois l'implémentation complétée.
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="parametres" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Paramètres avancés</CardTitle>
                        <CardDescription>Configuration et paramètres de l'édition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Définir comme édition courante</p>
                              <p className="text-sm text-slate-500">Cette édition sera mise en avant sur le site</p>
                            </div>
                            <div>
                              {edition.is_current ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckIcon className="h-3 w-3 mr-1" />
                                  Activé
                                </Badge>
                              ) : (
                                <Button size="sm">Activer</Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Limite d'inscriptions</p>
                              <p className="text-sm text-slate-500">Nombre maximum de participants</p>
                            </div>
                            <div>
                              <span className="font-medium">{edition.max_participants}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Archiver l'édition</p>
                              <p className="text-sm text-slate-500">Marquer l'édition comme terminée et archivée</p>
                            </div>
                            <div>
                              <Button size="sm" variant="outline">Archiver</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="bg-slate-50 border-t py-4 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                >
                  Retour à la liste
                </Button>
                
                <div className="flex gap-2">
                  <Link href={route('admin.editions.phases.index', edition.id)}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Gérer les phases
                    </Button>
                  </Link>
                  <Link href={route('admin.editions.prizes.index', edition.id)}>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Gérer les prix
                    </Button>
                  </Link>
                  <Link href={route('admin.applications.by-edition.show', edition.id)}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      Voir les candidatures
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
});

export default ShowEdition; 