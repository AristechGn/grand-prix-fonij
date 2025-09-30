import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  UsersIcon,
  FileTextIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon,
  SearchIcon,
  FilterIcon,
  XIcon
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

interface Application {
  id: number;
  application_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  project_name: string;
  category: string;
  status: string;
  score: number;
  submitted_at: string;
}

interface Edition {
  id: number;
  name: string;
  year: number;
  status: string;
  is_current: boolean;
}

interface ByEditionShowProps extends PageProps {
  edition: Edition;
  applications: {
    data: Application[];
    current_page: number;
    per_page: number;
    total: number;
  };
  statuses: Record<string, string>;
  categories: string[];
  filters: {
    search?: string;
    status?: string;
    category?: string;
    score_min?: number;
    score_max?: number;
  };
}

export default function ByEditionShow({ edition, applications, statuses, categories, filters }: ByEditionShowProps) {
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [scoreMin, setScoreMin] = useState(filters.score_min || '');
  const [scoreMax, setScoreMax] = useState(filters.score_max || '');

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('search', searchTerm);
    if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (scoreMin) params.append('score_min', scoreMin.toString());
    if (scoreMax) params.append('score_max', scoreMax.toString());
    
    window.location.href = `${route('admin.applications.by-edition.show', edition.id)}?${params.toString()}`;
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setScoreMin('');
    setScoreMax('');
    window.location.href = route('admin.applications.by-edition.show', edition.id);
  };

  // Fonction pour compter les applications filtrées
  const getFilteredCount = (status: string) => {
    return applications.data.filter(app => app.status === status).length;
  };

  const columns: ColumnDef<Application>[] = [
    {
      header: 'Référence',
      accessorKey: 'application_number',
    },
    {
      header: 'Candidat',
      accessorFn: (row: Application) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: 'Projet',
      accessorKey: 'project_name',
    },
    {
      header: 'Catégorie',
      accessorKey: 'category',
    },
    {
      header: 'Statut',
      accessorKey: 'status',
      cell: ({ row }: { row: { original: Application } }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.original.status)}`}>
          {statuses[row.original.status]}
        </span>
      ),
    },
    {
      header: 'Score',
      accessorKey: 'score',
      cell: ({ row }: { row: { original: Application } }) => (
        <span className="font-mono">
          {row.original.score ? `${row.original.score}/100` : '-'}
        </span>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'submitted_at',
      cell: ({ row }: { row: { original: Application } }) => 
        new Date(row.original.submitted_at).toLocaleDateString('fr-FR'),
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: { original: Application } }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = route('admin.applications.show', row.original.id)}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = route('admin.applications.edit', row.original.id)}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      validated: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      selected: 'bg-blue-100 text-blue-800',
      finalist: 'bg-purple-100 text-purple-800',
      winner: 'bg-indigo-100 text-indigo-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleExport = () => {
    window.location.href = route('admin.applications.export', {
      edition_id: edition.id
    });
  };

  return (
    <AppLayout>
      <Head title={`Candidatures - ${edition.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href={route('admin.applications.by-edition')}>
                <Button variant="outline" size="sm">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <CalendarIcon className="h-8 w-8 text-blue-600" />
                  {edition.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Édition {edition.year} - {applications.total} candidature{applications.total > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <FileTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total candidatures</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <UsersIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Validées</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredCount('validated')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <CalendarIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredCount('pending')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <UsersIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Finalistes</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredCount('finalist')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                Filtres
              </CardTitle>
              <CardDescription>
                Filtrez les candidatures selon vos critères
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Recherche */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recherche
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Nom, projet, email..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Statut */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      {Object.entries(statuses).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Score
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      min="0"
                      max="100"
                      value={scoreMin}
                      onChange={(e) => setScoreMin(e.target.value)}
                      className="w-20"
                    />
                    <span className="flex items-center text-gray-500">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      min="0"
                      max="100"
                      value={scoreMax}
                      onChange={(e) => setScoreMax(e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Appliquer les filtres
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    <XIcon className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>
                
                {/* Badges des filtres actifs */}
                <div className="flex gap-2">
                  {filters.search && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Recherche: {filters.search}
                      <XIcon className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Statut: {statuses[filters.status]}
                      <XIcon className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStatus('all')} />
                    </Badge>
                  )}
                  {filters.category && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Catégorie: {filters.category}
                      <XIcon className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table des candidatures */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Candidatures de l'édition {edition.name}</CardTitle>
                  <CardDescription>
                    Liste des candidatures soumises pour cette édition
                  </CardDescription>
                </div>
                <Button onClick={handleExport}>
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={applications.data}
                pagination={{
                  pageIndex: applications.current_page - 1,
                  pageSize: applications.per_page,
                  pageCount: Math.ceil(applications.total / applications.per_page),
                  total: applications.total,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
