import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Step3Props {
  formData: {
    companyType: string;
    companyEmail: string;
  };
  updateField: (field: string, value: string) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, updateField }) => {
  return (
    <View style={styles.container}>
      {/* Company Type */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Company Type</Text>
        <View style={styles.cardGroup}>
          <TouchableOpacity
            style={[
              styles.card,
              formData.companyType === 'consultancy' && styles.selectedCard,
            ]}
            onPress={() => updateField('companyType', 'consultancy')}>
            <Ionicons
              name="people-outline"
              size={32}
              color={formData.companyType === 'consultancy' ? '#4361ee' : '#666'}
            />
            <Text
              style={[
                styles.cardText,
                formData.companyType === 'consultancy' && styles.selectedCardText,
              ]}>
              Consultancy{'\n'}Manpower Firm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              formData.companyType === 'company' && styles.selectedCard,
            ]}
            onPress={() => updateField('companyType', 'company')}>
            <Ionicons
              name="business-outline"
              size={32}
              color={formData.companyType === 'company' ? '#4361ee' : '#666'}
            />
            <Text
              style={[
                styles.cardText,
                formData.companyType === 'company' && styles.selectedCardText,
              ]}>
              Direct{'\n'}Company
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Company Email */}
      <View style={styles.section}>
        <Text style={styles.label}>Company Email</Text>
        <View style={styles.emailContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <TextInput
            style={styles.emailInput}
            placeholder="Enter company email"
            keyboardType="email-address"
            value={formData.companyEmail}
            onChangeText={(text) => updateField('companyEmail', text)}
          />
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Review & Submit</Text>
        <Text style={styles.summaryText}>
          Please review all details before posting this job
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#4361ee',
    backgroundColor: 'rgba(67, 97, 238, 0.05)',
  },
  cardText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  selectedCardText: {
    color: '#4361ee',
    fontWeight: '500',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  emailInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    marginLeft: 10,
  },
  summary: {
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Step3;