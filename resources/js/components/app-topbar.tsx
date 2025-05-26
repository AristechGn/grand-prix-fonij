import { Button } from '@/components/ui/button';
import { Bell, Menu } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function AppTopbar() {
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Ouvrir la barre latérale</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex flex-1"></div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Voir les notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </Button>

                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                    {/* Profile dropdown */}
                    <Link href={route('profile.edit')} className="flex items-center gap-x-4 lg:gap-x-6">
                        <img
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        <span className="hidden lg:flex lg:items-center">
                            <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                Tom Cook
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
} 