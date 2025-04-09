import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  CalendarIcon, 
  MapPinIcon, 
  InfoIcon, 
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftCircleIcon,
  ClockIcon,
  ListOrderedIcon
} from 'lucide-react';

interface Edition {
  id: number;
  name: string;
  year: number;
}

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
  created_at: string;
  updated_at: string;
}

interface ShowPhaseProps {
  edition: Edition;
  phase: Phase;
  prevPhase?: Phase;
  nextPhase?: Phase;
}

export default function ShowPhase({ edition, phase, prevPhase, nextPhase }: ShowPhaseProps) {
  const statusColors: Record<string, string> = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-purple-100 text-purple-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  const statusLabels: Record<string, string> = {
    'upcoming': 'À venir',
    'active': 'En cours',
    'completed': 'Terminée',
    'cancelled': 'Annulée'
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <AppLayout>
      <Head title={`Phase ${phase.name} - ${edition.name}`} />

      <div className="py-8">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex items-center space-x-2">
                <div className="mr-2 flex">
                  <Link href={route('admin.editions.phases.index', edition.id)}>
                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                      <ArrowLeftCircleIcon className="h-5 w-5 text-slate-500" />
                    </Button>
                  </Link>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl flex items-center">
                    <InfoIcon className="h-6 w-6 mr-2 text-blue-500" />
                    Phase : {phase.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <ListOrderedIcon className="h-4 w-4 text-slate-500" />
                    <span>Étape {phase.order} de l'édition {edition.name}</span>
                    <Badge className={statusColors[phase.status] || 'bg-gray-100 text-gray-800'}>
                      {statusLabels[phase.status] || phase.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Link href={route('admin.editions.phases.edit', [edition.id, phase.id])}>
                    <Button variant="outline" className="flex items-center gap-2">
                      <PencilIcon className="h-4 w-4" />
                      Modifier
                    </Button>
                  </Link>
                  <Link 
                    href={route('admin.editions.phases.destroy', [edition.id, phase.id])} 
                    method="delete" 
                    as="button"
                  >
                    <Button variant="destructive" className="flex items-center gap-2">
                      <TrashIcon className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <InfoIcon className="h-5 w-5 mr-2 text-slate-500" />
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 whitespace-pre-line">
                      {phase.description || 'Aucune description fournie pour cette phase.'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <InfoIcon className="h-5 w-5 mr-2 text-slate-500" />
                      Informations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <ListOrderedIcon className="h-5 w-5 mr-2 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-500">Ordre</p>
                        <p className="font-semibold">{phase.order}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-500">Lieu</p>
                        <p className="font-semibold">{phase.location || 'Non spécifié'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-500">Durée</p>
                        <p className="font-semibold">
                          {calculateDuration(phase.start_date, phase.end_date)} jours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-slate-500" />
                    Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CalendarIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Date de début</p>
                        <p className="font-semibold">{formatDate(phase.start_date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <CalendarIcon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Date de fin</p>
                        <p className="font-semibold">{formatDate(phase.end_date)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {(prevPhase || nextPhase) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <ListOrderedIcon className="h-5 w-5 mr-2 text-slate-500" />
                      Phases connexes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {prevPhase && (
                        <Link href={route('admin.editions.phases.show', [edition.id, prevPhase.id])}>
                          <Card className="hover:bg-slate-50 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-center">
                                <ArrowLeftIcon className="h-5 w-5 mr-3 text-slate-500" />
                                <div>
                                  <p className="text-sm text-slate-500">Phase précédente ({prevPhase.order})</p>
                                  <p className="font-semibold">{prevPhase.name}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )}
                      
                      {nextPhase && (
                        <Link href={route('admin.editions.phases.show', [edition.id, nextPhase.id])}>
                          <Card className="hover:bg-slate-50 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-slate-500">Phase suivante ({nextPhase.order})</p>
                                  <p className="font-semibold">{nextPhase.name}</p>
                                </div>
                                <ArrowLeftIcon className="h-5 w-5 ml-3 text-slate-500 rotate-180" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>

            <CardFooter className="flex justify-between space-x-4 border-t py-4 bg-slate-50">
              <Link href={route('admin.editions.phases.index', edition.id)}>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Retour à la liste des phases
                </Button>
              </Link>
              <Link href={route('admin.editions.phases.edit', [edition.id, phase.id])}>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Modifier
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 