import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW } from "../../theme";
// ✅ FIXED: import AppUser from store instead of User from dummyData
import { AppUser } from "../../store/useAppStore";

interface Props { user: AppUser; onEdit?: () => void }

export default function ProfileCard({ user, onEdit }: Props) {
  return (
    <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={styles.card} start={{ x:0, y:0 }} end={{ x:1, y:1 }}>
      <View style={styles.row}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.jobTitle}>{user.jobTitle}</Text>
          <View style={styles.locRow}>
            <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.location}>{user.location}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FBBF24" />
            <Text style={styles.rating}>{user.rating}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statVal}>{user.appliedJobs.length}</Text>
          <Text style={styles.statLbl}>Applied</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>{user.savedJobs.length}</Text>
          <Text style={styles.statLbl}>Saved</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>{user.connections}</Text>
          <Text style={styles.statLbl}>Connections</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: RADIUS.xl, padding: 20, marginBottom: 16, ...SHADOW.lg },
  row: { flexDirection: "row", alignItems: "flex-start" },
  avatar: { width:64, height:64, borderRadius:32, borderWidth:3, borderColor:"rgba(255,255,255,0.5)" },
  info: { flex:1, marginLeft:14 },
  name: { fontSize:18, fontWeight:"800", color:"#fff" },
  jobTitle: { fontSize:13, color:"rgba(255,255,255,0.85)", marginTop:2 },
  locRow: { flexDirection:"row", alignItems:"center", marginTop:4, gap:3 },
  location: { fontSize:12, color:"rgba(255,255,255,0.75)" },
  ratingRow: { flexDirection:"row", alignItems:"center", gap:3, marginTop:3 },
  rating: { fontSize:12, color:"#FBBF24", fontWeight:"700" },
  editBtn: { width:32, height:32, borderRadius:16, backgroundColor:"rgba(255,255,255,0.2)", alignItems:"center", justifyContent:"center" },
  statsRow: { flexDirection:"row", justifyContent:"space-around", marginTop:18, paddingTop:14, borderTopWidth:1, borderTopColor:"rgba(255,255,255,0.2)" },
  stat: { alignItems:"center" },
  statVal: { fontSize:18, fontWeight:"800", color:"#fff" },
  statLbl: { fontSize:11, color:"rgba(255,255,255,0.75)", marginTop:2 },
  divider: { width:1, backgroundColor:"rgba(255,255,255,0.2)" },
});