import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  FileTextIcon,
  DownloadIcon,
  EditIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  TargetIcon,
  LightbulbIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from 'lucide-react';

interface Application {
  id: number;
  application_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  birth_date: string;
  age: number;
  gender: string;
  education_level: string;
  profession: string;
  category: string;
  program?: string;
  project_name: string;
  project_summary: string;
  problem_solved: string;
  expected_impact: string;
  target_audience: string;
  project_launched: string;
  project_start_date?: string;
  prototype_exists: string;
  availability_morning: boolean;
  availability_afternoon: boolean;
  availability_evening: boolean;
  id_document_path?: string;
  business_plan_path?: string;
  project_photo_path?: string;
  presentation_video_url?: string;
  certification_accuracy: boolean;
  free_participation: boolean;
  communication_authorization: boolean;
  status: string;
  score?: number;
  evaluation_notes?: string;
  jury_scores?: Record<string, number>;
  submitted_at: string;
  reviewed_at?: string;
  edition: {
    id: number;
    name: string;
    year: number;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
  reviewer?: {
    id: number;
    name: string;
  };
}

interface ShowApplicationProps extends PageProps {
  application: Application;
}

export default function ShowApplication({ application }: ShowApplicationProps) {
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

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'En attente',
      validated: 'Validée',
      rejected: 'Rejetée',
      selected: 'Sélectionnée',
      finalist: 'Finaliste',
      winner: 'Lauréat',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadDocument = (documentType: string) => {
    const path = application[`${documentType}_path` as keyof Application] as string;
    if (path) {
      window.open(route('admin.applications.download-document', [application.id, documentType]), '_blank');
    }
  };

  return (
    <AppLayout>
      <Head title={`Candidature ${application.application_number}`} />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href={route('admin.applications.index')}>
                <Button variant="outline" size="sm">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Retour à la liste
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <FileTextIcon className="h-8 w-8 text-blue-600" />
                  Candidature {application.application_number}
                </h1>
                <p className="text-gray-600 mt-1">
                  {application.first_name} {application.last_name} - {application.project_name}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={route('admin.applications.edit', application.id)}>
                  <Button>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nom complet</label>
                      <p className="text-gray-900">{application.first_name} {application.last_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">{application.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Téléphone</label>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">{application.phone}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Localisation</label>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">{application.city}, {application.region}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date de naissance</label>
                      <p className="text-gray-900">{formatDate(application.birth_date)} ({application.age} ans)</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Genre</label>
                      <p className="text-gray-900">{application.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Niveau d'éducation</label>
                      <div className="flex items-center gap-2">
                        <GraduationCapIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">{application.education_level}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Profession</label>
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">{application.profession}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations du projet */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-green-600" />
                    Informations du projet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom du projet</label>
                    <p className="text-lg font-semibold text-gray-900">{application.project_name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Catégorie</label>
                    <Badge variant="outline" className="mt-1">
                      {application.category}
                    </Badge>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Résumé du projet</label>
                    <p className="text-gray-900 mt-1">{application.project_summary}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Problème résolu</label>
                    <p className="text-gray-900 mt-1">{application.problem_solved}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Impact attendu</label>
                    <p className="text-gray-900 mt-1">{application.expected_impact}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Public cible</label>
                    <div className="flex items-center gap-2 mt-1">
                      <UsersIcon className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">{application.target_audience}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Projet lancé</label>
                      <div className="flex items-center gap-2 mt-1">
                        {application.project_launched === 'oui' ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 text-red-500" />
                        )}
                        <p className="text-gray-900">{application.project_launched === 'oui' ? 'Oui' : 'Non'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Prototype existe</label>
                      <div className="flex items-center gap-2 mt-1">
                        {application.prototype_exists === 'oui' ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircleIcon className="h-4 w-4 text-red-500" />
                        )}
                        <p className="text-gray-900">{application.prototype_exists === 'oui' ? 'Oui' : 'Non'}</p>
                      </div>
                    </div>
                  </div>

                  {application.project_start_date && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date de début du projet</label>
                      <p className="text-gray-900 mt-1">{formatDate(application.project_start_date)}</p>
                    </div>
                  )}

                  {application.presentation_video_url && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Vidéo de présentation</label>
                      <div className="mt-1">
                        <a 
                          href={application.presentation_video_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Voir la vidéo
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Disponibilités */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-purple-600" />
                    Disponibilités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`h-12 w-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        application.availability_morning ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <ClockIcon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Matin</p>
                      <p className="text-xs text-gray-500">
                        {application.availability_morning ? 'Disponible' : 'Non disponible'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`h-12 w-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        application.availability_afternoon ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <ClockIcon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Après-midi</p>
                      <p className="text-xs text-gray-500">
                        {application.availability_afternoon ? 'Disponible' : 'Non disponible'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`h-12 w-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        application.availability_evening ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <ClockIcon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Soir</p>
                      <p className="text-xs text-gray-500">
                        {application.availability_evening ? 'Disponible' : 'Non disponible'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Statut et évaluation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TargetIcon className="h-5 w-5 text-orange-600" />
                    Statut et évaluation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Statut</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusLabel(application.status)}
                      </Badge>
                    </div>
                  </div>

                  {application.score && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Score</label>
                      <div className="mt-1">
                        <span className="text-2xl font-bold text-gray-900">
                          {application.score}/100
                        </span>
                      </div>
                    </div>
                  )}

                  {application.evaluation_notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Notes d'évaluation</label>
                      <p className="text-gray-900 mt-1 text-sm">{application.evaluation_notes}</p>
                    </div>
                  )}

                  {application.jury_scores && Object.keys(application.jury_scores).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Scores du jury</label>
                      <div className="mt-1 space-y-1">
                        {Object.entries(application.jury_scores).map(([jury, score]) => (
                          <div key={jury} className="flex justify-between text-sm">
                            <span className="text-gray-600">{jury.replace('jury_', 'Jury ')}</span>
                            <span className="font-medium">{score}/100</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Informations administratives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-indigo-600" />
                    Informations administratives
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Édition</label>
                    <p className="text-gray-900">{application.edition.name} ({application.edition.year})</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Date de soumission</label>
                    <p className="text-gray-900">{formatDateTime(application.submitted_at)}</p>
                  </div>

                  {application.reviewed_at && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date d'évaluation</label>
                      <p className="text-gray-900">{formatDateTime(application.reviewed_at)}</p>
                    </div>
                  )}

                  {application.reviewer && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Évaluateur</label>
                      <p className="text-gray-900">{application.reviewer.name}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5 text-gray-600" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {application.id_document_path && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => downloadDocument('id_document')}
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Pièce d'identité
                    </Button>
                  )}
                  
                  {application.business_plan_path && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => downloadDocument('business_plan')}
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Plan d'affaires
                    </Button>
                  )}
                  
                  {application.project_photo_path && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => downloadDocument('project_photo')}
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Photo du projet
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Déclarations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    Déclarations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {application.certification_accuracy ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">Exactitude des informations</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {application.free_participation ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">Participation gratuite</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {application.communication_authorization ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">Autorisation de communication</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
