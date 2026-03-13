from fastapi import APIRouter, HTTPException
from app.db.database import get_connection
from app.models.schemas import UserCreate

router = APIRouter()

# ─── CREATE / REGISTER USER ──────────────────────────────────
@router.post("/", response_model=dict)
def create_user(user: UserCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO users (clerk_id, name, email, role, company_name, company_type)
            VALUES (?,?,?,?,?,?)
        """, (user.clerk_id, user.name, user.email, user.role, user.company_name, user.company_type))
        conn.commit()
        return {"success": True, "user_id": cursor.lastrowid}
    except Exception as e:
        conn.rollback()
        if "UNIQUE constraint failed" in str(e):
            raise HTTPException(status_code=400, detail="Email already registered")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

# ─── GET USER BY ID ───────────────────────────────────────────
@router.get("/{user_id}", response_model=dict)
def get_user(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(row)

# ─── GET USER BY CLERK ID ─────────────────────────────────────
@router.get("/clerk/{clerk_id}", response_model=dict)
def get_user_by_clerk(clerk_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE clerk_id = ?", (clerk_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(row)