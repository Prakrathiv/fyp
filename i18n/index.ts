import { create } from "zustand";

export type Language = "en" | "hi" | "kn" | "ta" | "te" | "mr";

export interface Translations {
  // Auth
  welcome: string;
  signIn: string;
  continueGoogle: string;
  continuePhone: string;
  enterPhone: string;
  enterOTP: string;
  sendOTP: string;
  verifySignIn: string;
  resendOTP: string;
  otpSentTo: string;
  back: string;
  legal: string;

  // Navigation
  home: string;
  search: string;
  applications: string;
  map: string;
  notifications: string;
  profile: string;

  // Home
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  findJobs: string;
  nearYou: string;
  featuredJobs: string;
  recentJobs: string;
  viewAll: string;
  jobsApplied: string;
  jobsSaved: string;
  profileViews: string;

  // Jobs
  applyNow: string;
  saveJob: string;
  noResume: string;
  noInterview: string;
  salary: string;
  location: string;
  workMode: string;
  category: string;
  postedOn: string;
  description: string;
  requirements: string;
  quickApply: string;
  coverNote: string;
  submitApplication: string;
  alreadyApplied: string;
  whatsappLocked: string;
  whatsappUnlocked: string;

  // Applications
  myApplications: string;
  pending: string;
  shortlisted: string;
  accepted: string;
  rejected: string;
  noApplications: string;

  // Profile
  editProfile: string;
  myResume: string;
  workShowcase: string;
  reviews: string;
  signOut: string;
  switchRole: string;
  seekerMode: string;
  employerMode: string;
  skills: string;
  experience: string;
  education: string;
  connections: string;
  profileComplete: string;

  // Employer
  postJob: string;
  myJobs: string;
  applicants: string;
  accept: string;
  reject: string;
  shortlist: string;

  // Common
  loading: string;
  error: string;
  retry: string;
  cancel: string;
  save: string;
  delete: string;
  close: string;
  noData: string;
  km: string;
  away: string;
}

