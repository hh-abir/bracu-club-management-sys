'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CalendarView({ events }: { events: any[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); 

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null); 
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    
    const getEventsForDay = (day: number) => {
        return events.filter(e => {
            const eDate = new Date(e.date);
            return eDate.getDate() === day && eDate.getMonth() === month && eDate.getFullYear() === year;
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-slate-800">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-slate-500"><ChevronLeft size={20} /></button>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-slate-500"><ChevronRight size={20} /></button>
                </div>
            </div>

          
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {d}
                    </div>
                ))}
            </div>

        
            <div className="grid grid-cols-7 auto-rows-fr">
                {days.map((day, idx) => (
                    <div
                        key={idx}
                        className={`min-h-[100px] border-b border-r border-gray-50 p-2 relative ${!day ? 'bg-gray-50/30' : 'hover:bg-blue-50/20 transition-colors'}`}
                    >
                        {day && (
                            <>
                                <span className={`text-sm font-medium ${day === new Date().getDate() && month === new Date().getMonth()
                                        ? 'bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full'
                                        : 'text-gray-500'
                                    }`}>
                                    {day}
                                </span>

                               
                                <div className="mt-2 space-y-1">
                                    {getEventsForDay(day as number).map(e => (
                                        <Link
                                            href={`/club/create-event?view=${e.booking_id}`} 
                                            key={e.booking_id}
                                            className={`block text-[10px] truncate px-1.5 py-0.5 rounded border ${e.status === 'approved' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                                    e.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}
                                            title={e.event_name}
                                        >
                                            {e.event_name}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
