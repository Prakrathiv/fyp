import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try { return await SecureStore.getItemAsync(key); } catch { return null; }
  },
  async saveToken(key: string, value: string) {
    try { await SecureStore.setItemAsync(key, value); } catch {}
  },
};

function AuthGate() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    // ✅ FIXED: cast segments[0] to string to avoid TS type overlap error
    const firstSegment = segments[0] as string;
    const inTabs = firstSegment === "(tabs)";
    const inAuth = !firstSegment || firstSegment === "index";

    if (isSignedIn && inAuth) {
      router.replace("/landing" as any);
    } else if (!isSignedIn && inTabs) {
      router.replace("/" as any);
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" color="#4F6EF7" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="landing" options={{ gestureEnabled: false, animation: "fade" }} />
      <Stack.Screen name="(tabs)"  options={{ gestureEnabled: false, animation: "fade" }} />
      <Stack.Screen name="post-job" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="job/[id]" options={{ animation: "slide_from_bottom", presentation: "modal" }} />
      <Stack.Screen name="employer/applicants" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="chat/[id]" options={{ animation: "slide_from_right" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    appFont: require("./../assets/fonts/Outfit-Regular.ttf"),
    appFontBold: require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <AuthGate />
    </ClerkProvider>
  );
}