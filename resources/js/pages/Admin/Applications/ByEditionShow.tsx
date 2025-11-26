import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  XIcon,
  TrashIcon,
  FolderArchive
} from 'lucide-react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { FONIJ } from '@/utils';

interface Application {
  id: number;
  application_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  project_name: string;
  category: number; // ID de la catégorie
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
    last_page: number;
  };
  statuses: Record<string, string>;
  categories: (number | string)[]; // IDs des catégories
  filters: {
    search?: string;
    status?: string;
    category?: number;
    score_min?: number;
    score_max?: number;
    per_page?: number;
  };
}

export default function ByEditionShow({ edition, applications, statuses, categories, filters }: ByEditionShowProps) {
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
  const [selectedCategory, setSelectedCategory] = useState(filters.category?.toString() || 'all');
  const [scoreMin, setScoreMin] = useState(filters.score_min || '');
  const [scoreMax, setScoreMax] = useState(filters.score_max || '');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // États pour le modal de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);

  const toggleSelection = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === applications.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.data.map(app => app.id));
    }
  };

  // Debug: Afficher les catégories reçues
  console.log('Categories reçues:', categories);
  console.log('Types des catégories:', categories.map(c => typeof c));

  // Nettoyer les catégories pour éviter les erreurs
  const cleanCategories = categories
    .map(categoryId => {
      // Convertir en nombre si c'est une chaîne numérique
      const numCategoryId = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId;
      return numCategoryId;
    })
    .filter(categoryId => {
      return categoryId !== null &&
             categoryId !== undefined &&
             !isNaN(categoryId) &&
             categoryId > 0 &&
             categoryId <= 5;
    });

  console.log('Catégories nettoyées:', cleanCategories);

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.append('search', searchTerm);
    if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (scoreMin) params.append('score_min', scoreMin.toString());
    if (scoreMax) params.append('score_max', scoreMax.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

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

  // Fonction pour obtenir les détails de la catégorie par son ID
  const getCategoryDetails = (categoryId: number | string) => {
    // Convertir en nombre si c'est une chaîne
    const numCategoryId = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId;

    if (!numCategoryId || numCategoryId <= 0 || numCategoryId > 5 || isNaN(numCategoryId)) {
      return null;
    }
    const category = FONIJ.categories.find(cat => cat.id === numCategoryId);
    return category || null;
  };

  // Fonction pour obtenir le nom de la catégorie par son ID
  const getCategoryName = (categoryId: number | string) => {
    const category = getCategoryDetails(categoryId);
    const numCategoryId = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId;
    return category ? category.title : `Catégorie ${numCategoryId}`;
  };

  const columns: ColumnDef<Application>[] = [
    {
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          checked={selectedIds.length === applications.data.length && applications.data.length > 0}
          onChange={toggleSelectAll}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      cell: ({ row }: { row: Row<Application> }) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.original.id)}
          onChange={() => toggleSelection(row.original.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: 'Référence',
      accessorKey: 'application_number',
      cell: ({ row }: { row: Row<Application> }) => (
        <a
          href={route('admin.applications.show', row.original.id)}
          className="font-mono text-blue-600 hover:underline"
        >
          {row.getValue('application_number')}
        </a>
      ),
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
      cell: ({ row }: { row: { original: Application } }) => {
        const category = getCategoryDetails(row.original.category);
        if (!category) {
          return (
            <div className="max-w-[200px]">
              <span className="text-sm text-gray-500 font-medium">
                Catégorie {row.original.category}
              </span>
            </div>
          );
        }

        return (
          <div className="max-w-[200px]">
            <div className="font-medium text-sm text-gray-900 truncate" title={category.title}>
              {category.title}
            </div>
            <div className="text-xs text-gray-500 truncate" title={category.description}>
              {category.description}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Statut',
      accessorKey: 'status',
      cell: ({ row }: { row: Row<Application> }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.original.status)}`}>
          {statuses[row.original.status]}
        </span>
      ),
    },
    {
      header: 'Score',
      accessorKey: 'score',
      cell: ({ row }: { row: Row<Application> }) => (
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
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
            title="Voir les détails"
          >
            <EyeIcon className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = route('admin.applications.edit', row.original.id)}
            className="hover:bg-green-50 hover:border-green-300 transition-colors"
            title="Modifier"
          >
            <EditIcon className="h-4 w-4 text-green-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteClick(row.original)}
            className="hover:bg-red-50 hover:border-red-300 transition-colors"
            title="Supprimer"
          >
            <TrashIcon className="h-4 w-4 text-red-600" />
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
    // Construire les paramètres d'export avec les filtres actuels
    const params = new URLSearchParams();
    params.append('edition_id', edition.id.toString());

    // Ajouter les filtres actifs
    if (searchTerm) params.append('search', searchTerm);
    if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (scoreMin) params.append('score_min', scoreMin.toString());
    if (scoreMax) params.append('score_max', scoreMax.toString());

    // Ouvrir le lien d'export dans un nouvel onglet
    window.open(`${route('admin.applications.export')}?${params.toString()}`, '_blank');
  };

  const handleExportFolders = () => {
    if (selectedIds.length === 0) {
      alert('Veuillez sélectionner au moins une candidature à exporter.');
      return;
    }

    const params = new URLSearchParams();
    params.append('edition_id', edition.id.toString());

    // Ajouter les IDs sélectionnés
    selectedIds.forEach(id => {
      params.append('application_ids[]', id.toString());
    });

    // Ajouter les filtres actifs pour référence
    if (searchTerm) params.append('search', searchTerm);
    if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (scoreMin) params.append('score_min', scoreMin.toString());
    if (scoreMax) params.append('score_max', scoreMax.toString());

    // Télécharger le ZIP
    window.location.href = `${route('admin.applications.export-folders')}?${params.toString()}`;
  };

  // Fonction pour ouvrir le modal de suppression
  const handleDeleteClick = (application: Application) => {
    setApplicationToDelete(application);
    setDeleteModalOpen(true);
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = () => {
    if (applicationToDelete) {
      // Utiliser Inertia pour faire une vraie requête DELETE
      router.delete(route('admin.applications.destroy', applicationToDelete.id), {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setApplicationToDelete(null);
        },
        onError: (errors) => {
          console.error('Erreur lors de la suppression:', errors);
        }
      });
    }
  };

  // Fonction pour annuler la suppression
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setApplicationToDelete(null);
  };

  // Fonction pour changer de page
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();

    // Conserver tous les filtres actuels
    if (searchTerm) params.append('search', searchTerm);
    if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (scoreMin) params.append('score_min', scoreMin.toString());
    if (scoreMax) params.append('score_max', scoreMax.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

    // Ajouter la nouvelle page
    params.append('page', page.toString());

    window.location.href = `${route('admin.applications.by-edition.show', edition.id)}?${params.toString()}`;
  };

  // Fonction pour changer le nombre d'éléments par page
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    const params = new URLSearchParams();

    // Conserver tous les filtres actuels
    if (searchTerm) params.append('search', searchTerm);
    if (selectedStatus && selectedStatus !== 'all') params.append('status', selectedStatus);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (scoreMin) params.append('score_min', scoreMin.toString());
    if (scoreMax) params.append('score_max', scoreMax.toString());

    // Ajouter le nouveau nombre d'éléments par page
    params.append('per_page', itemsPerPage.toString());

    window.location.href = `${route('admin.applications.by-edition.show', edition.id)}?${params.toString()}`;
  };

  return (
    <AppLayout>
      <Head title={`Candidatures - ${edition.name}`} />

      <div className="py-8 overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6 overflow-x-hidden">
          {/* En-tête */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href={route('admin.applications.by-edition')}>
                  <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 transition-colors">
                    <ArrowLeftIcon className="h-4 w-4 mr-2 text-blue-600" />
                    Retour
                  </Button>
                </Link>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center gap-2 sm:gap-4">
                    <CalendarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 bg-white rounded-full p-2 shadow-md flex-shrink-0" />
                    <span className="truncate">{edition.name}</span>
                  </h1>
                  <p className="text-gray-600 mt-2 text-sm sm:text-lg break-words">
                    Édition {edition.year} - {applications.total} candidature{applications.total > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <Button
                  onClick={handleExport}
                  className="bg-green-500 hover:bg-green-600 text-white transition-colors shadow-md"
                >
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Exporter Excel
                </Button>
                <Button
                  onClick={handleExportFolders}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-md"
                  disabled={selectedIds.length === 0}
                >
                  <FolderArchive className="h-5 w-5 mr-2" />
                  Exporter Dossiers ({selectedIds.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-blue-200 flex items-center justify-center mr-5 shadow-md">
                    <FileTextIcon className="h-7 w-7 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-semibold">Total candidatures</p>
                    <p className="text-3xl font-bold text-blue-900">{applications.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-green-200 flex items-center justify-center mr-5 shadow-md">
                    <UsersIcon className="h-7 w-7 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-semibold">Validées</p>
                    <p className="text-3xl font-bold text-green-900">{getFilteredCount('validated')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-yellow-200 flex items-center justify-center mr-5 shadow-md">
                    <CalendarIcon className="h-7 w-7 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-semibold">En attente</p>
                    <p className="text-3xl font-bold text-yellow-900">{getFilteredCount('pending')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-purple-200 flex items-center justify-center mr-5 shadow-md">
                    <UsersIcon className="h-7 w-7 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-semibold">Finalistes</p>
                    <p className="text-3xl font-bold text-purple-900">{getFilteredCount('finalist')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
            <CardHeader className="bg-white/50 backdrop-blur-sm rounded-t-lg border-b border-gray-200">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <FilterIcon className="h-6 w-6 text-blue-600" />
                Filtres de recherche
              </CardTitle>
              <CardDescription className="text-gray-600">
                Affinez votre recherche avec des filtres précis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Recherche */}
                <div className="md:col-span-2 min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recherche
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Nom, projet, email..."
                      className="pl-10 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all w-full"
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
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg rounded-lg">
                      <SelectItem value="all" className="hover:bg-gray-100 transition-colors">Tous les statuts</SelectItem>
                      {Object.entries(statuses).map(([key, label]) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="hover:bg-gray-100 transition-colors"
                        >
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
                    <SelectTrigger className="bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all">
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg rounded-lg">
                      <SelectItem value="all" className="hover:bg-gray-100 transition-colors">Toutes les catégories</SelectItem>
                      {cleanCategories.map((categoryId) => {
                        const numCategoryId = Number(categoryId);
                        const category = getCategoryDetails(numCategoryId);
                        return (
                          <SelectItem
                            key={numCategoryId}
                            value={numCategoryId.toString()}
                            className="hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{category?.title || `Catégorie ${numCategoryId}`}</span>
                              {category && (
                                <span className="text-xs text-gray-500 truncate max-w-[200px]">
                                  {category.description}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        );
                      })}
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
                      className="w-20 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <span className="flex items-center text-gray-500">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      min="0"
                      max="100"
                      value={scoreMax}
                      onChange={(e) => setScoreMax(e.target.value)}
                      className="w-20 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={applyFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md"
                  >
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Appliquer les filtres
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <XIcon className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>

                {/* Badges des filtres actifs */}
                <div className="flex gap-2 flex-wrap min-w-0">
                  {filters.search && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors max-w-full"
                    >
                      <span className="truncate">Recherche: {filters.search}</span>
                      <XIcon
                        className="h-3 w-3 cursor-pointer text-blue-600 hover:text-blue-800 flex-shrink-0"
                        onClick={() => setSearchTerm('')}
                      />
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200 transition-colors max-w-full"
                    >
                      <span className="truncate">Statut: {statuses[filters.status]}</span>
                      <XIcon
                        className="h-3 w-3 cursor-pointer text-green-600 hover:text-green-800 flex-shrink-0"
                        onClick={() => setSelectedStatus('all')}
                      />
                    </Badge>
                  )}
                  {filters.category && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors max-w-full"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">Catégorie: {getCategoryName(filters.category)}</span>
                        {getCategoryDetails(filters.category) && (
                          <span className="text-xs opacity-75 truncate max-w-[150px]">
                            {getCategoryDetails(filters.category)?.description}
                          </span>
                        )}
                      </div>
                      <XIcon
                        className="h-3 w-3 cursor-pointer text-purple-600 hover:text-purple-800 flex-shrink-0"
                        onClick={() => setSelectedCategory('all')}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table des candidatures */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="min-w-0 flex-1">
                  <CardTitle className="break-words">
                    Candidatures de l'édition {edition.name}
                    {filters.category && (
                      <span className="ml-2 text-sm font-normal text-gray-600">
                        - Catégorie: {getCategoryName(filters.category)}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="break-words">
                    Liste des candidatures soumises pour cette édition
                    {filters.category && (
                      <span className="block text-xs text-gray-500 mt-1 break-words">
                        {getCategoryDetails(filters.category)?.description}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button onClick={handleExport} variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                  <Button
                    onClick={handleExportFolders}
                    variant="outline"
                    size="sm"
                    disabled={selectedIds.length === 0}
                  >
                    <FolderArchive className="h-4 w-4 mr-2" />
                    Dossiers ({selectedIds.length})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto w-full">
                <DataTable
                columns={columns}
                data={applications.data}
                pagination={{
                  pageIndex: applications.current_page - 1,
                  pageSize: applications.per_page,
                  pageCount: applications.last_page,
                  total: applications.total,
                }}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPageOptions={[10, 25, 50,70, 80, 100]}
              />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <TrashIcon className="h-5 w-5" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Êtes-vous sûr de vouloir supprimer la candidature de{' '}
              <span className="font-semibold text-gray-900">
                {applicationToDelete?.first_name} {applicationToDelete?.last_name}
              </span>
              {' '}pour le projet{' '}
              <span className="font-semibold text-gray-900">
                "{applicationToDelete?.project_name}"
              </span>
              ?
              <br />
              <br />
              <span className="text-red-600 font-medium">
                Cette action est irréversible et supprimera définitivement tous les fichiers associés.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              className="border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
