from fastapi import FastAPI, Security, HTTPException
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db
from app.routers import jobs, applications, users

API_KEY = "dev-secret-key-change-in-production"
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

app = FastAPI(
    title="Business Directory API",
    description="Job posting and applications backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_api_key(api_key: str = Security(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid or missing API Key")
    return api_key

@app.on_event("startup")
def startup():
    init_db()

@app.get("/")
def root():
    return {"status": "ok", "message": "Business Directory API running"}

# Include routers
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"], dependencies=[Security(get_api_key)])
app.include_router(applications.router, prefix="/applications", tags=["Applications"], dependencies=[Security(get_api_key)])
app.include_router(users.router, prefix="/users", tags=["Users"], dependencies=[Security(get_api_key)])