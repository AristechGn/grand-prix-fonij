import { AppSidebar } from '@/components/app-sidebar';
import { AppTopbar } from '@/components/app-topbar';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-background">
            <AppSidebar userRole="admin" />
            
            <div className="lg:pl-72">
                <AppTopbar />
                
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 