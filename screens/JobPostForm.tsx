import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressIndicator from '../components/ProgressIndicator';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';

interface JobPostFormProps {
  onGoToDashboard: () => void;
}

interface FormData {
  minSalary: string;
  maxSalary: string;
  shift: string;
  jobType: string;
  city: string;
  area: string;
  chargeFee: string;
  companyType: string;
  companyEmail: string;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onGoToDashboard }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    minSalary: '',
    maxSalary: '',
    shift: '',
    jobType: '',
    city: '',
    area: '',
    chargeFee: '',
    companyType: '',
    companyEmail: '',
  });

  const updateField = (field: string, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => currentStep > 1 && setCurrentStep(currentStep - 1)}>
          <Ionicons name="arrow-back" size={24} color={currentStep === 1 ? '#ccc' : '#4361ee'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post New Job</Text>
        <TouchableOpacity onPress={onGoToDashboard}>
          <Text style={styles.dashboardBtn}>Dashboard</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <ProgressIndicator currentStep={currentStep} />

      {/* Form Steps */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentStep === 1 && (
          <Step1 formData={formData} updateField={updateField} />
        )}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && (
          <Step3 formData={formData} updateField={updateField} />
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={[styles.navBtn, styles.backBtn]}
            onPress={() => setCurrentStep(currentStep - 1)}>
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.navBtn,
            styles.nextBtn,
            currentStep === 1 && styles.fullWidth,
          ]}
          onPress={() => {
            if (currentStep < 3) {
              setCurrentStep(currentStep + 1);
            } else {
              onGoToDashboard();
            }
          }}>
          <Text style={styles.nextBtnText}>
            {currentStep === 3 ? 'Post Job' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dashboardBtn: {
    color: '#4361ee',
    fontSize: 14,
    fontWeight: '600',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
  },
  nextBtn: {
    backgroundColor: '#4361ee',
  },
  fullWidth: {
    flex: 1,
    marginLeft: 0,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default JobPostForm;