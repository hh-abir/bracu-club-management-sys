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


