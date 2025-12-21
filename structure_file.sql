CREATE DATABASE IF NOT EXISTS university_club_db;
USE university_club_db;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    notifications JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(255) NOT NULL UNIQUE,
    club_email VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS OCA (
    user_id INT PRIMARY KEY,
    designation VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Events (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    club_name VARCHAR(255),
    club_email VARCHAR(255),
    details TEXT,
    venue VARCHAR(255),
    date DATE NOT NULL,
    time_slot VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Announcement (
    ann_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ClubMembers (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT,
    user_id INT,
    position VARCHAR(100),
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Panel (
    panel_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT,
    student_id INT, -- References Users.user_id
    position VARCHAR(100),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ClubExpense (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT,
    amount DECIMAL(10, 2),
    description VARCHAR(255),
    year YEAR,
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Budget (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNIQUE, 
    total_budget DECIMAL(10, 2),
    status ENUM('draft', 'approved', 'denied') DEFAULT 'draft',
    club_name VARCHAR(255),
    FOREIGN KEY (booking_id) REFERENCES Events(booking_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS EventReport (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT UNIQUE,
    file_path VARCHAR(500), 
    summary TEXT,
    FOREIGN KEY (booking_id) REFERENCES Events(booking_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Sponsor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    name VARCHAR(255),
    deal TEXT,
    contact VARCHAR(255),
    FOREIGN KEY (booking_id) REFERENCES Events(booking_id) ON DELETE CASCADE
);
