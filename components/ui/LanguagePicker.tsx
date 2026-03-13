import React, { useRef } from "react";
import {
  Modal, View, Text, TouchableOpacity, StyleSheet,
  Animated, ScrollView, Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW, SPACING } from "../../theme";
import { useLanguage, LANGUAGES, Language } from "../../i18n";

interface LanguagePickerProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({ visible, onClose }) => {
  const { language, setLanguage } = useLanguage();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.sheet, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
          <LinearGradient colors={COLORS.gradientCard} style={styles.header}>
            <Text style={styles.title}>🌐 Choose Language</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={26} color={COLORS.textMuted} />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langRow, active && styles.langRowActive]}
                  onPress={() => handleSelect(lang.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.langName, active && styles.langNameActive]}>{lang.native}</Text>
                    <Text style={styles.langSub}>{lang.name}</Text>
                  </View>
                  {active && (
                    <LinearGradient colors={COLORS.gradientPrimary} style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center", alignItems: "center",
  },
  sheet: {
    width: "85%", maxHeight: "70%",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOW.lg,
  },
  header: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md, paddingVertical: 14,
  },
  title: { fontSize: 17, fontWeight: "700", color: COLORS.text },
  list: { padding: SPACING.md },
  langRow: {
    flexDirection: "row", alignItems: "center", gap: 14,
    paddingVertical: 13, paddingHorizontal: 12,
    borderRadius: RADIUS.md, marginBottom: 6,
    backgroundColor: COLORS.background,
  },
  langRowActive: { backgroundColor: COLORS.overlay, borderWidth: 1, borderColor: COLORS.primary },
  flag: { fontSize: 26 },
  langName: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  langNameActive: { color: COLORS.primaryLight },
  langSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 1 },
  checkBadge: {
    width: 24, height: 24, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
});