import { Link, usePage } from '@inertiajs/react';
import { LogOut, Settings, User } from 'lucide-react';
import { SharedData } from '@/types';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarMenuAction,
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

export function NavUser() {
  const { auth } = usePage<SharedData>().props;
  const user = auth.user;

  // Obtenir les initiales de l'utilisateur
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-between w-full p-2 hover:bg-accent/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || ''} alt={`${user.first_name || ''} ${user.last_name || ''}`} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                {getInitials(`${user.first_name || ''} ${user.last_name || ''}`)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">{`${user.first_name || ''} ${user.last_name || ''}`}</span>
              <span className="text-xs text-muted-foreground">{user.email || ''}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="h-8 w-8 p-2 rounded-lg hover:bg-accent">
                <Settings className="h-4 w-4" />
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
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
