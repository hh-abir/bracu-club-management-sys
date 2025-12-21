import { reviewBudgetAction } from '@/app/actions';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function BudgetTable({ budgets, role }: { budgets: any[], role: 'OCA' | 'PANEL' }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project / Event</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Requested</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {budgets.length > 0 ? (
                        budgets.map((b: any) => (
                            <tr key={b.budget_id} className="hover:bg-slate-50/80 transition-colors group">

                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900">{b.event_name}</span>
                                        <span className="text-xs text-slate-500">{b.club_name}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <span className="font-mono text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                                        ${parseFloat(b.total_budget).toLocaleString()}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
                                        <Clock size={12} /> Pending
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    {role === 'OCA' ? (
                                        <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <form action={reviewBudgetAction.bind(null, b.budget_id, 'approved')}>
                                                <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Approve">
                                                    <CheckCircle size={20} />
                                                </button>
                                            </form>
                                            <form action={reviewBudgetAction.bind(null, b.budget_id, 'denied')}>
                                                <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Deny">
                                                    <XCircle size={20} />
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">Processing</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                No active budget proposals.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
