import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
  onPostJob: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onPostJob }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>JobProvider</Text>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Post a job and find the perfect candidate</Text>
      </View>

      {/* Three Vertical Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onPostJob}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.primaryButtonText}>Post Job</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <Ionicons name="briefcase-outline" size={24} color="#4361ee" />
          <View style={styles.activityInfo}>
            <Text style={styles.jobTitle}>Senior Developer</Text>
            <Text style={styles.applicants}>12 applicants</Text>
          </View>
          <Text style={styles.time}>2d ago</Text>
        </View>
        <View style={styles.activityCard}>
          <Ionicons name="briefcase-outline" size={24} color="#4361ee" />
          <View style={styles.activityInfo}>
            <Text style={styles.jobTitle}>Product Manager</Text>
            <Text style={styles.applicants}>8 applicants</Text>
          </View>
          <Text style={styles.time}>5d ago</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4361ee',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#4361ee',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4361ee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '100%',
    marginVertical: 8,
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4361ee',
  },
  recentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  applicants: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;