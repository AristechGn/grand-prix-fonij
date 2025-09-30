import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  UsersIcon, 
  FileTextIcon,
  ArrowRightIcon,
  EyeIcon
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
}

export default function ByEdition({ editions }: ByEditionProps) {
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Candidatures par édition
            </h1>
            <p className="mt-2 text-gray-600">
              Gérez et consultez les candidatures organisées par édition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editions.map((edition) => (
              <Card key={edition.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-blue-600" />
                        {edition.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
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

          {editions.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune édition trouvée
                </h3>
                <p className="text-gray-600 mb-4">
                  Il n'y a actuellement aucune édition avec des candidatures.
                </p>
                <Link href={route('admin.editions.index')}>
                  <Button>
                    Gérer les éditions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
