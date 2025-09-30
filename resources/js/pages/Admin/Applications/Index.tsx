import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Download, Search } from 'lucide-react';
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
            header: 'Édition',
            accessorFn: (row: Application) => `${row.edition.name} (${row.edition.year})`,
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
                        Voir
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = route('admin.applications.edit', row.original.id)}
                    >
                        Modifier
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Gestion des candidatures
                                </h2>
                                <Button onClick={handleExport}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Exporter
                                </Button>
                            </div>

                            {/* Filtres */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full"
                                    />
                                    <Button variant="outline" onClick={handleSearch}>
                                        <Search className="w-4 h-4" />
                                    </Button>
                                </div>
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

                            {/* Table des candidatures */}
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 