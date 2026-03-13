import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, RADIUS } from "../../theme";
import { applications } from "../../data/dummyData";
import ApplicationCard from "../../components/ui/ApplicationCard";

const FILTERS = ["All", "Pending", "Shortlisted", "Interview Scheduled", "Accepted", "Rejected"];

export default function ApplicationsScreen() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? applications : applications.filter(a => a.status === filter);

  const counts = FILTERS.slice(1).reduce((acc, s) => {
    acc[s] = applications.filter(a => a.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.header}>
        <Text style={styles.title}>My Applications</Text>
        <View style={styles.overviewRow}>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewVal}>{applications.length}</Text>
            <Text style={styles.overviewLbl}>Total</Text>
          </View>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewVal}>{counts["Shortlisted"] ?? 0}</Text>
            <Text style={styles.overviewLbl}>Shortlisted</Text>
          </View>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewVal}>{counts["Interview Scheduled"] ?? 0}</Text>
            <Text style={styles.overviewLbl}>Interviews</Text>
          </View>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewVal}>{counts["Accepted"] ?? 0}</Text>
            <Text style={styles.overviewLbl}>Accepted</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View style={styles.tabsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTERS.map(f => (
            <TouchableOpacity key={f} style={[styles.tab, filter === f && styles.tabActive]} onPress={() => setFilter(f)}>
              <Text style={[styles.tabText, filter === f && styles.tabTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.resultCount}>{filtered.length} applications</Text>
        {filtered.map(app => <ApplicationCard key={app.id} application={app} />)}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No applications in this status.</Text>
          </View>
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 28 },
  title: { fontSize: 22, fontWeight: "800", color: "#fff", marginBottom: 16 },
  overviewRow: { flexDirection: "row", gap: 8 },
  overviewCard: { flex: 1, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: RADIUS.md, padding: 12, alignItems: "center" },
  overviewVal: { fontSize: 20, fontWeight: "800", color: "#fff" },
  overviewLbl: { fontSize: 10, color: "rgba(255,255,255,0.8)", marginTop: 2, textAlign: "center" },
  tabsWrap: { backgroundColor: "#fff", paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: RADIUS.full, backgroundColor: COLORS.bg, marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  resultCount: { fontSize: 13, color: COLORS.textMuted, marginBottom: 10 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: COLORS.textSecondary },
});