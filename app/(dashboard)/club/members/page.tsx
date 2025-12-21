import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClubMembers } from '@/lib/dal';
import AddMemberForm from '@/components/AddMemberForm';
import MemberList from '@/components/MemberList';
import { UserPlus, Users } from 'lucide-react';

export default async function MembersPage() {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');

    if (session.role !== 'PANEL') redirect('/oca');

    const members = await getClubMembers(session.clubId);

    return (
        <div>
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                    <Users size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Club Members</h1>
                    <p className="text-slate-500">Manage your team and positions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-8">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <UserPlus size={20} /> Add New Member
                        </h2>
                        <AddMemberForm />
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <MemberList members={members} />
                </div>

            </div>
        </div>
    );
}