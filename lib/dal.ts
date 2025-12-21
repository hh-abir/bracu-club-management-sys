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
export async function getAllReports() {
    const query = `
    SELECT r.*, e.event_name, e.club_name, e.date
    FROM EventReport r
    JOIN Events e ON r.booking_id = e.booking_id
    ORDER BY r.report_id DESC
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows;
}

export async function addSponsor(bookingId: number, name: string, deal: string, contact: string) {
    const query = `
    INSERT INTO Sponsor (booking_id, name, deal, contact)
    VALUES (?, ?, ?, ?)
  `;
    await pool.query(query, [bookingId, name, deal, contact]);
}


export async function getSponsorsByEvent(bookingId: number) {
    const query = 'SELECT * FROM Sponsor WHERE booking_id = ?';
    const [rows] = await pool.query<RowDataPacket[]>(query, [bookingId]);
    return rows;
}

export async function getClubMembers(clubId: number) {
    const query = `
    SELECT cm.member_id, cm.position, cm.status, u.name, u.email 
    FROM ClubMembers cm
    JOIN Users u ON cm.user_id = u.user_id
    WHERE cm.club_id = ?
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query, [clubId]);
    return rows;
}

export async function addClubMember(clubId: number, email: string, position: string) {
    const [users] = await pool.query<RowDataPacket[]>('SELECT user_id FROM Users WHERE email = ?', [email]);

    if (users.length === 0) {
        throw new Error('User not found. They must register first.');
    }

    const userId = users[0].user_id;

    const query = `
    INSERT INTO ClubMembers (club_id, user_id, position, status)
    VALUES (?, ?, ?, 'active')
  `;
    await pool.query(query, [clubId, userId, position]);
}

export async function removeClubMember(memberId: number) {
    const query = 'DELETE FROM ClubMembers WHERE member_id = ?';
    await pool.query(query, [memberId]);
}
export async function addExpense(clubId: number, amount: number, description: string, year: number) {
    const query = 'INSERT INTO ClubExpense (club_id, amount, description, year) VALUES (?, ?, ?, ?)';
    await pool.query(query, [clubId, amount, description, year]);
}

export async function getExpenses(clubId: number) {
    const query = 'SELECT * FROM ClubExpense WHERE club_id = ? ORDER BY expense_id DESC';
    const [rows] = await pool.query<RowDataPacket[]>(query, [clubId]);
    return rows;
}

export async function getExpenseStats(clubId: number) {
    const query = `
    SELECT year, SUM(amount) as total 
    FROM ClubExpense 
    WHERE club_id = ? 
    GROUP BY year 
    ORDER BY year ASC
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query, [clubId]);
    return rows;
}

export async function createAnnouncement(userId: number, description: string) {
    await pool.query('INSERT INTO Announcement (user_id, description) VALUES (?, ?)', [userId, description]);
}

export async function getAnnouncements() {
    const query = `
        SELECT a.*, u.name as author_name 
        FROM Announcement a
        JOIN Users u ON a.user_id = u.user_id 
        ORDER BY a.created_at DESC
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows;
}

export async function getPublicEvents() {
    const query = `
    SELECT * FROM Events 
    WHERE status = 'approved' AND date >= CURDATE()
    ORDER BY date ASC 
    LIMIT 6
  `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows;
}
