import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="home" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="search" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="heart" size={size} color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="person" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}