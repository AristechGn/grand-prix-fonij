import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  PlusIcon, 
  ArrowLeftIcon,
  SaveIcon,
  ArrowLeftCircleIcon,
  CalendarIcon,
  InfoIcon
} from 'lucide-react';
import InputError from '@/components/input-error';
import { CreatePhaseProps } from '@/types';

interface PhaseFormData {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: 'pending' | 'active' | 'completed';
  order: number;
  color: string;
  icon: string;
  activities: string[];
  objective: string;
  [key: string]: string | number | string[] | boolean;
}

export default function CreatePhase({ edition }: CreatePhaseProps) {
  const { data, setData, post, processing, errors, reset } = useForm<PhaseFormData>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    status: 'pending',
    order: 1,
    color: 'emerald',
    icon: 'calendar',
    activities: [],
    objective: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.currentTarget as HTMLFormElement;
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).setAttribute('disabled', 'true');
    }
    
    post(route('admin.editions.phases.store', edition.id), {
      onSuccess: () => reset(),
      onFinish: () => {
        for (let i = 0; i < elements.length; i++) {
          (elements[i] as HTMLElement).removeAttribute('disabled');
        }
      }
    });
  };

  return (
    <AppLayout>
      <Head title={`Nouvelle phase - ${edition.name}`} />

      <div className="py-8">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex items-center space-x-2">
                <div className="mr-2 flex">
                  <a href={route('admin.editions.phases.index', edition.id)}>
                    <ArrowLeftCircleIcon className="h-5 w-5 text-slate-500" />
                  </a>
                </div>
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <PlusIcon className="h-6 w-6 mr-2 text-slate-500" />
                    Nouvelle phase pour {edition.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Créez une nouvelle phase dans le déroulement de cette édition
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <InfoIcon size={16} className="text-slate-500" />
                      Nom de la phase
                    </Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Ex: Bootcamp d'accélération"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <InputError message={errors.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="order" className="flex items-center gap-2">
                      <InfoIcon size={16} className="text-slate-500" />
                      Ordre dans le déroulement
                    </Label>
                    <Input
                      id="order"
                      type="number"
                      value={data.order}
                      onChange={(e) => setData('order', parseInt(e.target.value))}
                      min={1}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <InputError message={errors.order} />
                    <p className="text-xs text-gray-500">L'ordre détermine la position de la phase dans le déroulement.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <InfoIcon size={16} className="text-slate-500" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Décrivez cette phase en détail..."
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <InputError message={errors.description} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start_date" className="flex items-center gap-2">
                      <CalendarIcon size={16} className="text-slate-500" />
                      Date de début
                    </Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={data.start_date}
                      onChange={(e) => setData('start_date', e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <InputError message={errors.start_date} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end_date" className="flex items-center gap-2">
                      <CalendarIcon size={16} className="text-slate-500" />
                      Date de fin
                    </Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={data.end_date}
                      onChange={(e) => setData('end_date', e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <InputError message={errors.end_date} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <InfoIcon size={16} className="text-slate-500" />
                      Lieu
                    </Label>
                    <Input
                      id="location"
                      value={data.location}
                      onChange={(e) => setData('location', e.target.value)}
                      placeholder="Ex: Palais du Peuple, Conakry"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                    <InputError message={errors.location} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="flex items-center gap-2">
                      <InfoIcon size={16} className="text-slate-500" />
                      Statut
                    </Label>
                    <Select 
                      value={data.status} 
                      onValueChange={(value) => setData('status', value as 'pending' | 'active' | 'completed')}
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">À venir</SelectItem>
                        <SelectItem value="active">En cours</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="color" className="flex items-center gap-2">
                      <InfoIcon size={16} className="text-slate-500" />
                      Couleur
                    </Label>
                    <Select 
                      value={data.color} 
                      onValueChange={(value) => setData('color', value)}
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionner une couleur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emerald">Émeraude</SelectItem>
                        <SelectItem value="blue">Bleu</SelectItem>
                        <SelectItem value="indigo">Indigo</SelectItem>
                        <SelectItem value="violet">Violet</SelectItem>
                        <SelectItem value="pink">Rose</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.color} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon" className="flex items-center gap-2">
                    <InfoIcon size={16} className="text-slate-500" />
                    Icône
                  </Label>
                  <Select 
                    value={data.icon} 
                    onValueChange={(value) => setData('icon', value)}
                  >
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Sélectionner une icône" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calendar">Calendrier</SelectItem>
                      <SelectItem value="search">Recherche</SelectItem>
                      <SelectItem value="book">Livre</SelectItem>
                      <SelectItem value="presentation">Présentation</SelectItem>
                      <SelectItem value="trophy">Trophée</SelectItem>
                      <SelectItem value="users">Utilisateurs</SelectItem>
                      <SelectItem value="flag">Drapeau</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.icon} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objective" className="flex items-center gap-2">
                    <InfoIcon size={16} className="text-slate-500" />
                    Objectif
                  </Label>
                  <Textarea
                    id="objective"
                    value={data.objective}
                    onChange={(e) => setData('objective', e.target.value)}
                    placeholder="Objectif principal de cette phase..."
                    rows={3}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <InputError message={errors.objective} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities" className="flex items-center gap-2">
                    <InfoIcon size={16} className="text-slate-500" />
                    Activités
                  </Label>
                  <Textarea
                    id="activities"
                    value={Array.isArray(data.activities) ? data.activities.join('\n') : ''}
                    onChange={(e) => setData('activities', e.target.value.split('\n').filter(line => line.trim()))}
                    placeholder="Une activité par ligne..."
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">Entrez une activité par ligne</p>
                  <InputError message={errors.activities} />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between space-x-4 border-t py-4 bg-slate-50">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Retour aux phases
                </Button>
                <Button 
                  type="submit" 
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <SaveIcon size={16} />
                  {processing ? 'Création en cours...' : 'Créer la phase'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 