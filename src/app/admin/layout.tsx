import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="admin-shell min-h-screen bg-transparent flex flex-col">
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}
