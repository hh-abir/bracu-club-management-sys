'use client';

import { removeMemberAction } from '@/app/actions';
import { Trash2, UserCircle } from 'lucide-react';

export default function MemberList({ members }: { members: any[] }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name / Email</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {members.length > 0 ? (
                            members.map((m) => (
                                <tr key={m.member_id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-50 text-indigo-500 p-2 rounded-full">
                                                <UserCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{m.name}</p>
                                                <p className="text-xs text-slate-500">{m.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {m.position}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <form action={removeMemberAction.bind(null, m.member_id)}>
                                            <button
                                                className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                title="Remove Member"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                                    No members found. Add someone to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