const translations: Record<Language, Translations> = {
  en: {
    welcome: "Welcome Back 👋",
    signIn: "Sign in to continue",
    continueGoogle: "Continue with Google",
    continuePhone: "Continue with Phone",
    enterPhone: "Enter Phone",
    enterOTP: "Enter OTP",
    sendOTP: "Send OTP",
    verifySignIn: "Verify & Sign In",
    resendOTP: "Resend OTP",
    otpSentTo: "Sent to",
    back: "Back",
    legal: "By signing in you agree to our Terms & Privacy Policy",
    home: "Home",
    search: "Search",
    applications: "Applications",
    map: "Map",
    notifications: "Alerts",
    profile: "Profile",
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    findJobs: "Find Jobs",
    nearYou: "Near You",
    featuredJobs: "Featured Jobs",
    recentJobs: "Recent Jobs",
    viewAll: "View All",
    jobsApplied: "Applied",
    jobsSaved: "Saved",
    profileViews: "Views",
    applyNow: "Apply Now",
    saveJob: "Save",
    noResume: "No Resume",
    noInterview: "No Interview",
    salary: "Salary",
    location: "Location",
    workMode: "Work Mode",
    category: "Category",
    postedOn: "Posted",
    description: "Description",
    requirements: "Requirements",
    quickApply: "Quick Apply",
    coverNote: "Cover Note (optional)",
    submitApplication: "Submit Application",
    alreadyApplied: "Already Applied",
    whatsappLocked: "WhatsApp 🔒 (Apply to unlock)",
    whatsappUnlocked: "Chat on WhatsApp 💬",
    myApplications: "My Applications",
    pending: "Pending",
    shortlisted: "Shortlisted",
    accepted: "Accepted",
    rejected: "Rejected",
    noApplications: "No applications yet",
    editProfile: "Edit Profile",
    myResume: "My Resume",
    workShowcase: "Work Showcase",
    reviews: "Reviews",
    signOut: "Sign Out",
    switchRole: "Switch Role",
    seekerMode: "Job Seeker",
    employerMode: "Employer",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    connections: "Connections",
    profileComplete: "Profile Complete",
    postJob: "Post a Job",
    myJobs: "My Jobs",
    applicants: "Applicants",
    accept: "Accept",
    reject: "Reject",
    shortlist: "Shortlist",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Retry",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    close: "Close",
    noData: "Nothing here yet",
    km: "km",
    away: "away",
  },

  hi: {
    welcome: "वापस स्वागत है 👋",
    signIn: "जारी रखने के लिए साइन इन करें",
    continueGoogle: "Google से जारी रखें",
    continuePhone: "फ़ोन से जारी रखें",
    enterPhone: "फ़ोन नंबर डालें",
    enterOTP: "OTP डालें",
    sendOTP: "OTP भेजें",
    verifySignIn: "सत्यापित करें और साइन इन करें",
    resendOTP: "OTP फिर भेजें",
    otpSentTo: "भेजा गया",
    back: "वापस",
    legal: "साइन इन करके आप हमारी शर्तों से सहमत हैं",
    home: "होम",
    search: "खोज",
    applications: "आवेदन",
    map: "नक्शा",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",
    goodMorning: "सुप्रभात",
    goodAfternoon: "नमस्कार",
    goodEvening: "शुभ संध्या",
    findJobs: "नौकरी खोजें",
    nearYou: "आपके पास",
    featuredJobs: "विशेष नौकरियां",
    recentJobs: "हालिया नौकरियां",
    viewAll: "सभी देखें",
    jobsApplied: "आवेदित",
    jobsSaved: "सहेजा",
    profileViews: "व्यूज़",
    applyNow: "अभी आवेदन करें",
    saveJob: "सहेजें",
    noResume: "रिज्यूमे नहीं",
    noInterview: "इंटरव्यू नहीं",
    salary: "वेतन",
    location: "स्थान",
    workMode: "कार्य मोड",
    category: "श्रेणी",
    postedOn: "पोस्ट किया",
    description: "विवरण",
    requirements: "आवश्यकताएं",
    quickApply: "त्वरित आवेदन",
    coverNote: "कवर नोट (वैकल्पिक)",
    submitApplication: "आवेदन जमा करें",
    alreadyApplied: "पहले से आवेदित",
    whatsappLocked: "WhatsApp 🔒 (आवेदन करें)",
    whatsappUnlocked: "WhatsApp पर बात करें 💬",
    myApplications: "मेरे आवेदन",
    pending: "लंबित",
    shortlisted: "शॉर्टलिस्ट",
    accepted: "स्वीकृत",
    rejected: "अस्वीकृत",
    noApplications: "अभी तक कोई आवेदन नहीं",
    editProfile: "प्रोफ़ाइल संपादित करें",
    myResume: "मेरा रिज्यूमे",
    workShowcase: "कार्य प्रदर्शन",
    reviews: "समीक्षाएं",
    signOut: "साइन आउट",
    switchRole: "भूमिका बदलें",
    seekerMode: "नौकरी खोजक",
    employerMode: "नियोक्ता",
    skills: "कौशल",
    experience: "अनुभव",
    education: "शिक्षा",
    connections: "कनेक्शन",
    profileComplete: "प्रोफ़ाइल पूर्ण",
    postJob: "नौकरी पोस्ट करें",
    myJobs: "मेरी नौकरियां",
    applicants: "आवेदक",
    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    shortlist: "शॉर्टलिस्ट करें",
    loading: "लोड हो रहा है...",
    error: "कुछ गलत हो गया",
    retry: "पुनः प्रयास",
    cancel: "रद्द करें",
    save: "सहेजें",
    delete: "हटाएं",
    close: "बंद करें",
    noData: "अभी यहाँ कुछ नहीं",
    km: "किमी",
    away: "दूर",
  },

  kn: {
    welcome: "ಮರಳಿ ಸ್ವಾಗತ 👋",
    signIn: "ಮುಂದುವರಿಯಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
    continueGoogle: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
    continuePhone: "ಫೋನ್‌ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
    enterPhone: "ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ",
    enterOTP: "OTP ನಮೂದಿಸಿ",
    sendOTP: "OTP ಕಳುಹಿಸಿ",
    verifySignIn: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸೈನ್ ಇನ್ ಮಾಡಿ",
    resendOTP: "OTP ಮರು-ಕಳುಹಿಸಿ",
    otpSentTo: "ಕಳುಹಿಸಲಾಗಿದೆ",
    back: "ಹಿಂದೆ",
    legal: "ಸೈನ್ ಇನ್ ಮಾಡುವ ಮೂಲಕ ನೀವು ನಮ್ಮ ನಿಯಮಗಳಿಗೆ ಒಪ್ಪುತ್ತೀರಿ",
    home: "ಮುಖಪುಟ",
    search: "ಹುಡುಕು",
    applications: "ಅರ್ಜಿಗಳು",
    map: "ನಕ್ಷೆ",
    notifications: "ಅಧಿಸೂಚನೆಗಳು",
    profile: "ಪ್ರೊಫೈಲ್",
    goodMorning: "ಶುಭೋದಯ",
    goodAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    goodEvening: "ಶುಭ ಸಂಜೆ",
    findJobs: "ಉದ್ಯೋಗ ಹುಡುಕಿ",
    nearYou: "ನಿಮ್ಮ ಹತ್ತಿರ",
    featuredJobs: "ವಿಶೇಷ ಉದ್ಯೋಗಗಳು",
    recentJobs: "ಇತ್ತೀಚಿನ ಉದ್ಯೋಗಗಳು",
    viewAll: "ಎಲ್ಲಾ ನೋಡಿ",
    jobsApplied: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ",
    jobsSaved: "ಉಳಿಸಿದ",
    profileViews: "ವೀಕ್ಷಣೆಗಳು",
    applyNow: "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    saveJob: "ಉಳಿಸಿ",
    noResume: "ರೆಸ್ಯೂಮೆ ಇಲ್ಲ",
    noInterview: "ಸಂದರ್ಶನ ಇಲ್ಲ",
    salary: "ವೇತನ",
    location: "ಸ್ಥಳ",
    workMode: "ಕೆಲಸದ ಮೋಡ್",
    category: "ವರ್ಗ",
    postedOn: "ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ",
    description: "ವಿವರಣೆ",
    requirements: "ಅವಶ್ಯಕತೆಗಳು",
    quickApply: "ತ್ವರಿತ ಅರ್ಜಿ",
    coverNote: "ಕವರ್ ನೋಟ್ (ಐಚ್ಛಿಕ)",
    submitApplication: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    alreadyApplied: "ಈಗಾಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    whatsappLocked: "WhatsApp 🔒",
    whatsappUnlocked: "WhatsApp ನಲ್ಲಿ ಮಾತನಾಡಿ 💬",
    myApplications: "ನನ್ನ ಅರ್ಜಿಗಳು",
    pending: "ಬಾಕಿ ಇದೆ",
    shortlisted: "ಶಾರ್ಟ್‌ಲಿಸ್ಟ್",
    accepted: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    rejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
    noApplications: "ಇನ್ನೂ ಅರ್ಜಿಗಳಿಲ್ಲ",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    myResume: "ನನ್ನ ರೆಸ್ಯೂಮೆ",
    workShowcase: "ಕೆಲಸದ ಪ್ರದರ್ಶನ",
    reviews: "ವಿಮರ್ಶೆಗಳು",
    signOut: "ಸೈನ್ ಔಟ್",
    switchRole: "ಪಾತ್ರ ಬದಲಿಸಿ",
    seekerMode: "ಉದ್ಯೋಗ ಹುಡುಕುವವರು",
    employerMode: "ಉದ್ಯೋಗದಾತ",
    skills: "ಕೌಶಲ್ಯಗಳು",
    experience: "ಅನುಭವ",
    education: "ಶಿಕ್ಷಣ",
    connections: "ಸಂಪರ್ಕಗಳು",
    profileComplete: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣ",
    postJob: "ಉದ್ಯೋಗ ಪೋಸ್ಟ್ ಮಾಡಿ",
    myJobs: "ನನ್ನ ಉದ್ಯೋಗಗಳು",
    applicants: "ಅರ್ಜಿದಾರರು",
    accept: "ಒಪ್ಪಿಕೊಳ್ಳಿ",
    reject: "ತಿರಸ್ಕರಿಸಿ",
    shortlist: "ಶಾರ್ಟ್‌ಲಿಸ್ಟ್ ಮಾಡಿ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    cancel: "ರದ್ದು ಮಾಡಿ",
    save: "ಉಳಿಸಿ",
    delete: "ಅಳಿಸಿ",
    close: "ಮುಚ್ಚಿ",
    noData: "ಇನ್ನೂ ಏನೂ ಇಲ್ಲ",
    km: "ಕಿಮೀ",
    away: "ದೂರ",
  },

  ta: {
    welcome: "மீண்டும் வரவேற்கிறோம் 👋",
    signIn: "தொடர உள்நுழையவும்",
    continueGoogle: "Google மூலம் தொடரவும்",
    continuePhone: "தொலைபேசி மூலம் தொடரவும்",
    enterPhone: "தொலைபேசி எண் உள்ளிடவும்",
    enterOTP: "OTP உள்ளிடவும்",
    sendOTP: "OTP அனுப்பவும்",
    verifySignIn: "சரிபார்த்து உள்நுழையவும்",
    resendOTP: "OTP மீண்டும் அனுப்பவும்",
    otpSentTo: "அனுப்பப்பட்டது",
    back: "பின்",
    legal: "உள்நுழைவதன் மூலம் நீங்கள் எங்கள் விதிமுறைகளை ஒப்புக்கொள்கிறீர்கள்",
    home: "முகப்பு",
    search: "தேடு",
    applications: "விண்ணப்பங்கள்",
    map: "வரைபடம்",
    notifications: "அறிவிப்புகள்",
    profile: "சுயவிவரம்",
    goodMorning: "காலை வணக்கம்",
    goodAfternoon: "மதிய வணக்கம்",
    goodEvening: "மாலை வணக்கம்",
    findJobs: "வேலை தேடு",
    nearYou: "உங்களுக்கு அருகில்",
    featuredJobs: "சிறப்பு வேலைகள்",
    recentJobs: "சமீபத்திய வேலைகள்",
    viewAll: "அனைத்தையும் காண்",
    jobsApplied: "விண்ணப்பித்தது",
    jobsSaved: "சேமித்தது",
    profileViews: "பார்வைகள்",
    applyNow: "இப்போது விண்ணப்பிக்கவும்",
    saveJob: "சேமி",
    noResume: "ரெஸ்யூமே இல்லை",
    noInterview: "நேர்காணல் இல்லை",
    salary: "சம்பளம்",
    location: "இடம்",
    workMode: "பணி முறை",
    category: "வகை",
    postedOn: "இடுகையிடப்பட்டது",
    description: "விவரம்",
    requirements: "தேவைகள்",
    quickApply: "விரைவு விண்ணப்பம்",
    coverNote: "கவர் குறிப்பு (விருப்பம்)",
    submitApplication: "விண்ணப்பம் சமர்ப்பிக்கவும்",
    alreadyApplied: "ஏற்கனவே விண்ணப்பித்தது",
    whatsappLocked: "WhatsApp 🔒",
    whatsappUnlocked: "WhatsApp இல் பேசுங்கள் 💬",
    myApplications: "என் விண்ணப்பங்கள்",
    pending: "நிலுவையில்",
    shortlisted: "தேர்வு பட்டியல்",
    accepted: "ஏற்கப்பட்டது",
    rejected: "நிராகரிக்கப்பட்டது",
    noApplications: "இன்னும் விண்ணப்பங்கள் இல்லை",
    editProfile: "சுயவிவரம் திருத்தவும்",
    myResume: "என் ரெஸ்யூமே",
    workShowcase: "பணி காட்சி",
    reviews: "மதிப்புரைகள்",
    signOut: "வெளியேறு",
    switchRole: "பாத்திரம் மாற்று",
    seekerMode: "வேலை தேடுபவர்",
    employerMode: "முதலாளி",
    skills: "திறன்கள்",
    experience: "அனுபவம்",
    education: "கல்வி",
    connections: "தொடர்புகள்",
    profileComplete: "சுயவிவரம் நிறைவு",
    postJob: "வேலை இடுகையிடவும்",
    myJobs: "என் வேலைகள்",
    applicants: "விண்ணப்பதாரர்கள்",
    accept: "ஏற்கவும்",
    reject: "நிராகரிக்கவும்",
    shortlist: "தேர்வு பட்டியலிடவும்",
    loading: "ஏற்றுகிறது...",
    error: "ஏதோ தவறு நடந்தது",
    retry: "மீண்டும் முயற்சி",
    cancel: "ரத்து செய்",
    save: "சேமி",
    delete: "நீக்கு",
    close: "மூடு",
    noData: "இன்னும் எதுவும் இல்லை",
    km: "கி.மீ",
    away: "தொலைவு",
  },

  te: {
    welcome: "తిరిగి స్వాగతం 👋",
    signIn: "కొనసాగించడానికి సైన్ ఇన్ చేయండి",
    continueGoogle: "Google తో కొనసాగండి",
    continuePhone: "ఫోన్‌తో కొనసాగండి",
    enterPhone: "ఫోన్ నంబర్ నమోదు చేయండి",
    enterOTP: "OTP నమోదు చేయండి",
    sendOTP: "OTP పంపండి",
    verifySignIn: "ధృవీకరించి సైన్ ఇన్ చేయండి",
    resendOTP: "OTP మళ్ళీ పంపండి",
    otpSentTo: "పంపబడింది",
    back: "వెనుకకు",
    legal: "సైన్ ఇన్ చేయడం ద్వారా మీరు మా నిబంధనలకు అంగీకరిస్తున్నారు",
    home: "హోమ్",
    search: "వెతకండి",
    applications: "దరఖాస్తులు",
    map: "మ్యాప్",
    notifications: "నోటిఫికేషన్లు",
    profile: "ప్రొఫైల్",
    goodMorning: "శుభోదయం",
    goodAfternoon: "శుభ మధ్యాహ్నం",
    goodEvening: "శుభ సాయంత్రం",
    findJobs: "ఉద్యోగాలు వెతకండి",
    nearYou: "మీ దగ్గర",
    featuredJobs: "ప్రత్యేక ఉద్యోగాలు",
    recentJobs: "ఇటీవలి ఉద్యోగాలు",
    viewAll: "అన్నీ చూడండి",
    jobsApplied: "దరఖాస్తు చేసింది",
    jobsSaved: "సేవ్ చేసింది",
    profileViews: "వ్యూస్",
    applyNow: "ఇప్పుడు దరఖాస్తు చేయండి",
    saveJob: "సేవ్ చేయి",
    noResume: "రెజ్యూమే అవసరం లేదు",
    noInterview: "ఇంటర్వ్యూ అవసరం లేదు",
    salary: "జీతం",
    location: "స్థానం",
    workMode: "పని విధానం",
    category: "వర్గం",
    postedOn: "పోస్ట్ చేయబడింది",
    description: "వివరణ",
    requirements: "అవసరాలు",
    quickApply: "త్వరిత దరఖాస్తు",
    coverNote: "కవర్ నోట్ (ఐచ్ఛికం)",
    submitApplication: "దరఖాస్తు సమర్పించండి",
    alreadyApplied: "ఇప్పటికే దరఖాస్తు చేసారు",
    whatsappLocked: "WhatsApp 🔒",
    whatsappUnlocked: "WhatsApp లో మాట్లాడండి 💬",
    myApplications: "నా దరఖాస్తులు",
    pending: "పెండింగ్",
    shortlisted: "షార్ట్‌లిస్ట్",
    accepted: "ఆమోదించబడింది",
    rejected: "తిరస్కరించబడింది",
    noApplications: "ఇంకా దరఖాస్తులు లేవు",
    editProfile: "ప్రొఫైల్ సవరించండి",
    myResume: "నా రెజ్యూమే",
    workShowcase: "పని ప్రదర్శన",
    reviews: "సమీక్షలు",
    signOut: "సైన్ అవుట్",
    switchRole: "పాత్ర మార్చండి",
    seekerMode: "ఉద్యోగ అన్వేషకుడు",
    employerMode: "యజమాని",
    skills: "నైపుణ్యాలు",
    experience: "అనుభవం",
    education: "విద్య",
    connections: "కనెక్షన్లు",
    profileComplete: "ప్రొఫైల్ పూర్తి",
    postJob: "ఉద్యోగం పోస్ట్ చేయండి",
    myJobs: "నా ఉద్యోగాలు",
    applicants: "దరఖాస్తుదారులు",
    accept: "ఆమోదించండి",
    reject: "తిరస్కరించండి",
    shortlist: "షార్ట్‌లిస్ట్ చేయండి",
    loading: "లోడ్ అవుతోంది...",
    error: "ఏదో తప్పు జరిగింది",
    retry: "మళ్ళీ ప్రయత్నించండి",
    cancel: "రద్దు చేయండి",
    save: "సేవ్ చేయి",
    delete: "తొలగించు",
    close: "మూసివేయి",
    noData: "ఇంకా ఏమీ లేదు",
    km: "కి.మీ",
    away: "దూరం",
  },

  mr: {
    welcome: "परत स्वागत आहे 👋",
    signIn: "सुरू ठेवण्यासाठी साइन इन करा",
    continueGoogle: "Google सह सुरू ठेवा",
    continuePhone: "फोनसह सुरू ठेवा",
    enterPhone: "फोन नंबर प्रविष्ट करा",
    enterOTP: "OTP प्रविष्ट करा",
    sendOTP: "OTP पाठवा",
    verifySignIn: "सत्यापित करा आणि साइन इन करा",
    resendOTP: "OTP पुन्हा पाठवा",
    otpSentTo: "पाठवले",
    back: "मागे",
    legal: "साइन इन करून तुम्ही आमच्या अटींशी सहमत आहात",
    home: "होम",
    search: "शोधा",
    applications: "अर्ज",
    map: "नकाशा",
    notifications: "सूचना",
    profile: "प्रोफाइल",
    goodMorning: "सुप्रभात",
    goodAfternoon: "नमस्कार",
    goodEvening: "शुभ संध्याकाळ",
    findJobs: "नोकऱ्या शोधा",
    nearYou: "तुमच्याजवळ",
    featuredJobs: "विशेष नोकऱ्या",
    recentJobs: "अलीकडील नोकऱ्या",
    viewAll: "सर्व पहा",
    jobsApplied: "अर्ज केले",
    jobsSaved: "जतन केले",
    profileViews: "व्ह्यूज",
    applyNow: "आता अर्ज करा",
    saveJob: "जतन करा",
    noResume: "रेझ्युमे नाही",
    noInterview: "मुलाखत नाही",
    salary: "पगार",
    location: "ठिकाण",
    workMode: "कार्य मोड",
    category: "श्रेणी",
    postedOn: "पोस्ट केले",
    description: "वर्णन",
    requirements: "आवश्यकता",
    quickApply: "त्वरित अर्ज",
    coverNote: "कव्हर नोट (पर्यायी)",
    submitApplication: "अर्ज सादर करा",
    alreadyApplied: "आधीच अर्ज केला",
    whatsappLocked: "WhatsApp 🔒",
    whatsappUnlocked: "WhatsApp वर बोला 💬",
    myApplications: "माझे अर्ज",
    pending: "प्रलंबित",
    shortlisted: "शॉर्टलिस्ट",
    accepted: "स्वीकारले",
    rejected: "नाकारले",
    noApplications: "अद्याप कोणतेही अर्ज नाहीत",
    editProfile: "प्रोफाइल संपादित करा",
    myResume: "माझा रेझ्युमे",
    workShowcase: "कार्य प्रदर्शन",
    reviews: "समीक्षा",
    signOut: "साइन आउट",
    switchRole: "भूमिका बदला",
    seekerMode: "नोकरी शोधक",
    employerMode: "नियोक्ता",
    skills: "कौशल्ये",
    experience: "अनुभव",
    education: "शिक्षण",
    connections: "कनेक्शन",
    profileComplete: "प्रोफाइल पूर्ण",
    postJob: "नोकरी पोस्ट करा",
    myJobs: "माझ्या नोकऱ्या",
    applicants: "अर्जदार",
    accept: "स्वीकार करा",
    reject: "नाकारा",
    shortlist: "शॉर्टलिस्ट करा",
    loading: "लोड होत आहे...",
    error: "काहीतरी चुकले",
    retry: "पुन्हा प्रयत्न करा",
    cancel: "रद्द करा",
    save: "जतन करा",
    delete: "हटवा",
    close: "बंद करा",
    noData: "अद्याप येथे काहीही नाही",
    km: "किमी",
    away: "दूर",
  },
};

interface LangState {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LangState>((set) => ({
  language: "en",
  t: translations["en"],
  setLanguage: (lang) => set({ language: lang, t: translations[lang] }),
}));

export const LANGUAGES: { code: Language; name: string; native: string; flag: string }[] = [
  { code: "en", name: "English",    native: "English",    flag: "🇬🇧" },
  { code: "hi", name: "Hindi",      native: "हिंदी",       flag: "🇮🇳" },
  { code: "kn", name: "Kannada",    native: "ಕನ್ನಡ",      flag: "🇮🇳" },
  { code: "ta", name: "Tamil",      native: "தமிழ்",      flag: "🇮🇳" },
  { code: "te", name: "Telugu",     native: "తెలుగు",     flag: "🇮🇳" },
  { code: "mr", name: "Marathi",    native: "मराठी",      flag: "🇮🇳" },
];