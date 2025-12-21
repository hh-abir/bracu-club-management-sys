'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
    getUserByEmail,
    getUserRole,
    getClubDetails,
    createEvent,
    updateEventStatus,
    createBudget,
    getBudgetByEventId,
    updateBudgetStatus,
    getReportByEventId,
    createEventReport,
    addSponsor,
    addClubMember,
    removeClubMember,
    addExpense,
    createAnnouncement,
    getAnnouncements,
    getExpenses,
    getExpenseStats,
    getAllPendingEvents,

} from '@/lib/dal';
import { revalidatePath } from 'next/cache';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import pool from '@/lib/db';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
        return { message: 'Invalid email or password' };
    }

    const roleData = await getUserRole(user.user_id);

    const sessionData = {
        userId: user.user_id,
        name: user.name,
        role: roleData.role,
        clubId: roleData.role === 'PANEL' ? roleData!.details!.club_id : null
    };

    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify(sessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/'
    });

    if (roleData.role === 'OCA') {
        redirect('/oca');
    } else if (roleData.role === 'PANEL') {
        redirect('/club');
    } else {
        return { message: 'You are not authorized to access this panel.' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/login');
}
export async function submitEventAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) return { message: 'Unauthorized' };

    const session = JSON.parse(sessionCookie.value);

    const club = await getClubDetails(session.clubId);
    if (!club) return { message: 'Club not found' };

    const eventData = {
        event_name: formData.get('event_name'),
        club_name: club.club_name,
        club_email: club.club_email,
        details: formData.get('details'),
        venue: formData.get('venue'),
        date: formData.get('date'),   
        time_slot: formData.get('time_slot')
    };

    try {
        await createEvent(eventData);

        revalidatePath('/club');
        return { success: true, message: 'Event created successfully!' };
    } catch (error) {
        console.error(error);
        return { message: 'Failed to create event. Database error.' };
    }
}

export async function reviewEventAction(bookingId: number, status: 'approved' | 'rejected') {
   
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) return { message: 'Unauthorized' };
    const session = JSON.parse(sessionCookie.value);

    if (session.role !== 'OCA') {
        return { message: 'Only OCA can perform this action' };
    }

    
    await updateEventStatus(bookingId, status);

    revalidatePath('/oca');
}


export async function submitBudgetAction(prevState: any, formData: FormData) {
    const bookingId = parseInt(formData.get('booking_id') as string);
    const amount = parseFloat(formData.get('amount') as string);
    const clubName = formData.get('club_name') as string;

    if (!bookingId || !amount) {
        return { message: 'Invalid data' };
    }

  
    const existing = await getBudgetByEventId(bookingId);
    if (existing) {
        return { message: 'Budget already submitted for this event.' };
    }

    try {
       
        await createBudget(bookingId, clubName, amount);

       
        revalidatePath('/club');
        return { success: true, message: 'Budget submitted successfully!' };
    } catch (error) {
        console.error(error);
        return { message: 'Database error' };
    }
}

export async function reviewBudgetAction(budgetId: number, status: 'approved' | 'denied') {
    
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (!sessionCookie) return { message: 'Unauthorized' };

    const session = JSON.parse(sessionCookie.value);
    if (session.role !== 'OCA') return { message: 'Unauthorized' };

    
    await updateBudgetStatus(budgetId, status);

   
    revalidatePath('/oca');
}

