import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Switch
} from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { X, Sliders } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FilterModal({ visible, onClose }: FilterModalProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Filter state
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [distance, setDistance] = useState<string>('any');
  const [duration, setDuration] = useState<string>('any');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  
  // Toggle difficulty selection
  const toggleDifficulty = (value: string) => {
    if (difficulty.includes(value)) {
      setDifficulty(difficulty.filter(item => item !== value));
    } else {
      setDifficulty([...difficulty, value]);
    }
  };
  
  // Apply filters and close modal
  const applyFilters = () => {
    // Here you would pass the filter values back to the parent component
    onClose();
  };
  
  // Reset all filters
  const resetFilters = () => {
    setDifficulty([]);
    setDistance('any');
    setDuration('any');
    setVerifiedOnly(false);
  };
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <View style={styles.headerContent}>
              <Sliders color={colors.text} size={20} />
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t('filterTrails')}
              </Text>
            </View>
            
            <TouchableOpacity onPress={onClose}>
              <X color={colors.text} size={24} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {/* Difficulty Section */}
            <View style={styles.filterSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('difficulty')}
              </Text>
              
              <View style={styles.optionsContainer}>
                {['easy', 'moderate', 'hard'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      difficulty.includes(option) && 
                        [styles.selectedOption, { backgroundColor: colors.primary }]
                    ]}
                    onPress={() => toggleDifficulty(option)}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        difficulty.includes(option) 
                          ? [styles.selectedOptionText, { color: colors.white }]
                          : { color: colors.text }
                      ]}
                    >
                      {t(option)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Distance Section */}
            <View style={styles.filterSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('distance')}
              </Text>
              
              <View style={styles.optionsContainer}>
                {['any', 'short', 'medium', 'long'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      distance === option && 
                        [styles.selectedOption, { backgroundColor: colors.primary }]
                    ]}
                    onPress={() => setDistance(option)}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        distance === option 
                          ? [styles.selectedOptionText, { color: colors.white }]
                          : { color: colors.text }
                      ]}
                    >
                      {t(option)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Duration Section */}
            <View style={styles.filterSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('duration')}
              </Text>
              
              <View style={styles.optionsContainer}>
                {['any', '1-2h', '2-4h', '4h+'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      duration === option && 
                        [styles.selectedOption, { backgroundColor: colors.primary }]
                    ]}
                    onPress={() => setDuration(option)}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        duration === option 
                          ? [styles.selectedOptionText, { color: colors.white }]
                          : { color: colors.text }
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Verified Only Switch */}
            <View style={styles.switchSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('verified')}
              </Text>
              
              <Switch
                value={verifiedOnly}
                onValueChange={setVerifiedOnly}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={Colors.white}
              />
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.footerButton, styles.resetButton, { borderColor: colors.border }]}
              onPress={resetFilters}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                {t('reset')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.footerButton, styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>
                {t('apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginLeft: 8,
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  selectedOption: {
    backgroundColor: '#2B6CB0',
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  selectedOptionText: {
    color: 'white',
  },
  switchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    marginRight: 8,
    borderWidth: 1,
  },
  applyButton: {
    marginLeft: 8,
  },
  resetButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  applyButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});