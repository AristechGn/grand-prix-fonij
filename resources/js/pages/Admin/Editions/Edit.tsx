import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarIcon, 
  TimerIcon, 
  UsersIcon, 
  InfoIcon, 
  SettingsIcon, 
  ChevronLeft, 
  SaveIcon, 
  PencilIcon
} from 'lucide-react';
import InputError from '@/components/input-error';
import { EditEditionProps } from '@/types';

export default function EditEdition({ edition }: EditEditionProps) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: edition.name || '',
    year: edition.year || new Date().getFullYear(),
    start_date: edition.start_date || '',
    end_date: edition.end_date || '',
    registration_deadline: edition.registration_deadline || '',
    max_participants: edition.max_participants || 0,
    description: edition.description || '',
    status: edition.status as 'draft' | 'published' | 'active' || 'draft',
    is_current: edition.is_current || false,
  });

  const [activeTab, setActiveTab] = useState("basic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('admin.editions.update', edition.id), {
      onSuccess: () => reset()
    });
  };

  return (
    <AppLayout>
      <Head title={`Modifier l'édition ${edition.name}`} />

      <div className="py-12">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex items-center space-x-2">
                <PencilIcon className="h-5 w-5 text-slate-500" />
                <div>
                  <CardTitle className="text-2xl">Modifier l'édition</CardTitle>
                  <CardDescription className="text-slate-500">
                    Modifier les détails de l'édition {edition.name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="basic" className="flex items-center gap-2">
                      <InfoIcon size={16} />
                      <span>Informations de base</span>
                    </TabsTrigger>
                    <TabsTrigger value="dates" className="flex items-center gap-2">
                      <CalendarIcon size={16} />
                      <span>Dates & Participants</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <SettingsIcon size={16} />
                      <span>Configuration</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <InfoIcon size={16} className="text-slate-500" />
                          Nom de l'édition
                        </Label>
                        <Input
                          id="name"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          placeholder="Ex: Grand Prix FONIJ 2025"
                          className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <InputError message={errors.name} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year" className="flex items-center gap-2">
                          <CalendarIcon size={16} className="text-slate-500" />
                          Année
                        </Label>
                        <Input
                          id="year"
                          type="number"
                          value={data.year}
                          onChange={(e) => setData('year', parseInt(e.target.value))}
                          min={2000}
                          max={2100}
                          className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                        />
                        <InputError message={errors.year} />
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
                        placeholder="Description de cette édition..."
                        rows={4}
                        className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                      />
                      <InputError message={errors.description} />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        type="button" 
                        onClick={() => setActiveTab('dates')}
                        className="flex items-center gap-2"
                      >
                        Continuer
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="dates" className="space-y-6">
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
                          className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
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
                          className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                        />
                        <InputError message={errors.end_date} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="registration_deadline" className="flex items-center gap-2">
                          <TimerIcon size={16} className="text-slate-500" />
                          Date limite d'inscription
                        </Label>
                        <Input
                          id="registration_deadline"
                          type="date"
                          value={data.registration_deadline}
                          onChange={(e) => setData('registration_deadline', e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                        />
                        <InputError message={errors.registration_deadline} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max_participants" className="flex items-center gap-2">
                          <UsersIcon size={16} className="text-slate-500" />
                          Nombre maximum de participants
                        </Label>
                        <Input
                          id="max_participants"
                          type="number"
                          value={data.max_participants}
                          onChange={(e) => setData('max_participants', parseInt(e.target.value))}
                          min={0}
                          className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                        />
                        <InputError message={errors.max_participants} />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setActiveTab('basic')}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Retour
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setActiveTab('settings')}
                        className="flex items-center gap-2"
                      >
                        Continuer
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="status" className="flex items-center gap-2">
                          <SettingsIcon size={16} className="text-slate-500" />
                          Statut
                        </Label>
                        <Select 
                          value={data.status} 
                          onValueChange={(value) => setData('status', value as 'draft' | 'published' | 'active')}
                        >
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500">
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="active">Actif</SelectItem>
                          </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                      </div>

                      <div className="flex items-center space-x-2 h-full pt-6">
                        <Checkbox 
                          id="is_current" 
                          checked={data.is_current}
                          onCheckedChange={(checked) => setData('is_current', !!checked)}
                        />
                        <Label htmlFor="is_current" className="cursor-pointer">
                          Définir comme édition courante
                        </Label>
                        <InputError message={errors.is_current} />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setActiveTab('dates')}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Retour
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex justify-end space-x-4 border-t py-4 bg-slate-50">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => window.history.back()}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={processing}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <SaveIcon size={16} />
                  {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 