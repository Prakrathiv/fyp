from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ─── USER MODELS ─────────────────────────────────────────────

class UserCreate(BaseModel):
    clerk_id: Optional[str] = None
    name: str
    email: str
    role: str  # 'business' or 'applicant'
    company_name: Optional[str] = None
    company_type: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    clerk_id: Optional[str]
    name: str
    email: str
    role: str
    company_name: Optional[str]
    company_type: Optional[str]
    created_at: str

# ─── JOB MODELS ──────────────────────────────────────────────
# Fields match your JobPostForm exactly:
# Step1: minSalary, maxSalary, shift, jobType
# Step2: (future fields)
# Step3: city, area, chargeFee, companyType, companyEmail

class JobCreate(BaseModel):
    user_id: int
    title: str
    description: Optional[str] = None
    # Step 1 fields
    min_salary: Optional[str] = None
    max_salary: Optional[str] = None
    shift: Optional[str] = None
    job_type: Optional[str] = None
    # Step 3 fields
    city: Optional[str] = None
    area: Optional[str] = None
    charge_fee: Optional[str] = None
    company_type: Optional[str] = None
    company_email: Optional[str] = None
    status: Optional[str] = "active"

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    min_salary: Optional[str] = None
    max_salary: Optional[str] = None
    shift: Optional[str] = None
    job_type: Optional[str] = None
    city: Optional[str] = None
    area: Optional[str] = None
    charge_fee: Optional[str] = None
    company_type: Optional[str] = None
    company_email: Optional[str] = None
    status: Optional[str] = None

class JobResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: Optional[str]
    min_salary: Optional[str]
    max_salary: Optional[str]
    shift: Optional[str]
    job_type: Optional[str]
    city: Optional[str]
    area: Optional[str]
    charge_fee: Optional[str]
    company_type: Optional[str]
    company_email: Optional[str]
    status: str
    created_at: str
    applicant_count: Optional[int] = 0

# ─── APPLICATION MODELS ──────────────────────────────────────

class ApplicationCreate(BaseModel):
    job_id: int
    applicant_id: int
    applicant_name: str
    applicant_email: str
    cover_letter: Optional[str] = None
    resume_url: Optional[str] = None

class ApplicationStatusUpdate(BaseModel):
    status: str  # pending, reviewed, accepted, rejected

class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    applicant_id: int
    applicant_name: str
    applicant_email: str
    cover_letter: Optional[str]
    resume_url: Optional[str]
    status: str
    applied_at: str