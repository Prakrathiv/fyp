import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW, STATUS_COLORS } from "../../theme";
import { JobApplication } from "../../data/dummyData";

interface Props { application: JobApplication }

export default function ApplicationCard({ application }: Props) {
  const statusStyle = STATUS_COLORS[application.status] ?? { bg: COLORS.bg, text: COLORS.textMuted };
  return (
    <View style={[styles.card, SHADOW.sm]}>
      <Image source={{ uri: application.companyLogo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{application.jobTitle}</Text>
        {/* ✅ FIXED: location now exists in JobApplication interface */}
        <Text style={styles.company}>{application.company} · {application.location}</Text>
        <Text style={styles.date}>Applied {application.appliedDate}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
        <Text style={[styles.badgeText, { color: statusStyle.text }]}>{application.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection:"row", alignItems:"center", backgroundColor:COLORS.card, borderRadius:RADIUS.lg, padding:14, marginBottom:10 },
  logo: { width:46, height:46, borderRadius:RADIUS.md, backgroundColor:COLORS.bg },
  info: { flex:1, marginLeft:12 },
  title: { fontSize:14, fontWeight:"700", color:COLORS.textPrimary },
  company: { fontSize:12, color:COLORS.textSecondary, marginTop:2 },
  date: { fontSize:11, color:COLORS.textMuted, marginTop:3 },
  badge: { paddingHorizontal:10, paddingVertical:5, borderRadius:RADIUS.full, maxWidth:120, alignItems:"center" },
  badgeText: { fontSize:11, fontWeight:"700", textAlign:"center" },
});