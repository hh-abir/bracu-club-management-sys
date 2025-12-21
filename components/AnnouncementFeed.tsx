import { getAnnouncements } from '@/lib/dal';
import { Bell } from 'lucide-react';

export default async function AnnouncementFeed() {
    const announcements = await getAnnouncements();

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
                <Bell size={20} />
                <h3 className="font-bold">Latest Announcements</h3>
            </div>
            <div className="space-y-4">
                {announcements.map((a: any) => (
                    <div key={a.ann_id} className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-sm font-medium">{a.description}</p>
                        <p className="text-xs text-indigo-100 mt-1 opacity-75">
                            Posted by {a.name} • {new Date(a.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
                {announcements.length === 0 && <p className="text-sm opacity-80">No news yet.</p>}
            </div>
        </div>
    );
}
