import React, { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Image, SafeAreaView, StatusBar, Linking, Alert, Modal, TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW, WORK_MODE_COLORS } from "../../theme";
import { jobs } from "../../data/dummyData";
import { useAppStore } from "../../store/useAppStore";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user, toggleSaveJob, addAppliedJob } = useAppStore();
  const job = jobs.find(j => j.id === id);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const [applied, setApplied] = useState(
    user?.appliedJobs.includes(id ?? "") ?? false
  );

  if (!job) return null;

  const isSaved = user?.savedJobs.includes(job.id) ?? false;
  const modeColor = WORK_MODE_COLORS[job.workMode] ?? COLORS.primary;

  const handleApply = () => {
    addAppliedJob(job.id);
    setApplied(true);
    setShowApplyModal(false);
    Alert.alert("Applied! 🎉", "Your application has been sent. You will be notified when the employer responds.");
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I applied for ${job.title} on NaukriNear. My rating is ${user?.rating}⭐`;
    Linking.openURL(`https://wa.me/${job.employerPhone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={() => toggleSaveJob(job.id)}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.companyRow}>
          <Image source={{ uri: job.companyLogo }} style={styles.logo} />
          <View style={styles.companyInfo}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.8)" />
              <Text style={styles.metaText}>{job.location} · {job.distance}</Text>
            </View>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: modeColor + "30" }]}>
            <Text style={[styles.badgeText, { color: "#fff" }]}>{job.workMode}</Text>
          </View>
          {job.noResume && (
            <View style={styles.noBadge}>
              <Ionicons name="document-outline" size={12} color="#fff" />
              <Text style={styles.noBadgeText}>No Resume</Text>
            </View>
          )}
          {job.noInterview && (
            <View style={styles.noBadge}>
              <Ionicons name="people-outline" size={12} color="#fff" />
              <Text style={styles.noBadgeText}>No Interview</Text>
            </View>
          )}
          {job.isNew && (
            <View style={[styles.badge, { backgroundColor: COLORS.accent + "40" }]}>
              <Text style={[styles.badgeText, { color: "#fff" }]}>NEW</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Salary + Rating */}
        <View style={styles.salaryCard}>
          <View style={styles.salaryItem}>
            <Text style={styles.salaryLabel}>Salary</Text>
            <Text style={styles.salaryValue}>{job.salary}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.salaryItem}>
            <Text style={styles.salaryLabel}>Rating</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.salaryValue}>{job.rating}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.salaryItem}>
            <Text style={styles.salaryLabel}>Posted</Text>
            <Text style={styles.salaryValue}>{job.postedAt}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this Job</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {job.requirements.map((req, i) => (
            <View key={i} style={styles.reqRow}>
              <View style={styles.reqDot} />
              <Text style={styles.reqText}>{req}</Text>
            </View>
          ))}
        </View>

        {/* WhatsApp — locked/unlocked */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Employer</Text>
          <View style={styles.whatsappCard}>
            <Ionicons
              name={applied ? "logo-whatsapp" : "lock-closed-outline"}
              size={24}
              color={applied ? "#25D366" : COLORS.textMuted}
            />
            <View style={styles.whatsappInfo}>
              <Text style={styles.whatsappTitle}>
                {applied ? "WhatsApp Employer" : "WhatsApp Locked 🔒"}
              </Text>
              <Text style={styles.whatsappSub}>
                {applied
                  ? "Your application was accepted — contact now!"
                  : "Apply first. Unlocks when employer accepts you."}
              </Text>
            </View>
            {applied && (
              <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp}>
                <Text style={styles.whatsappBtnText}>Chat</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Apply Button */}
      <View style={styles.bottomBar}>
        {applied ? (
          <View style={styles.appliedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.appliedText}>Application Sent! Waiting for response...</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.applyBtn} onPress={() => setShowApplyModal(true)}>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.applyBtnText}>Quick Apply</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Apply Modal */}
      <Modal visible={showApplyModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Apply to {job.company}</Text>

            {/* Seeker Rating Preview */}
            <View style={styles.ratingPreview}>
              <Image source={{ uri: user?.avatar }} style={styles.ratingAvatar} />
              <View>
                <Text style={styles.ratingName}>{user?.name}</Text>
                <View style={styles.starsRow}>
                  {[1,2,3,4,5].map(s => (
                    <Ionicons key={s} name="star" size={14}
                      color={s <= Math.round(user?.rating ?? 0) ? "#F59E0B" : "#E2E8F0"} />
                  ))}
                  <Text style={styles.ratingVal}>{user?.rating} · {user?.reviewCount} reviews</Text>
                </View>
              </View>
            </View>

            {/* Resume toggle */}
            {!job.noResume && (
              <View style={styles.resumeRow}>
                <Ionicons name="document-attach-outline" size={18} color={COLORS.primary} />
                <Text style={styles.resumeText}>
                  {user?.resumeUri ? "Resume attached ✓" : "No resume — apply with profile rating"}
                </Text>
              </View>
            )}

            {/* Cover Note */}
            <Text style={styles.coverLabel}>Cover Note (optional)</Text>
            <TextInput
              style={styles.coverInput}
              placeholder="Say something about yourself..."
              placeholderTextColor={COLORS.textMuted}
              multiline numberOfLines={3}
              value={coverNote}
              onChangeText={setCoverNote}
            />

            <TouchableOpacity style={styles.modalApplyBtn} onPress={handleApply}>
              <Text style={styles.modalApplyText}>🚀 Send Application</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowApplyModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor: COLORS.bg },
  header: { paddingTop: 12, paddingHorizontal: 20, paddingBottom: 24 },
  headerRow: { flexDirection:"row", justifyContent:"space-between", marginBottom:20 },
  closeBtn: { width:38,height:38,borderRadius:19,backgroundColor:"rgba(255,255,255,0.2)",alignItems:"center",justifyContent:"center" },
  saveBtn: { width:38,height:38,borderRadius:19,backgroundColor:"rgba(255,255,255,0.2)",alignItems:"center",justifyContent:"center" },
  companyRow: { flexDirection:"row", alignItems:"center", marginBottom:16 },
  logo: { width:56,height:56,borderRadius:14,backgroundColor:"#fff",marginRight:14 },
  companyInfo: { flex:1 },
  jobTitle: { fontSize:19,fontWeight:"800",color:"#fff" },
  companyName: { fontSize:14,color:"rgba(255,255,255,0.85)",marginTop:2 },
  metaRow: { flexDirection:"row",alignItems:"center",gap:4,marginTop:4 },
  metaText: { fontSize:12,color:"rgba(255,255,255,0.75)" },
  badgesRow: { flexDirection:"row",gap:8,flexWrap:"wrap" },
  badge: { paddingHorizontal:12,paddingVertical:5,borderRadius:RADIUS.full },
  badgeText: { fontSize:11,fontWeight:"700" },
  noBadge: { flexDirection:"row",gap:4,alignItems:"center",backgroundColor:"rgba(255,255,255,0.15)",paddingHorizontal:10,paddingVertical:5,borderRadius:RADIUS.full },
  noBadgeText: { fontSize:11,fontWeight:"600",color:"#fff" },
  body: { flex:1 },
  salaryCard: { flexDirection:"row",backgroundColor:"#fff",margin:16,borderRadius:RADIUS.lg,padding:16,...SHADOW.sm },
  salaryItem: { flex:1,alignItems:"center" },
  salaryLabel: { fontSize:11,color:COLORS.textMuted,marginBottom:4 },
  salaryValue: { fontSize:14,fontWeight:"700",color:COLORS.textPrimary },
  ratingRow: { flexDirection:"row",alignItems:"center",gap:4 },
  divider: { width:1,backgroundColor:COLORS.border },
  section: { backgroundColor:"#fff",marginHorizontal:16,marginBottom:12,borderRadius:RADIUS.lg,padding:16,...SHADOW.sm },
  sectionTitle: { fontSize:15,fontWeight:"800",color:COLORS.textPrimary,marginBottom:12 },
  description: { fontSize:14,color:COLORS.textSecondary,lineHeight:22 },
  reqRow: { flexDirection:"row",alignItems:"center",gap:10,marginBottom:8 },
  reqDot: { width:7,height:7,borderRadius:4,backgroundColor:COLORS.primary },
  reqText: { fontSize:14,color:COLORS.textPrimary,flex:1 },
  whatsappCard: { flexDirection:"row",alignItems:"center",backgroundColor:COLORS.bg,borderRadius:RADIUS.md,padding:14,gap:12 },
  whatsappInfo: { flex:1 },
  whatsappTitle: { fontSize:14,fontWeight:"700",color:COLORS.textPrimary },
  whatsappSub: { fontSize:12,color:COLORS.textSecondary,marginTop:2 },
  whatsappBtn: { backgroundColor:"#25D366",paddingHorizontal:14,paddingVertical:8,borderRadius:RADIUS.full },
  whatsappBtnText: { color:"#fff",fontWeight:"700",fontSize:13 },
  bottomBar: { backgroundColor:"#fff",padding:16,borderTopWidth:1,borderTopColor:COLORS.border },
  applyBtn: { backgroundColor:COLORS.primary,borderRadius:RADIUS.full,paddingVertical:15,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8,...SHADOW.md },
  applyBtnText: { color:"#fff",fontSize:16,fontWeight:"800" },
  appliedBanner: { flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8 },
  appliedText: { fontSize:14,color:COLORS.success,fontWeight:"600" },
  modalOverlay: { flex:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"flex-end" },
  modalSheet: { backgroundColor:"#fff",borderTopLeftRadius:RADIUS.xl,borderTopRightRadius:RADIUS.xl,padding:24 },
  modalHandle: { width:40,height:4,borderRadius:2,backgroundColor:COLORS.border,alignSelf:"center",marginBottom:20 },
  modalTitle: { fontSize:18,fontWeight:"800",color:COLORS.dark,marginBottom:16 },
  ratingPreview: { flexDirection:"row",alignItems:"center",gap:12,backgroundColor:COLORS.bg,borderRadius:RADIUS.md,padding:12,marginBottom:16 },
  ratingAvatar: { width:44,height:44,borderRadius:22 },
  ratingName: { fontSize:14,fontWeight:"700",color:COLORS.dark },
  starsRow: { flexDirection:"row",alignItems:"center",gap:2,marginTop:4 },
  ratingVal: { fontSize:12,color:COLORS.textSecondary,marginLeft:6 },
  resumeRow: { flexDirection:"row",alignItems:"center",gap:8,backgroundColor:COLORS.bg,borderRadius:RADIUS.md,padding:12,marginBottom:16 },
  resumeText: { fontSize:13,color:COLORS.textPrimary },
  coverLabel: { fontSize:13,fontWeight:"600",color:COLORS.textPrimary,marginBottom:8 },
  coverInput: { borderWidth:1.5,borderColor:COLORS.border,borderRadius:RADIUS.md,padding:12,fontSize:14,color:COLORS.dark,textAlignVertical:"top",marginBottom:16 },
  modalApplyBtn: { backgroundColor:COLORS.primary,borderRadius:RADIUS.full,paddingVertical:15,alignItems:"center",marginBottom:10 },
  modalApplyText: { color:"#fff",fontWeight:"800",fontSize:15 },
  cancelBtn: { alignItems:"center",paddingVertical:10 },
  cancelText: { fontSize:14,color:COLORS.textMuted },
});