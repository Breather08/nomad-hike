import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Trails } from '@/data/trailsData';
import TrailListItem from '@/components/trails/TrailListItem';
import FilterModal from '@/components/trails/FilterModal';
import ScreenHeader from '@/components/common/ScreenHeader';
import { Trail } from '@/types/trail';

export default function TrailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: t('all') },
    { id: 'easy', label: t('easy') },
    { id: 'moderate', label: t('moderate') },
    { id: 'hard', label: t('hard') },
    { id: 'verified', label: t('verified') },
  ];

  const filteredTrails = Trails.filter((trail) => {
    const matchesSearch =
      searchQuery === '' ||
      trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'all' ||
      trail.difficulty === activeFilter ||
      (activeFilter === 'verified' && trail.verified);

    return matchesSearch && matchesFilter;
  });

  const renderTrailItem = ({ item }: { item: Trail }) => (
    <TrailListItem
      trail={item}
      onPress={() => router.push(`/trail-details/${item.id}`)}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.noResultsContainer}>
      <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
        {t('noTrailsFound')}
      </Text>
    </View>
  );

  const keyExtractor = (item: Trail) => item.id.toString();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title={t('discoverTrails')} />

      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Search color={colors.text} size={20} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('searchTrails')}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter color={colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.filterOption,
              {
                backgroundColor:
                  activeFilter === option.id ? colors.primary : colors.card,
              },
              { borderColor: colors.border },
              { borderWidth: 1 },
            ]}
            onPress={() => setActiveFilter(option.id)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    activeFilter === option.id ? colors.white : colors.text,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredTrails}
        renderItem={renderTrailItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={[
          styles.trailsContainer,
          filteredTrails.length === 0 && styles.emptyContainer,
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  filterContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  trailsContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});
