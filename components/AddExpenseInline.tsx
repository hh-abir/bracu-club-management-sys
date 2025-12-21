'use client';

import { useActionState } from 'react';
import { addExpenseAction } from '@/app/actions';
import { Plus } from 'lucide-react';

const initialState = { success: false, message: '' };

export default function AddExpenseInline() {
    const [state, formAction, isPending] = useActionState(addExpenseAction, initialState);

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-8">
            <h3 className="font-bold text-slate-800 mb-4">Record New Expense</h3>
            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                    <input name="description" required placeholder="e.g. Pizza for orientation" className="w-full p-2 border rounded-md text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount ($)</label>
                    <input type="number" step="0.01" name="amount" required placeholder="0.00" className="w-full p-2 border rounded-md text-sm" />
                </div>
                <button disabled={isPending} className="w-full bg-slate-900 text-white py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition">
                    {isPending ? 'Saving...' : 'Add Expense'}
                </button>
                {state.success && <p className="text-green-600 text-xs text-center">Saved!</p>}
            </form>
        </div>
    );
}
