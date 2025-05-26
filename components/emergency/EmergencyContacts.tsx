import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Phone, Plus } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function EmergencyContacts() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mock emergency contacts
  const emergencyContacts = [
    { id: '1', name: 'Mountain Rescue', number: '109' },
    { id: '2', name: 'Emergency Services', number: '112' },
    { id: '3', name: 'Local Guide', number: '+7 701 234 5678' },
  ];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('emergencyContacts')}
      </Text>
      
      {emergencyContacts.map((contact) => (
        <View key={contact.id} style={styles.contactItem}>
          <View style={styles.contactInfo}>
            <Text style={[styles.contactName, { color: colors.text }]}>
              {contact.name}
            </Text>
            <Text style={[styles.contactNumber, { color: colors.textSecondary }]}>
              {contact.number}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.callButton, { backgroundColor: Colors.emergency.main }]}
          >
            <Phone color={Colors.white} size={16} />
          </TouchableOpacity>
        </View>
      ))}
      
      <TouchableOpacity 
        style={[styles.addButton, { borderColor: colors.border }]}
      >
        <Plus color={colors.primary} size={20} />
        <Text style={[styles.addButtonText, { color: colors.primary }]}>
          {t('addContact')}
        </Text>
      </TouchableOpacity>
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
});