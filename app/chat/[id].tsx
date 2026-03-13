import React, { useState, useRef } from "react";
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW } from "../../theme";
import { chatMessages } from "../../data/dummyData";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`,
      senderId: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }),
      isMe: true,
    }]);
    setInput("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.dark} />
        </TouchableOpacity>
        <Image source={{ uri: "https://logo.clearbit.com/stripe.com" }} style={styles.companyLogo} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Stripe HR</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <View style={[styles.msgRow, item.isMe && styles.msgRowMe]}>
            {!item.isMe && (
              <Image source={{ uri: "https://logo.clearbit.com/stripe.com" }} style={styles.msgAvatar} />
            )}
            <View style={[styles.bubble, item.isMe ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.bubbleText, item.isMe && styles.bubbleTextMe]}>{item.text}</Text>
              <Text style={[styles.timeText, item.isMe && { color:"rgba(255,255,255,0.6)" }]}>{item.time}</Text>
            </View>
          </View>
        )}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="attach" size={22} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textMuted}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor:"#F8FAFC" },
  header: {
    flexDirection:"row", alignItems:"center", gap:12,
    paddingHorizontal:16, paddingVertical:12,
    backgroundColor:"#fff", borderBottomWidth:1, borderBottomColor:COLORS.border, ...SHADOW.sm,
  },
  backBtn: { width:36,height:36,borderRadius:18,backgroundColor:COLORS.bg,alignItems:"center",justifyContent:"center" },
  companyLogo: { width:40,height:40,borderRadius:12,backgroundColor:COLORS.bg },
  headerInfo: { flex:1 },
  headerName: { fontSize:15,fontWeight:"700",color:COLORS.dark },
  onlineRow: { flexDirection:"row",alignItems:"center",gap:5,marginTop:2 },
  onlineDot: { width:7,height:7,borderRadius:4,backgroundColor:COLORS.success },
  onlineText: { fontSize:12,color:COLORS.success,fontWeight:"600" },
  msgRow: { flexDirection:"row",alignItems:"flex-end",gap:8 },
  msgRowMe: { justifyContent:"flex-end" },
  msgAvatar: { width:32,height:32,borderRadius:16,backgroundColor:COLORS.bg },
  bubble: { maxWidth:"72%",borderRadius:18,paddingHorizontal:14,paddingVertical:10 },
  bubbleMe: { backgroundColor:COLORS.primary,borderBottomRightRadius:4 },
  bubbleThem: { backgroundColor:"#fff",borderBottomLeftRadius:4,...SHADOW.sm },
  bubbleText: { fontSize:14,color:COLORS.dark,lineHeight:20 },
  bubbleTextMe: { color:"#fff" },
  timeText: { fontSize:10,color:COLORS.textMuted,marginTop:4,alignSelf:"flex-end" },
  inputBar: {
    flexDirection:"row", alignItems:"center", gap:10,
    padding:12, backgroundColor:"#fff",
    borderTopWidth:1, borderTopColor:COLORS.border,
  },
  attachBtn: { width:36,height:36,borderRadius:18,backgroundColor:COLORS.bg,alignItems:"center",justifyContent:"center" },
  input: { flex:1,backgroundColor:COLORS.bg,borderRadius:RADIUS.full,paddingHorizontal:16,paddingVertical:10,fontSize:14,color:COLORS.dark,maxHeight:100 },
  sendBtn: { width:40,height:40,borderRadius:20,backgroundColor:COLORS.primary,alignItems:"center",justifyContent:"center" },
  sendBtnDisabled: { backgroundColor:COLORS.textMuted },
});