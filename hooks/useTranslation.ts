import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { I18n } from 'i18n-js';
import { Platform } from 'react-native';

// Import translations
import en from '@/translations/en';
import kk from '@/translations/kk';
import ru from '@/translations/ru';

// Create i18n instance
const i18n = new I18n({
  en,
  kk,
  ru,
});

// Default language
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.enableFallback = true;

export function useTranslation() {
  const [locale, setLocaleState] = useState('en');

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        // On web, use localStorage instead of SecureStore
        if (Platform.OS === 'web') {
          const savedLocale = localStorage.getItem('userLanguage');
          if (savedLocale) {
            setLocaleState(savedLocale);
            i18n.locale = savedLocale;
          }
        } else {
          const savedLocale = await SecureStore.getItemAsync('userLanguage');
          if (savedLocale) {
            setLocaleState(savedLocale);
            i18n.locale = savedLocale;
          }
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };

    loadLanguage();
  }, []);

  const setLocale = async (newLocale: string) => {
    try {
      // Save language preference
      if (Platform.OS === 'web') {
        localStorage.setItem('userLanguage', newLocale);
      } else {
        await SecureStore.setItemAsync('userLanguage', newLocale);
      }
      
      setLocaleState(newLocale);
      i18n.locale = newLocale;
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const t = (key: string, options = {}) => {
    return i18n.t(key, options);
  };

  return { t, locale, setLocale };
}