import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Step2: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Ionicons name="construct-outline" size={70} color="#4361ee" />
        <Text style={styles.title}>Candidate Requirements</Text>
        <Text style={styles.description}>
          This section will include:{'\n\n'}
          • Required Skills{'\n'}
          • Experience Level{'\n'}
          • Education{'\n'}
          • Certifications
        </Text>
        <Text style={styles.note}>(Coming Soon)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  note: {
    marginTop: 15,
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default Step2;