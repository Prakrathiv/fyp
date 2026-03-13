import { useSSO, useSignIn } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  StatusBar, TextInput, KeyboardAvoidingView, Platform,
  ActivityIndicator, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useColors, RADIUS, SHADOW, SHARED } from "../theme";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useAppStore } from "../store/useAppStore";

WebBrowser.maybeCompleteAuthSession();
type Step = "main" | "phone" | "otp";

export default function AuthScreen() {
  const router = useRouter();
  const colors = useColors();
  const { startSSOFlow } = useSSO();
  const { signIn, setActive } = useSignIn();
  const syncWithClerk = useAppStore((s) => s.syncWithClerk);

  const [step, setStep]       = useState<Step>("main");
  const [phone, setPhone]     = useState("");
  const [otp, setOtp]         = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;
  const cardSlide = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue:1, duration:800, useNativeDriver:true }),
      Animated.spring(logoScale, { toValue:1, friction:5, tension:60, useNativeDriver:true }),
      Animated.timing(slideAnim, { toValue:0, duration:700, useNativeDriver:true }),
      Animated.timing(cardSlide, { toValue:0, duration:800, delay:200, useNativeDriver:true }),
    ]).start();
    Animated.loop(Animated.sequence([
      Animated.timing(logoPulse, { toValue:1.07, duration:1200, useNativeDriver:true }),
      Animated.timing(logoPulse, { toValue:1, duration:1200, useNativeDriver:true }),
    ])).start();
  }, []);

  const animateStep = () => {
    cardSlide.setValue(30); fadeAnim.setValue(0.3);
    Animated.parallel([
      Animated.timing(cardSlide, { toValue:0, duration:350, useNativeDriver:true }),
      Animated.timing(fadeAnim, { toValue:1, duration:350, useNativeDriver:true }),
    ]).start();
  };
  const goStep = (s: Step) => { setError(""); setStep(s); animateStep(); };

  const handleGoogle = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const redirectUrl = AuthSession.makeRedirectUri({ scheme: "clerkexpo" });
      const { createdSessionId, setActive: sa } = await startSSOFlow({ strategy: "oauth_google", redirectUrl });
      if (createdSessionId && sa) {
        await sa({ session: createdSessionId });
        router.replace("/landing" as any);
      }
    } catch { setError("Google sign-in failed. Try again."); }
    finally { setLoading(false); }
  }, [startSSOFlow]);

  const handleSendOTP = async () => {
    if (phone.length < 10) { setError("Enter a valid phone number"); return; }
    try {
      setLoading(true); setError("");
      await signIn?.create({ strategy: "phone_code", identifier: phone });
      goStep("otp");
    } catch (e: any) { setError(e?.errors?.[0]?.message ?? "Failed to send OTP"); }
    finally { setLoading(false); }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 4) { setError("Enter the OTP"); return; }
    try {
      setLoading(true); setError("");
      const result = await signIn?.attemptFirstFactor({ strategy: "phone_code", code: otp });
      if (result?.status === "complete" && setActive) {
        await setActive({ session: result.createdSessionId! });
        router.replace("/landing" as any);
      }
    } catch (e: any) { setError(e?.errors?.[0]?.message ?? "Invalid OTP"); }
    finally { setLoading(false); }
  };

  return (
    <View style={{ flex:1, backgroundColor: colors.background }}>
      <StatusBar barStyle={colors.statusBar} backgroundColor="transparent" translucent />
      <LinearGradient colors={["#0F0A1E","#1E1040","#3B1F6A"]} style={StyleSheet.absoluteFill} />
      <View style={[s.circle1, { borderColor:"rgba(124,58,237,0.25)" }]} />
      <View style={[s.circle2, { borderColor:"rgba(236,72,153,0.2)" }]} />
      <SafeAreaView style={{ flex:1 }}>
        <View style={s.topRow}><ThemeToggle /></View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={s.kav}>
          <Animated.View style={[s.logoWrap, { opacity:fadeAnim, transform:[{ translateY:slideAnim },{ scale: Animated.multiply(logoScale, logoPulse) }] }]}>
            <LinearGradient colors={SHARED.gradientPrimary} style={s.logoIcon} start={{x:0,y:0}} end={{x:1,y:1}}>
              <Ionicons name="briefcase" size={38} color="#fff" />
            </LinearGradient>
            <Text style={s.appName}>NaukriNear</Text>
            <Text style={s.tagline}>Hyperlocal Jobs · Near You 📍</Text>
          </Animated.View>

          <Animated.View style={[s.card, { backgroundColor:colors.card, transform:[{ translateY:cardSlide }], opacity:fadeAnim }, SHADOW.lg]}>
            {step === "main" && (
              <>
                <Text style={[s.cardTitle, { color:colors.text }]}>Welcome Back 👋</Text>
                <Text style={[s.cardSub, { color:colors.textMuted }]}>Sign in to find jobs near you</Text>
                <TouchableOpacity style={[s.googleBtn, { borderColor:colors.border, backgroundColor:colors.surface }]} onPress={handleGoogle} disabled={loading} activeOpacity={0.85}>
                  {loading ? <ActivityIndicator color={SHARED.primary} /> : (
                    <><Text style={s.googleG}>G</Text><Text style={[s.googleText, { color:colors.text }]}>Continue with Google</Text></>
                  )}
                </TouchableOpacity>
                <View style={s.divRow}>
                  <View style={[s.div, { backgroundColor:colors.border }]} />
                  <Text style={[s.divText, { color:colors.textMuted }]}>or</Text>
                  <View style={[s.div, { backgroundColor:colors.border }]} />
                </View>
                <TouchableOpacity activeOpacity={0.85} onPress={() => goStep("phone")}>
                  <LinearGradient colors={SHARED.gradientPrimary} style={s.phoneBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                    <Ionicons name="call-outline" size={20} color="#fff" />
                    <Text style={s.phoneBtnText}>Continue with Phone</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
            {step === "phone" && (
              <>
                <TouchableOpacity style={s.backRow} onPress={() => goStep("main")}>
                  <Ionicons name="arrow-back" size={18} color={SHARED.primary} />
                  <Text style={[s.backText, { color:SHARED.primary }]}>Back</Text>
                </TouchableOpacity>
                <Text style={[s.cardTitle, { color:colors.text }]}>Enter Phone</Text>
                <Text style={[s.cardSub, { color:colors.textMuted }]}>We'll send you a verification code</Text>
                <View style={[s.inputWrap, { backgroundColor:colors.inputBg, borderColor:colors.inputBorder }]}>
                  <Ionicons name="call-outline" size={18} color={colors.textMuted} />
                  <TextInput style={[s.input, { color:colors.text }]} placeholder="+91 98765 43210"
                    placeholderTextColor={colors.textMuted} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                </View>
                {error ? <Text style={s.error}>{error}</Text> : null}
                <TouchableOpacity activeOpacity={0.85} onPress={handleSendOTP} disabled={loading}>
                  <LinearGradient colors={SHARED.gradientPrimary} style={s.primaryBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.primaryBtnText}>Send OTP</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
            {step === "otp" && (
              <>
                <TouchableOpacity style={s.backRow} onPress={() => goStep("phone")}>
                  <Ionicons name="arrow-back" size={18} color={SHARED.primary} />
                  <Text style={[s.backText, { color:SHARED.primary }]}>Back</Text>
                </TouchableOpacity>
                <Text style={[s.cardTitle, { color:colors.text }]}>Enter OTP</Text>
                <Text style={[s.cardSub, { color:colors.textMuted }]}>Sent to {phone}</Text>
                <View style={[s.inputWrap, { backgroundColor:colors.inputBg, borderColor:colors.inputBorder }]}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
                  <TextInput style={[s.input, { color:colors.text }]} placeholder="6-digit code"
                    placeholderTextColor={colors.textMuted} keyboardType="number-pad" maxLength={6} value={otp} onChangeText={setOtp} />
                </View>
                {error ? <Text style={s.error}>{error}</Text> : null}
                <TouchableOpacity activeOpacity={0.85} onPress={handleVerifyOTP} disabled={loading}>
                  <LinearGradient colors={SHARED.gradientPrimary} style={s.primaryBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.primaryBtnText}>Verify & Sign In</Text>}
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={s.resendRow} onPress={handleSendOTP}>
                  <Text style={[s.resendText, { color:SHARED.primary }]}>Resend OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
          <Text style={s.legal}>By signing in you agree to our Terms & Privacy Policy</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  topRow:       { flexDirection:"row", justifyContent:"flex-end", paddingHorizontal:20, paddingTop:10 },
  kav:          { flex:1, justifyContent:"center", padding:24 },
  circle1:      { position:"absolute", width:300, height:300, borderRadius:150, borderWidth:1, top:-80, right:-80 },
  circle2:      { position:"absolute", width:200, height:200, borderRadius:100, borderWidth:1, bottom:100, left:-60 },
  logoWrap:     { alignItems:"center", marginBottom:32 },
  logoIcon:     { width:76, height:76, borderRadius:24, alignItems:"center", justifyContent:"center", marginBottom:14, ...SHADOW.glow },
  appName:      { fontSize:32, fontWeight:"800", color:"#fff", letterSpacing:0.5 },
  tagline:      { fontSize:13, color:"rgba(255,255,255,0.55)", marginTop:5 },
  card:         { borderRadius:RADIUS.xl, padding:28 },
  cardTitle:    { fontSize:23, fontWeight:"800", marginBottom:4 },
  cardSub:      { fontSize:14, marginBottom:24 },
  googleBtn:    { flexDirection:"row", alignItems:"center", justifyContent:"center", borderWidth:1.5, borderRadius:RADIUS.full, paddingVertical:14, gap:10, marginBottom:16 },
  googleG:      { fontSize:18, fontWeight:"800", color:"#EA4335" },
  googleText:   { fontSize:15, fontWeight:"600" },
  divRow:       { flexDirection:"row", alignItems:"center", gap:12, marginBottom:16 },
  div:          { flex:1, height:1 },
  divText:      { fontSize:13 },
  phoneBtn:     { borderRadius:RADIUS.full, paddingVertical:15, flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10 },
  phoneBtnText: { fontSize:15, fontWeight:"700", color:"#fff" },
  backRow:      { flexDirection:"row", alignItems:"center", gap:6, marginBottom:18 },
  backText:     { fontSize:14, fontWeight:"600" },
  inputWrap:    { flexDirection:"row", alignItems:"center", borderWidth:1.5, borderRadius:RADIUS.md, paddingHorizontal:14, paddingVertical:13, marginBottom:16, gap:10 },
  input:        { flex:1, fontSize:15 },
  error:        { fontSize:13, color:"#EF4444", marginBottom:12 },
  primaryBtn:   { borderRadius:RADIUS.full, paddingVertical:15, alignItems:"center" },
  primaryBtnText: { fontSize:15, fontWeight:"700", color:"#fff" },
  resendRow:    { alignItems:"center", marginTop:14 },
  resendText:   { fontSize:13, fontWeight:"600" },
  legal:        { textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:22 },
});