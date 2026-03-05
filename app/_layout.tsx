import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";

// Token cache so Clerk remembers login between app restarts
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {}
  },
};

// This component handles redirecting based on auth state
function AuthGate() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && !inTabsGroup) {
      // User is signed in → go straight to home tabs, skip sign-in
      router.replace("/(tabs)/home");
    } else if (!isSignedIn && inTabsGroup) {
      // User is NOT signed in but somehow in tabs → kick back to sign-in
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    appFont: require("./../assets/fonts/Outfit-Regular.ttf"),
    appFontBold: require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <AuthGate />
    </ClerkProvider>
  );
}