import React, { useState } from "react";
import { View as RNView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import HomeScreen from "../screens/HomeScreen";
import JobPostForm from "../screens/JobPostForm";

type View = "home" | "form";

export default function PostJobScreen() {
  const [view, setView] = useState<View>("home");
  const router = useRouter();

  // HomeScreen "Post Job" button → show the multi-step form
  const handlePostJob = () => setView("form");

  // JobPostForm "Dashboard" button / final submit → back to HomeScreen
  const handleGoToDashboard = () => setView("home");

  // HomeScreen back arrow → back to landing (role picker)
  const handleBack = () => router.back();

  return (
    <RNView style={styles.container}>
      {view === "home" ? (
        <HomeScreen
          onPostJob={handlePostJob}
          onBack={handleBack}
        />
      ) : (
        <JobPostForm
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});