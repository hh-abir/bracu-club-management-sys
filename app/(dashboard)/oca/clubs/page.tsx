import { getAllClubsStats } from '@/lib/dal';
import Link from 'next/link';
import { Users, Calendar, DollarSign, Mail, Shield, Plus, Building2 } from 'lucide-react';

export default async function AllClubsPage() {
    const clubs = await getAllClubsStats();

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Registered Clubs</h1>
                    <p className="text-gray-500">Overview of all student organizations and their leadership.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Stat Badge */}
                    <div className="hidden md:flex bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm text-gray-500 items-center gap-2">
                        <Shield size={16} className="text-indigo-600" />
                        <span>Total: <span className="font-bold text-gray-900">{clubs.length}</span></span>
                    </div>

                    <Link 
                        href="/oca/clubs/new" 
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all active:scale-95"
                    >
                        <Plus size={18} /> Register New Club
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {clubs.length > 0 ? (
                    clubs.map((club: any) => (
                        <div key={club.club_id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
                            
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-100 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center font-bold text-xl shadow-inner">
                                        {club.club_name.substring(0, 1)}
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                        Active
                                    </span>
                                </div>
                                
                                <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{club.club_name}</h2>
                                <a href={`mailto:${club.club_email}`} className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1.5 mb-4 transition-colors">
                                    <Mail size={14} /> {club.club_email || 'No email set'}
                                </a>

                                {/* Leadership Info */}
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Current President</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold shadow-sm">
                                            {club.president_name ? club.president_name.substring(0, 1) : '?'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 leading-tight">{club.president_name || 'Vacant'}</p>
                                            {club.president_email && (
                                                <p className="text-xs text-gray-400 font-medium truncate max-w-[140px]">{club.president_email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Stats Footer */}
                            <div className="bg-gray-50/50 p-4 grid grid-cols-3 gap-2 text-center divide-x divide-gray-200">
                                <div className="px-2">
                                    <p className="text-lg font-bold text-slate-700">{club.member_count}</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide flex justify-center items-center gap-1">
                                        <Users size={10} /> Members
                                    </p>
                                </div>
                                <div className="px-2">
                                    <p className="text-lg font-bold text-slate-700">{club.event_count}</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide flex justify-center items-center gap-1">
                                        <Calendar size={10} /> Events
                                    </p>
                                </div>
                                <div className="px-2">
                                    <p className="text-lg font-bold text-slate-700">${parseInt(club.total_expenses).toLocaleString()}</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide flex justify-center items-center gap-1">
                                        <DollarSign size={10} /> Spent
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full p-16 text-center bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <Building2 size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Clubs Registered</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Get started by registering the first student organization in the system.</p>
                        <Link href="/oca/clubs/new" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-all">
                            <Plus size={18} /> Register First Club
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}