import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  UsersIcon,
  FileTextIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon
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
}

export default function ByEditionShow({ edition, applications, statuses }: ByEditionShowProps) {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                    <p className="text-sm text-gray-600">Candidatures validées</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.data.filter(app => app.status === 'validated').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <CalendarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {applications.data.filter(app => app.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
