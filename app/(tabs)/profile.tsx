import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { 
  Settings, 
  Globe, 
  Bell,
  Moon,
  LogOut,
  Shield, 
  MapPin,
  HelpCircle,
  ChevronRight
} from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { availableLanguages } from '@/constants/Languages';
import LanguageSelector from '@/components/settings/LanguageSelector';
import ProfileHeader from '@/components/profile/ProfileHeader';
import SettingsItem from '@/components/settings/SettingsItem';

export default function ProfileScreen() {
  const { t, locale, setLocale } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [languageSelectorVisible, setLanguageSelectorVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  const [offlineMapsEnabled, setOfflineMapsEnabled] = useState(true);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileHeader />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('accountSettings')}
          </Text>
          
          <SettingsItem
            icon={<Globe size={22} color={colors.primary} />}
            title={t('language')}
            subtitle={availableLanguages.find(lang => lang.code === locale)?.name || ''}
            onPress={() => setLanguageSelectorVisible(true)}
            showArrow
          />
          
          <SettingsItem
            icon={<Bell size={22} color={colors.primary} />}
            title={t('notifications')}
            subtitle={notificationsEnabled ? t('enabled') : t('disabled')}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={Colors.white}
              />
            }
          />
          
          <SettingsItem
            icon={<Moon size={22} color={colors.primary} />}
            title={t('darkMode')}
            subtitle={darkModeEnabled ? t('enabled') : t('disabled')}
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={Colors.white}
              />
            }
          />
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('appSettings')}
          </Text>
          
          <SettingsItem
            icon={<MapPin size={22} color={colors.primary} />}
            title={t('offlineMaps')}
            subtitle={offlineMapsEnabled ? t('enabled') : t('disabled')}
            rightElement={
              <Switch
                value={offlineMapsEnabled}
                onValueChange={setOfflineMapsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={Colors.white}
              />
            }
          />
          
          <SettingsItem
            icon={<Shield size={22} color={colors.primary} />}
            title={t('emergencyContacts')}
            subtitle={t('manageContacts')}
            onPress={() => {}}
            showArrow
          />
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('support')}
          </Text>
          
          <SettingsItem
            icon={<HelpCircle size={22} color={colors.primary} />}
            title={t('helpCenter')}
            onPress={() => {}}
            showArrow
          />
          
          <SettingsItem
            icon={<LogOut size={22} color={Colors.emergency.main} />}
            title={t('logout')}
            titleStyle={{ color: Colors.emergency.main }}
            onPress={() => {}}
          />
        </View>
        
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          {t('version')} 1.0.0
        </Text>
      </ScrollView>
      
      <LanguageSelector
        visible={languageSelectorVisible}
        currentLanguage={locale}
        onSelectLanguage={setLocale}
        onClose={() => setLanguageSelectorVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    paddingVertical: 20,
  },
});