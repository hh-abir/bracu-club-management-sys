import mysql, { RowDataPacket, Pool } from 'mysql2/promise';


let pool: Pool;

if (process.env.NODE_ENV === 'production') {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '9632',
        database: 'university_club_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} else {
    if (!(global as any).mysqlPool) {
        (global as any).mysqlPool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '9632',
            database: 'university_club_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    pool = (global as any).mysqlPool;
}

export default pool;
