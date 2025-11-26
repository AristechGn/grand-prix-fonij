import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CalendarIcon,
  UsersIcon,
  FileTextIcon,
  ArrowRightIcon,
  EyeIcon,
  SearchIcon,
  FilterIcon,
  XIcon
} from 'lucide-react';

interface Edition {
  id: number;
  name: string;
  year: number;
  status: string;
  is_current: boolean;
  applications_count: number;
  start_date?: string;
  end_date?: string;
}

interface ByEditionProps extends PageProps {
  editions: Edition[];
  filters?: {
    search?: string;
    status?: string;
    year?: string;
    category?: string;
  };
}

export default function ByEdition({ editions, filters = {} }: ByEditionProps) {
  // États pour les filtres
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
  const [yearFilter, setYearFilter] = useState(filters.year || 'all');
  const [categoryFilter, setCategoryFilter] = useState(filters.category || 'all');

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

  // Fonction pour filtrer les éditions
  const filteredEditions = editions.filter(edition => {
    const matchesSearch = !search ||
      edition.name.toLowerCase().includes(search.toLowerCase()) ||
      edition.year.toString().includes(search);

    const matchesStatus = !statusFilter || statusFilter === 'all' || edition.status === statusFilter;
    const matchesYear = !yearFilter || yearFilter === 'all' || edition.year.toString() === yearFilter;

    return matchesSearch && matchesStatus && matchesYear;
  });

  // Obtenir les années uniques pour le filtre
  const uniqueYears = [...new Set(editions.map(edition => edition.year))].sort((a, b) => b - a);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setYearFilter('all');
    setCategoryFilter('all');
  };

  // Compter les filtres actifs
  const activeFiltersCount = [search, statusFilter !== 'all' ? statusFilter : '', yearFilter !== 'all' ? yearFilter : '', categoryFilter !== 'all' ? categoryFilter : ''].filter(Boolean).length;

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
      <Head title="Candidatures par édition" />

      <div className="py-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-none shadow-md">
            <CardContent className="p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                      Candidatures par édition
                    </h1>
                    <p className="mt-1 text-gray-600 break-words">
                      Gérez et consultez les candidatures organisées par édition
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/80 rounded-xl border border-white/60 p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Total des éditions</p>
                    <p className="text-2xl font-semibold text-gray-900">{editions.length}</p>
                  </div>
                  <div className="bg-white/80 rounded-xl border border-white/60 p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Candidatures</p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {editions.reduce((sum, edition) => sum + edition.applications_count, 0)}
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl border border-white/60 p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Éditions actives</p>
                    <p className="text-2xl font-semibold text-emerald-600">
                      {editions.filter(edition => edition.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 rounded-xl border border-white/60 shadow-sm px-4 py-3 text-sm text-gray-600 w-full lg:w-auto">
                Filtres actifs :{' '}
                <span className="font-semibold">{activeFiltersCount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Section des filtres */}
          <Card className="mb-6 bg-gradient-to-br from-gray-50 to-white border-none shadow-md">
            <CardHeader className="border-b border-white/70">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FilterIcon className="h-5 w-5 text-blue-600" />
                    Filtres
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                        {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Affinez vos critères de recherche</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  disabled={activeFiltersCount === 0}
                  className="border-gray-200 hover:bg-gray-100"
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Recherche */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Recherche
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Nom ou année..."
                      className="pl-10"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filtre par statut */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtre par année */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Année
                  </label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les années" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les années</SelectItem>
                      {uniqueYears.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions des filtres */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Actions rapides
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => window.location.href = route('admin.applications.index')}
                    >
                      Voir toutes les candidatures
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Total des éditions',
                value: editions.length,
                icon: <CalendarIcon className="h-8 w-8 text-blue-600" />,
                bg: 'from-blue-50 to-white'
              },
              {
                label: 'Éditions filtrées',
                value: filteredEditions.length,
                icon: <FilterIcon className="h-8 w-8 text-green-600" />,
                bg: 'from-green-50 to-white'
              },
              {
                label: 'Total candidatures',
                value: editions.reduce((sum, edition) => sum + edition.applications_count, 0),
                icon: <FileTextIcon className="h-8 w-8 text-purple-600" />,
                bg: 'from-purple-50 to-white'
              },
            ].map(stat => (
              <Card key={stat.label} className="shadow-sm border border-gray-100">
                <CardContent className={`p-4 bg-gradient-to-br ${stat.bg} rounded-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEditions.map((edition) => (
              <Card key={edition.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{edition.name}</span>
                      </CardTitle>
                      <CardDescription className="mt-1 break-words">
                        Édition {edition.year}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={statusColors[edition.status] || 'bg-gray-100'}>
                        {statusLabels[edition.status] || edition.status}
                      </Badge>
                      {edition.is_current && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Édition courante
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Statistiques */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileTextIcon className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">
                          Candidatures
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-lg font-bold text-blue-600">
                          {edition.applications_count}
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Début:</span>
                        <span className="font-medium">
                          {formatDate(edition.start_date || null)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fin:</span>
                        <span className="font-medium">
                          {formatDate(edition.end_date || null)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={route('admin.applications.by-edition.show', edition.id)}
                        className="flex-1"
                      >
                        <Button className="w-full" size="sm">
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Voir les candidatures
                        </Button>
                      </Link>
                      <Link href={route('admin.editions.show', edition.id)}>
                        <Button variant="outline" size="sm">
                          <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEditions.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {editions.length === 0 ? 'Aucune édition trouvée' : 'Aucune édition ne correspond aux filtres'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {editions.length === 0
                    ? 'Il n\'y a actuellement aucune édition avec des candidatures.'
                    : 'Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.'
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  {editions.length > 0 && (
                    <Button variant="outline" onClick={resetFilters}>
                      <XIcon className="h-4 w-4 mr-2" />
                      Réinitialiser les filtres
                    </Button>
                  )}
                  <Link href={route('admin.editions.index')}>
                    <Button>
                      Gérer les éditions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
