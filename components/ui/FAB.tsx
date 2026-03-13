import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SHARED, SHADOW } from "../../theme";

interface FABProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  colors?: readonly [string, string, ...string[]];
}

export const FAB: React.FC<FABProps> = ({ onPress, icon = "add", style, colors = SHARED.gradientPrimary }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bounceAnim, { toValue:1, friction:4, tension:60, useNativeDriver:true }).start();
  }, []);

  const onPressIn  = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue:0.88, useNativeDriver:true }),
      Animated.timing(rotateAnim, { toValue:1, duration:200, useNativeDriver:true }),
    ]).start();
  };
  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue:1, friction:3, useNativeDriver:true }),
      Animated.timing(rotateAnim, { toValue:0, duration:200, useNativeDriver:true }),
    ]).start();
  };

  const rotate = rotateAnim.interpolate({ inputRange:[0,1], outputRange:["0deg","45deg"] });

  return (
    <Animated.View style={[styles.wrap, style, { transform:[{ scale: Animated.multiply(bounceAnim, scaleAnim) }, { rotate }] }]}>
      <TouchableOpacity onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} activeOpacity={0.9}>
        <LinearGradient colors={colors} start={{x:0,y:0}} end={{x:1,y:1}} style={[styles.fab, SHADOW.glow]}>
          <Ionicons name={icon} size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: { position:"absolute", bottom:90, right:20, zIndex:100 },
  fab:  { width:60, height:60, borderRadius:30, alignItems:"center", justifyContent:"center" },
});