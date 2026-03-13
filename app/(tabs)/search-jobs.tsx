import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, StatusBar, Animated, Image, Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColors, RADIUS, SHADOW, SPACING, SHARED, WORK_MODE_COLORS } from "../../theme";
import { JobCardShimmer } from "../../components/ui/Shimmer";
import { jobs } from "../../data/dummyData";
import { useAppStore } from "../../store/useAppStore";

const WORK_MODES = ["All","Remote","Hybrid","Onsite"];
const CATEGORIES = ["All","Engineering","Design","Delivery","Sales","Teaching","Healthcare"];

export default function SearchJobs() {
  const colors   = useColors();
  const router   = useRouter();
  const savedJobs  = useAppStore((s) => s.savedJobs);
  const toggleSave = useAppStore((s) => s.toggleSaveJob);

  const [q, setQ]         = useState("");
  const [mode, setMode]   = useState("All");
  const [cat, setCat]     = useState("All");
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue:1, duration:600, useNativeDriver:true }).start();
  }, []);

  const filtered = jobs.filter(j => {
    const matchQ    = !q || j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase());
    const matchMode = mode === "All" || j.workMode === mode;
    const matchCat  = cat === "All" || j.category === cat;
    return matchQ && matchMode && matchCat;
  });

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} translucent backgroundColor="transparent" />
      <LinearGradient colors={["#0F0A1E","#2D1B69"]} style={s.topGrad}>
        <SafeAreaView>
          <Text style={s.pageTitle}>Discover Jobs 🔍</Text>
          {/* Search bar */}
          <View style={[s.searchRow]}>
            <View style={[s.searchWrap, { backgroundColor: colors.surface }]}>
              <Ionicons name="search-outline" size={18} color={colors.textMuted} />
              <TextInput
                style={[s.searchInput, { color: colors.text }]}
                placeholder="Job title, company..."
                placeholderTextColor={colors.textMuted}
                value={q} onChangeText={setQ}
              />
              {q.length > 0 && (
                <TouchableOpacity onPress={() => setQ("")}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={() => setShowFilter(true)} activeOpacity={0.85}>
              <LinearGradient colors={SHARED.gradientPrimary} style={s.filterBtn}>
                <Ionicons name="options-outline" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* Mode pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.modeRow}>
            {WORK_MODES.map(m => {
              const on = m === mode;
              return (
                <TouchableOpacity key={m} onPress={() => setMode(m)} activeOpacity={0.8}>
                  {on
                    ? <LinearGradient colors={SHARED.gradientPrimary} style={s.modeOn}>
                        <Text style={s.modeOnText}>{m}</Text>
                      </LinearGradient>
                    : <View style={[s.modeOff, { borderColor: colors.border }]}>
                        <Text style={[s.modeOffText, { color: colors.textSecondary }]}>{m}</Text>
                      </View>
                  }
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: SPACING.md, paddingBottom: 100 }}>
        <Text style={[s.resultCount, { color: colors.textMuted }]}>{filtered.length} jobs found</Text>
        {filtered.map(job => {
          const saved = savedJobs.includes(job.id);
          return (
            <TouchableOpacity key={job.id} onPress={() => router.push(`/job/${job.id}` as any)} activeOpacity={0.9}
              style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }, SHADOW.sm]}>
              <LinearGradient colors={SHARED.gradientPrimary} style={s.accentBar} start={{x:0,y:0}} end={{x:0,y:1}} />
              <View style={s.cardTop}>
                <View style={[s.logo, { backgroundColor: colors.surface }]}>
                  <Text style={[s.logoTxt, { color: SHARED.primary }]}>{job.company[0]}</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={[s.title, { color: colors.text }]} numberOfLines={1}>{job.title}</Text>
                  <Text style={[s.company, { color: colors.textMuted }]}>{job.company} · {job.location}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleSave(job.id)}>
                  <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={20} color={saved ? SHARED.secondary : colors.textMuted} />
                </TouchableOpacity>
              </View>
              <View style={s.chips}>
                <View style={[s.chip, { backgroundColor: WORK_MODE_COLORS[job.workMode]+"22" }]}>
                  <Text style={[s.chipTxt, { color: WORK_MODE_COLORS[job.workMode] }]}>{job.workMode}</Text>
                </View>
                <View style={[s.chip, { backgroundColor: colors.surface }]}>
                  <Ionicons name="cash-outline" size={11} color={SHARED.accent} />
                  <Text style={[s.chipTxt, { color: colors.textSecondary }]}>{job.salaryDisplay}</Text>
                </View>
                {job.noResume && (
                  <View style={[s.chip, { backgroundColor: SHARED.success+"22" }]}>
                    <Text style={[s.chipTxt, { color: SHARED.success }]}>No Resume</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={() => router.push(`/job/${job.id}` as any)} activeOpacity={0.85}>
                <LinearGradient colors={SHARED.gradientPrimary} style={s.applyBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                  <Text style={s.applyTxt}>Apply Now →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>

      {/* Filter modal */}
      <Modal visible={showFilter} transparent animationType="slide" onRequestClose={() => setShowFilter(false)}>
        <TouchableOpacity style={s.modalOverlay} onPress={() => setShowFilter(false)} activeOpacity={1}>
          <View style={[s.filterSheet, { backgroundColor: colors.surface }]}>
            <LinearGradient colors={SHARED.gradientCard} style={s.filterHeader}>
              <Text style={s.filterTitle}>Filter Jobs</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            <View style={s.filterBody}>
              <Text style={[s.filterLabel, { color: colors.textSecondary }]}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap:8 }}>
                {CATEGORIES.map(c => {
                  const on = c === cat;
                  return (
                    <TouchableOpacity key={c} onPress={() => setCat(c)}>
                      {on
                        ? <LinearGradient colors={SHARED.gradientPrimary} style={s.modeOn}><Text style={s.modeOnText}>{c}</Text></LinearGradient>
                        : <View style={[s.modeOff, { borderColor: colors.border }]}><Text style={[s.modeOffText, { color: colors.textSecondary }]}>{c}</Text></View>
                      }
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <TouchableOpacity onPress={() => setShowFilter(false)} activeOpacity={0.85} style={{ marginTop: SPACING.md }}>
                <LinearGradient colors={SHARED.gradientPrimary} style={[s.applyBtn, { alignItems:"center" }]}>
                  <Text style={s.applyTxt}>Apply Filters</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  root:        { flex:1 },
  topGrad:     { paddingTop:50, paddingHorizontal:SPACING.md, paddingBottom:SPACING.md },
  pageTitle:   { fontSize:24, fontWeight:"800", color:"#fff", marginBottom:14 },
  searchRow:   { flexDirection:"row", gap:10, alignItems:"center", marginBottom:12 },
  searchWrap:  { flex:1, flexDirection:"row", alignItems:"center", gap:10, borderRadius:RADIUS.full, paddingHorizontal:16, paddingVertical:12 },
  searchInput: { flex:1, fontSize:14 },
  filterBtn:   { width:46, height:46, borderRadius:RADIUS.full, alignItems:"center", justifyContent:"center" },
  modeRow:     { gap:8, paddingBottom:4 },
  modeOn:      { paddingHorizontal:16, paddingVertical:8, borderRadius:RADIUS.full },
  modeOnText:  { fontSize:13, fontWeight:"700", color:"#fff" },
  modeOff:     { paddingHorizontal:16, paddingVertical:8, borderRadius:RADIUS.full, borderWidth:1.5 },
  modeOffText: { fontSize:13, fontWeight:"600" },
  resultCount: { fontSize:13, marginBottom:12 },
  card:        { borderRadius:RADIUS.lg, padding:16, marginBottom:12, borderWidth:1, overflow:"hidden" },
  accentBar:   { position:"absolute", left:0, top:0, bottom:0, width:4 },
  cardTop:     { flexDirection:"row", alignItems:"center", gap:12, marginBottom:12 },
  logo:        { width:44, height:44, borderRadius:10, alignItems:"center", justifyContent:"center" },
  logoTxt:     { fontSize:18, fontWeight:"800" },
  title:       { fontSize:15, fontWeight:"700", marginBottom:2 },
  company:     { fontSize:12 },
  chips:       { flexDirection:"row", gap:6, flexWrap:"wrap", marginBottom:12 },
  chip:        { flexDirection:"row", alignItems:"center", gap:4, paddingHorizontal:10, paddingVertical:5, borderRadius:RADIUS.full },
  chipTxt:     { fontSize:11, fontWeight:"600" },
  applyBtn:    { borderRadius:RADIUS.full, paddingVertical:11, paddingHorizontal:20 },
  applyTxt:    { color:"#fff", fontWeight:"700", fontSize:13 },
  modalOverlay:{ flex:1, backgroundColor:"rgba(0,0,0,0.6)", justifyContent:"flex-end" },
  filterSheet: { borderTopLeftRadius:RADIUS.xl, borderTopRightRadius:RADIUS.xl, overflow:"hidden" },
  filterHeader:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:SPACING.md },
  filterTitle: { fontSize:18, fontWeight:"700", color:"#fff" },
  filterBody:  { padding:SPACING.md, gap:SPACING.sm },
  filterLabel: { fontSize:14, fontWeight:"600", marginBottom:8 },
});