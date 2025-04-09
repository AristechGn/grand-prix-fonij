import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
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
  CoinsIcon,
  AwardIcon,
  InfoIcon,
  TrophyIcon
} from 'lucide-react';
import InputError from '@/components/input-error';
import { CreatePrizeProps } from '@/types';

export default function CreatePrize({ edition }: CreatePrizeProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    amount: 0,
    currency: 'GNF' as 'GNF' | 'EUR' | 'USD',
    category: '',
    rank: 1,
    is_active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.editions.prizes.store', { edition: edition.id }), {
      onSuccess: () => reset()
    });
  };

  return (
    <AppLayout>
      <Head title={`Nouveau prix - ${edition.name}`} />

      <div className="py-8">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-amber-500">
            <CardHeader className="bg-slate-50 border-b">
              <div className="flex items-center space-x-2">
                <div className="mr-2 flex">
                  <Link href={route('admin.editions.prizes.index', { edition: edition.id })}>
                    <ArrowLeftCircleIcon className="h-5 w-5 text-slate-500" />
                  </Link>
                </div>
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <PlusIcon className="h-6 w-6 mr-2 text-slate-500" />
                    Nouveau prix pour {edition.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Créer un nouveau prix pour cette édition du Grand Prix FONIJ
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <TrophyIcon size={16} className="text-slate-500" />
                      Nom du prix
                    </Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Ex: Grand Prix FONIJ"
                      className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <InputError message={errors.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center gap-2">
                      <InfoIcon size={16} className="text-slate-500" />
                      Catégorie
                    </Label>
                    <Select 
                      value={data.category} 
                      onValueChange={(value) => setData('category', value)}
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-amber-500">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Principal</SelectItem>
                        <SelectItem value="secondary">Secondaire</SelectItem>
                        <SelectItem value="special">Spécial</SelectItem>
                        <SelectItem value="sponsorship">Sponsoring</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.category} />
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
                    placeholder="Décrivez ce prix en détail..."
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                  />
                  <InputError message={errors.description} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <CoinsIcon size={16} className="text-slate-500" />
                      Montant
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={data.amount}
                      onChange={(e) => setData('amount', parseInt(e.target.value))}
                      min={0}
                      className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <InputError message={errors.amount} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency" className="flex items-center gap-2">
                      <CoinsIcon size={16} className="text-slate-500" />
                      Devise
                    </Label>
                    <Select 
                      value={data.currency} 
                      onValueChange={(value) => setData('currency', value as 'GNF' | 'EUR' | 'USD')}
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-amber-500">
                        <SelectValue placeholder="Sélectionner une devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GNF">GNF</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.currency} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rank" className="flex items-center gap-2">
                      <AwardIcon size={16} className="text-slate-500" />
                      Rang
                    </Label>
                    <Input
                      id="rank"
                      type="number"
                      value={data.rank}
                      onChange={(e) => setData('rank', parseInt(e.target.value))}
                      min={1}
                      className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <InputError message={errors.rank} />
                    <p className="text-xs text-gray-500">Position du prix dans la liste (1 pour le plus important)</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between space-x-4 border-t py-4 bg-slate-50">
                <Link href={route('admin.editions.prizes.index', { edition: edition.id })}>
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="flex items-center gap-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Retour aux prix
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={processing}
                  className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                >
                  <SaveIcon size={16} />
                  {processing ? 'Création en cours...' : 'Créer le prix'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 