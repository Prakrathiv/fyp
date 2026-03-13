import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PillGroup from './PillGroup';

interface Step1Props {
  formData: {
    minSalary: string;
    maxSalary: string;
    shift: string;
    jobType: string;
    city: string;
    area: string;
    chargeFee: string;
  };
  updateField: (field: string, value: string) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, updateField }) => {
  const shifts: string[] = ['Day Shift', 'Night Shift', 'Any Shift'];
  const jobTypes: string[] = ['Field Job', 'Office Job', 'Work From Home', 'Industry Job'];

  return (
    <View style={styles.container}>
      {/* Salary Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Monthly Income</Text>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.subLabel}>Min Salary</Text>
            <TextInput
              style={styles.input}
              placeholder="₹ 10,000"
              keyboardType="numeric"
              value={formData.minSalary}
              onChangeText={(text) => updateField('minSalary', text)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.subLabel}>Max Salary</Text>
            <TextInput
              style={styles.input}
              placeholder="₹ 50,000"
              keyboardType="numeric"
              value={formData.maxSalary}
              onChangeText={(text) => updateField('maxSalary', text)}
            />
          </View>
        </View>
      </View>

      {/* Job Shift */}
      <View style={styles.section}>
        <Text style={styles.label}>Job Shift</Text>
        <PillGroup
          options={shifts}
          selected={formData.shift}
          onSelect={(val) => updateField('shift', val)}
        />
      </View>

      {/* Job Type */}
      <View style={styles.section}>
        <Text style={styles.label}>Job Type</Text>
        <PillGroup
          options={jobTypes}
          selected={formData.jobType}
          onSelect={(val) => updateField('jobType', val)}
        />
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity style={styles.locationLink}>
          <Ionicons name="location-outline" size={18} color="#4361ee" />
          <Text style={styles.locationText}>Use current location</Text>
        </TouchableOpacity>

        <View style={styles.dropdown}>
          <Ionicons name="business-outline" size={18} color="#666" />
          <TextInput
            style={styles.dropdownInput}
            placeholder="Select City/Town"
            value={formData.city}
            onChangeText={(text) => updateField('city', text)}
          />
          <Ionicons name="chevron-down-outline" size={18} color="#666" />
        </View>

        <View style={styles.dropdown}>
          <Ionicons name="location-outline" size={18} color="#666" />
          <TextInput
            style={styles.dropdownInput}
            placeholder="Select Locality/Area"
            value={formData.area}
            onChangeText={(text) => updateField('area', text)}
          />
          <Ionicons name="chevron-down-outline" size={18} color="#666" />
        </View>
      </View>

      {/* Fee Question */}
      <View style={styles.section}>
        <Text style={styles.label}>Will you charge any fee from candidates?</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateField('chargeFee', 'yes')}>
            <View style={styles.radio}>
              {formData.chargeFee === 'yes' && <View style={styles.radioSelected} />}
            </View>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateField('chargeFee', 'no')}>
            <View style={styles.radio}>
              {formData.chargeFee === 'no' && <View style={styles.radioSelected} />}
            </View>
            <Text>No</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  locationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    color: '#4361ee',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dropdownInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4361ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4361ee',
  },
});

export default Step1;