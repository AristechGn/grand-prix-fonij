import { Link, usePage } from '@inertiajs/react';
import { LogOut, Settings, User } from 'lucide-react';
import { SharedData } from '@/types';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function NavUser() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;
  const { state } = useSidebar();

  // Obtenir les initiales de l'utilisateur
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || ''} alt={`${user.first_name || ''} ${user.last_name || ''}`} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                    {getInitials(`${user.first_name || ''} ${user.last_name || ''}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${user.first_name || ''} ${user.last_name || ''}`}</span>
                  <span className="truncate text-xs">{user.email || ''}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="ml-auto size-8 rounded-md p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Menu utilisateur</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={route('profile.edit')} className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={route('logout')} method="post" className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Déconnexion</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuButton>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="mb-2">
                <div className="grid gap-1.5 text-sm">
                  <div className="font-semibold">{`${user.first_name || ''} ${user.last_name || ''}`}</div>
                  <div className="text-xs text-muted-foreground">{user.email || ''}</div>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
