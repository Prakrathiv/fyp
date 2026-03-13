import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOW } from "../../theme";

interface Props {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  delta?: string;
  deltaUp?: boolean;
}

export default function StatsCard({ label, value, icon, color = COLORS.primary, delta, deltaUp }: Props) {
  return (
    <View style={[styles.card, SHADOW.sm]}>
      <View style={[styles.iconBox, { backgroundColor: color + "18" }]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {delta ? (
        <Text style={[styles.delta, { color: deltaUp ? COLORS.success : COLORS.danger }]}>
          {deltaUp ? "▲" : "▼"} {delta}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    alignItems: "center",
    margin: 5,
    minWidth: 80,
  },
  iconBox: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  iconText: { fontSize: 18 },
  value: { fontSize: 22, fontWeight: "700", color: COLORS.textPrimary },
  label: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2, textAlign: "center" },
  delta: { fontSize: 11, marginTop: 4, fontWeight: "600" },
});