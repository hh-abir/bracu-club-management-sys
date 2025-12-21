import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSponsors } from '@/lib/dal';
import { Building2, Calendar, Phone, FileText, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function SponsorsPage() {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');


    if (session.role !== 'PANEL') redirect('/oca');

  
    const sponsors = await getSponsors(session.clubId);

    return (
        <div className="space-y-8">
          
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Sponsorships</h1>
                    <p className="text-slate-500">Manage partners and deals for your events.</p>
                </div>
               
                <Link
                    href="/club/events"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition shadow-sm"
                >
                    <Plus size={18} /> Add Sponsor
                </Link>
            </div>

           
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs font-bold text-slate-500 uppercase border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3">Sponsor Name</th>
                            <th className="px-6 py-3">Event</th>
                            <th className="px-6 py-3">Deal Details</th>
                            <th className="px-6 py-3">Contact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {sponsors.length > 0 ? (
                            sponsors.map((s: any) => (
                                <tr key={s.id} className="hover:bg-slate-50 transition">

                                   
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                                <Building2 size={20} />
                                            </div>
                                            <span className="font-bold text-slate-700">{s.name}</span>
                                        </div>
                                    </td>

                                   
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar size={16} className="text-slate-400" />
                                            <span>{s.event_name || 'General Sponsor'}</span>
                                        </div>
                                    </td>

                                    
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-2 max-w-xs">
                                            <FileText size={16} className="text-slate-400 mt-0.5 shrink-0" />
                                            <p className="text-slate-600 italic">"{s.deal}"</p>
                                        </div>
                                    </td>

                                
                                    <td className="px-6 py-4 text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="text-slate-400" />
                                            {s.contact || 'N/A'}
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <Building2 size={32} className="opacity-20" />
                                        <p>No sponsors found for your club events yet.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}