import { create } from "zustand";

// ── Palette constants (never change) ─────────────────────────────────────────
export const PALETTE = {
  violet:       "#7C3AED",
  violetLight:  "#A78BFA",
  violetDark:   "#5B21B6",
  pink:         "#EC4899",
  pinkLight:    "#F9A8D4",
  amber:        "#F59E0B",
  cyan:         "#06B6D4",
  green:        "#10B981",
  red:          "#EF4444",
  white:        "#FFFFFF",
  black:        "#000000",
};

export type ThemeMode = "dark" | "light";

const dark = {
  mode: "dark" as ThemeMode,
  // Backgrounds
  background:    "#0F0A1E",
  surface:       "#1A1035",
  surfaceHigh:   "#241748",
  card:          "#1E1040",
  // Text
  text:          "#F5F3FF",
  textSecondary: "#C4B5FD",
  textMuted:     "#7C6FAF",
  // Borders
  border:        "#3D2B7A",
  overlay:       "rgba(124,58,237,0.18)",
  // Shimmer
  shimmer1:      "#1A1035",
  shimmer2:      "#2D1B69",
  shimmer3:      "#1A1035",
  // Tab
  tabBg:         "#0F0A1E",
  tabBorder:     "rgba(124,58,237,0.3)",
  // Input
  inputBg:       "#1A1035",
  inputBorder:   "#3D2B7A",
  // Status bar
  statusBar:     "light-content" as "light-content" | "dark-content",
};

const light = {
  mode: "light" as ThemeMode,
  background:    "#F8F5FF",
  surface:       "#FFFFFF",
  surfaceHigh:   "#F0EAFF",
  card:          "#FFFFFF",
  text:          "#1E0A3C",
  textSecondary: "#5B21B6",
  textMuted:     "#9B89C4",
  border:        "#E2D9F3",
  overlay:       "rgba(124,58,237,0.08)",
  shimmer1:      "#F0EAFF",
  shimmer2:      "#E2D9F3",
  shimmer3:      "#F0EAFF",
  tabBg:         "#FFFFFF",
  tabBorder:     "rgba(124,58,237,0.15)",
  inputBg:       "#F8F5FF",
  inputBorder:   "#D1C4E9",
  statusBar:     "dark-content" as "light-content" | "dark-content",
};

// ── Shared across both modes ──────────────────────────────────────────────────
export const SHARED = {
  primary:        PALETTE.violet,
  primaryLight:   PALETTE.violetLight,
  primaryDark:    PALETTE.violetDark,
  secondary:      PALETTE.pink,
  secondaryLight: PALETTE.pinkLight,
  accent:         PALETTE.amber,
  cyan:           PALETTE.cyan,
  success:        PALETTE.green,
  danger:         PALETTE.red,
  warning:        PALETTE.amber,
  white:          PALETTE.white,

  gradientPrimary:  ["#7C3AED", "#EC4899"] as const,
  gradientViolet:   ["#5B21B6", "#7C3AED"] as const,
  gradientPink:     ["#EC4899", "#F43F5E"] as const,
  gradientSuccess:  ["#10B981", "#059669"] as const,
  gradientDanger:   ["#EF4444", "#DC2626"] as const,
  gradientAmber:    ["#F59E0B", "#D97706"] as const,
  gradientDark:     ["#0F0A1E", "#1E1040", "#2D1B69"] as const,
  gradientCard:     ["#1E1040", "#2D1B69"] as const,
};

export type Theme = typeof dark & typeof SHARED;

// ── Zustand theme store ───────────────────────────────────────────────────────
interface ThemeStore {
  mode: ThemeMode;
  colors: Theme;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const buildTheme = (mode: ThemeMode): Theme =>
  ({ ...(mode === "dark" ? dark : light), ...SHARED });

export const useTheme = create<ThemeStore>((set) => ({
  mode: "dark",
  colors: buildTheme("dark"),
  toggleTheme: () =>
    set((s) => {
      const next = s.mode === "dark" ? "light" : "dark";
      return { mode: next, colors: buildTheme(next) };
    }),
  setMode: (mode) => set({ mode, colors: buildTheme(mode) }),
}));

// Convenience hook
export const useColors = () => useTheme((s) => s.colors);

export const RADIUS = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, full: 999,
};

export const SHADOW = {
  sm: { shadowColor: "#7C3AED", shadowOffset: { width:0, height:2 }, shadowOpacity:0.2, shadowRadius:4, elevation:3 },
  md: { shadowColor: "#7C3AED", shadowOffset: { width:0, height:4 }, shadowOpacity:0.3, shadowRadius:8, elevation:6 },
  lg: { shadowColor: "#EC4899", shadowOffset: { width:0, height:8 }, shadowOpacity:0.35, shadowRadius:16, elevation:12 },
  glow: { shadowColor: "#7C3AED", shadowOffset: { width:0, height:0 }, shadowOpacity:0.7, shadowRadius:20, elevation:20 },
};

export const SPACING = { xs:4, sm:8, md:16, lg:24, xl:32, xxl:48 };

export const STATUS_COLORS: Record<string, string> = {
  Pending: PALETTE.amber, Shortlisted: PALETTE.cyan,
  Accepted: PALETTE.green, Rejected: PALETTE.red,
};

export const WORK_MODE_COLORS: Record<string, string> = {
  Remote: PALETTE.green, Hybrid: PALETTE.cyan, Onsite: PALETTE.violet,
};

// backward compat — screens importing COLORS directly still work
export const COLORS = { ...SHARED, ...dark };