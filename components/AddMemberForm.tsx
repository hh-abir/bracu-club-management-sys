'use client';

import { useActionState } from 'react';
import { addMemberAction } from '@/app/actions';
import { Plus } from 'lucide-react';

const initialState = {
    success: false,
    message: '',
};

export default function AddMemberForm() {
    const [state, formAction, isPending] = useActionState(addMemberAction, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">User Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@univ.edu"
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1">User must be registered in the system first.</p>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Position</label>
                <select
                    name="position"
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                >
                    <option value="Member">General Member</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Vice President">Vice President</option>
                    <option value="Volunteer">Volunteer</option>
                </select>
            </div>

            {state?.message && (
                <div className={`p-3 rounded-lg text-xs font-medium ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold shadow-sm transition-all disabled:opacity-50 text-sm"
            >
                {isPending ? 'Adding...' : <><Plus size={16} /> Add Member</>}
            </button>
        </form>
    );
}
