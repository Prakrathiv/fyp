import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Landing() {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to Job Portal 🚀</Text>

      {/* Post Job Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/post-job')}   // ✅ changed to push
      >
        <Text style={styles.buttonText}>Post a Job</Text>
      </TouchableOpacity>

      {/* Find Job Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/home')}   // ✅ changed to push
      >
        <Text style={styles.buttonText}>Find a Job</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});