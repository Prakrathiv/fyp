import { Tabs } from "expo-router";
import React, { useRef, useEffect } from "react";
import { Animated, View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useColors, RADIUS, SHADOW, SHARED } from "../../theme";

function TabIcon({ name, focused, label }: { name: keyof typeof Ionicons.glyphMap; focused: boolean; label: string }) {
  const scale  = useRef(new Animated.Value(1)).current;
  const moveY  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: focused ? 1.18 : 1, friction:5, useNativeDriver:true }),
      Animated.spring(moveY, { toValue: focused ? -5 : 0, friction:5, useNativeDriver:true }),
    ]).start();
  }, [focused]);

  return (
    <View style={tab.wrap}>
      <Animated.View style={{ transform:[{ scale },{ translateY: moveY }] }}>
        {focused
          ? <LinearGradient colors={SHARED.gradientPrimary} style={tab.activeBg} start={{x:0,y:0}} end={{x:1,y:1}}>
              <Ionicons name={name} size={19} color="#fff" />
            </LinearGradient>
          : <Ionicons name={name} size={22} color="rgba(180,160,220,0.6)" />
        }
      </Animated.View>
      <Text style={[tab.label, focused && tab.labelOn]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  const colors = useColors();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: [tab.bar, { backgroundColor: colors.tabBg, borderTopColor: colors.tabBorder }],
      tabBarBackground: () => (
        <LinearGradient colors={[colors.tabBg, colors.tabBg]} style={StyleSheet.absoluteFill} />
      ),
    }}>
      {[
        { name:"index",        icon:"home",             label:"Home"    },
        { name:"search-jobs",  icon:"search",           label:"Search"  },
        { name:"applications", icon:"document-text",    label:"Applied" },
        { name:"map",          icon:"map",              label:"Map"     },
        { name:"notifications",icon:"notifications",    label:"Alerts"  },
        { name:"profile",      icon:"person",           label:"Profile" },
      ].map(({ name, icon, label }) => (
        <Tabs.Screen key={name} name={name} options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) =>
            <TabIcon name={(focused ? icon : icon+"-outline") as any} focused={focused} label={label} />,
        }} />
      ))}
    </Tabs>
  );
}

const tab = StyleSheet.create({
  bar:      { height: Platform.OS === "ios" ? 84 : 68, borderTopWidth:1, paddingTop:8, paddingBottom: Platform.OS === "ios" ? 24 : 8, ...SHADOW.glow },
  wrap:     { alignItems:"center", gap:3, minWidth:48 },
  activeBg: { width:38, height:38, borderRadius:RADIUS.md, alignItems:"center", justifyContent:"center", ...SHADOW.sm },
  label:    { fontSize:9, color:"rgba(180,160,220,0.55)", fontWeight:"500" },
  labelOn:  { color:"#A78BFA", fontWeight:"700" },
});