import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  SearchIcon, 
  EyeIcon,
  MoreHorizontalIcon,
  ArrowLeftIcon,
  CalendarIcon,
  CalendarDaysIcon,
  ArrowLeftCircleIcon
} from 'lucide-react';

// Définition des types
interface Phase {
  id: number;
  edition_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  order: number;
  status: string;
  location: string;
}

interface Edition {
  id: number;
  name: string;
  year: number;
}

interface PhasesIndexProps {
  edition: Edition;
  phases: Phase[]; // Tableau directement, pas d'objet imbriqué
}

export default function PhasesIndex({ edition, phases }: PhasesIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const statusColors: Record<string, string> = {
    'upcoming': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'active': 'bg-green-100 text-green-800 hover:bg-green-200',
    'completed': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    'cancelled': 'bg-red-100 text-red-800 hover:bg-red-200'
  };
  
  const statusLabels: Record<string, string> = {
    'upcoming': 'À venir',
    'active': 'En cours',
    'completed': 'Terminée',
    'cancelled': 'Annulée'
  };

  const filteredPhases = Array.isArray(phases) ? phases.filter(phase => 
    phase.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    phase.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  console.log('phases', phases);
  console.log('filteredPhases', filteredPhases);
  
  
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
      <Head title={`Phases de l'édition ${edition.name}`} />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <Link href={route('admin.editions.show', edition.id)}>
                      <Button variant="ghost" className="p-0 hover:bg-transparent">
                        <ArrowLeftCircleIcon className="h-5 w-5 text-slate-500 mr-2" />
                      </Button>
                    </Link>
                    <div>
                      <CardTitle className="text-2xl flex items-center">
                        <CalendarDaysIcon className="h-6 w-6 mr-2 text-blue-500" />
                        Phases de l'édition {edition.name}
                      </CardTitle>
                      <CardDescription className="text-slate-500">
                        {phases.length} phase{phases.length > 1 ? 's' : ''} au total
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link href={route('admin.editions.phases.create', edition.id)}>
                    <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Nouvelle phase
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 flex items-center">
                <div className="relative flex-1 max-w-sm">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher une phase..."
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
                      <TableHead className="text-slate-700 font-semibold">Ordre</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Phase</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Période</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Lieu</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
                      <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPhases.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          {searchQuery 
                            ? 'Aucune phase ne correspond à votre recherche' 
                            : 'Aucune phase n\'a été ajoutée à cette édition'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPhases.map((phase) => (
                        <TableRow key={phase.id} className="hover:bg-slate-50">
                          <TableCell className="font-bold text-center">
                            {phase.order}
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="space-y-1">
                              <div className="font-semibold">
                                {phase.name}
                              </div>
                              <div className="text-sm text-slate-500 line-clamp-1">
                                {phase.description || 'Aucune description'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <CalendarIcon className="h-3 w-3 mr-2 text-slate-400" />
                                Du {formatDate(phase.start_date)}
                              </div>
                              <div className="flex items-center text-sm text-slate-500">
                                <CalendarIcon className="h-3 w-3 mr-2 text-slate-400" />
                                Au {formatDate(phase.end_date)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {phase.location || 'Non spécifié'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[phase.status] || 'bg-gray-100 text-gray-800'}`}>
                              {statusLabels[phase.status] || phase.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Link href={route('admin.phases.show', phase.id)}>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={route('admin.phases.edit', phase.id)}>
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
                                    Monter dans l'ordre
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Descendre dans l'ordre
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Link 
                                      href={route('admin.phases.destroy', phase.id)} 
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
                    )}
                  </TableBody>
                </Table>
              </div>

              {phases.length > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    Affichage de {1} à {phases.length} sur {phases.length} phases
                  </div>
                  <div className="flex space-x-1">
                    <Link href={route('admin.editions.show', edition.id)}>
                      <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Retour à l'édition
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-slate-50 border-t p-4">
              <Link href={route('admin.editions.show', edition.id)}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeftIcon className="h-4 w-4" />
                  Retour à l'édition
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 