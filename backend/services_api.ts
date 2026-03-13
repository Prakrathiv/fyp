/**
 * api.ts — Drop this into your services/ folder
 *
 * LOCAL DEV:  BASE_URL points to your FastAPI server
 * PRODUCTION: Change BASE_URL to your AWS API Gateway URL
 */

const ENV = "production"; // Change to "production" when deploying to AWS

const BASE_URL =
  ENV === "production"
    ? "http://localhost:8000"       // FastAPI local dev server
    : "https://aimcgle69k.execute-api.us-east-1.amazonaws.com/prod"; // AWS (fill in after deploy)

const API_KEY = ENV === "production"
  ? "dev-secret-key-change-in-production"
  : "your-production-api-key-here";

// ─── HELPER ──────────────────────────────────────────────────
async function request(path: string, method = "GET", body?: object) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed: ${response.status}`);
  }

  return response.json();
}

// ─── JOBS API ─────────────────────────────────────────────────

export const JobsAPI = {
  // Get all active jobs (for HomeScreen recent activity)
  getAll: (filters?: { city?: string; job_type?: string; shift?: string }) => {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return request(`/jobs${params ? `?${params}` : ""}`);
  },

  // Get a single job by ID
  getOne: (jobId: number | string) => request(`/jobs/${jobId}`),

  // Get all jobs posted by a business user (for dashboard)
  getByUser: (userId: number | string) => request(`/jobs/user/${userId}`),

  // Post a new job — matches your JobPostForm fields
  create: (data: {
    user_id: number;
    title: string;
    description?: string;
    min_salary?: string;
    max_salary?: string;
    shift?: string;
    job_type?: string;
    city?: string;
    area?: string;
    charge_fee?: string;
    company_type?: string;
    company_email?: string;
  }) => request("/jobs", "POST", data),

  // Update a job
  update: (jobId: number | string, data: object) =>
    request(`/jobs/${jobId}`, "PUT", data),

  // Delete a job
  delete: (jobId: number | string) => request(`/jobs/${jobId}`, "DELETE"),
};

// ─── APPLICATIONS API ─────────────────────────────────────────

export const ApplicationsAPI = {
  // Apply to a job
  apply: (data: {
    job_id: number | string;
    applicant_id: number | string;
    applicant_name: string;
    applicant_email: string;
    cover_letter?: string;
    resume_url?: string;
  }) => request("/applications", "POST", data),

  // Get all applicants for a job (business view)
  getForJob: (jobId: number | string) =>
    request(`/applications/job/${jobId}`),

  // Get all applications by a user (applicant view)
  getMyApplications: (applicantId: number | string) =>
    request(`/applications/applicant/${applicantId}`),

  // Update application status (accept/reject)
  updateStatus: (applicationId: number | string, status: string) =>
    request(`/applications/${applicationId}/status`, "PUT", { status }),
};

// ─── USERS API ────────────────────────────────────────────────

export const UsersAPI = {
  // Register a new user
  create: (data: {
    name: string;
    email: string;
    role: "business" | "applicant";
    clerk_id?: string;
    company_name?: string;
    company_type?: string;
  }) => request("/users", "POST", data),

  // Get user profile by ID
  getById: (userId: number | string) => request(`/users/${userId}`),

  // Get user by Clerk ID (for Clerk auth integration)
  getByClerkId: (clerkId: string) => request(`/users/clerk/${clerkId}`),
};