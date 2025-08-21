import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarHeader, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem,
    SidebarSeparator,
    SidebarGroup,
    SidebarGroupLabel
} from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LayoutGrid, Users, FileText, Award, ChartBar, CheckCircle, AlertCircle, Briefcase, Calendar, Clock, Settings } from 'lucide-react';
import AppLogo from './app-logo';



// Menu pour l'administrateur
const adminNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
        active: 'admin.dashboard'
    },
    {
        title: 'Candidatures',
        href: '#',
        icon: FileText,
        active: 'admin.applications.*',
        children: [
            {
                title: 'Liste des candidatures',
                href: route('admin.applications.index'),
                active: 'admin.applications.index'
            },
            {
                title: 'Évaluations',
                href: route('admin.applications.index', { filter: 'to_rate' }),
                active: 'admin.applications.index'
            },
            {
                title: 'Statistiques',
                href: route('admin.applications.index', { view: 'stats' }),
                active: 'admin.applications.index'
            }
        ]
    },
    {
        title: 'Éditions',
        href: route('admin.editions.index'),
        icon: Calendar,
        active: 'admin.editions.*'
    },
    {
        title: 'Utilisateurs',
        href: route('admin.users.index'),
        icon: Users,
        active: 'admin.users.*'
    }
];

// Menu pour le super administrateur
const superAdminNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestion des utilisateurs',
        href: route('admin.users.index'),
        active: 'admin.users.*',
        icon: Users,
    },
    {
        title: 'Statistiques globales',
        href: '/admin/statistiques',
        icon: ChartBar,
    },
    {
        title: 'Gestion des partenaires',
        href: '/admin/partenaires',
        icon: Briefcase,
    },
    {
        title: 'Gestion des éditions',
        href: '/admin/editions',
        active: 'admin.editions.*',
        icon: Calendar,
    },
    {
        title: 'Déroulement',
        href: '/deroulement',
        icon: Clock,
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
    {
        title: 'Déroulement',
        href: '/deroulement',
        icon: Clock,
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
    {
        title: 'Déroulement',
        href: '/deroulement',
        icon: Clock,
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
            <SidebarHeader className="p-3">
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

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <NavMain items={mainNavItems} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupLabel>Support</SidebarGroupLabel>
                    <NavFooter items={footerNavItems} />
                </SidebarGroup>
                <SidebarSeparator className="my-2" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
