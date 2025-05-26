import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { X, Check } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { availableLanguages } from '@/constants/Languages';

interface LanguageSelectorProps {
  visible: boolean;
  currentLanguage: string;
  onSelectLanguage: (code: string) => void;
  onClose: () => void;
}

export default function LanguageSelector({ 
  visible, 
  currentLanguage,
  onSelectLanguage,
  onClose
}: LanguageSelectorProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
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
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t('selectLanguage')}
            </Text>
            
            <TouchableOpacity onPress={onClose}>
              <X color={colors.text} size={24} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={availableLanguages}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.languageItem,
                  { borderBottomColor: colors.border }
                ]}
                onPress={() => {
                  onSelectLanguage(item.code);
                  onClose();
                }}
              >
                <View style={styles.languageInfo}>
                  <Text style={[styles.languageName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.languageNative, { color: colors.textSecondary }]}>
                    {item.nativeName}
                  </Text>
                </View>
                
                {currentLanguage === item.code && (
                  <Check color={colors.primary} size={20} />
                )}
              </TouchableOpacity>
            )}
          />
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
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  languageNative: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});