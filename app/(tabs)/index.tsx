import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView, Animated, Dimensions, Image, TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColors, RADIUS, SHADOW, SPACING, SHARED, STATUS_COLORS, WORK_MODE_COLORS } from "../../theme";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { JobCardShimmer } from "../../components/ui/Shimmer";
import { FAB } from "../../components/ui/FAB";
import { useAppStore } from "../../store/useAppStore";
import { jobs } from "../../data/dummyData";

const { width } = Dimensions.get("window");
const CATEGORIES = ["All","Engineering","Design","Delivery","Sales","Teaching","Healthcare"];

export default function HomeScreen() {
  const colors  = useColors();
  const router  = useRouter();
  const user    = useAppStore((s) => s.user);
  const savedJobs    = useAppStore((s) => s.savedJobs);
  const toggleSave   = useAppStore((s) => s.toggleSaveJob);
  const appliedJobs  = useAppStore((s) => s.appliedJobs);

  const [selectedCat, setSelectedCat] = useState("All");
  const [loading, setLoading]         = useState(true);

  // Entry animations
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const headerAnim = useRef(new Animated.Value(-30)).current;
  const listAnim   = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200); // simulate load
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue:1, duration:700, useNativeDriver:true }),
      Animated.spring(headerAnim, { toValue:0, friction:7, useNativeDriver:true }),
      Animated.timing(listAnim, { toValue:0, duration:600, delay:300, useNativeDriver:true }),
    ]).start();
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const greetEmoji = hour < 12 ? "🌅" : hour < 17 ? "☀️" : "🌙";

  const filtered = selectedCat === "All" ? jobs : jobs.filter(j => j.category === selectedCat);

  const StatCard = ({ icon, value, label, grad }: any) => (
    <LinearGradient colors={grad} style={[s.statCard, SHADOW.md]} start={{x:0,y:0}} end={{x:1,y:1}}>
      <Ionicons name={icon} size={22} color="rgba(255,255,255,0.9)" />
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </LinearGradient>
  );

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor="transparent" translucent />

      {/* HEADER */}
      <Animated.View style={{ transform:[{ translateY: headerAnim }], opacity: fadeAnim }}>
        <LinearGradient colors={["#0F0A1E","#2D1B69"]} style={s.header}>
          <SafeAreaView>
            <View style={s.headerRow}>
              <View style={{ flex:1 }}>
                <Text style={s.greeting}>{greeting} {greetEmoji}</Text>
                <Text style={s.userName} numberOfLines={1}>
                  {user?.name?.split(" ")[0] ?? "Friend"} 👋
                </Text>
                <Text style={s.location}>
                  <Ionicons name="location" size={12} color={SHARED.secondary} /> {user?.location ?? "Set your location"}
                </Text>
              </View>
              <View style={s.headerActions}>
                <ThemeToggle size={36} />
                <TouchableOpacity style={[s.notifBtn, { backgroundColor: colors.surface }]}>
                  <Ionicons name="notifications-outline" size={20} color={colors.text} />
                  <View style={s.notifDot} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/(tabs)/profile" as any)}>
                  {user?.avatar
                    ? <Image source={{ uri: user.avatar }} style={s.avatar} />
                    : <LinearGradient colors={SHARED.gradientPrimary} style={s.avatar}>
                        <Text style={s.avatarText}>{(user?.name ?? "U")[0]}</Text>
                      </LinearGradient>
                  }
                </TouchableOpacity>
              </View>
            </View>

            {/* Search bar */}
            <TouchableOpacity
              style={[s.searchBar, { backgroundColor: colors.surface }]}
              onPress={() => router.push("/(tabs)/search-jobs" as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="search-outline" size={18} color={colors.textMuted} />
              <Text style={[s.searchPlaceholder, { color: colors.textMuted }]}>Search jobs, companies...</Text>
              <LinearGradient colors={SHARED.gradientPrimary} style={s.filterBtn}>
                <Ionicons name="options-outline" size={16} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Stats row */}
        <Animated.View style={[s.statsRow, { opacity: fadeAnim }]}>
          <StatCard icon="briefcase-outline" value={appliedJobs.length} label="Applied" grad={["#7C3AED","#A855F7"]} />
          <StatCard icon="bookmark-outline" value={savedJobs.length} label="Saved" grad={["#EC4899","#F43F5E"]} />
          <StatCard icon="eye-outline" value="24" label="Views" grad={["#06B6D4","#0891B2"]} />
          <StatCard icon="star-outline" value={user?.rating ?? "4.5"} label="Rating" grad={["#F59E0B","#D97706"]} />
        </Animated.View>

        {/* Banner */}
        <Animated.View style={{ paddingHorizontal: SPACING.md, opacity: fadeAnim }}>
          <LinearGradient colors={["#7C3AED","#EC4899","#F43F5E"]} style={s.banner} start={{x:0,y:0}} end={{x:1,y:0}}>
            <View style={{ flex:1 }}>
              <Text style={s.bannerTitle}>Complete Your Profile</Text>
              <Text style={s.bannerSub}>Get 3x more responses from employers</Text>
              <View style={[s.progressBg]}>
                <LinearGradient colors={["#fff","rgba(255,255,255,0.7)"]} style={[s.progressFill, { width: `${user?.profileComplete ?? 20}%` as any }]} />
              </View>
              <Text style={s.bannerPct}>{user?.profileComplete ?? 20}% complete</Text>
            </View>
            <Ionicons name="rocket" size={56} color="rgba(255,255,255,0.3)" />
          </LinearGradient>
        </Animated.View>

        {/* Categories */}
        <View style={{ marginTop: SPACING.md }}>
          <View style={s.sectionHeader}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.catRow}>
            {CATEGORIES.map((cat) => {
              const active = cat === selectedCat;
              return (
                <TouchableOpacity key={cat} onPress={() => setSelectedCat(cat)} activeOpacity={0.8}>
                  {active
                    ? <LinearGradient colors={SHARED.gradientPrimary} style={s.catChipActive}>
                        <Text style={s.catTextActive}>{cat}</Text>
                      </LinearGradient>
                    : <View style={[s.catChip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Text style={[s.catText, { color: colors.textSecondary }]}>{cat}</Text>
                      </View>
                  }
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Job list */}
        <Animated.View style={{ transform:[{ translateY: listAnim }], opacity: fadeAnim }}>
          <View style={s.sectionHeader}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>
              {selectedCat === "All" ? "Recent Jobs" : selectedCat} ({filtered.length})
            </Text>
          </View>

          {loading
            ? [1,2,3].map(i => <JobCardShimmer key={i} />)
            : filtered.map((job) => {
                const saved   = savedJobs.includes(job.id);
                const applied = appliedJobs.includes(job.id);
                return (
                  <TouchableOpacity
                    key={job.id}
                    onPress={() => router.push(`/job/${job.id}` as any)}
                    activeOpacity={0.9}
                    style={[s.jobCard, { backgroundColor: colors.card, borderColor: colors.border }, SHADOW.sm]}
                  >
                    {/* Accent bar */}
                    <LinearGradient colors={SHARED.gradientPrimary} style={s.jobAccentBar} start={{x:0,y:0}} end={{x:1,y:0}} />

                    <View style={s.jobTop}>
                      <View style={[s.jobLogo, { backgroundColor: colors.surface }]}>
                        {job.companyLogo
                          ? <Image source={{ uri: job.companyLogo }} style={{ width:36, height:36, borderRadius:8 }} />
                          : <Text style={s.logoText}>{job.company[0]}</Text>
                        }
                      </View>
                      <View style={{ flex:1 }}>
                        <Text style={[s.jobTitle, { color: colors.text }]} numberOfLines={1}>{job.title}</Text>
                        <Text style={[s.jobCompany, { color: colors.textMuted }]}>{job.company}</Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleSave(job.id)} style={s.saveBtn}>
                        <Ionicons
                          name={saved ? "bookmark" : "bookmark-outline"}
                          size={20}
                          color={saved ? SHARED.secondary : colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={s.jobMeta}>
                      <View style={[s.metaChip, { backgroundColor: colors.surface }]}>
                        <Ionicons name="location-outline" size={12} color={SHARED.secondary} />
                        <Text style={[s.metaText, { color: colors.textSecondary }]}>{job.location}</Text>
                      </View>
                      <View style={[s.metaChip, { backgroundColor: colors.surface }]}>
                        <Ionicons name="cash-outline" size={12} color={SHARED.accent} />
                        <Text style={[s.metaText, { color: colors.textSecondary }]}>{job.salaryDisplay}</Text>
                      </View>
                      <View style={[s.metaChip, { backgroundColor: WORK_MODE_COLORS[job.workMode] + "22" }]}>
                        <Text style={[s.metaText, { color: WORK_MODE_COLORS[job.workMode] }]}>{job.workMode}</Text>
                      </View>
                    </View>

                    {(job.noResume || job.noInterview) && (
                      <View style={s.badgeRow}>
                        {job.noResume && (
                          <LinearGradient colors={["#10B981","#059669"]} style={s.badge}>
                            <Text style={s.badgeText}>✓ No Resume</Text>
                          </LinearGradient>
                        )}
                        {job.noInterview && (
                          <LinearGradient colors={["#06B6D4","#0891B2"]} style={s.badge}>
                            <Text style={s.badgeText}>✓ No Interview</Text>
                          </LinearGradient>
                        )}
                      </View>
                    )}

                    <View style={s.jobBottom}>
                      <View style={s.ratingRow}>
                        <Ionicons name="star" size={13} color={SHARED.accent} />
                        <Text style={[s.ratingText, { color: colors.textMuted }]}>{job.rating ?? "4.5"} · {job.shift ?? "Full Time"}</Text>
                      </View>
                      {applied
                        ? <View style={[s.appliedBadge, { backgroundColor: SHARED.success + "22" }]}>
                            <Ionicons name="checkmark-circle" size={14} color={SHARED.success} />
                            <Text style={[s.appliedText, { color: SHARED.success }]}>Applied</Text>
                          </View>
                        : <TouchableOpacity onPress={() => router.push(`/job/${job.id}` as any)} activeOpacity={0.85}>
                            <LinearGradient colors={SHARED.gradientPrimary} style={s.applyBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                              <Text style={s.applyBtnText}>Apply Now</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                      }
                    </View>
                  </TouchableOpacity>
                );
              })
          }
        </Animated.View>
      </ScrollView>

      {/* FAB for employers */}
      {user?.role === "employer" && (
        <FAB onPress={() => router.push("/post-job" as any)} icon="add" />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root:         { flex:1 },
  header:       { paddingTop: 50, paddingHorizontal: SPACING.md, paddingBottom: SPACING.md },
  headerRow:    { flexDirection:"row", alignItems:"flex-start", marginBottom: SPACING.md },
  headerActions:{ flexDirection:"row", alignItems:"center", gap:10 },
  greeting:     { fontSize:13, color:"rgba(255,255,255,0.6)", marginBottom:2 },
  userName:     { fontSize:22, fontWeight:"800", color:"#fff" },
  location:     { fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:3 },
  notifBtn:     { width:36, height:36, borderRadius:18, alignItems:"center", justifyContent:"center" },
  notifDot:     { position:"absolute", top:6, right:6, width:8, height:8, borderRadius:4, backgroundColor:"#EC4899", borderWidth:1.5, borderColor:"#0F0A1E" },
  avatar:       { width:40, height:40, borderRadius:20, alignItems:"center", justifyContent:"center", overflow:"hidden" },
  avatarText:   { fontSize:16, fontWeight:"700", color:"#fff" },
  searchBar:    { flexDirection:"row", alignItems:"center", borderRadius:RADIUS.full, paddingHorizontal:16, paddingVertical:12, gap:10, marginTop:4 },
  searchPlaceholder: { flex:1, fontSize:14 },
  filterBtn:    { width:32, height:32, borderRadius:16, alignItems:"center", justifyContent:"center" },
  statsRow:     { flexDirection:"row", paddingHorizontal:SPACING.md, paddingTop:SPACING.md, gap:10 },
  statCard:     { flex:1, borderRadius:RADIUS.md, padding:12, alignItems:"center", gap:4 },
  statValue:    { fontSize:18, fontWeight:"800", color:"#fff" },
  statLabel:    { fontSize:10, color:"rgba(255,255,255,0.75)", fontWeight:"500" },
  banner:       { borderRadius:RADIUS.xl, padding:20, marginTop:SPACING.md, flexDirection:"row", alignItems:"center", overflow:"hidden" },
  bannerTitle:  { fontSize:16, fontWeight:"800", color:"#fff", marginBottom:4 },
  bannerSub:    { fontSize:12, color:"rgba(255,255,255,0.8)", marginBottom:10 },
  progressBg:   { height:5, backgroundColor:"rgba(255,255,255,0.3)", borderRadius:4, overflow:"hidden", width:"90%" },
  progressFill: { height:"100%", borderRadius:4 },
  bannerPct:    { fontSize:11, color:"rgba(255,255,255,0.8)", marginTop:4 },
  sectionHeader:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:SPACING.md, marginTop:SPACING.md, marginBottom:10 },
  sectionTitle: { fontSize:17, fontWeight:"700" },
  catRow:       { paddingHorizontal:SPACING.md, gap:8 },
  catChip:      { paddingHorizontal:16, paddingVertical:8, borderRadius:RADIUS.full, borderWidth:1.5 },
  catChipActive:{ paddingHorizontal:16, paddingVertical:8, borderRadius:RADIUS.full },
  catText:      { fontSize:13, fontWeight:"600" },
  catTextActive:{ fontSize:13, fontWeight:"700", color:"#fff" },
  jobCard:      { marginHorizontal:SPACING.md, marginBottom:12, borderRadius:RADIUS.lg, padding:16, borderWidth:1, overflow:"hidden" },
  jobAccentBar: { position:"absolute", left:0, top:0, bottom:0, width:4 },
  jobTop:       { flexDirection:"row", alignItems:"center", gap:12, marginBottom:12 },
  jobLogo:      { width:48, height:48, borderRadius:12, alignItems:"center", justifyContent:"center" },
  logoText:     { fontSize:20, fontWeight:"800", color:"#7C3AED" },
  jobTitle:     { fontSize:15, fontWeight:"700", marginBottom:2 },
  jobCompany:   { fontSize:13 },
  saveBtn:      { padding:4 },
  jobMeta:      { flexDirection:"row", gap:6, flexWrap:"wrap", marginBottom:10 },
  metaChip:     { flexDirection:"row", alignItems:"center", gap:4, paddingHorizontal:10, paddingVertical:5, borderRadius:RADIUS.full },
  metaText:     { fontSize:11, fontWeight:"600" },
  badgeRow:     { flexDirection:"row", gap:6, marginBottom:10 },
  badge:        { paddingHorizontal:10, paddingVertical:4, borderRadius:RADIUS.full },
  badgeText:    { fontSize:11, color:"#fff", fontWeight:"600" },
  jobBottom:    { flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
  ratingRow:    { flexDirection:"row", alignItems:"center", gap:4 },
  ratingText:   { fontSize:12 },
  appliedBadge: { flexDirection:"row", alignItems:"center", gap:4, paddingHorizontal:12, paddingVertical:7, borderRadius:RADIUS.full },
  appliedText:  { fontSize:13, fontWeight:"700" },
  applyBtn:     { paddingHorizontal:18, paddingVertical:9, borderRadius:RADIUS.full },
  applyBtnText: { fontSize:13, fontWeight:"700", color:"#fff" },
});