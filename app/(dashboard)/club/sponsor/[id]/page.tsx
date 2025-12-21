'use client';

import { useActionState } from 'react';
import { addSponsorAction } from '@/app/actions';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Handshake, Plus, ArrowLeft, Save } from 'lucide-react';

const initialState = {
    success: false,
    message: '',
};

export default function SponsorPage() {
    const params = useParams();
    const bookingId = params.id;
    const [state, formAction, isPending] = useActionState(addSponsorAction, initialState);

    return (
        <div className="flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-lg">

                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                            <Handshake size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Add Sponsor</h1>
                            <p className="text-sm text-slate-500">Event ID #{bookingId}</p>
                        </div>
                    </div>
                    <Link href="/club" className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1">
                        <ArrowLeft size={16} /> Back
                    </Link>
                </div>

              
                {state?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium">✅ {state.message}</span>
                    </div>
                )}

                <form action={formAction} className="space-y-5">
                    <input type="hidden" name="booking_id" value={bookingId} />

                   
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                        <input
                            name="name"
                            required
                            placeholder="e.g. Red Bull"
                            className="w-full p-3 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                  
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Point of Contact</label>
                        <input
                            name="contact"
                            placeholder="e.g. John Smith (Manager)"
                            className="w-full p-3 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                  
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sponsorship Deal / Amount</label>
                        <textarea
                            name="deal"
                            required
                            rows={3}
                            placeholder="e.g. Providing 500 energy drinks and $1000 cash support."
                            className="w-full p-3 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold shadow-md transition-all disabled:opacity-50"
                    >
                        {isPending ? 'Saving...' : <><Plus size={18} /> Add Sponsor</>}
                    </button>
                </form>
            </div>
        </div>
    );
}