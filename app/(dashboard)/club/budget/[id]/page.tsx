'use client';

import { useActionState } from 'react';
import { submitBudgetAction } from '@/app/actions';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const initialState = {
    success: false,
    message: '',
};

export default function BudgetPage() {
    
    const params = useParams();
    const bookingId = params.id;

    const [state, formAction, isPending] = useActionState(submitBudgetAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/club');
        }
    }, [state?.success, router]);

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-fit">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Submit Budget</h1>
                    <Link href="/club" className="text-sm text-gray-500 hover:text-gray-700">Cancel</Link>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                    Please enter the total estimated cost for Event ID #{bookingId}.
                </p>

                <form action={formAction} className="space-y-6">

                    
                    <input type="hidden" name="booking_id" value={bookingId} />
                   
                    <input type="hidden" name="club_name" value="Computer Club" />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Amount (USD)</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            min="0"
                            step="0.01"
                            className="mt-1 w-full p-2 border rounded-md text-black text-lg font-mono"
                            placeholder="0.00"
                        />
                    </div>

                    {state?.message && !state.success && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-300"
                    >
                        {isPending ? 'Submitting...' : 'Submit Budget Proposal'}
                    </button>
                </form>
            </div>
        </div>
    );
}