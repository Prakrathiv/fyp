export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  requirements: string[];
  location: string;
  lat?: number;
  lng?: number;
  salaryDisplay: string;       // camelCase
  category: string;
  workMode: "Remote" | "Hybrid" | "Onsite";  // camelCase
  shift?: string;
  noResume: boolean;           // camelCase
  noInterview: boolean;        // camelCase
  employerPhone?: string;
  rating?: number;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  location: string;
  status: "Pending" | "Shortlisted" | "Accepted" | "Rejected";
  whatsappUnlocked: boolean;
  employerPhone?: string;
  coverNote?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior React Native Developer",
    company: "Stripe",
    companyLogo: "https://logo.clearbit.com/stripe.com",
    description: "Build next-gen payment experiences for millions of users. Work closely with product and design teams.",
    requirements: ["3+ years React Native", "TypeScript", "REST APIs", "Git"],
    location: "San Francisco, CA",
    lat: 37.7749, lng: -122.4194,
    salaryDisplay: "$130k - $160k",
    category: "Engineering",
    workMode: "Hybrid",
    shift: "Full Time",
    noResume: false, noInterview: false,
    employerPhone: "+14155550100",
    rating: 4.8, isFeatured: true,
    createdAt: "2026-03-01",
  },
  {
    id: "2",
    title: "Delivery Partner",
    company: "Swiggy",
    companyLogo: "https://logo.clearbit.com/swiggy.com",
    description: "Join our delivery fleet. Flexible hours, weekly payouts, bike required.",
    requirements: ["Valid licence", "Own 2-wheeler", "Smartphone"],
    location: "Mumbai, MH",
    lat: 19.0760, lng: 72.8777,
    salaryDisplay: "₹18k - 25k/mo",
    category: "Delivery",
    workMode: "Onsite",
    shift: "Flexible",
    noResume: true, noInterview: true,
    employerPhone: "+919876543210",
    rating: 4.2,
    createdAt: "2026-03-05",
  },
  {
    id: "3",
    title: "Product Designer",
    company: "Figma",
    companyLogo: "https://logo.clearbit.com/figma.com",
    description: "Shape the future of collaborative design tooling. Work with world-class engineers.",
    requirements: ["4+ years product design", "Figma expert", "User research"],
    location: "Remote",
    lat: 37.3382, lng: -121.8863,
    salaryDisplay: "$110k - $140k",
    category: "Design",
    workMode: "Remote",
    shift: "Full Time",
    noResume: false, noInterview: false,
    employerPhone: "+14085550199",
    rating: 4.9, isFeatured: true,
    createdAt: "2026-03-03",
  },
  {
    id: "4",
    title: "Sales Executive",
    company: "Zoho",
    companyLogo: "https://logo.clearbit.com/zoho.com",
    description: "Drive B2B sales for our SaaS products. Great commission structure.",
    requirements: ["2+ years sales", "CRM experience", "Strong communication"],
    location: "Chennai, TN",
    lat: 13.0827, lng: 80.2707,
    salaryDisplay: "₹35k - 55k/mo",
    category: "Sales",
    workMode: "Hybrid",
    shift: "Full Time",
    noResume: false, noInterview: false,
    employerPhone: "+914422220000",
    rating: 4.3,
    createdAt: "2026-03-07",
  },
  {
    id: "5",
    title: "Primary School Teacher",
    company: "Delhi Public School",
    description: "Teach grades 3-5. Passionate educators welcome. No experience needed.",
    requirements: ["B.Ed preferred", "Patience", "Communication"],
    location: "Delhi, DL",
    lat: 28.6139, lng: 77.2090,
    salaryDisplay: "₹25k - 40k/mo",
    category: "Teaching",
    workMode: "Onsite",
    shift: "Morning",
    noResume: true, noInterview: false,
    employerPhone: "+911122334455",
    rating: 4.5,
    createdAt: "2026-03-06",
  },
];

export const applications: JobApplication[] = [
  {
    id: "a1", jobId: "1", jobTitle: "Senior React Native Developer",
    company: "Stripe", location: "San Francisco, CA",
    status: "Shortlisted", whatsappUnlocked: false,
    employerPhone: "+14155550100",
    createdAt: "2026-03-08",
  },
  {
    id: "a2", jobId: "3", jobTitle: "Product Designer",
    company: "Figma", location: "Remote",
    status: "Pending", whatsappUnlocked: false,
    createdAt: "2026-03-09",
  },
];

export const employerApplicants = [
  {
    id: "ap1", seekerId: "u1", seekerName: "Alex Rivera",
    seekerAvatar: "https://i.pravatar.cc/150?img=11",
    seekerRating: 4.7, seekerSkills: ["React Native","TypeScript"],
    status: "Pending", jobId: "1",
    coverNote: "I have 3 years of RN experience!",
    whatsappUnlocked: false, createdAt: "2026-03-08",
  },
];

export const notifications: Notification[] = [
  { id:"n1", type:"application_update", title:"You've been shortlisted! 🎉",
    body:"Stripe shortlisted you for Senior React Native Developer.", isRead:false, createdAt:"2026-03-08" },
  { id:"n2", type:"new_job", title:"New job near you 📍",
    body:"Delivery Partner at Swiggy — 0.5 km away", isRead:true, createdAt:"2026-03-07" },
];

export const reviews: Review[] = [
  { id:"r1", reviewerName:"Stripe HR", rating:5,
    comment:"Outstanding developer, delivered ahead of schedule!", createdAt:"2026-02-20" },
];

export const chatMessages: ChatMessage[] = [
  { id:"m1", senderId:"employer1", text:"Hi! We reviewed your profile.", createdAt:"2026-03-08T09:00:00Z" },
  { id:"m2", senderId:"me",        text:"Thank you! I'm very interested.", createdAt:"2026-03-08T09:05:00Z" },
];

export const categories = ["Engineering","Design","Delivery","Sales","Teaching","Healthcare","Finance","Marketing"];