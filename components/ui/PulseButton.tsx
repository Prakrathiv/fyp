import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RADIUS, SHADOW, SHARED } from "../../theme";

interface PulseButtonProps {
  onPress: () => void;
  label: string;
  colors?: readonly [string, string, ...string[]];
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const PulseButton: React.FC<PulseButtonProps> = ({
  onPress, label, colors = SHARED.gradientPrimary,
  loading, disabled, style, pulse = false, size = "md", icon,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!pulse || disabled) return;
    Animated.loop(Animated.parallel([
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.5, duration: 900, useNativeDriver: true }),
      ]),
    ])).start();
  }, [pulse, disabled]);

  const onPressIn  = () => Animated.spring(scaleAnim, { toValue: 0.94, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  const py = size === "sm" ? 10 : size === "lg" ? 18 : 14;
  const fs = size === "sm" ? 13 : size === "lg" ? 17 : 15;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      {pulse && !disabled && (
        <Animated.View style={[StyleSheet.absoluteFill, {
          borderRadius: RADIUS.full, backgroundColor: colors[0],
          transform: [{ scale: pulseAnim }], opacity: glowAnim,
        }]} />
      )}
      <TouchableOpacity onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}
        disabled={disabled || loading} activeOpacity={0.9}>
        <LinearGradient
          colors={disabled ? ["#555","#555"] : colors}
          start={{ x:0, y:0 }} end={{ x:1, y:0 }}
          style={[styles.btn, { paddingVertical: py, paddingHorizontal: size === "sm" ? 16 : 24 }, SHADOW.md]}
        >
          {loading ? <ActivityIndicator color="#fff" size="small" /> : (
            <>{icon}{<Text style={[styles.label, { fontSize: fs }]}>{label}</Text>}</>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: { borderRadius: RADIUS.full, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  label: { color: "#fff", fontWeight: "700", letterSpacing: 0.3 },
});