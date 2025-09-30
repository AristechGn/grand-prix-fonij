import { Link, usePage } from '@inertiajs/react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});


  // Fonction simple qui vérifie si l'URL actuelle correspond à l'URL de l'élément
  const isActive = (item: NavItem): boolean => {
    if (!item || !item.href) return false;
    
    // Si l'URL correspond exactement
    if (item.href === url) return true;
    
    // Si nous avons un pattern "active" (comme "admin.editions.*")
    if (item.active) {
      try {
        return typeof route === 'function' && route().current(item.active);
      } catch (error) {
        console.error('Erreur route().current:', error); // Log pour déboguer
        return false;
      }
    }
    
    // Vérifier si un sous-menu est actif
    if (item.children) {
      return item.children.some(child => isActive(child));
    }
    
    return false;
  };

  const toggleMenu = (title: string) => {
    console.log('Toggle menu:', title); // Log pour déboguer
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderMenuItem = (item: NavItem) => {
    // console.log('Rendering item:', item); // Log pour déboguer
    const active = isActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.title];

    if (hasChildren) {
      return (
        <SidebarMenuItem key={item.title}>
          <div className="space-y-1">
            <SidebarMenuButton 
              onClick={() => toggleMenu(item.title)}
              className={`w-full flex items-center justify-between p-2 rounded-lg ${
                active ? "text-white bg-green-600 hover:text-gray-200 hover:bg-green-700" : 
                "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span>{item.title}</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </SidebarMenuButton>
            
            <div className={`ml-4 space-y-1 ${isOpen ? 'block' : 'hidden'}`}>
              {item.children?.map((child) => (
                <Link
                  key={child.title}
                  href={child.href}
                  className={`flex items-center py-1.5 px-2 rounded-lg text-sm ${
                    isActive(child) 
                      ? "text-white bg-green-600 hover:text-gray-200 hover:bg-green-700" 
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton 
          asChild
          className={`w-full p-2 ${
            active ? "text-white bg-green-600 hover:text-gray-200 hover:bg-green-700" : 
            "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Link href={item.href} className="flex items-center">
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarMenu className={className}>
      {items.map(renderMenuItem)}
    </SidebarMenu>
  );
}
