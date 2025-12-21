import Sidebar from '@/components/Sidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) redirect('/login');
    const user = JSON.parse(sessionCookie.value);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
            <Sidebar user={user} />

            <main className="ml-72 p-10 min-h-screen">
                <div className="max-w-6xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
