
---

# BRACU Club Management System

A comprehensive web application developed for managing club activities and data at BRAC University. This project is built using Next.js and utilizes a raw MySQL database connection.

## 👨‍💻 Development Team

* **Hasib Hossain Abir** (Team Lead)
* **Rakat E Janat Raka**
* **Ononna Tasnim Omy**

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:

* [Node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository**
Open your terminal and run the following command to download the project:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

```


2. **Install Dependencies**
Install the necessary project packages:
```bash
npm install

```


3. **Install MySQL Driver**
Ensure the MySQL driver is explicitly installed:
```bash
npm install mysql2

```



---

## ⚙️ Configuration

### 1. Configure Database Connection

You need to manually configure the database credentials in the code.

1. Navigate to the file: `lib/db.ts`
2. Open the file and update the **hostname** and **password** to match your local MySQL setup.

```typescript
// Example inside lib/db.ts
const db = mysql.createConnection({
  host: 'localhost', // Change this if needed
  user: 'root',      // Your database username
  password: 'your_password_here', // UPDATE THIS
  database: 'your_database_name'
});

```

### 2. Database Setup (SQL Files)

In the **root folder** of the project, you will find two SQL files. You must execute them in your MySQL database in the following order:

1. **Structure File:** Run this file first to create the necessary tables and relationships.
2. **Values File:** Run this file second to populate the tables with initial dummy data.

You can import these using a GUI tool like **MySQL Workbench** or via the command line:

```bash
mysql -u root -p < structure_file.sql
mysql -u root -p < values_file.sql

```

---

## 🏃‍♂️ Running the App

Once the installation and configuration are complete, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

---
