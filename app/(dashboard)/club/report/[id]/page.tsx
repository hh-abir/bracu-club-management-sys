'use client';

import { useActionState } from 'react';
import { submitReportAction } from '@/app/actions';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { FileText, Upload, Save } from 'lucide-react';

const initialState = {
    success: false,
    message: '',
};

export default function ReportPage() {
    const params = useParams();
    const bookingId = params.id;
    const [state, formAction, isPending] = useActionState(submitReportAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/club');
        }
    }, [state?.success, router]);

    return (
        <div className="flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl">

                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Post-Event Report</h1>
                        <p className="text-sm text-slate-500">Submit documentation for Event ID #{bookingId}</p>
                    </div>
                </div>

                <form action={formAction} className="space-y-6">
                    <input type="hidden" name="booking_id" value={bookingId} />

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Event Summary</label>
                        <textarea
                            name="summary"
                            required
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
                            placeholder="How did the event go? How many attendees? Any issues?"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Proof (Image/PDF)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                            <input
                                type="file"
                                name="file"
                                required
                                accept="image/*,application/pdf"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-2 text-slate-500">
                                <Upload size={32} />
                                <span className="text-sm font-medium">Click to upload file</span>
                                <span className="text-xs text-gray-400">JPG, PNG, PDF up to 5MB</span>
                            </div>
                        </div>
                    </div>

                    {state?.message && !state.success && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            ⚠️ {state.message}
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Link href="/club" className="flex-1 py-2.5 text-center border border-gray-300 rounded-lg text-slate-600 hover:bg-gray-50 font-medium">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-all disabled:opacity-50"
                        >
                            {isPending ? 'Uploading...' : <><Save size={18} /> Submit Report</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}