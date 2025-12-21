import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClubDetails, getEventsByClub } from '@/lib/dal';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { PlusCircle } from 'lucide-react';
import AnnouncementFeed from '@/components/AnnouncementFeed';
import CalendarView from '@/components/CalenderView';

export default async function ClubDashboard() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (!sessionCookie) redirect('/login');

    const session = JSON.parse(sessionCookie.value);
    if (session.role !== 'PANEL') redirect('/oca');

    const club = await getClubDetails(session.clubId);
    const events = await getEventsByClub(club.club_name);

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{club.club_name}</h1>
                    <p className="text-slate-500">Dashboard & Event Management</p>
                </div>


                <Link
                    href="/club/create-event"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all"
                >
                    <PlusCircle size={20} />
                    Request New Event
                </Link>
            </div>
            <AnnouncementFeed />



            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Events</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{events.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">
                        {events.filter((e: any) => e.status === 'approved').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
                    <p className="text-3xl font-bold text-amber-500 mt-1">
                        {events.filter((e: any) => e.status === 'pending').length}
                    </p>
                </div>
            </div>

            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Event History</h2>

                <div className="space-y-4">
                    {events.length > 0 ? (
                        events.map((event: any) => (
                            <EventCard key={event.booking_id} event={event} role="PANEL" />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 mb-3">
                                <PlusCircle size={24} />
                            </div>
                            <p className="text-lg font-medium text-slate-900">No events found</p>
                            <p className="text-slate-500 mb-4">Get started by requesting your first event.</p>
                            <Link href="/club/create-event" className="text-indigo-600 font-semibold hover:underline">
                                Create Event Now &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
