import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import InputError from '@/components/input-error';
import { 
  User, Mail, Lock, Phone, Home, Calendar, Briefcase, Users, 
  ChevronLeft, CheckCircle, AlertCircle, Pencil
} from 'lucide-react';
import { User as UserType } from '@/types';

interface EditProps {
    user: UserType;
}

interface UserFormData {
    [key: string]: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    role: string;
    address: string;
    birth_date: string;
    gender: string;
    profession: string;
}

export default function EditUser({ user }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<UserFormData>({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        phone: user.phone || '',
        role: user.role || 'user',
        address: user.address || '',
        birth_date: user.birth_date ? new Date(user.birth_date).toISOString().split('T')[0] : '',
        gender: user.gender || '',
        profession: user.profession || '',
    });

    const [activeTab, setActiveTab] = useState("information");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    const isEmailValid = data.email && data.email.includes('@');
    const isPasswordValid = !data.password || data.password.length >= 8;
    const doPasswordsMatch = !data.password || data.password === data.password_confirmation;

    return (
        <AppLayout>
            <Head title={`Modifier ${user.first_name} ${user.last_name}`} />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <Card className="shadow-lg border-t-4 border-t-green-500">
                        <CardHeader className="bg-slate-50 border-b">
                            <div className="flex items-center space-x-2">
                                <Pencil className="h-5 w-5 text-slate-500" />
                                <div>
                                    <CardTitle className="text-2xl">Modifier l'utilisateur</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Modifier les informations de {user.first_name} {user.last_name}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <TabsList className="grid grid-cols-3 mb-6">
                                        <TabsTrigger value="information" className="flex items-center gap-2">
                                            <User size={16} />
                                            <span>Information personnelle</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="credentials" className="flex items-center gap-2">
                                            <Lock size={16} />
                                            <span>Identifiants</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="details" className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>Détails additionnels</span>
                                        </TabsTrigger>
                                    </TabsList>
                                    
                                    <TabsContent value="information" className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="first_name" className="flex items-center gap-2">
                                                    <User size={16} className="text-slate-500" />
                                                    Prénom
                                                </Label>
                                                <Input
                                                    id="first_name"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                    placeholder="Entrez le prénom"
                                                    required
                                                />
                                                <InputError message={errors.first_name} />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label htmlFor="last_name" className="flex items-center gap-2">
                                                    <User size={16} className="text-slate-500" />
                                                    Nom
                                                </Label>
                                                <Input
                                                    id="last_name"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                    placeholder="Entrez le nom"
                                                    required
                                                />
                                                <InputError message={errors.last_name} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="flex items-center gap-2">
                                                <Phone size={16} className="text-slate-500" />
                                                Téléphone
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                placeholder="Entrez le numéro de téléphone"
                                            />
                                            <InputError message={errors.phone} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address" className="flex items-center gap-2">
                                                <Home size={16} className="text-slate-500" />
                                                Adresse
                                            </Label>
                                            <Input
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                placeholder="Entrez l'adresse"
                                            />
                                            <InputError message={errors.address} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="birth_date" className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-slate-500" />
                                                    Date de naissance
                                                </Label>
                                                <Input
                                                    id="birth_date"
                                                    type="date"
                                                    value={data.birth_date}
                                                    onChange={(e) => setData('birth_date', e.target.value)}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                />
                                                <InputError message={errors.birth_date} />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label htmlFor="gender" className="flex items-center gap-2">
                                                    <Users size={16} className="text-slate-500" />
                                                    Genre
                                                </Label>
                                                <select
                                                    id="gender"
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                                                    value={data.gender}
                                                    onChange={(e) => setData('gender', e.target.value)}
                                                >
                                                    <option value="">Sélectionner</option>
                                                    <option value="male">Homme</option>
                                                    <option value="female">Femme</option>
                                                    <option value="other">Autre</option>
                                                </select>
                                                <InputError message={errors.gender} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="profession" className="flex items-center gap-2">
                                                <Briefcase size={16} className="text-slate-500" />
                                                Profession
                                            </Label>
                                            <Input
                                                id="profession"
                                                value={data.profession}
                                                onChange={(e) => setData('profession', e.target.value)}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                                                placeholder="Entrez la profession"
                                            />
                                            <InputError message={errors.profession} />
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <Button 
                                                type="button" 
                                                onClick={() => setActiveTab('credentials')}
                                                className="flex items-center gap-2"
                                            >
                                                Continuer
                                                <ChevronLeft className="h-4 w-4 rotate-180" />
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    
                                    <TabsContent value="credentials" className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="flex items-center gap-2">
                                                <Mail size={16} className="text-slate-500" />
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={`transition-all duration-200 focus:ring-2 focus:ring-green-500 pr-10 ${
                                                        data.email ? (isEmailValid ? 'border-green-500' : 'border-red-500') : ''
                                                    }`}
                                                    placeholder="exemple@domaine.com"
                                                    required
                                                />
                                                {data.email && (
                                                    isEmailValid ? (
                                                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                                    )
                                                )}
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="flex items-center gap-2">
                                                    <Lock size={16} className="text-slate-500" />
                                                    Mot de passe (laisser vide pour conserver)
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        className={`transition-all duration-200 focus:ring-2 focus:ring-green-500 pr-10 ${
                                                            data.password ? (isPasswordValid ? 'border-green-500' : 'border-red-500') : ''
                                                        }`}
                                                        placeholder="Minimum 8 caractères"
                                                    />
                                                    {data.password && (
                                                        isPasswordValid ? (
                                                            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                                        ) : (
                                                            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                                        )
                                                    )}
                                                </div>
                                                <InputError message={errors.password} />
                                                {data.password && !isPasswordValid && (
                                                    <p className="text-xs text-red-500">Le mot de passe doit contenir au moins 8 caractères</p>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation" className="flex items-center gap-2">
                                                    <Lock size={16} className="text-slate-500" />
                                                    Confirmer le mot de passe
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        className={`transition-all duration-200 focus:ring-2 focus:ring-green-500 pr-10 ${
                                                            data.password_confirmation && data.password ? 
                                                            (doPasswordsMatch ? 'border-green-500' : 'border-red-500') : ''
                                                        }`}
                                                        placeholder="Confirmer le mot de passe"
                                                    />
                                                    {data.password_confirmation && data.password && (
                                                        doPasswordsMatch ? (
                                                            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                                                        ) : (
                                                            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                                                        )
                                                    )}
                                                </div>
                                                {data.password_confirmation && !doPasswordsMatch && (
                                                    <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => setActiveTab('information')}
                                                className="flex items-center gap-2"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Retour
                                            </Button>
                                            <Button 
                                                type="button" 
                                                onClick={() => setActiveTab('details')}
                                                className="flex items-center gap-2"
                                            >
                                                Continuer
                                                <ChevronLeft className="h-4 w-4 rotate-180" />
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    
                                    <TabsContent value="details" className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Users size={16} className="text-slate-500" />
                                                Rôle de l'utilisateur
                                            </label>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div 
                                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                        data.role === 'user' 
                                                            ? 'border-green-500 bg-green-50' 
                                                            : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                                    onClick={() => setData('role', 'user')}
                                                >
                                                    <div className="flex justify-center mb-2">
                                                        <User size={24} className={data.role === 'user' ? 'text-green-500' : 'text-gray-400'} />
                                                    </div>
                                                    <p className="text-center font-medium">Utilisateur</p>
                                                    <p className="text-center text-xs text-gray-500">Accès standard</p>
                                                </div>
                                                
                                                <div 
                                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                        data.role === 'admin' 
                                                            ? 'border-green-500 bg-green-50' 
                                                            : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                                    onClick={() => setData('role', 'admin')}
                                                >
                                                    <div className="flex justify-center mb-2">
                                                        <Users size={24} className={data.role === 'admin' ? 'text-green-500' : 'text-gray-400'} />
                                                    </div>
                                                    <p className="text-center font-medium">Administrateur</p>
                                                    <p className="text-center text-xs text-gray-500">Accès complet</p>
                                                </div>
                                                
                                                <div 
                                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                        data.role === 'jury' 
                                                            ? 'border-green-500 bg-green-50' 
                                                            : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                                    onClick={() => setData('role', 'jury')}
                                                >
                                                    <div className="flex justify-center mb-2">
                                                        <Briefcase size={24} className={data.role === 'jury' ? 'text-green-500' : 'text-gray-400'} />
                                                    </div>
                                                    <p className="text-center font-medium">Jury</p>
                                                    <p className="text-center text-xs text-gray-500">Évaluation uniquement</p>
                                                </div>
                                            </div>
                                            <input 
                                                type="hidden" 
                                                name="role" 
                                                value={data.role} 
                                            />
                                            <InputError message={errors.role} />
                                        </div>
                                        
                                        <div className="flex justify-between pt-4">
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => setActiveTab('credentials')}
                                                className="flex items-center gap-2"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Retour
                                            </Button>
                                            <Button 
                                                type="submit" 
                                                disabled={processing}
                                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle size={16} />
                                                Enregistrer les modifications
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </form>
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t px-6 py-4">
                            <div className="w-full flex items-center justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-2"
                                >
                                    <ChevronLeft size={16} />
                                    Retour à la liste
                                </Button>
                                <div className="text-sm text-slate-500">
                                    ID utilisateur: {user.id}
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
