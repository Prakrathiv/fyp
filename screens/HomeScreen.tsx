import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface HomeScreenProps {
  onPostJob: () => void;
  onBack: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onPostJob, onBack }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Gradient Header */}
        <LinearGradient
          colors={["#4F6EF7", "#7C3AED"]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.logo}>JobProvider</Text>
            <TouchableOpacity style={styles.profileBtn}>
              <Ionicons name="person-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.welcomeText}>Welcome Back! 👋</Text>
          <Text style={styles.subText}>Post a job and find the perfect candidate</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statVal}>24</Text>
              <Text style={styles.statLbl}>Active Jobs</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statVal}>142</Text>
              <Text style={styles.statLbl}>Applicants</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statVal}>8</Text>
              <Text style={styles.statLbl}>Interviews</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Post Job Button */}
          <TouchableOpacity style={styles.postBtn} onPress={onPostJob} activeOpacity={0.85}>
            <View style={styles.postBtnIcon}>
              <Ionicons name="add-circle" size={26} color="#4F6EF7" />
            </View>
            <View style={styles.postBtnText}>
              <Text style={styles.postBtnTitle}>Post a New Job</Text>
              <Text style={styles.postBtnSub}>Fill 3 quick steps</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#4F6EF7" />
          </TouchableOpacity>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="people-outline" size={24} color="#7C3AED" />
              <Text style={styles.actionLabel}>Applicants</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar-outline" size={24} color="#06D6A0" />
              <Text style={styles.actionLabel}>Interviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="analytics-outline" size={24} color="#F59E0B" />
              <Text style={styles.actionLabel}>Analytics</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {[
            { title: "Senior Developer", count: "12 applicants", time: "2d ago" },
            { title: "Product Manager",  count: "8 applicants",  time: "5d ago" },
            { title: "UI/UX Designer",   count: "5 applicants",  time: "1w ago" },
          ].map((item, i) => (
            <View key={i} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Ionicons name="briefcase-outline" size={20} color="#4F6EF7" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.applicants}>{item.count}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          ))}

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F1F5FE" },
  scroll: { flex: 1 },
  header: { paddingTop: 12, paddingHorizontal: 20, paddingBottom: 28 },
  topBar: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 20,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  logo: { fontSize: 18, fontWeight: "800", color: "#fff" },
  profileBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  welcomeText: { fontSize: 24, fontWeight: "800", color: "#fff" },
  subText: { fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 4, marginBottom: 20 },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1, backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 14, padding: 12, alignItems: "center",
  },
  statVal: { fontSize: 22, fontWeight: "800", color: "#fff" },
  statLbl: { fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  body: {
    padding: 16, marginTop: -16,
    backgroundColor: "#F1F5FE",
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  postBtn: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 18,
    padding: 18, marginBottom: 24,
    shadowColor: "#4F6EF7", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 5,
  },
  postBtnIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center", marginRight: 14,
  },
  postBtnText: { flex: 1 },
  postBtnTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  postBtnSub: { fontSize: 12, color: "#64748B", marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#0F172A", marginBottom: 12 },
  actionsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  actionCard: {
    flex: 1, backgroundColor: "#fff", borderRadius: 14,
    padding: 14, alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  actionLabel: { fontSize: 12, fontWeight: "600", color: "#334155", marginTop: 6 },
  activityCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 14,
    padding: 14, marginBottom: 10,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  activityIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  activityInfo: { flex: 1 },
  jobTitle: { fontSize: 15, fontWeight: "600", color: "#0F172A" },
  applicants: { fontSize: 12, color: "#64748B", marginTop: 2 },
  time: { fontSize: 12, color: "#94A3B8" },
});

export default HomeScreen;