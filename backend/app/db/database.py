import sqlite3
import os

DB_PATH = os.getenv("DB_PATH", "business_directory.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # allows dict-like access
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Users table (business owners + job seekers)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            clerk_id TEXT UNIQUE,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('business', 'applicant')),
            company_name TEXT,
            company_type TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Jobs table — matches your JobPostForm fields exactly
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            min_salary TEXT,
            max_salary TEXT,
            shift TEXT,
            job_type TEXT,
            city TEXT,
            area TEXT,
            charge_fee TEXT,
            company_type TEXT,
            company_email TEXT,
            status TEXT DEFAULT 'active' CHECK(status IN ('active', 'closed', 'draft')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    # Applications table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER NOT NULL,
            applicant_id INTEGER NOT NULL,
            applicant_name TEXT NOT NULL,
            applicant_email TEXT NOT NULL,
            cover_letter TEXT,
            resume_url TEXT,
            status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'accepted', 'rejected')),
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (job_id) REFERENCES jobs(id),
            FOREIGN KEY (applicant_id) REFERENCES users(id)
        )
    """)

    conn.commit()
    conn.close()
    print("✅ Database initialized successfully")