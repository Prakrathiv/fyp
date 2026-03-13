import { useRouter } from "expo-router";
import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useColors, RADIUS, SHADOW, SPACING, SHARED } from "../theme";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useAppStore } from "../store/useAppStore";

export default function Landing() {
  const router  = useRouter();
  const colors  = useColors();
  const setRole = useAppStore((s) => s.setRole);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const card1Anim = useRef(new Animated.Value(60)).current;
  const card2Anim = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue:1, duration:600, useNativeDriver:true }),
      Animated.spring(card1Anim, { toValue:0, delay:200, friction:7, useNativeDriver:true }),
      Animated.spring(card2Anim, { toValue:0, delay:380, friction:7, useNativeDriver:true }),
    ]).start();
  }, []);

  const handleRole = async (role: "seeker" | "employer") => {
    await setRole(role);
    router.replace("/(tabs)" as any);
  };

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} />
      <LinearGradient colors={["#0F0A1E","#1E1040","#2D1B69"]} style={StyleSheet.absoluteFill} />
      <View style={[s.circle, { borderColor:"rgba(124,58,237,0.2)" }]} />
      <SafeAreaView style={s.safe}>
        <View style={s.topRow}><ThemeToggle /></View>
        <Animated.View style={[s.header, { opacity:fadeAnim }]}>
          <LinearGradient colors={SHARED.gradientPrimary} style={s.headerIcon}>
            <Ionicons name="briefcase" size={30} color="#fff" />
          </LinearGradient>
          <Text style={s.headerTitle}>NaukriNear</Text>
          <Text style={s.headerSub}>What would you like to do?</Text>
        </Animated.View>
        <View style={s.cards}>
          {[
            { role:"seeker",   icon:"search",  title:"Find a Job",  sub:"Browse local jobs near you",       grad:["#7C3AED","#A855F7","#EC4899"] as const, anim:card1Anim },
            { role:"employer", icon:"people",  title:"Post a Job",  sub:"Hire the best talent nearby",      grad:["#EC4899","#F43F5E","#EF4444"] as const, anim:card2Anim },
          ].map(({ role, icon, title, sub, grad, anim }) => (
            <Animated.View key={role} style={{ transform:[{ translateY:anim }], opacity:fadeAnim }}>
              <TouchableOpacity onPress={() => handleRole(role as any)} activeOpacity={0.85}>
                <LinearGradient colors={grad} style={[s.roleCard, SHADOW.lg]} start={{x:0,y:0}} end={{x:1,y:1}}>
                  <View style={s.roleIconWrap}>
                    <Ionicons name={icon as any} size={44} color="#fff" />
                  </View>
                  <Text style={s.roleTitle}>{title}</Text>
                  <Text style={s.roleSub}>{sub}</Text>
                  <View style={s.roleArrow}>
                    <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.8)" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root:        { flex:1 },
  safe:        { flex:1 },
  topRow:      { flexDirection:"row", justifyContent:"flex-end", padding:20 },
  circle:      { position:"absolute", width:400, height:400, borderRadius:200, borderWidth:1, top:-120, right:-120 },
  header:      { alignItems:"center", paddingHorizontal:24, marginBottom:40 },
  headerIcon:  { width:64, height:64, borderRadius:20, alignItems:"center", justifyContent:"center", marginBottom:16, ...SHADOW.glow },
  headerTitle: { fontSize:30, fontWeight:"800", color:"#fff", marginBottom:6 },
  headerSub:   { fontSize:15, color:"rgba(255,255,255,0.6)", textAlign:"center" },
  cards:       { paddingHorizontal:24, gap:16 },
  roleCard:    { borderRadius:RADIUS.xl, padding:28, minHeight:160 },
  roleIconWrap:{ width:68, height:68, borderRadius:20, backgroundColor:"rgba(255,255,255,0.2)", alignItems:"center", justifyContent:"center", marginBottom:16 },
  roleTitle:   { fontSize:24, fontWeight:"800", color:"#fff", marginBottom:6 },
  roleSub:     { fontSize:13, color:"rgba(255,255,255,0.75)", lineHeight:20 },
  roleArrow:   { position:"absolute", bottom:24, right:24 },
});