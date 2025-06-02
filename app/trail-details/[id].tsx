import { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import {
  MapPin,
  Mountain,
  Clock,
  ArrowUp,
  BadgeCheck,
  ChevronLeft,
  MapIcon,
  Share2,
  CalendarDays,
  AlertTriangle,
  Ruler,
} from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Trails } from '@/data/trailsData';
import { Trail } from '@/types/trail';
import { useTranslation } from '@/hooks/useTranslation';
import LazyImage from '@/components/common/LazyImage';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function TrailDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const colors = Colors[colorScheme ?? 'light'];

  // Find the trail immediately
  const trail = Trails.find((t) => t.id === id) || null;

  // Get status color based on trail conditions
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'excellent':
        return Colors.success.main;
      case 'good':
        return Colors.success.light;
      case 'fair':
        return Colors.warning.main;
      case 'poor':
        return Colors.warning.dark;
      case 'closed':
        return Colors.emergency.main;
      default:
        return colors.textSecondary;
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return Colors.success.main;
      case 'moderate':
        return Colors.warning.main;
      case 'hard':
        return Colors.emergency.main;
      default:
        return colors.textSecondary;
    }
  };

  // Open native maps app with trail coordinates
  const openMaps = () => {
    if (!trail) return;

    const { latitude, longitude } = trail.coordinates;
    const label = trail.name;

    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  // Share trail
  const shareTrail = async () => {
    if (!trail) return;

    try {
      // This would be replaced with actual app deep link in a production app
      const shareUrl = `https://nomadhike.app/trails/${trail.id}`;

      await Linking.openURL(`https://nomadhike.app/trails/${trail.id}`);
    } catch (error) {
      console.error('Error sharing trail:', error);
    }
  };

  if (!trail) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.loadingContent}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            {t('trailNotFound') || 'Trail not found'}
          </Text>
          <TouchableOpacity
            style={[styles.backButtonLoading, { borderColor: colors.border }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.primary }]}>
              {t('goBack') || 'Go Back'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Image */}
          <View style={styles.imageContainer}>
            <LazyImage source={{ uri: trail.image }} style={styles.image} />

            <View style={[styles.imageOverlay, { paddingTop: insets.top }]}>
              {/* Back button */}
              <TouchableOpacity
                style={[
                  styles.backButton,
                  { backgroundColor: colors.card + 'CC' },
                ]}
                onPress={() => router.back()}
              >
                <ChevronLeft color={colors.white} size={24} />
              </TouchableOpacity>

              <View style={styles.titleContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>{trail.name}</Text>
                  {trail.verified && (
                    <BadgeCheck color={Colors.info.main} size={20} />
                  )}
                </View>

                <View style={styles.locationContainer}>
                  <MapPin color={colors.white} size={16} />
                  <Text style={styles.location}>{trail.location}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View
            style={[
              styles.statsContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.statItem}>
              <Mountain
                color={getDifficultyColor(trail.difficulty)}
                size={22}
              />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {trail.difficulty}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('difficulty')}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.statItem}>
              <Ruler color={colors.primary} size={22} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {trail.distance}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('distance')}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.statItem}>
              <ArrowUp color={colors.primary} size={22} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {trail.elevation}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('elevation')}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.statItem}>
              <Clock color={colors.primary} size={22} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {trail.duration}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {t('duration')}
              </Text>
            </View>
          </View>

          {/* Trail Condition */}
          {trail.conditions && (
            <View
              style={[
                styles.sectionContainer,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {t('trailCondition')}
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        getStatusColor(trail.conditions.status) + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(trail.conditions.status) },
                    ]}
                  >
                    {trail.conditions.status}
                  </Text>
                </View>
              </View>

              <View style={styles.conditionContent}>
                <View style={styles.conditionItem}>
                  <CalendarDays color={colors.textSecondary} size={16} />
                  <Text
                    style={[
                      styles.conditionText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {t('lastUpdated')}: {trail.conditions.updatedAt}
                  </Text>
                </View>

                {trail.conditions.notes && (
                  <View
                    style={[
                      styles.noteContainer,
                      { borderColor: colors.border },
                    ]}
                  >
                    <AlertTriangle color={Colors.warning.main} size={16} />
                    <Text style={[styles.noteText, { color: colors.text }]}>
                      {trail.conditions.notes}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Description */}
          <View
            style={[
              styles.sectionContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('description')}
            </Text>
            <Text style={[styles.description, { color: colors.text }]}>
              {trail.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={openMaps}
            >
              <MapIcon color={colors.primary} size={20} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                {t('viewOnMap')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={shareTrail}
            >
              <Share2 color={colors.primary} size={20} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                {t('shareTrail')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Safety Warning */}
          <View
            style={[
              styles.safetyContainer,
              {
                backgroundColor: Colors.emergency.light + '20',
                borderColor: Colors.emergency.main,
              },
            ]}
          >
            <AlertTriangle color={Colors.emergency.main} size={20} />
            <Text style={[styles.safetyText, { color: colors.text }]}>
              {t('safetyWarning')}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
  },
  backButtonLoading: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Rubik-Bold',
    color: 'white',
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'white',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -24,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontFamily: 'Rubik-Medium',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  conditionContent: {
    gap: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  noteContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: 8,
    alignItems: 'flex-start',
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
  },
  actionText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  safetyContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  safetyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
});
