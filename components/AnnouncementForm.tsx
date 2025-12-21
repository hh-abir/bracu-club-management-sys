'use client';

import { useActionState } from 'react'; 
import { postAnnouncementAction } from '@/app/actions';
import { Megaphone, Send } from 'lucide-react';

const initialState = { success: false, message: '' };

export default function AnnouncementForm() {
    const [state, formAction, isPending] = useActionState(postAnnouncementAction, initialState);

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                    <Megaphone size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Make an Announcement</h2>
            </div>

            <form action={formAction}>
                <textarea
                    name="description"
                    placeholder="What do you want to tell the clubs?"
                    rows={3}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-slate-700 placeholder:text-slate-400"
                />

                <div className="flex items-center justify-between mt-4">
                   
                    <div className="text-sm">
                        {state?.success && <span className="text-emerald-600 font-medium">✅ Posted!</span>}
                        {state?.success === false && state.message && <span className="text-red-500">{state.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Posting...' : <><Send size={16} /> Post Update</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
