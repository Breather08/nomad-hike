import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function useFrameworkReady() {
  useEffect(() => {
    async function hideSplashScreen() {
      try {
        // Call web framework ready if available (for web platform)
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.frameworkReady?.();
        }
        
        // Hide splash screen for all platforms
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
        // Try to hide splash screen anyway
        try {
          await SplashScreen.hideAsync();
        } catch (fallbackError) {
          console.error('Failed to hide splash screen:', fallbackError);
        }
      }
    }

    // Small delay to ensure the app is fully mounted
    const timer = setTimeout(hideSplashScreen, 100);
    
    return () => clearTimeout(timer);
  }, []);
}
