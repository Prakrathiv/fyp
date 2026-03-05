import { useSSO, useUser } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Colors from "../services/Colors";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {

  useWarmUpBrowser();

  const router = useRouter();
  const { user } = useUser(); // (you are not using it but keeping same)
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {

      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "clerkexpo",   // must match app.json
      });

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/landing');   // correct
      }

    } catch (err) {
      console.error("Login error:", err);
    }
  }, [startSSOFlow, router]);

  return (
    <ScrollView>
      <View style={styles.container}>

        <Image
          source={require('./../assets/images/welcome.png')}
          style={{ width: 200, height: 200, marginTop: 80, marginBottom: 25 }}
        />

        <Text style={styles.heading}>Welcome Guyssss..💕</Text>
        <Text style={styles.heading}>Job Portal</Text>

        <View style={{ padding: 20, borderRadius: 20, margin: 20 }}>

          <Text style={{ fontFamily: "appFont", fontSize: 20, textAlign: 'center' }}>
            Discover thousands of naukari
          </Text>

          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={{ fontFamily: "appFont", fontSize: 18, textAlign: 'center' }}>
              Sign with Google
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: "100%",
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'appFontBold',
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 15,
    marginTop: 15,
  }
});