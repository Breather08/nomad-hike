import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { CheckSquare, Square } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function EmergencyChecklist() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mock emergency checklist items
  const initialItems = [
    { id: '1', text: 'Stay calm and assess the situation', checked: false },
    { id: '2', text: 'Determine your exact location if possible', checked: false },
    { id: '3', text: 'Call emergency services (109 or 112)', checked: false },
    { id: '4', text: 'Conserve phone battery', checked: false },
    { id: '5', text: 'Find shelter if needed', checked: false },
    { id: '6', text: 'If lost, stay in one place unless unsafe', checked: false },
  ];
  
  const [checklistItems, setChecklistItems] = useState(initialItems);
  
  const toggleItem = (id: string) => {
    setChecklistItems(
      checklistItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('emergencyChecklist')}
      </Text>
      
      {checklistItems.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.checklistItem}
          onPress={() => toggleItem(item.id)}
        >
          {item.checked ? (
            <CheckSquare color={Colors.success.main} size={20} />
          ) : (
            <Square color={colors.textSecondary} size={20} />
          )}
          <Text 
            style={[
              styles.checklistText, 
              { color: colors.text },
              item.checked && styles.checkedText
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checklistText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    marginLeft: 10,
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
});