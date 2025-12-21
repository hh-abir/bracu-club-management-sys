'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions';
import { ArrowRight, Lock, Mail, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

const initialState = {
    message: '',
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">

            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-slate-900 h-full">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 text-white group">
                        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">U</div>
                        <span className="text-2xl font-bold tracking-tight">BRACU<span className="text-indigo-400">CMS</span></span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <blockquote className="text-2xl font-medium text-white leading-relaxed mb-6">
                        "The platform completely transformed how we manage our events. Approvals that used to take weeks now happen in hours."
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-slate-800">
                            S
                        </div>
                        <div>
                            <p className="text-white font-bold text-base">Sarah Jenkins</p>
                            <p className="text-indigo-300 font-medium text-sm">President, Debate Society</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex items-center justify-center h-full w-full bg-slate-950 relative overflow-y-auto">

                <div className="w-full max-w-[400px] px-6 py-8">

                    <div className="text-center lg:text-left mb-8">
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome back</h1>
                        <p className="text-slate-400 text-sm">Enter your details to access your dashboard.</p>
                    </div>

                    <form action={formAction} className="space-y-5">

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@university.edu"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {state?.message && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs animate-pulse">
                                <span className="text-base">⚠️</span> {state.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                        >
                            {isPending ? 'Signing in...' : <><LayoutDashboard size={18} /> Sign In to Portal</>}
                        </button>

                        <div className="text-center pt-1">
                            <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors inline-flex items-center gap-1 hover:underline decoration-slate-700 underline-offset-4">
                                <ArrowRight size={12} className="rotate-180" /> Back to Homepage
                            </Link>
                        </div>

                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800/50">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 text-center">Demo Accounts</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#0f1420] p-3 rounded-lg border border-slate-800/60 hover:border-indigo-500/30 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:animate-pulse"></div>
                                    <p className="text-white font-bold text-xs">Admin</p>
                                </div>
                                <p className="text-slate-400 font-mono text-[10px] select-all">director@univ.edu</p>
                            </div>
                            <div className="bg-[#0f1420] p-3 rounded-lg border border-slate-800/60 hover:border-emerald-500/30 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-pulse"></div>
                                    <p className="text-white font-bold text-xs">Club Panel</p>
                                </div>
                                <p className="text-slate-400 font-mono text-[10px] select-all">president@club.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}