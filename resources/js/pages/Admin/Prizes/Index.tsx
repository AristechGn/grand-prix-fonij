import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MoreHorizontalIcon,
  SearchIcon,
  CoinsIcon,
  TrophyIcon,
  AwardIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Edition {
  id: number;
  name: string;
  year: number;
}

interface Prize {
  id: number;
  name: string;
  description: string;
  amount: number;
  currency: string;
  max_winners: number;
  type: string;
}

interface PrizeIndexProps {
  edition: Edition;
  prizes: Prize[];
}

export default function PrizesIndex({ edition, prizes }: PrizeIndexProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPrizes = prizes.filter(prize => 
    prize.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prize.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prize.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'GNF') {
      return new Intl.NumberFormat('fr-FR').format(amount) + ' GNF';
    } else if (currency === 'EUR') {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    } else if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
    return `${amount} ${currency}`;
  };

  const handleDelete = (prizeId: number, prizeName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le prix "${prizeName}" ?`)) {
      router.delete(route('admin.prizes.destroy', prizeId), {
        onSuccess: () => {
          toast.success("Prix supprimé avec succès");
        },
        onError: () => {
          toast.error("Une erreur s'est produite lors de la suppression");
        }
      });
    }
  };

  const getPrizeTypeStyle = (type: string) => {
    switch (type) {
      case 'main':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'secondary':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'special':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sponsorship':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrizeTypeLabel = (type: string) => {
    switch (type) {
      case 'main':
        return 'Principal';
      case 'secondary':
        return 'Secondaire';
      case 'special':
        return 'Spécial';
      case 'sponsorship':
        return 'Sponsoring';
      default:
        return type;
    }
  };

  return (
    <AppLayout>
      <Head title={`Prix - Édition ${edition.name}`} />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-md">
            <CardHeader className="border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <TrophyIcon className="h-6 w-6 mr-2 text-amber-500" />
                    Prix de l'édition {edition.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Gérez les prix à attribuer aux lauréats de cette édition
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={route('admin.editions.index')}>
                    <Button variant="outline" size="sm" className="h-9">
                      Retour aux éditions
                    </Button>
                  </Link>
                  <Link href={route('admin.editions.prizes.create', edition.id)}>
                    <Button className="bg-amber-600 hover:bg-amber-700 h-9 flex items-center gap-1">
                      <PlusIcon className="h-4 w-4" />
                      Ajouter un prix
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="stats flex flex-wrap gap-4 w-full md:w-auto">
                  <div className="stat bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <TrophyIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Total des prix</div>
                      <div className="text-2xl font-bold text-slate-700">{prizes.length}</div>
                    </div>
                  </div>
                  <div className="stat bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <CoinsIcon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Valeur totale</div>
                      <div className="text-2xl font-bold text-slate-700">
                        {formatAmount(
                          prizes.reduce((sum, prize) => {
                            if (prize.currency === 'GNF') return sum + prize.amount;
                            return sum;
                          }, 0),
                          'GNF'
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="stat bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <AwardIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Lauréats max</div>
                      <div className="text-2xl font-bold text-slate-700">
                        {prizes.reduce((sum, prize) => sum + prize.max_winners, 0)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-full md:w-auto">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher un prix..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 min-w-[300px]"
                  />
                </div>
              </div>

              {filteredPrizes.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Nom</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead className="hidden md:table-cell">Max lauréats</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrizes.map((prize) => (
                        <TableRow key={prize.id}>
                          <TableCell className="font-medium">
                            <div className="font-semibold">{prize.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[250px]">
                              {prize.description ? prize.description : "Aucune description"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPrizeTypeStyle(prize.type)} border`}>
                              {getPrizeTypeLabel(prize.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold">
                              {formatAmount(prize.amount, prize.currency)}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {prize.max_winners}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Ouvrir le menu</span>
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Link href={route('admin.prizes.edit', prize.id)}>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <PencilIcon className="mr-2 h-4 w-4" />
                                    Modifier
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(prize.id, prize.name)}
                                  className="cursor-pointer text-red-600 focus:text-red-500"
                                >
                                  <TrashIcon className="mr-2 h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-md border">
                  <TrophyIcon className="h-12 w-12 mx-auto text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-700">Aucun prix trouvé</h3>
                  <p className="mt-1 text-gray-500">
                    {searchTerm
                      ? "Aucun résultat ne correspond à votre recherche."
                      : "Cette édition n'a pas encore de prix définis."}
                  </p>
                  <div className="mt-6">
                    <Link href={route('admin.editions.prizes.create', edition.id)}>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Ajouter votre premier prix
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