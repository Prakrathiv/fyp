import React, { useState, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, StatusBar, Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ── Inline Step components (replace with your real Step1/Step2/Step3 imports) ──
// If you already have Step1/Step2/Step3 files, replace these with:
// import Step1 from "../Step1"; etc.

function Step1({ formData, updateField }: any) {
  return (
    <View style={stepStyles.wrap}>
      <Text style={stepStyles.heading}>Job Details</Text>
      <Text style={stepStyles.label}>Job Title</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>e.g. Senior React Developer</Text>
      </View>
      <Text style={stepStyles.label}>Job Category</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>Select category</Text>
      </View>
      <Text style={stepStyles.label}>Job Description</Text>
      <View style={[stepStyles.inputBox, { height: 100 }]}>
        <Text style={stepStyles.inputPlaceholder}>Describe the role...</Text>
      </View>
    </View>
  );
}

function Step2() {
  return (
    <View style={stepStyles.wrap}>
      <Text style={stepStyles.heading}>Salary & Work Mode</Text>
      <Text style={stepStyles.label}>Minimum Salary</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>e.g. $50,000</Text>
      </View>
      <Text style={stepStyles.label}>Maximum Salary</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>e.g. $80,000</Text>
      </View>
      <Text style={stepStyles.label}>Work Mode</Text>
      <View style={stepStyles.chipRow}>
        {["Remote", "Hybrid", "Onsite"].map(m => (
          <View key={m} style={stepStyles.chip}>
            <Text style={stepStyles.chipText}>{m}</Text>
          </View>
        ))}
      </View>
      <Text style={stepStyles.label}>Shift</Text>
      <View style={stepStyles.chipRow}>
        {["Day", "Night", "Flexible"].map(s => (
          <View key={s} style={stepStyles.chip}>
            <Text style={stepStyles.chipText}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Step3({ formData, updateField }: any) {
  return (
    <View style={stepStyles.wrap}>
      <Text style={stepStyles.heading}>Company Info</Text>
      <Text style={stepStyles.label}>Company Name</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>Your company name</Text>
      </View>
      <Text style={stepStyles.label}>Company Email</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>hr@company.com</Text>
      </View>
      <Text style={stepStyles.label}>City</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>e.g. Mumbai</Text>
      </View>
      <Text style={stepStyles.label}>Area / Locality</Text>
      <View style={stepStyles.inputBox}>
        <Text style={stepStyles.inputPlaceholder}>e.g. Bandra West</Text>
      </View>
    </View>
  );
}

const stepStyles = StyleSheet.create({
  wrap: { padding: 20 },
  heading: { fontSize: 20, fontWeight: "800", color: "#0F172A", marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6, marginTop: 12 },
  inputBox: {
    backgroundColor: "#F8FAFC", borderRadius: 12,
    borderWidth: 1, borderColor: "#E2E8F0",
    paddingHorizontal: 14, paddingVertical: 14, justifyContent: "center",
  },
  inputPlaceholder: { fontSize: 14, color: "#94A3B8" },
  chipRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  chip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999,
    backgroundColor: "#EEF2FF", borderWidth: 1, borderColor: "#C7D2FE",
  },
  chipText: { fontSize: 13, fontWeight: "600", color: "#4F6EF7" },
});

// ── Main JobPostForm ──────────────────────────────────────────────────────────
interface JobPostFormProps {
  onGoToDashboard: () => void;
}

interface FormData {
  minSalary: string; maxSalary: string; shift: string;
  jobType: string; city: string; area: string;
  chargeFee: string; companyType: string; companyEmail: string;
}

const STEPS = ["Job Details", "Salary & Mode", "Company Info"];

export default function JobPostForm({ onGoToDashboard }: JobPostFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    minSalary: "", maxSalary: "", shift: "", jobType: "",
    city: "", area: "", chargeFee: "", companyType: "", companyEmail: "",
  });
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const updateField = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const animateTransition = (cb: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(cb, 150);
  };

  const goNext = () => {
    if (currentStep < 3) animateTransition(() => setCurrentStep(s => s + 1));
    else onGoToDashboard();
  };

  const goBack = () => {
    if (currentStep > 1) animateTransition(() => setCurrentStep(s => s - 1));
    else onGoToDashboard();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post New Job</Text>
        <TouchableOpacity onPress={onGoToDashboard}>
          <Text style={styles.dashboardLink}>Dashboard</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressWrap}>
        {STEPS.map((label, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isDone = step < currentStep;
          return (
            <React.Fragment key={label}>
              <View style={styles.stepItem}>
                <View style={[
                  styles.stepCircle,
                  isDone && styles.stepDone,
                  isActive && styles.stepActive,
                ]}>
                  {isDone
                    ? <Ionicons name="checkmark" size={14} color="#fff" />
                    : <Text style={[styles.stepNum, isActive && { color: "#fff" }]}>{step}</Text>
                  }
                </View>
                <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
                  {label}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Animated Step Content */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {currentStep === 1 && <Step1 formData={formData} updateField={updateField} />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 formData={formData} updateField={updateField} />}
        </Animated.View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {currentStep > 1 ? (
          <TouchableOpacity style={[styles.navBtn, styles.backNavBtn]} onPress={goBack}>
            <Ionicons name="arrow-back" size={16} color="#64748B" />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={[styles.navBtn, styles.nextBtn, currentStep === 1 && styles.fullWidth]}
          onPress={goNext}
        >
          <Text style={styles.nextBtnText}>
            {currentStep === 3 ? "🚀  Post Job" : "Next  →"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: "#F1F5F9",
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  dashboardLink: { fontSize: 14, fontWeight: "600", color: "#4F6EF7" },

  progressWrap: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 24, paddingVertical: 16,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1, borderBottomColor: "#E2E8F0",
  },
  stepItem: { alignItems: "center" },
  stepCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: "#E2E8F0", alignItems: "center", justifyContent: "center",
    marginBottom: 4,
  },
  stepActive: { backgroundColor: "#4F6EF7" },
  stepDone: { backgroundColor: "#06D6A0" },
  stepNum: { fontSize: 13, fontWeight: "700", color: "#94A3B8" },
  stepLabel: { fontSize: 10, color: "#94A3B8", fontWeight: "600", textAlign: "center", maxWidth: 64 },
  stepLabelActive: { color: "#4F6EF7" },
  stepLine: { flex: 1, height: 2, backgroundColor: "#E2E8F0", marginBottom: 18, marginHorizontal: 4 },
  stepLineDone: { backgroundColor: "#06D6A0" },

  scroll: { flex: 1 },
  navButtons: {
    flexDirection: "row", gap: 10,
    paddingHorizontal: 20, paddingVertical: 16,
    borderTopWidth: 1, borderTopColor: "#F1F5F9",
    backgroundColor: "#fff",
  },
  navBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 },
  backNavBtn: { backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" },
  nextBtn: { backgroundColor: "#4F6EF7" },
  fullWidth: { flex: 1 },
  backBtnText: { fontSize: 15, fontWeight: "600", color: "#64748B" },
  nextBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});