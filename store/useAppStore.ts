// API is optional — app works without backend (offline/dummy mode)
let authAPI: any = null;
let usersAPI: any = null;
let setAuthToken: (t: string | null) => void = () => {};

try {
  const api = require("../services/api");
  authAPI = api.authAPI;
  usersAPI = api.usersAPI;
  setAuthToken = api.setAuthToken;
} catch {
  // services/api not present — running in dummy data mode
}

import { create } from "zustand";

export type UserRole = "seeker" | "employer";

export interface AppUser {
  id: string;
  clerkId?: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  rating: number;
  reviewCount: number;
  jobTitle?: string;
  location?: string;
  skills: string[];
  experience?: string;
  education?: string;
  resumeUrl?: string;
  workImages: string[];
  connections: number;
  profileComplete: number;
  expoPushToken?: string;
}

interface AppState {
  user: AppUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  syncWithClerk: (data: {
    clerkId: string; name: string;
    email: string; phone?: string; avatar?: string;
  }) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<void>;
  savedJobs: string[];
  appliedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
  addAppliedJob: (jobId: string) => void;
}

const toAppUser = (u: any): AppUser => ({
  id:              u.id,
  clerkId:         u.clerk_id,
  name:            u.name,
  email:           u.email,
  phone:           u.phone,
  avatar:          u.avatar,
  role:            u.role ?? "seeker",
  rating:          parseFloat(u.rating) || 0,
  reviewCount:     u.review_count ?? 0,
  jobTitle:        u.job_title,
  location:        u.location,
  skills:          u.skills ?? [],
  experience:      u.experience,
  education:       u.education,
  resumeUrl:       u.resume_url,
  workImages:      u.work_images ?? [],
  connections:     u.connections ?? 0,
  profileComplete: u.profile_complete ?? 20,
  expoPushToken:   u.expo_push_token,
});

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  savedJobs: [],
  appliedJobs: [],

  syncWithClerk: async (data) => {
    set({ isLoading: true, error: null });
    try {
      if (authAPI) {
        const { token, user } = await authAPI.clerkSync(data);
        setAuthToken(token);
        set({ token, user: toAppUser(user), isLoading: false });
      } else {
        // No backend — create local user from Clerk data
        set({
          token: null,
          user: {
            id: data.clerkId,
            clerkId: data.clerkId,
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            role: "seeker",
            rating: 0,
            reviewCount: 0,
            skills: [],
            workImages: [],
            connections: 0,
            profileComplete: 20,
          },
          isLoading: false,
        });
      }
    } catch {
      // Backend unavailable — still create local user
      set({
        token: null,
        user: {
          id: data.clerkId,
          clerkId: data.clerkId,
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          role: "seeker",
          rating: 0,
          reviewCount: 0,
          skills: [],
          workImages: [],
          connections: 0,
          profileComplete: 20,
        },
        isLoading: false,
        error: null,
      });
    }
  },

  fetchMe: async () => {
    try {
      if (usersAPI) {
        const user = await usersAPI.getMe();
        set({ user: toAppUser(user) });
      }
    } catch {}
  },

  setRole: async (role) => {
    set((s) => ({ user: s.user ? { ...s.user, role } : null }));
    try {
      if (authAPI) {
        const { token } = await authAPI.switchRole(role);
        setAuthToken(token);
        set((s) => ({ token, user: s.user ? { ...s.user, role } : null }));
      }
    } catch {}
  },

  updateProfile: async (data) => {
    set((s) => ({ user: s.user ? { ...s.user, ...data } : null }));
    try {
      if (usersAPI) await usersAPI.updateMe(data as any);
    } catch {}
  },

  logout: () => {
    setAuthToken(null);
    set({ user: null, token: null, savedJobs: [], appliedJobs: [] });
  },

  toggleSaveJob: (jobId) => set((s) => ({
    savedJobs: s.savedJobs.includes(jobId)
      ? s.savedJobs.filter(id => id !== jobId)
      : [...s.savedJobs, jobId],
  })),

  addAppliedJob: (jobId) => set((s) => ({
    appliedJobs: s.appliedJobs.includes(jobId)
      ? s.appliedJobs
      : [...s.appliedJobs, jobId],
  })),
}));