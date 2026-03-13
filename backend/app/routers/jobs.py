from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.db.database import get_connection
from app.models.schemas import JobCreate, JobUpdate, JobResponse

router = APIRouter()

# ─── CREATE JOB ──────────────────────────────────────────────
@router.post("/", response_model=dict)
def create_job(job: JobCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO jobs (
                user_id, title, description,
                min_salary, max_salary, shift, job_type,
                city, area, charge_fee, company_type, company_email, status
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            job.user_id, job.title, job.description,
            job.min_salary, job.max_salary, job.shift, job.job_type,
            job.city, job.area, job.charge_fee, job.company_type, job.company_email,
            job.status
        ))
        conn.commit()
        job_id = cursor.lastrowid
        return {"success": True, "job_id": job_id, "message": "Job posted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

# ─── GET ALL JOBS (with optional filters) ────────────────────
@router.get("/", response_model=List[dict])
def get_jobs(
    city: Optional[str] = None,
    job_type: Optional[str] = None,
    shift: Optional[str] = None,
    status: Optional[str] = "active",
    limit: int = 20,
    offset: int = 0
):
    conn = get_connection()
    cursor = conn.cursor()
    query = """
        SELECT j.*, COUNT(a.id) as applicant_count
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE 1=1
    """
    params = []

    if city:
        query += " AND j.city = ?"
        params.append(city)
    if job_type:
        query += " AND j.job_type = ?"
        params.append(job_type)
    if shift:
        query += " AND j.shift = ?"
        params.append(shift)
    if status:
        query += " AND j.status = ?"
        params.append(status)

    query += " GROUP BY j.id ORDER BY j.created_at DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# ─── GET SINGLE JOB ──────────────────────────────────────────
@router.get("/{job_id}", response_model=dict)
def get_job(job_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT j.*, COUNT(a.id) as applicant_count
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.id = ?
        GROUP BY j.id
    """, (job_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Job not found")
    return dict(row)

# ─── GET JOBS BY USER (business dashboard) ───────────────────
@router.get("/user/{user_id}", response_model=List[dict])
def get_jobs_by_user(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT j.*, COUNT(a.id) as applicant_count
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.user_id = ?
        GROUP BY j.id
        ORDER BY j.created_at DESC
    """, (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# ─── UPDATE JOB ──────────────────────────────────────────────
@router.put("/{job_id}", response_model=dict)
def update_job(job_id: int, job: JobUpdate):
    conn = get_connection()
    cursor = conn.cursor()

    # Build dynamic update
    fields = {k: v for k, v in job.dict().items() if v is not None}
    if not fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    set_clause = ", ".join([f"{k} = ?" for k in fields])
    values = list(fields.values()) + [job_id]

    cursor.execute(f"UPDATE jobs SET {set_clause} WHERE id = ?", values)
    conn.commit()
    conn.close()
    return {"success": True, "message": "Job updated"}

# ─── DELETE JOB ──────────────────────────────────────────────
@router.delete("/{job_id}", response_model=dict)
def delete_job(job_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Job deleted"}