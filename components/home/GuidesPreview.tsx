import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Guides } from '@/data/guidesData';

export default function GuidesPreview() {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const featuredGuides = Guides.slice(0, 3);
  
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('localGuides')}
        </Text>
        <TouchableOpacity onPress={() => router.push('/community')}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>
            {t('seeAll')}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.guidesList}
      >
        {featuredGuides.map((guide) => (
          <TouchableOpacity 
            key={guide.id}
            style={[styles.guideCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Image source={{ uri: guide.photo }} style={styles.guidePhoto} />
            
            <View style={styles.guideInfo}>
              <Text style={[styles.guideName, { color: colors.text }]}>
                {guide.name}
              </Text>
              
              <View style={styles.guideLocation}>
                <MapPin color={colors.primary} size={14} />
                <Text style={[styles.locationText, { color: colors.textSecondary }]}>
                  {guide.location}
                </Text>
              </View>
              
              <View style={styles.ratingContainer}>
                <Star color="#F59E0B" size={14} fill="#F59E0B" />
                <Text style={styles.ratingText}>{guide.rating}</Text>
                <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>
                  ({guide.reviews})
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 24,
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
  guidesList: {
    paddingRight: 16,
  },
  guideCard: {
    width: 160,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  guidePhoto: {
    width: '100%',
    height: 120,
  },
  guideInfo: {
    padding: 12,
  },
  guideName: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  guideLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 2,
  },
});