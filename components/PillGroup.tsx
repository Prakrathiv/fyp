import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PillGroupProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const PillGroup: React.FC<PillGroupProps> = ({ options, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.pill, selected === option && styles.selectedPill]}
          onPress={() => onSelect(option)}>
          <Text
            style={[styles.pillText, selected === option && styles.selectedPillText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedPill: {
    backgroundColor: '#4361ee',
    borderColor: '#4361ee',
  },
  pillText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPillText: {
    color: '#fff',
  },
});

export default PillGroup;