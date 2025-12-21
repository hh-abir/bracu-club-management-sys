'use client';

import { useActionState } from 'react';
import { submitEventAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const initialState = {
    success: false,
    message: '',
};

export default function CreateEventPage() {
    const [state, formAction, isPending] = useActionState(submitEventAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/club');
        }
    }, [state?.success, router]);

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl h-fit">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Request New Event</h1>
                    <Link href="/club" className="text-sm text-gray-500 hover:text-gray-700">← Back</Link>
                </div>

                <form action={formAction} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Name</label>
                        <input name="event_name" required className="mt-1 w-full p-2 border rounded-md text-black" placeholder="e.g. Tech Fest 2024" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" name="date" required className="mt-1 w-full p-2 border rounded-md text-black" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time Slot</label>
                            <input name="time_slot" required className="mt-1 w-full p-2 border rounded-md text-black" placeholder="e.g. 10:00 AM - 2:00 PM" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Venue</label>
                        <select name="venue" className="mt-1 w-full p-2 border rounded-md text-black">
                            <option value="Auditorium">Auditorium</option>
                            <option value="Seminar Hall">Seminar Hall</option>
                            <option value="Open Ground">Open Ground</option>
                            <option value="Lab 3">Lab 3</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Details / Proposal</label>
                        <textarea name="details" rows={4} className="mt-1 w-full p-2 border rounded-md text-black" placeholder="Describe the event purpose, guest list, etc."></textarea>
                    </div>

                    {state?.message && !state.success && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isPending ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
}