import { Mail, Phone, User, Users, Map, GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface PersonalInfoFormProps {
  formData: {
    nom: string;
    prenom: string;
    dateNaissance: string;
    age: string;
    genre: string;
    email: string;
    telephone: string;
    ville: string;
    region: string;
    niveauEtudes: string;
    profession: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  regions: string[];
  niveauxEtudes: string[];
  errors: Record<string, string[]>;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  delay?: number;
}

function FormField({ label, required = false, icon, children, description, delay = 0 }: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="space-y-3"
    >
      <div className="flex items-center space-x-2">
        {icon && (
          <motion.div
            className="text-primary"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {icon}
          </motion.div>
        )}
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {label}
          {required && (
            <motion.span 
              className="text-red-500 ml-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              *
            </motion.span>
          )}
        </label>
      </div>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}

interface ModernInputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: string;
  max?: string;
}

function ModernInput({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required, 
  maxLength,
  min,
  max
}: ModernInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <motion.div className="relative">
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        min={min}
        max={max}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-4 
          border-2 rounded-2xl
          bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
          text-gray-800 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          transition-all duration-300 ease-out
          ${isFocused 
            ? 'border-primary shadow-lg shadow-primary/25 scale-[1.02]' 
            : value 
              ? 'border-primary-300 dark:border-primary-600' 
              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-400'
          }
          hover:shadow-md focus:ring-0 focus:outline-none
        `}
      />
      
      {/* Focus glow effect */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-secondary-400/20 pointer-events-none -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.div>
  );
}

interface ModernSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

function ModernSelect({ name, value, onChange, placeholder, required, options }: ModernSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <motion.div className="relative">
      <Select
        name={name}
        value={value}
        onValueChange={(value) => onChange(value)}
        onOpenChange={(open) => setIsFocused(open)}
      >
        <SelectTrigger 
          className={`
            w-full px-4 py-4 h-auto
            border-2 rounded-2xl
            bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
            text-gray-800 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            transition-all duration-300 ease-out
            ${isFocused 
              ? 'border-primary shadow-lg shadow-primary/25 scale-[1.02]' 
              : value 
                ? 'border-primary-300 dark:border-primary-600' 
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-400'
            }
            hover:shadow-md focus:ring-0 focus:outline-none
          `}
        >
          <SelectValue placeholder={placeholder || "Sélectionner..."} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Focus glow effect */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-secondary-400/20 pointer-events-none -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.div>
  );
}

export default function PersonalInfoForm({ 
  formData, 
  handleChange, 
  handleSelectChange,
  regions,
  niveauxEtudes,
  errors
}: PersonalInfoFormProps) {
  const completedFields = Object.values(formData).filter(value => 
    value !== '' && value !== undefined && value !== null
  ).length;
  const totalFields = 10; // Tous les champs requis
  const progressPercentage = (completedFields / totalFields) * 100;
  
  return (
    <motion.div 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <FormField 
            label="Nom" 
            required 
            icon={<User className="w-5 h-5" />}
            delay={0.1}
          >
            <ModernInput
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom de famille"
              required
            />
            {errors['last_name'] && <InputError message={errors['last_name'][0]} />}
          </FormField>

          <FormField 
            label="Prénom" 
            required 
            icon={<User className="w-5 h-5" />}
            delay={0.2}
          >
            <ModernInput
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />
            {errors['first_name'] && <InputError message={errors['first_name'][0]} />}
          </FormField>

          <FormField 
            label="Date de naissance" 
            required 
            icon={<Calendar className="w-5 h-5" />}
            description="Vous devez avoir entre 18 et 35 ans"
            delay={0.3}
          >
            <ModernInput
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
              max={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
              min={new Date(new Date().getFullYear() - 35, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
            />
            {errors['birth_date'] && <InputError message={errors['birth_date'][0]} />}
            {formData.age && (
              <motion.p 
                className="mt-2 text-sm text-primary font-medium bg-primary-50/50 dark:bg-primary-900/20 py-1 px-3 rounded-lg inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {formData.age} ans
              </motion.p>
            )}
          </FormField>

          <FormField 
            label="Genre" 
            required 
            icon={<Users className="w-5 h-5" />}
            delay={0.4}
          >
            <ModernSelect
              name="genre"
              value={formData.genre}
              onChange={(value) => handleSelectChange("genre", value)}
              placeholder="Sélectionner votre genre"
              required
              options={[
                { value: "homme", label: "Homme" },
                { value: "femme", label: "Femme" },
                { value: "autre", label: "Autre" }
              ]}
            />
            {errors['gender'] && <InputError message={errors['gender'][0]} />}
          </FormField>

          <FormField 
            label="Email" 
            required 
            icon={<Mail className="w-5 h-5" />}
            delay={0.5}
          >
            <ModernInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre.email@exemple.com"
              required
            />
            {errors['email'] && <InputError message={errors['email'][0]} />}
          </FormField>

          <FormField 
            label="Téléphone" 
            required 
            icon={<Phone className="w-5 h-5" />}
            delay={0.6}
          >
            <ModernInput
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+224 XX XX XX XX"
              required
            />
            {errors['phone'] && <InputError message={errors['phone'][0]} />}
          </FormField>

          <FormField 
            label="Région" 
            required 
            icon={<Map className="w-5 h-5" />}
            delay={0.7}
          >
            <ModernSelect
              name="region"
              value={formData.region}
              onChange={(value) => handleSelectChange("region", value)}
              placeholder="Sélectionner votre région"
              required
              options={regions.map(region => ({ value: region, label: region }))}
            />
            {errors['region'] && <InputError message={errors['region'][0]} />}
          </FormField>

          <FormField 
            label="Ville" 
            required 
            icon={<Map className="w-5 h-5" />}
            delay={0.8}
          >
            <ModernInput
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              placeholder="Votre ville de résidence"
              required
            />
            {errors['city'] && <InputError message={errors['city'][0]} />}
          </FormField>

          <FormField 
            label="Niveau d'études" 
            required 
            icon={<GraduationCap className="w-5 h-5" />}
            delay={0.9}
          >
            <ModernSelect
              name="niveauEtudes"
              value={formData.niveauEtudes}
              onChange={(value) => handleSelectChange("niveauEtudes", value)}
              placeholder="Sélectionner votre niveau"
              required
              options={niveauxEtudes.map(niveau => ({ value: niveau, label: niveau }))}
            />
            {errors['education_level'] && <InputError message={errors['education_level'][0]} />}
          </FormField>

          <FormField 
            label="Profession actuelle" 
            icon={<Briefcase className="w-5 h-5" />}
            description="Si applicable"
            delay={1.0}
          >
            <ModernInput
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Votre métier ou occupation actuelle"
            />
            {errors['profession'] && <InputError message={errors['profession'][0]} />}
          </FormField>
        </div>
        
        {/* Message de conseils */}
        <motion.div 
          className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-start space-x-4">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Users className="w-6 h-6 text-primary mt-0.5" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Pourquoi ces informations ?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ces données nous permettent de vérifier votre éligibilité au programme et de vous contacter pour la suite du processus. Elles restent confidentielles et ne seront pas partagées avec des tiers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 