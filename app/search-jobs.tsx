import { StyleSheet, Text, View } from "react-native";

export default function SearchJobs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Jobs 🔍</Text>
      <Text>Here you can search for jobs.</Text>
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
    marginBottom: 20,
    fontWeight: "bold",
  },
});
