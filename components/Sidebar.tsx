import Link from 'next/link';
import { logout } from '@/app/actions';
import {
    LayoutDashboard,
    PlusCircle,
    LogOut,
    User,
    ChevronRight,
    Users,
    TrendingUp,
    Handshake,
    Tent
} from 'lucide-react';

interface UserProps {
    role: 'OCA' | 'PANEL';
    name: string;
}

interface SidebarItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export default function Sidebar({ user }: { user: UserProps }) {
    const isOCA = user.role === 'OCA';

    return (
        <aside className="w-72 bg-slate-900 text-slate-300 min-h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800 font-sans z-40">

            <div className="h-20 flex items-center px-8 border-b border-slate-800/60 bg-slate-900">
                <Link href={isOCA ? '/oca' : '/club'} className="flex items-center gap-2 text-white">
                    <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                        U
                    </div>
                    <span className="text-lg font-bold tracking-tight">BRACU<span className="text-indigo-400">CMS</span></span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto custom-scrollbar">

                <div>
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Overview
                    </p>
                    <div className="space-y-1">
                        {isOCA ? (
                            <>
                            <SidebarItem href="/oca" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                            <SidebarItem href="/oca/clubs" icon={<Tent size={20} />} label="Clubs" />

                            </>
                        ) : (
                            <>
                                <SidebarItem href="/club" icon={<LayoutDashboard size={20} />} label="My Club" />
                                <SidebarItem href="/club/members" icon={<Users size={20} />} label="Members" />
                                <SidebarItem href="/club/sponsors" icon={<Handshake size={20} />} label="Sponsors" />
                                <SidebarItem href="/club/finance" icon={<TrendingUp size={20} />} label="Finance" />
                            </>
                        )}
                    </div>
                </div>

                {!isOCA && (
                    <div>
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Management
                        </p>
                        <div className="space-y-1">
                            <SidebarItem href="/club/create-event" icon={<PlusCircle size={20} />} label="Request Event" />
                        </div>
                    </div>
                )}
            </nav>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                        <User size={18} />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate w-32">{user.name}</p>
                        <p className="text-xs text-slate-500">{isOCA ? 'Admin' : 'Club Panel'}</p>
                    </div>
                </div>

                <form action={logout}>
                    <button className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2.5 rounded-md transition-colors text-sm font-medium">
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>
    );
}

function SidebarItem({ href, icon, label }: SidebarItemProps) {
    return (
        <Link
            href={href}
            className="group flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-all text-slate-400"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
        </Link>
    );
}
