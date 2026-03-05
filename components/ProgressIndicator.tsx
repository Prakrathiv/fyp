import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps: { num: number; label: string }[] = [
    { num: 1, label: 'Job Details' },
    { num: 2, label: 'Requirements' },
    { num: 3, label: 'Company' },
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={step.num}>
          <View style={styles.stepWrapper}>
            <View
              style={[
                styles.circle,
                currentStep > step.num && styles.completedCircle,
                currentStep === step.num && styles.activeCircle,
              ]}>
              {currentStep > step.num ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.stepNum,
                    currentStep === step.num && styles.activeStepNum,
                  ]}>
                  {step.num}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.stepLabel,
                currentStep === step.num && styles.activeLabel,
              ]}>
              {step.label}
            </Text>
          </View>
          {index < 2 && (
            <View
              style={[
                styles.line,
                currentStep > step.num + 1 && styles.completedLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  stepWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  completedCircle: {
    backgroundColor: '#28a745',
  },
  activeCircle: {
    backgroundColor: '#4361ee',
  },
  stepNum: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeStepNum: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 11,
    color: '#999',
  },
  activeLabel: {
    color: '#4361ee',
    fontWeight: '500',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#f0f2f5',
    marginHorizontal: 5,
  },
  completedLine: {
    backgroundColor: '#28a745',
  },
});

export default ProgressIndicator;