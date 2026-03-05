import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import JobPostForm from '../screens/JobPostForm';


export default function PostJobScreen() {
  const router = useRouter();
  
  return (
    <View style={{ flex: 1 }}>
      <JobPostForm onGoToDashboard={() => router.back()} />
    </View>
  );
}