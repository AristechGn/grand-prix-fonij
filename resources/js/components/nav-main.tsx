import { Link, usePage } from '@inertiajs/react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';

interface NavMainProps {
  items: NavItem[];
  className?: string;
}

// Cette fonction globale est définie par Laravel mais TypeScript ne la connaît pas
declare function route(): {
  current: (name: string) => boolean;
};

export function NavMain({ items, className }: NavMainProps) {
  const { url } = usePage();

  // Fonction simple qui vérifie si l'URL actuelle correspond à l'URL de l'élément
  const isActive = (item: NavItem): boolean => {
    if (!item || !item.href) return false;
    
    // Si l'URL correspond exactement
    if (item.href === url) return true;
    
    // Si nous avons un pattern "active" (comme "admin.editions.*")
    if (item.active) {
      try {
        return typeof route === 'function' && route().current(item.active);
      } catch {
        // Si route() échoue, on repose sur la comparaison d'URL
        return false;
      }
    }
    
    return false;
  };

  return (
    <SidebarMenu className={className}>
      {items.map((item, index) => {
        const active = isActive(item);
        return (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton 
              asChild
              tooltip={item.title}
              className={active ? "text-white bg-green-600 hover:text-gray-200 hover:bg-green-700" : ""}
            >
              <Link href={item.href}>
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
