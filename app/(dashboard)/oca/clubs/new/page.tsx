'use client';

import { useActionState } from 'react'; 
import { registerClubAction } from '@/app/actions';
import { Building2, Mail, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const initialState = { success: false, message: '' };

export default function NewClubPage() {
    const [state, formAction, isPending] = useActionState(registerClubAction, initialState);

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/oca/clubs" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Register New Club</h1>
                    <p className="text-gray-500">Create a new student organization entity.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                
                {/* Feedback Message */}
                {state?.message && (
                    <div className={`p-4 rounded-lg mb-6 text-sm font-medium flex items-center gap-2 ${
                        state.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {state.success ? '✅' : '⚠️'} {state.message}
                    </div>
                )}

                <form action={formAction} className="space-y-6">
                    
                    {/* Club Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Club Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 size={18} className="text-gray-400" />
                            </div>
                            <input 
                                name="club_name"
                                type="text" 
                                required
                                placeholder="e.g. Robotics Club"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Club Email */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Official Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input 
                                name="club_email"
                                type="email" 
                                required
                                placeholder="e.g. robotics@university.edu"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Registering...' : <><Save size={18} /> Register Club</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}