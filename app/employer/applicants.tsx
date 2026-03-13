import React, { useState } from "react";
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  Image, SafeAreaView, StatusBar, Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW, STATUS_COLORS } from "../../theme";
import { employerApplicants, JobApplication } from "../../data/dummyData";

export default function ApplicantsScreen() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<JobApplication[]>(employerApplicants);

  const updateStatus = (id: string, status: JobApplication["status"]) => {
    setApplicants(prev => prev.map(a =>
      a.id === id ? { ...a, status, whatsappUnlocked: status === "Accepted" } : a
    ));
    const msg = status === "Accepted"
      ? "Applicant accepted! They can now contact you on WhatsApp."
      : "Applicant rejected.";
    Alert.alert(status, msg);
  };

  const sorted = [...applicants].sort((a, b) => b.seekerRating - a.seekerRating);
  const pending = sorted.filter(a => a.status === "Pending").length;

  const renderItem = ({ item, index }: { item: JobApplication; index: number }) => {
    const sc = STATUS_COLORS[item.status];
    const isPending = item.status === "Pending";
    return (
      <View style={[styles.card, SHADOW.sm]}>
        {/* Rank badge */}
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>

        <View style={styles.cardTop}>
          <Image source={{ uri: item.seekerAvatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.seekerName}</Text>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map(s => (
                <Ionicons key={s} name="star" size={13}
                  color={s <= Math.round(item.seekerRating) ? "#F59E0B" : "#E2E8F0"} />
              ))}
              <Text style={styles.ratingVal}>{item.seekerRating}</Text>
            </View>
            <Text style={styles.appliedDate}>Applied {item.appliedDate}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
            <Text style={[styles.statusText, { color: sc.text }]}>{item.status}</Text>
          </View>
        </View>

        {item.coverNote ? (
          <View style={styles.noteBox}>
            <Ionicons name="chatbubble-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.noteText}>{item.coverNote}</Text>
          </View>
        ) : null}

        {isPending && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.rejectBtn]}
              onPress={() => updateStatus(item.id, "Rejected")}
            >
              <Ionicons name="close" size={16} color={COLORS.danger} />
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.acceptBtn]}
              onPress={() => updateStatus(item.id, "Accepted")}
            >
              <Ionicons name="checkmark" size={16} color="#fff" />
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Applicants</Text>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>{pending} pending</Text>
          </View>
        </View>
        <Text style={styles.headerSub}>Sorted by rating · highest first</Text>
      </LinearGradient>

      <FlatList
        data={sorted}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListFooterComponent={<View style={{ height: 40 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No applicants yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor:COLORS.bg },
  header: { paddingTop:12, paddingHorizontal:20, paddingBottom:24 },
  headerRow: { flexDirection:"row", alignItems:"center", gap:12, marginBottom:6 },
  backBtn: { width:38,height:38,borderRadius:19,backgroundColor:"rgba(255,255,255,0.2)",alignItems:"center",justifyContent:"center" },
  headerTitle: { flex:1, fontSize:20,fontWeight:"800",color:"#fff" },
  pendingBadge: { backgroundColor:"rgba(255,255,255,0.2)",paddingHorizontal:12,paddingVertical:5,borderRadius:RADIUS.full },
  pendingText: { fontSize:12,fontWeight:"700",color:"#fff" },
  headerSub: { fontSize:13,color:"rgba(255,255,255,0.7)" },
  card: { backgroundColor:COLORS.card,borderRadius:RADIUS.lg,padding:16,marginBottom:12,position:"relative" },
  rankBadge: { position:"absolute",top:12,right:12,width:28,height:28,borderRadius:14,backgroundColor:COLORS.primary+"15",alignItems:"center",justifyContent:"center" },
  rankText: { fontSize:11,fontWeight:"800",color:COLORS.primary },
  cardTop: { flexDirection:"row",alignItems:"flex-start",gap:12,marginBottom:10 },
  avatar: { width:52,height:52,borderRadius:26,backgroundColor:COLORS.bg },
  info: { flex:1 },
  name: { fontSize:15,fontWeight:"700",color:COLORS.dark },
  starsRow: { flexDirection:"row",alignItems:"center",gap:2,marginTop:4 },
  ratingVal: { fontSize:12,color:COLORS.textSecondary,marginLeft:6,fontWeight:"600" },
  appliedDate: { fontSize:11,color:COLORS.textMuted,marginTop:4 },
  statusBadge: { paddingHorizontal:10,paddingVertical:4,borderRadius:RADIUS.full },
  statusText: { fontSize:11,fontWeight:"700" },
  noteBox: { flexDirection:"row",gap:8,alignItems:"flex-start",backgroundColor:COLORS.bg,borderRadius:RADIUS.md,padding:10,marginBottom:10 },
  noteText: { fontSize:13,color:COLORS.textSecondary,flex:1,lineHeight:18 },
  actionRow: { flexDirection:"row",gap:10 },
  actionBtn: { flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",paddingVertical:10,borderRadius:RADIUS.full,gap:6 },
  rejectBtn: { backgroundColor:COLORS.danger+"15",borderWidth:1,borderColor:COLORS.danger+"30" },
  acceptBtn: { backgroundColor:COLORS.primary },
  rejectText: { fontSize:14,fontWeight:"700",color:COLORS.danger },
  acceptText: { fontSize:14,fontWeight:"700",color:"#fff" },
  empty: { alignItems:"center",paddingTop:60 },
  emptyIcon: { fontSize:48,marginBottom:12 },
  emptyText: { fontSize:16,color:COLORS.textSecondary },
});