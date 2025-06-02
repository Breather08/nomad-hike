import { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Trails } from '@/data/trailsData';
import DashboardHeader from '@/components/home/DashboardHeader';
import WeatherWidget from '@/components/home/WeatherWidget';
import TrailCard from '@/components/trails/TrailCard';
import SafetyTips from '@/components/home/SafetyTips';
import GuidesPreview from '@/components/home/GuidesPreview';
import { Trail } from '@/types/trail';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [nearbyTrails] = useState<Trail[]>(Trails.slice(0, 3));

  // Memoize the trail card renderer
  const renderTrailCard = useCallback(
    ({ item }: { item: Trail }) => (
      <TrailCard
        trail={item}
        onPress={() => router.push(`/trail-details/${item.id}`)}
        style={styles.trailCard}
      />
    ),
    [router]
  );

  // Memoize key extractor
  const keyExtractor = useCallback((item: Trail) => item.id.toString(), []);

  // Memoize item layout calculation
  const getItemLayout = useCallback(
    (data: Trail[] | null | undefined, index: number) => ({
      length: 296, // 280 width + 16 margin
      offset: 296 * index,
      index,
    }),
    []
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DashboardHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Nearby Trails */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('nearbyTrails')}
              </Text>
              <TouchableOpacity onPress={() => router.push('/trails')}>
                <Text style={[styles.seeAll, { color: colors.primary }]}>
                  {t('seeAll')}
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={nearbyTrails}
              renderItem={renderTrailCard}
              keyExtractor={keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trailsList}
              removeClippedSubviews={true}
              maxToRenderPerBatch={3}
              windowSize={5}
              initialNumToRender={2}
              // getItemLayout={getItemLayout}
              updateCellsBatchingPeriod={50}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
              }}
            />
          </View>

          {/* Safety Tips */}
          <SafetyTips />

          {/* Local Guides */}
          <GuidesPreview />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
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
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  trailsList: {
    paddingRight: 16,
    gap: 16,
  },
  trailCard: {
    width: 280,
  },
});
