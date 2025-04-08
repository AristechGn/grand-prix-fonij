import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LayoutGrid, Users, FileText, Settings, Award, ChartBar, CheckCircle, AlertCircle, Shield, Database, Briefcase, MessageSquare, Calendar, CreditCard } from 'lucide-react';
import AppLogo from './app-logo';



// Menu pour l'administrateur
const adminNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des candidats',
        href: '/candidats',
        icon: Users,
    },
    {
        title: 'Projets soumis',
        href: '/projets',
        icon: FileText,
    },
    {
        title: 'Planification des entretiens',
        href: '/entretiens',
        icon: Calendar,
    },
    {
        title: 'Évaluation des projets',
        href: '/evaluations',
        icon: CheckCircle,
    },
    {
        title: 'Programmes d\'accompagnement',
        href: '/programmes',
        icon: Award,
    },
    {
        title: 'Paramètres',
        href: '/parametres',
        icon: Settings,
    },
];

// Menu pour le super administrateur
const superAdminNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des utilisateurs',
        href: '/utilisateurs',
        icon: Users,
    },
    {
        title: 'Gestion des rôles',
        href: '/roles',
        icon: Shield,
    },
    {
        title: 'Configuration système',
        href: '/systeme',
        icon: Database,
    },
    {
        title: 'Statistiques globales',
        href: '/statistiques',
        icon: ChartBar,
    },
    {
        title: 'Gestion des partenaires',
        href: '/partenaires',
        icon: Briefcase,
    },
    {
        title: 'Messagerie',
        href: '/messages',
        icon: MessageSquare,
    },
    {
        title: 'Financement',
        href: '/financement',
        icon: CreditCard,
    },
    {
        title: 'Journal des activités',
        href: '/logs',
        icon: AlertCircle,
    },
];

const juryNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des candidats',
        href: '/candidats',
        icon: Users,
    },  
    {
        title: 'Gestion des projets',
        href: '/projets',
        icon: FileText,
    },
    {
        title: 'Gestion des entretiens',
        href: '/entretiens',
        icon: Calendar,
    },
    {
        title: 'Gestion des évaluations',
        href: '/evaluations',
        icon: CheckCircle,
    },
    {
        title: 'Gestion des programmes',
        href: '/programmes',
        icon: Award,
    },
];

const candidatNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des projets',
        href: '/projets',
        icon: FileText,
    },
    
];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: '/docs',
        icon: BookOpen,
    },
    {
        title: 'Support',
        href: '/support',
        icon: AlertCircle,
    },
];

interface AppSidebarProps {
    userRole?: 'super_admin' | 'admin' | 'user' | 'candidat' | 'jury';
}

export function AppSidebar({ userRole = 'user' }: AppSidebarProps) {
    
    const { auth } = usePage<SharedData>().props;
    userRole = auth.user.role;
    // Déterminer quels éléments de navigation afficher en fonction du rôle
    const mainNavItems = userRole === 'super_admin' 
        ? superAdminNavItems 
        : userRole === 'admin' 
            ? adminNavItems 
            : userRole === 'jury'
                ? juryNavItems
                : userRole === 'candidat'
                    ? candidatNavItems
                    : [];
    

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={userRole === 'user' ? '/dashboard' : `/${userRole}/dashboard`} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
