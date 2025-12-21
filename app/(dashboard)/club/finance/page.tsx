import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getExpenses, getExpenseStats, getClubEventBudgets } from '@/lib/dal';
import ExpenseChart from '@/components/ExpenseChart';
import AddExpenseInline from '@/components/AddExpenseInline';
import { TrendingUp, FileText, AlertCircle, CheckCircle, Wallet, PiggyBank } from 'lucide-react';

export default async function FinancePage() {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');
    if (session.role !== 'PANEL') redirect('/oca');

    const [expenses, stats, budgetRequests] = await Promise.all([
        getExpenses(session.clubId),
        getExpenseStats(session.clubId),
        getClubEventBudgets(session.clubId)
    ]);
    const totalSpent = expenses.reduce((sum: number, item: any) => sum + (parseFloat(item.amount) || 0), 0);

    const totalAllocated = budgetRequests.reduce((sum: number, item: any) => {
        if (item.budget_status === 'approved') {
            return sum + (parseFloat(item.budget_allocated) || 0);
        }
        return sum;
    }, 0);

    const remainingBudget = totalAllocated - totalSpent;

    return (
        <div className="space-y-8">

            <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Finance & Analytics</h1>
                    <p className="text-slate-500">Track spending, budgets, and remaining funds.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Allocated</p>
                        <h3 className="text-2xl font-bold text-slate-900">${totalAllocated.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Spent</p>
                        <h3 className="text-2xl font-bold text-slate-900">${totalSpent.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl text-white shadow-lg flex items-center gap-4">
                    <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30">
                        <PiggyBank size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Budget</p>
                        <h3 className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-400' : 'text-white'}`}>
                            ${remainingBudget.toLocaleString()}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <FileText size={18} className="text-indigo-500" /> Event Budget Requests
                    </h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs font-bold text-slate-500 uppercase border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3">Event Name</th>
                            <th className="px-6 py-3">Requested</th>
                            <th className="px-6 py-3">Approved</th>
                            <th className="px-6 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {budgetRequests.length > 0 ? (
                            budgetRequests.map((b: any, i: number) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-800">{b.event_name}</td>
                                    <td className="px-6 py-4 text-slate-500">${b.budget_requested}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        {b.budget_status === 'approved' ? `$${b.budget_allocated}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${b.budget_status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                b.budget_status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-amber-100 text-amber-700'}`}>
                                            {b.budget_status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={4} className="p-6 text-center text-slate-400">No budget requests found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ExpenseChart data={stats} />
                </div>
                <div>
                    <AddExpenseInline />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-700 mb-4">Expense History</h3>
                <ul className="space-y-3">
                    {expenses.map((e: any) => (
                        <li key={e.expense_id} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                            <span className="text-slate-600">{e.description}</span>
                            <span className="font-mono text-slate-900 font-bold">-${e.amount}</span>
                        </li>
                    ))}
                    {expenses.length === 0 && <p className="text-slate-400 italic">No expenses recorded.</p>}
                </ul>
            </div>

        </div>
    );
}