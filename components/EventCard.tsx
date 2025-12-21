import { reviewEventAction } from '@/app/actions';
import Link from 'next/link';
import { Calendar, MapPin, Check, X, DollarSign, FileText, Handshake } from 'lucide-react';

export default function EventCard({ event, role }: { event: any, role: 'OCA' | 'PANEL' }) {
    const isOCA = role === 'OCA';

    
    const hasBudget = !!event.budget_doc_status;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 mb-4">
            <div className="flex flex-col md:flex-row justify-between gap-6">

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusColor(event.status)}`}>
                            {event.status}
                        </span>

                        {hasBudget && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-blue-50 text-blue-600 border-blue-100">
                                Budget: {event.budget_doc_status}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{event.event_name}</h3>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5"><Calendar size={16} /> {new Date(event.date).toLocaleDateString()}</div>
                        <div className="flex items-center gap-1.5"><MapPin size={16} /> {event.venue}</div>
                    </div>

                    <p className="text-slate-600 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">{event.details}</p>
                </div>

                <div className="flex items-start pt-1">

                    {isOCA && event.status === 'pending' && (
                        <div className="flex gap-3">
                            <form action={reviewEventAction.bind(null, event.booking_id, 'approved')}>
                                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium"><Check size={16} /> Approve</button>
                            </form>
                            <form action={reviewEventAction.bind(null, event.booking_id, 'rejected')}>
                                <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium"><X size={16} /> Reject</button>
                            </form>
                        </div>
                    )}

                    {!isOCA && event.status === 'approved' && (
                        <div className="flex flex-col sm:flex-row gap-2">

                            
                            
                            {!hasBudget && (
                                <Link
                                    href={`/club/budget/${event.booking_id}`}
                                    className="flex items-center justify-center gap-2 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                >
                                    <DollarSign size={16} /> Create Budget
                                </Link>
                            )}

                            <Link href={`/club/sponsor/${event.booking_id}`} className="flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                <Handshake size={16} /> Sponsors
                            </Link>

                            <Link href={`/club/report/${event.booking_id}`} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                <FileText size={16} /> Report
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
