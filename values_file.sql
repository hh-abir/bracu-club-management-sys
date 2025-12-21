USE university_club_db;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Sponsor;
TRUNCATE TABLE EventReport;
TRUNCATE TABLE Budget;
TRUNCATE TABLE ClubExpense;
TRUNCATE TABLE Panel;
TRUNCATE TABLE ClubMembers;
TRUNCATE TABLE Announcement;
TRUNCATE TABLE Events;
TRUNCATE TABLE OCA;
TRUNCATE TABLE Clubs;
TRUNCATE TABLE Users;
SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO Users (name, email, password, notifications) VALUES 
('Director Admin', 'admin@univ.edu', '123', '{"alert": true}'),     
('Alice Coder', 'alice@tech.edu', '123', '{"alert": true}'),         
('Bob Business', 'bob@biz.edu', '123', '{"alert": false}');     


INSERT INTO Clubs (club_name, club_email) VALUES 
('Computer Science Club', 'cs.club@univ.edu'),  
('Business Society', 'biz.soc@univ.edu'); 

INSERT INTO OCA (user_id, designation) VALUES 
(1, 'Director of Student Affairs');

INSERT INTO Panel (club_id, student_id, position) VALUES 
(1, 2, 'President');

INSERT INTO Panel (club_id, student_id, position) VALUES 
(2, 3, 'President');



INSERT INTO Events (event_name, status, club_name, club_email, details, venue, date, time_slot) VALUES 
('Annual Tech Hackathon', 'approved', 'Computer Science Club', 'cs.club@univ.edu', '24-hour coding competition with prizes.', 'Main Gym', '2024-11-15', '08:00 AM - 08:00 AM'),
('AI Workshop', 'completed', 'Computer Science Club', 'cs.club@univ.edu', 'Intro to Neural Networks for beginners.', 'Room 304', '2024-10-10', '02:00 PM - 05:00 PM'),
('Tech Career Fair', 'pending', 'Computer Science Club', 'cs.club@univ.edu', 'Networking event with top tech companies.', 'Student Center', '2024-12-05', '10:00 AM - 04:00 PM'),
('LAN Gaming Night', 'rejected', 'Computer Science Club', 'cs.club@univ.edu', 'Overnight gaming party.', 'Lab 101', '2024-09-20', '06:00 PM - 10:00 PM'),
('Startup Pitch Night', 'approved', 'Business Society', 'biz.soc@univ.edu', 'Students pitch ideas to investors.', 'Auditorium A', '2024-11-20', '05:00 PM - 09:00 PM'),
('Wall Street Guest Lecture', 'pending', 'Business Society', 'biz.soc@univ.edu', 'Talk by senior financial analyst.', 'Lecture Hall B', '2024-12-12', '11:00 AM - 01:00 PM'),
('Networking Gala', 'pending', 'Business Society', 'biz.soc@univ.edu', 'Formal dinner for members.', 'Grand Hall', '2025-01-15', '07:00 PM - 11:00 PM');



INSERT INTO Budget (booking_id, total_budget, status, club_name) VALUES 
(1, 5000.00, 'approved', 'Computer Science Club'),
(2, 200.00, 'approved', 'Computer Science Club'),  
(3, 1500.00, 'draft', 'Computer Science Club'),  
(5, 1000.00, 'approved', 'Business Society'),   
(6, 300.00, 'draft', 'Business Society');  



INSERT INTO Sponsor (booking_id, name, deal, contact) VALUES 
(1, 'Google Cloud', '$2000 credits and server hosting.', 'campus@google.com'),
(1, 'Red Bull', 'Free energy drinks for 100 participants.', 'sales@redbull.com'),
(3, 'Microsoft', 'Booth setup and swag bags.', 'recruiter@microsoft.com'),
(5, 'JP Morgan', 'Cash sponsorship of $1000 for winners.', 'partners@jpmorgan.com');



INSERT INTO ClubExpense (club_id, amount, description, year) VALUES 
(1, 120.00, 'Website Domain & Hosting', 2024),
(1, 450.50, 'Hackathon Pizza Catering', 2024),
(1, 55.00, 'Workshop Printed Materials', 2024),
(2, 200.00, 'Marketing Flyers Printing', 2024),
(2, 1200.00, 'Gala Venue Deposit', 2024);


INSERT INTO Announcement (user_id, description) VALUES 
(1, 'Welcome to the new academic year! Please ensure all budget requests are submitted 2 weeks prior to events.'),

(1, 'The Student Center will be closed for maintenance on Oct 25th.');
