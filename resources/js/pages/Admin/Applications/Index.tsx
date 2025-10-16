import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Eye, Edit, FileText, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
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
    edition: {
        name: string;
        year: number;
    };
}

interface ApplicationsIndexProps extends PageProps {
    applications: {
        data: Application[];
        current_page: number;
        per_page: number;
        total: number;
    };
    editions: Array<{
        id: number;
        name: string;
        year: number;
    }>;
    filters: {
        search?: string;
        edition_id?: string;
        status?: string;
        category?: string;
    };
    statuses: Record<string, string>;
}

export default function ApplicationsIndex({ applications, editions, filters, statuses }: ApplicationsIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedEdition, setSelectedEdition] = useState(filters.edition_id || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const columns: ColumnDef<Application>[] = [
        {
            header: 'Référence',
            accessorKey: 'application_number',
            cell: ({ row }) => (
                <div className="font-mono text-sm text-blue-600">
                    {row.getValue('application_number')}
                </div>
            ),
        },
        {
            header: 'Candidat',
            accessorFn: (row: Application) => `${row.first_name} ${row.last_name}`,
            cell: ({ row }) => (
                <div className="font-medium text-gray-900">
                    {row.getValue('Candidat')}
                </div>
            ),
        },
        {
            header: 'Projet',
            accessorKey: 'project_name',
            cell: ({ row }) => (
                <div className="max-w-[200px] truncate" title={row.getValue('project_name')}>
                    {row.getValue('project_name')}
                </div>
            ),
        },
        {
            header: 'Catégorie',
            accessorKey: 'category',
            cell: ({ row }) => (
                <Badge variant="outline" className="text-xs">
                    {row.getValue('category')}
                </Badge>
            ),
        },
        {
            header: 'Édition',
            accessorFn: (row: Application) => `${row.edition.name} (${row.edition.year})`,
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {row.getValue('Édition')}
                </div>
            ),
        },
        {
            header: 'Statut',
            accessorKey: 'status',
            cell: ({ row }: { row: { original: Application } }) => (
                <Badge className={getStatusColor(row.original.status)}>
                    {statuses[row.original.status]}
                </Badge>
            ),
        },
        {
            header: 'Score',
            accessorKey: 'score',
            cell: ({ row }: { row: { original: Application } }) => (
                <div className="text-center">
                    {row.original.score ? (
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {row.original.score}/100
                        </span>
                    ) : (
                        <span className="text-gray-400">-</span>
                    )}
                </div>
            ),
        },
        {
            header: 'Date',
            accessorKey: 'submitted_at',
            cell: ({ row }: { row: { original: Application } }) => (
                <div className="text-sm text-gray-600">
                    {new Date(row.original.submitted_at).toLocaleDateString('fr-FR')}
                </div>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }: { row: { original: Application } }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = route('admin.applications.show', row.original.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = route('admin.applications.edit', row.original.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Edit className="h-4 w-4" />
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

    const handleSearch = () => {
        window.location.href = route('admin.applications.index', {
            search: searchTerm,
            edition_id: selectedEdition,
            status: selectedStatus,
            category: selectedCategory,
        });
    };

    const handleExport = () => {
        window.location.href = route('admin.applications.export', {
            search: searchTerm,
            edition_id: selectedEdition,
            status: selectedStatus,
            category: selectedCategory,
        });
    };

    return (
        <AppLayout>
            <Head title="Gestion des candidatures" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* En-tête avec statistiques */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                    Gestion des candidatures
                                </h1>
                                <p className="mt-2 text-gray-600">
                                    Consultez et gérez toutes les candidatures soumises
                                </p>
                            </div>
                            <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 w-full lg:w-auto">
                                <Download className="w-4 h-4 mr-2" />
                                Exporter
                            </Button>
                        </div>
                    </div>

                    {/* Statistiques rapides */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total</p>
                                        <p className="text-xl font-bold text-gray-900">{applications.total}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <Users className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Validées</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {applications.data.filter(app => app.status === 'validated').length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                                        <Calendar className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">En attente</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {applications.data.filter(app => app.status === 'pending').length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                        <Users className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Finalistes</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {applications.data.filter(app => app.status === 'finalist').length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filtres */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Filtres de recherche</CardTitle>
                            <CardDescription>Affinez votre recherche selon vos critères</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Recherche</label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Nom, email, projet..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button variant="outline" onClick={handleSearch} size="sm">
                                            <Search className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Édition</label>
                                    <Select
                                        value={selectedEdition}
                                        onValueChange={(value: string) => setSelectedEdition(value)}
                                    >
                                        <option value="">Toutes les éditions</option>
                                        {editions.map((edition) => (
                                            <option key={edition.id} value={edition.id}>
                                                {edition.name} ({edition.year})
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Statut</label>
                                    <Select
                                        value={selectedStatus}
                                        onValueChange={(value: string) => setSelectedStatus(value)}
                                    >
                                        <option value="">Tous les statuts</option>
                                        {Object.entries(statuses).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Catégorie</label>
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={(value: string) => setSelectedCategory(value)}
                                    >
                                        <option value="">Toutes les catégories</option>
                                        <option value="tech">Tech</option>
                                        <option value="agri">Agri</option>
                                        <option value="social">Social</option>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Table des candidatures */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Liste des candidatures</CardTitle>
                            <CardDescription>
                                {applications.total} candidature{applications.total > 1 ? 's' : ''} trouvée{applications.total > 1 ? 's' : ''}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
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
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 