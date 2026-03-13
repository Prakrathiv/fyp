import React, { useRef } from "react";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useColors, RADIUS, SHADOW } from "../../theme";

interface Props { size?: number; }

export const ThemeToggle: React.FC<Props> = ({ size = 40 }) => {
  const { mode, toggleTheme } = useTheme();
  const colors   = useColors();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, { toValue:1, duration:400, useNativeDriver:true }),
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue:0.8, useNativeDriver:true }),
        Animated.spring(scaleAnim, { toValue:1, friction:3, useNativeDriver:true }),
      ]),
    ]).start(() => rotateAnim.setValue(0));
    toggleTheme();
  };

  const rotate = rotateAnim.interpolate({ inputRange:[0,1], outputRange:["0deg","360deg"] });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={[
        s.btn,
        { width:size, height:size, borderRadius:size/2,
          backgroundColor: colors.surface, borderColor: colors.border },
        { transform:[{ rotate },{ scale: scaleAnim }] },
        SHADOW.sm,
      ]}>
        <Ionicons
          name={mode === "dark" ? "sunny" : "moon"}
          size={size * 0.45}
          color={mode === "dark" ? "#F59E0B" : "#7C3AED"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  btn: { alignItems:"center", justifyContent:"center", borderWidth:1.5 },
});
