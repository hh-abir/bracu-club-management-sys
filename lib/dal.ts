import pool from './db';
import { RowDataPacket } from 'mysql2';

export interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM Users WHERE email = ?';
    const [rows] = await pool.query<RowDataPacket[]>(query, [email]);

    if (rows.length === 0) return null;
    return rows[0] as User;
}

export async function getUserRole(userId: number) {
    const [ocaRows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM OCA WHERE user_id = ?',
        [userId]
    );
    if (ocaRows.length > 0) return { role: 'OCA', details: ocaRows[0] };

    const [panelRows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM Panel WHERE student_id = ?',
        [userId]
    );
    if (panelRows.length > 0) return { role: 'PANEL', details: panelRows[0] };


    return { role: 'STUDENT', details: null };
}

export async function getClubDetails(clubId: number) {
    const query = 'SELECT * FROM Clubs WHERE club_id = ?';
    const [rows] = await pool.query<RowDataPacket[]>(query, [clubId]);
    return rows[0];
}

export async function createEvent(eventData: any) {
    const query = `
    INSERT INTO Events (event_name, club_name, club_email, details, venue, date, time_slot, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

    await pool.query(query, [
        eventData.event_name,
        eventData.club_name,
        eventData.club_email,
        eventData.details,
        eventData.venue,
        eventData.date,
        eventData.time_slot
    ]);
}

export async function getEventsByClub(clubName: string) {
    const query = 'SELECT * FROM Events WHERE club_name = ? ORDER BY created_at DESC';
    const [rows] = await pool.query<RowDataPacket[]>(query, [clubName]);
    return rows;
}

export async function getAllPendingEvents() {
    const query = `
    SELECT * FROM Events 
    WHERE status = 'pending' 
    ORDER BY date ASC
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows;
}

export async function updateEventStatus(bookingId: number, status: 'approved' | 'rejected') {
    const query = 'UPDATE Events SET status = ? WHERE booking_id = ?';
    await pool.query(query, [status, bookingId]);
}

export async function getBudgetByEventId(bookingId: number) {
    const query = 'SELECT * FROM Budget WHERE booking_id = ?';
    const [rows] = await pool.query<RowDataPacket[]>(query, [bookingId]);
    return rows[0] || null;
}


export async function createBudget(bookingId: number, clubName: string, amount: number) {
    const query = `
    INSERT INTO Budget (booking_id, club_name, total_budget, status)
    VALUES (?, ?, ?, 'draft')
  `;
    await pool.query(query, [bookingId, clubName, amount]);
}

export async function getPendingBudgets() {
    const query = `
    SELECT b.budget_id, b.total_budget, b.club_name, e.event_name, e.date 
    FROM Budget b
    JOIN Events e ON b.booking_id = e.booking_id
    WHERE b.status = 'draft'
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows;
}

export async function updateBudgetStatus(budgetId: number, status: 'approved' | 'denied') {
    const query = 'UPDATE Budget SET status = ? WHERE budget_id = ?';
    await pool.query(query, [status, budgetId]);
}

export async function getReportByEventId(bookingId: number) {
    const query = 'SELECT * FROM EventReport WHERE booking_id = ?';
    const [rows] = await pool.query<RowDataPacket[]>(query, [bookingId]);
    return rows[0] || null;
}

export async function createEventReport(bookingId: number, summary: string, filePath: string) {
    const query = `
    INSERT INTO EventReport (booking_id, summary, file_path)
    VALUES (?, ?, ?)
  `;
    await pool.query(query, [bookingId, summary, filePath]);
}
