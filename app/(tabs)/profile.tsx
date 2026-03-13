import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Animated, Image, Modal, Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useColors, useTheme, RADIUS, SHADOW, SPACING, SHARED } from "../../theme";
import { useAppStore } from "../../store/useAppStore";
import { LanguagePicker } from "../../components/ui/LanguagePicker";
import { useLanguage } from "../../i18n";

export default function ProfileScreen() {
  const colors   = useColors();
  const { mode, toggleTheme } = useTheme();
  const router   = useRouter();
  const { signOut } = useAuth();
  const user     = useAppStore((s) => s.user);
  const logout   = useAppStore((s) => s.logout);
  const setRole  = useAppStore((s) => s.setRole);
  const { t }    = useLanguage();

  const [showLang, setShowLang]   = useState(false);
  const [showRole, setShowRole]   = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue:1, duration:600, useNativeDriver:true }),
      Animated.spring(slideAnim, { toValue:0, friction:7, useNativeDriver:true }),
    ]).start();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    logout();
    router.replace("/");
  };

  const menuItems = [
    { icon:"person-outline",    label: t.editProfile,    action: () => {}, color: SHARED.primary },
    { icon:"document-outline",  label: t.myResume,       action: () => {}, color: SHARED.cyan },
    { icon:"images-outline",    label: t.workShowcase,   action: () => {}, color: SHARED.accent },
    { icon:"star-outline",      label: t.reviews,        action: () => {}, color: SHARED.warning },
    { icon:"language-outline",  label: "Language",       action: () => setShowLang(true), color: "#A78BFA" },
    { icon:"swap-horizontal-outline", label: t.switchRole, action: () => setShowRole(true), color: SHARED.secondary },
  ];

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient colors={["#0F0A1E","#3B1F6A"]} style={s.header}>
          <SafeAreaView>
            <View style={s.headerRow}>
              <Text style={s.headerTitle}>{t.profile}</Text>
              {/* Dark mode toggle */}
              <View style={s.toggleRow}>
                <Ionicons name={mode === "dark" ? "moon" : "sunny"} size={18} color={mode === "dark" ? "#F59E0B" : "#7C3AED"} />
                <Switch
                  value={mode === "dark"}
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#D1C4E9", true: "#7C3AED" }}
                  thumbColor={mode === "dark" ? "#EC4899" : "#A78BFA"}
                />
              </View>
            </View>

            {/* Avatar + info */}
            <Animated.View style={[s.avatarSection, { opacity: fadeAnim, transform:[{ translateY: slideAnim }] }]}>
              {user?.avatar
                ? <Image source={{ uri: user.avatar }} style={s.avatar} />
                : <LinearGradient colors={SHARED.gradientPrimary} style={s.avatar}>
                    <Text style={s.avatarText}>{(user?.name ?? "U")[0]}</Text>
                  </LinearGradient>
              }
              <View style={[s.roleChip, { backgroundColor: SHARED.secondary }]}>
                <Text style={s.roleChipText}>{user?.role === "employer" ? "👔 Employer" : "🔍 Seeker"}</Text>
              </View>
              <Text style={s.userName}>{user?.name ?? "Your Name"}</Text>
              <Text style={[s.userTitle, { color: "rgba(255,255,255,0.7)" }]}>{user?.jobTitle ?? "Add your title"}</Text>
              <View style={s.locationRow}>
                <Ionicons name="location-outline" size={14} color={SHARED.secondary} />
                <Text style={[s.locationText, { color: "rgba(255,255,255,0.6)" }]}>{user?.location ?? "Add location"}</Text>
              </View>

              {/* Stats */}
              <View style={s.statsRow}>
                {[
                  { val: user?.rating ?? "4.5", label: "Rating", icon: "star" },
                  { val: user?.reviewCount ?? 0, label: "Reviews", icon: "chatbubble" },
                  { val: user?.connections ?? 0, label: "Connects", icon: "people" },
                ].map(({ val, label, icon }) => (
                  <View key={label} style={s.statItem}>
                    <Ionicons name={icon as any} size={16} color={SHARED.primaryLight} />
                    <Text style={s.statVal}>{val}</Text>
                    <Text style={[s.statLabel, { color: "rgba(255,255,255,0.55)" }]}>{label}</Text>
                  </View>
                ))}
              </View>

              {/* Progress bar */}
              <View style={s.progressWrap}>
                <View style={s.progressRow}>
                  <Text style={[s.progressLabel, { color: "rgba(255,255,255,0.7)" }]}>{t.profileComplete}</Text>
                  <Text style={s.progressPct}>{user?.profileComplete ?? 20}%</Text>
                </View>
                <View style={s.progressBg}>
                  <LinearGradient colors={SHARED.gradientPrimary} style={[s.progressFill, { width: `${user?.profileComplete ?? 20}%` as any }]} />
                </View>
              </View>
            </Animated.View>
          </SafeAreaView>
        </LinearGradient>

        {/* Menu items */}
        <Animated.View style={[s.menuSection, { opacity: fadeAnim }]}>
          {menuItems.map(({ icon, label, action, color }, i) => (
            <TouchableOpacity key={i} style={[s.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={action} activeOpacity={0.8}>
              <View style={[s.menuIcon, { backgroundColor: color + "22" }]}>
                <Ionicons name={icon as any} size={20} color={color} />
              </View>
              <Text style={[s.menuLabel, { color: colors.text }]}>{label}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}

          {/* Sign out */}
          <TouchableOpacity onPress={handleSignOut} activeOpacity={0.85} style={{ marginTop: SPACING.sm }}>
            <LinearGradient colors={["#EF4444","#DC2626"]} style={s.signOutBtn}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={s.signOutText}>{t.signOut}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <LanguagePicker visible={showLang} onClose={() => setShowLang(false)} />

      {/* Role switch modal */}
      <Modal visible={showRole} transparent animationType="fade" onRequestClose={() => setShowRole(false)}>
        <View style={s.modalOverlay}>
          <View style={[s.roleModal, { backgroundColor: colors.surface }]}>
            <LinearGradient colors={SHARED.gradientCard} style={s.roleModalHeader}>
              <Text style={s.roleModalTitle}>{t.switchRole}</Text>
            </LinearGradient>
            {[
              { role:"seeker", label: t.seekerMode, icon:"search", grad: SHARED.gradientViolet },
              { role:"employer", label: t.employerMode, icon:"people", grad: SHARED.gradientPink },
            ].map(({ role, label, icon, grad }) => (
              <TouchableOpacity key={role} onPress={async () => { await setRole(role as any); setShowRole(false); }} activeOpacity={0.85} style={{ padding: SPACING.md }}>
                <LinearGradient colors={grad} style={s.roleOption}>
                  <Ionicons name={icon as any} size={24} color="#fff" />
                  <Text style={s.roleOptionText}>{label}</Text>
                  {user?.role === role && <Ionicons name="checkmark-circle" size={20} color="#fff" />}
                </LinearGradient>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowRole(false)} style={{ padding: SPACING.md, alignItems:"center" }}>
              <Text style={[s.cancelText, { color: colors.textMuted }]}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  root:          { flex:1 },
  header:        { paddingTop:50, paddingBottom: SPACING.lg },
  headerRow:     { flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal: SPACING.md, marginBottom: SPACING.lg },
  headerTitle:   { fontSize:22, fontWeight:"800", color:"#fff" },
  toggleRow:     { flexDirection:"row", alignItems:"center", gap:8 },
  avatarSection: { alignItems:"center", paddingHorizontal: SPACING.md },
  avatar:        { width:90, height:90, borderRadius:45, alignItems:"center", justifyContent:"center", overflow:"hidden", borderWidth:3, borderColor: "rgba(255,255,255,0.3)", ...SHADOW.glow },
  avatarText:    { fontSize:36, fontWeight:"800", color:"#fff" },
  roleChip:      { paddingHorizontal:14, paddingVertical:5, borderRadius: RADIUS.full, marginTop:10 },
  roleChipText:  { fontSize:12, fontWeight:"700", color:"#fff" },
  userName:      { fontSize:22, fontWeight:"800", color:"#fff", marginTop:10 },
  userTitle:     { fontSize:14, marginTop:4 },
  locationRow:   { flexDirection:"row", alignItems:"center", gap:4, marginTop:6 },
  locationText:  { fontSize:13 },
  statsRow:      { flexDirection:"row", gap: SPACING.xl, marginTop: SPACING.md },
  statItem:      { alignItems:"center", gap:4 },
  statVal:       { fontSize:18, fontWeight:"800", color:"#fff" },
  statLabel:     { fontSize:11 },
  progressWrap:  { width:"100%", marginTop: SPACING.md },
  progressRow:   { flexDirection:"row", justifyContent:"space-between", marginBottom:6 },
  progressLabel: { fontSize:12 },
  progressPct:   { fontSize:12, fontWeight:"700", color: SHARED.primaryLight },
  progressBg:    { height:6, backgroundColor:"rgba(255,255,255,0.2)", borderRadius:4, overflow:"hidden" },
  progressFill:  { height:"100%", borderRadius:4 },
  menuSection:   { padding: SPACING.md, gap:10 },
  menuItem:      { flexDirection:"row", alignItems:"center", gap:14, padding:16, borderRadius: RADIUS.lg, borderWidth:1 },
  menuIcon:      { width:40, height:40, borderRadius: RADIUS.md, alignItems:"center", justifyContent:"center" },
  menuLabel:     { flex:1, fontSize:15, fontWeight:"600" },
  signOutBtn:    { flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, padding:16, borderRadius: RADIUS.full },
  signOutText:   { fontSize:15, fontWeight:"700", color:"#fff" },
  modalOverlay:  { flex:1, backgroundColor:"rgba(0,0,0,0.7)", justifyContent:"center", alignItems:"center" },
  roleModal:     { width:"85%", borderRadius: RADIUS.xl, overflow:"hidden" },
  roleModalHeader:{ padding: SPACING.md },
  roleModalTitle: { fontSize:18, fontWeight:"700", color:"#fff" },
  roleOption:    { flexDirection:"row", alignItems:"center", gap:14, padding:16, borderRadius: RADIUS.lg },
  roleOptionText: { flex:1, fontSize:16, fontWeight:"700", color:"#fff" },
  cancelText:    { fontSize:15, fontWeight:"600" },
});