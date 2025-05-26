import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import {
  Phone,
  MessageCircle,
  Share2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react-native';
import * as Location from 'expo-location';

import { Colors } from '@/constants/Colors';
import EmergencyContacts from '@/components/emergency/EmergencyContacts';
import EmergencyChecklist from '@/components/emergency/EmergencyChecklist';
import EmergencyHeader from '@/components/emergency/EmergencyHeader';

export default function EmergencyScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not fetch location. Please try again.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const triggerSOS = () => {
    Alert.alert(t('confirmSOS'), t('sosAlert'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('callEmergency'),
        style: 'destructive',
        onPress: () => {
          // In a real app, this would trigger the emergency call
          Alert.alert(t('emergencyServicesAlerted'));
        },
      },
    ]);
  };

  const shareLocation = () => {
    if (location) {
      const locationString = `${t('myLocation')}: ${
        location.coords.latitude
      }, ${location.coords.longitude}`;
      // In a real app, this would use the Share API
      setTimeout(() => {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }, 1000);
    } else {
      Alert.alert(t('locationUnavailable'));
    }
  };

  const getLocationText = () => {
    if (isLoading) {
      return t('fetchingLocation');
    }
    if (errorMsg) {
      return errorMsg;
    }
    if (location) {
      return `${location.coords.latitude.toFixed(
        6
      )}, ${location.coords.longitude.toFixed(6)}`;
    }
    return t('locationUnavailable');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EmergencyHeader />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.sosSection}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={triggerSOS}
            activeOpacity={0.8}
          >
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>

          <Text style={[styles.sosDescription, { color: colors.text }]}>
            {t('sosDescription')}
          </Text>
        </View>

        <View
          style={[
            styles.locationCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.locationTitle, { color: colors.text }]}>
            {t('yourLocation')}
          </Text>

          <View style={styles.locationContent}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text
                style={[styles.locationCoordinates, { color: colors.text }]}
              >
                {getLocationText()}
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.shareButton,
                {
                  backgroundColor: shareSuccess
                    ? Colors.success.main
                    : colors.primary,
                },
              ]}
              onPress={shareLocation}
              disabled={!location || isLoading}
            >
              {shareSuccess ? (
                <CheckCircle2 color={Colors.white} size={20} />
              ) : (
                <Share2 color={Colors.white} size={20} />
              )}
              <Text style={styles.shareButtonText}>
                {shareSuccess ? t('shared') : t('share')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: Colors.emergency.main },
            ]}
            activeOpacity={0.8}
          >
            <Phone color={Colors.white} size={24} />
            <Text style={styles.actionButtonText}>{t('call')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <MessageCircle color={Colors.white} size={24} />
            <Text style={styles.actionButtonText}>{t('message')}</Text>
          </TouchableOpacity>
        </View>

        <EmergencyContacts />

        <EmergencyChecklist />

        <View
          style={[
            styles.offlineNotice,
            { backgroundColor: Colors.warning.light },
          ]}
        >
          <AlertTriangle color={Colors.warning.dark} size={20} />
          <Text style={[styles.offlineText, { color: Colors.warning.dark }]}>
            {t('offlineEmergencyInfo')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  sosSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.emergency.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  sosText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Rubik-Bold',
    letterSpacing: 2,
  },
  sosDescription: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 40,
  },
  locationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationCoordinates: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  shareButtonText: {
    color: 'white',
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
  },
  offlineText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
});
