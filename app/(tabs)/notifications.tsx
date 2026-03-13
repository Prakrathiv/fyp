import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW } from "../../theme";
import { notifications as initialNotifs, Notification } from "../../data/dummyData";

const ICON_MAP: Record<string, { icon: string; color: string }> = {
  application_update: { icon: "briefcase-outline", color: COLORS.primary },
  new_job: { icon: "compass-outline", color: COLORS.success },
  message: { icon: "chatbubble-outline", color: COLORS.warning },
};

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, isRead: true })));
  const markRead = (id: string) => setNotifs(n => n.map(x => x.id === id ? { ...x, isRead: true } : x));

  const unread = notifs.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Notifications</Text>
          {unread > 0 && (
            <TouchableOpacity onPress={markAllRead}>
              <Text style={styles.markAll}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
        {unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unread} unread</Text>
          </View>
        )}
      </LinearGradient>

      <FlatList
        data={notifs}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const ic = ICON_MAP[item.type];
          return (
            <TouchableOpacity
              style={[styles.card, !item.isRead && styles.cardUnread, SHADOW.sm]}
              onPress={() => markRead(item.id)}
            >
              <View style={[styles.iconBox, { backgroundColor: ic.color + "18" }]}>
                <Ionicons name={ic.icon as any} size={20} color={ic.color} />
              </View>
              <View style={styles.content}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              {!item.isRead && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 24 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "800", color: "#fff" },
  markAll: { fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: "600" },
  unreadBadge: { marginTop: 10, backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 4, borderRadius: RADIUS.full },
  unreadText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  card: { flexDirection: "row", alignItems: "flex-start", backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: 14, marginBottom: 10 },
  cardUnread: { borderLeftWidth: 3, borderLeftColor: COLORS.primary },
  iconBox: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", marginRight: 12 },
  content: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },
  notifBody: { fontSize: 13, color: COLORS.textSecondary, marginTop: 3, lineHeight: 18 },
  time: { fontSize: 11, color: COLORS.textMuted, marginTop: 5 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary, marginTop: 4 },
});