import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW, WORK_MODE_COLORS } from "../../theme";
import { Job } from "../../data/dummyData";

interface Props {
  job: Job;
  onSave?: () => void;
  saved?: boolean;
}

export default function JobCard({ job, onSave, saved }: Props) {
  const modeColor = WORK_MODE_COLORS[job.workMode] ?? COLORS.primary;
  return (
    <View style={[styles.card, SHADOW.sm]}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: job.companyLogo }} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
        </View>
        {job.isNew && (
          <View style={styles.newBadge}><Text style={styles.newText}>NEW</Text></View>
        )}
      </View>

      {/* Meta row */}
      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={13} color={COLORS.textMuted} />
        <Text style={styles.meta}>{job.location}</Text>
        <Text style={styles.dot}>·</Text>
        <Text style={styles.meta}>{job.distance}</Text>
        <Text style={styles.dot}>·</Text>
        <Text style={[styles.modeBadge, { backgroundColor: modeColor + "18", color: modeColor }]}>
          {job.workMode}
        </Text>
      </View>

      {/* Salary + rating */}
      <View style={styles.salaryRow}>
        <Text style={styles.salary}>{job.salary}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.rating}>{job.rating}</Text>
        </View>
        <Text style={styles.posted}>{job.postedAt}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Apply Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => Linking.openURL("https://wa.me/")}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onSave}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={20}
            color={saved ? COLORS.primary : COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.lg,
    padding: 16, marginBottom: 12,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  logo: { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: COLORS.bg },
  headerText: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary },
  company: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  newBadge: { backgroundColor: COLORS.accent + "20", paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.full },
  newText: { fontSize: 10, fontWeight: "700", color: COLORS.accent },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 4 },
  meta: { fontSize: 12, color: COLORS.textMuted },
  dot: { fontSize: 12, color: COLORS.textMuted },
  modeBadge: { fontSize: 11, fontWeight: "600", paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.full },
  salaryRow: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 8 },
  salary: { fontSize: 14, fontWeight: "700", color: COLORS.primary, flex: 1 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  rating: { fontSize: 12, color: COLORS.textSecondary },
  posted: { fontSize: 11, color: COLORS.textMuted },
  actions: { flexDirection: "row", alignItems: "center", gap: 8 },
  applyBtn: {
    flex: 1, backgroundColor: COLORS.primary, borderRadius: RADIUS.full,
    paddingVertical: 10, alignItems: "center",
  },
  applyText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  iconBtn: {
    width: 40, height: 40, borderRadius: RADIUS.full, borderWidth: 1,
    borderColor: COLORS.border, alignItems: "center", justifyContent: "center",
  },
});