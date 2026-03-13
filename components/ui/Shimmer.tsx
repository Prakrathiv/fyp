import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors, RADIUS } from "../../theme";

interface ShimmerProps {
  width?: number | string; height?: number;
  borderRadius?: number; style?: ViewStyle;
}

export const ShimmerBox: React.FC<ShimmerProps> = ({ width = "100%", height = 20, borderRadius = RADIUS.sm, style }) => {
  const colors = useColors();
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(anim, { toValue: 1, duration: 1200, useNativeDriver: true })).start();
  }, []);
  const translateX = anim.interpolate({ inputRange: [0,1], outputRange: [-300, 300] });
  return (
    <View style={[{ width: width as any, height, borderRadius, backgroundColor: colors.shimmer1, overflow: "hidden" }, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}>
        <LinearGradient colors={[colors.shimmer1, colors.shimmer2, colors.shimmer3]}
          start={{ x:0, y:0 }} end={{ x:1, y:0 }} style={StyleSheet.absoluteFill} />
      </Animated.View>
    </View>
  );
};

export const JobCardShimmer: React.FC = () => {
  const colors = useColors();
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.row}>
        <ShimmerBox width={52} height={52} borderRadius={RADIUS.md} />
        <View style={{ flex:1, gap:8 }}>
          <ShimmerBox width="70%" height={16} />
          <ShimmerBox width="50%" height={12} />
        </View>
      </View>
      <ShimmerBox width="100%" height={12} style={{ marginTop:12 }} />
      <ShimmerBox width="80%" height={12} style={{ marginTop:6 }} />
      <View style={[styles.row, { marginTop:14 }]}>
        <ShimmerBox width={80} height={28} borderRadius={RADIUS.full} />
        <ShimmerBox width={80} height={28} borderRadius={RADIUS.full} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: RADIUS.lg, padding:16, marginBottom:12 },
  row:  { flexDirection:"row", gap:12, alignItems:"center" },
});