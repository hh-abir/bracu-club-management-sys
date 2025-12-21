import { getAllPendingEvents, getAnnouncements, getPendingBudgets, getAllReports } from '@/lib/dal';
import EventCard from '@/components/EventCard';
import BudgetTable from '@/components/BudgetTable';
import AnnouncementFeed from '@/components/AnnouncementFeed';
import CalendarView from '@/components/CalenderView';
import AnnouncementForm from '@/components/AnnouncementForm';
import { ExternalLink, Megaphone } from 'lucide-react';

export default async function OCADashboard() {
    const [events, budgets, reports, announcements] = await Promise.all([
        getAllPendingEvents(),
        getPendingBudgets(),
        getAllReports(),
        getAnnouncements()
    ]);

    return (
        <div className="max-w-7xl mx-auto space-y-10">

            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
                <p className="text-gray-500 mt-1">Manage approvals, budgets, and club communications.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                <div className="xl:col-span-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Event Calendar</h2>
                        <CalendarView events={events} />
                    </div>
                </div>

                <div className="space-y-6">
                    <AnnouncementForm />

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-2 mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-100">
                            <Megaphone size={18} className="text-indigo-600" />
                            <h2 className="text-lg font-bold text-gray-700">Live Announcements</h2>
                        </div>
                        <AnnouncementFeed />
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Pending Events</h2>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                            {events.length}
                        </span>
                    </div>
                    <div className="space-y-4">
                        {events.length > 0 ? (
                            events.map((event: any) => (
                                <EventCard key={event.booking_id} event={event} role="OCA" />
                            ))
                        ) : (
                            <div className="p-8 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center text-gray-400 italic">
                                No pending events to review.
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Pending Budgets</h2>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
                            {budgets.length}
                        </span>
                    </div>
                    <BudgetTable budgets={budgets} role="OCA" />
                </section>
            </div>

            <section className="pt-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Recent Event Reports</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.length > 0 ? (
                        reports.map((report: any) => (
                            <div key={report.report_id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex gap-4">

                                <div className="h-24 w-24 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center text-slate-400">
                                    {report.file_path.endsWith('.pdf') ? (
                                        <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded">PDF</span>
                                    ) : (
                                        <img src={report.file_path} alt="Proof" className="w-full h-full object-cover" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 truncate">{report.event_name}</h3>
                                    <p className="text-xs text-indigo-600 font-medium mb-2">{report.club_name}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2 italic mb-2">"{report.summary}"</p>

                                    <a href={report.file_path} target="_blank" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                                        View Full Proof <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic col-span-2 text-center py-8">No reports submitted yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}