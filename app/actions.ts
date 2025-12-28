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
export async function submitReportAction(prevState: any, formData: FormData) {
    const bookingId = parseInt(formData.get('booking_id') as string);
    const summary = formData.get('summary') as string;
    const file = formData.get('file') as File;

    if (!file || file.size === 0) {
        return { message: 'Please upload a valid file.' };
    }

    const existing = await getReportByEventId(bookingId);
    if (existing) {
        return { message: 'Report already submitted.' };
    }

    try {
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        await mkdir(uploadDir, { recursive: true });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(path.join(uploadDir, fileName), buffer);

        const dbPath = `/uploads/${fileName}`;
        await createEventReport(bookingId, summary, dbPath);

        revalidatePath('/club');
        return { success: true, message: 'Report submitted successfully!' };

    } catch (error) {
        console.error('Upload Error:', error);
        return { message: 'Failed to upload report. Check server logs.' };
    }
}


type ActionState = {
    success: boolean;
    message: string;
};

export async function addSponsorAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');

    if (!session.clubId) {
        return { success: false, message: 'Unauthorized: No club session found.' };
    }

    const bookingId = formData.get('booking_id') as string;
    const name = formData.get('name') as string;
    const contact = formData.get('contact') as string;
    const deal = formData.get('deal') as string;

    if (!name || !deal) {
        return { success: false, message: 'Please fill in the Company Name and Deal details.' };
    }

    try {
        const query = 'INSERT INTO Sponsor (booking_id, name, contact, deal) VALUES (?, ?, ?, ?)';

        const validBookingId = bookingId && bookingId !== 'undefined' ? parseInt(bookingId) : null;

        await pool.query(query, [validBookingId, name, contact, deal]);

        revalidatePath('/club');
        revalidatePath(`/club/events/${bookingId}`);

        return { success: true, message: 'Sponsor added successfully!' };

    } catch (error) {
        console.error('Database Error:', error);
        return { success: false, message: 'Failed to save sponsor. Please try again.' };
    }
}

export async function addMemberAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');

    const email = formData.get('email') as string;
    const position = formData.get('position') as string;

    if (!session.clubId) return { message: 'Unauthorized' };

    try {
        await addClubMember(session.clubId, email, position);
        revalidatePath('/club/members');
        return { success: true, message: 'Member added successfully!' };
    } catch (error: any) {
        return { message: error.message || 'Failed to add member.' };
    }
}

export async function removeMemberAction(memberId: number) {
    await removeClubMember(memberId);
    revalidatePath('/club/members');
}
export async function addExpenseAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');

    const amount = parseFloat(formData.get('amount') as string);
    const description = formData.get('description') as string;
    const year = new Date().getFullYear();

    if (!session.clubId) return { message: 'Unauthorized' };

    try {
        await addExpense(session.clubId, amount, description, year);
        revalidatePath('/club/finance');
        return { success: true, message: 'Expense recorded.' };
    } catch (error) {
        return { message: 'Database error.' };
    }
}

export async function postAnnouncementAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');

    if (session.role !== 'OCA') {
        return { success: false, message: 'Unauthorized' };
    }

    const description = formData.get('description') as string;

    if (!description || description.trim().length === 0) {
        return { success: false, message: 'Announcement cannot be empty.' };
    }

    try {
        const query = 'INSERT INTO Announcement (user_id, description) VALUES (?, ?)';
        await pool.query(query, [session.userId, description]);

        revalidatePath('/oca');
        return { success: true, message: 'Announcement posted successfully!' };
    } catch (error) {
        console.error('Announcement Error:', error);
        return { success: false, message: 'Failed to post announcement.' };
    }
}



export async function registerClubAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const session = JSON.parse(cookieStore.get('session')?.value || '{}');

    if (session.role !== 'OCA') {
        return { success: false, message: 'Unauthorized' };
    }

    const clubName = formData.get('club_name') as string;
    const clubEmail = formData.get('club_email') as string;

    try {
        await pool.query('INSERT INTO Clubs (club_name, club_email) VALUES (?, ?)', [clubName, clubEmail]);
        revalidatePath('/oca/clubs');
        return { success: true, message: 'Club registered successfully!' };
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'A club with this name already exists.' };
        }
        return { success: false, message: 'Database error. Please try again.' };
    }
}