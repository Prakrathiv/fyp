from fastapi import APIRouter, HTTPException
from typing import List
from app.db.database import get_connection
from app.models.schemas import ApplicationCreate, ApplicationStatusUpdate

router = APIRouter()

# ─── APPLY FOR A JOB ─────────────────────────────────────────
@router.post("/", response_model=dict)
def apply_for_job(application: ApplicationCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        # Check if already applied
        cursor.execute(
            "SELECT id FROM applications WHERE job_id = ? AND applicant_id = ?",
            (application.job_id, application.applicant_id)
        )
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Already applied to this job")

        cursor.execute("""
            INSERT INTO applications (job_id, applicant_id, applicant_name, applicant_email, cover_letter, resume_url)
            VALUES (?,?,?,?,?,?)
        """, (
            application.job_id, application.applicant_id,
            application.applicant_name, application.applicant_email,
            application.cover_letter, application.resume_url
        ))
        conn.commit()
        return {"success": True, "application_id": cursor.lastrowid, "message": "Application submitted"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

# ─── GET APPLICATIONS FOR A JOB (for business owner) ─────────
@router.get("/job/{job_id}", response_model=List[dict])
def get_applications_for_job(job_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM applications WHERE job_id = ? ORDER BY applied_at DESC
    """, (job_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# ─── GET APPLICATIONS BY APPLICANT (for job seeker) ──────────
@router.get("/applicant/{applicant_id}", response_model=List[dict])
def get_my_applications(applicant_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.*, j.title as job_title, j.city, j.company_type
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        WHERE a.applicant_id = ?
        ORDER BY a.applied_at DESC
    """, (applicant_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# ─── UPDATE APPLICATION STATUS (accept/reject) ───────────────
@router.put("/{application_id}/status", response_model=dict)
def update_application_status(application_id: int, update: ApplicationStatusUpdate):
    valid_statuses = ["pending", "reviewed", "accepted", "rejected"]
    if update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE applications SET status = ? WHERE id = ?",
        (update.status, application_id)
    )
    conn.commit()
    conn.close()
    return {"success": True, "message": f"Application status updated to {update.status}"}

# ─── DELETE APPLICATION ───────────────────────────────────────
@router.delete("/{application_id}", response_model=dict)
def delete_application(application_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM applications WHERE id = ?", (application_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Application removed"}