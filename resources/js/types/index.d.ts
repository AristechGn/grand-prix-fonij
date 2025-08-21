import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { PageProps } from '@/types';

export interface Auth {
    user: User;
}

export interface PageProps {
    auth: Auth;
    errors: Record<string, string>;
    flash: Record<string, string>;
    [key: string]: unknown;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    active?: string
    icon?: LucideIcon | null;
    isActive?: boolean;
    children?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    avatar?: string;
    email_verified_at: string | null;
    phone_verified_at: string | null;
    role: 'super_admin' | 'admin' | 'user' | 'candidat' | 'jury';
    status: number;
    address: string;
    birth_date: string;
    gender: string;
    profession: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Interfaces pour les formulaires
export interface EditionFormData {
    name: string;
    year: number;
    start_date: string;
    end_date: string;
    registration_start_date: string;
    registration_deadline: string;
    max_participants: number;
    description: string;
    status: 'draft' | 'published' | 'active';
    is_current: boolean;
    [key: string]: unknown;
}

export interface PhaseFormData {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    order: number;
    location?: string;
    status: 'pending' | 'active' | 'completed';
    is_public: boolean;
    [key: string]: unknown;
}

export interface PrizeFormData {
    name: string;
    description: string;
    amount: number;
    currency: 'GNF' | 'EUR' | 'USD';
    max_winners: number;
    type: 'main' | 'secondary' | 'special' | 'sponsorship';
    [key: string]: unknown;
}

// Interfaces pour les modèles
export interface Edition {
    id: number;
    name: string;
    year: number;
    start_date: string;
    end_date: string;
    registration_start_date: string;
    registration_deadline: string;
    max_participants: number;
    description: string;
    status: string;
    is_current: boolean;
    created_at?: string;
    updated_at?: string;
    phases_count?: number;
    prizes_count?: number;
    participants_count?: number;
}

export interface Phase {
    id: number;
    edition_id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    order: number;
    status: 'pending' | 'active' | 'completed';
    location: string;
    color: string;
    icon: string;
    activities: string[];
    objective: string;
    created_at?: string;
    updated_at?: string;
}

export interface Prize {
    id: number;
    edition_id?: number;
    name: string;
    description: string;
    amount: number;
    currency: string;
    category: string;
    rank: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

// Interfaces pour les props des composants
export interface EditEditionProps {
    edition: Edition;
}

export interface EditionsPageProps {
    editions: {
        data: Edition[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export interface ShowEditionProps {
    edition: Edition;
}

export interface CreatePhaseProps {
    edition: Edition;
}

export interface EditPhaseProps {
    edition: Edition;
    phase: Phase;
}

export interface PhasesIndexProps {
    edition: Edition;
    phases: {
        data: Phase[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export interface ShowPhaseProps {
    edition: Edition;
    phase: Phase;
    prevPhase?: Phase;
    nextPhase?: Phase;
}

export interface CreatePrizeProps {
    edition: Edition;
}

export interface EditPrizeProps {
    edition: Edition;
    prize: Prize;
}

export interface PrizeIndexProps {
    edition: Edition;
    prizes: Prize[];
}
