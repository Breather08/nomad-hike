import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { MapPin, Star, MessageCircle } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Guide } from '@/types/guide';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Image source={{ uri: guide.photo }} style={styles.guidePhoto} />
        
        <View style={styles.guideInfo}>
          <Text style={[styles.guideName, { color: colors.text }]}>
            {guide.name}
          </Text>
          
          <View style={styles.locationContainer}>
            <MapPin color={colors.primary} size={14} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]}>
              {guide.location}
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star color="#F59E0B" size={14} fill="#F59E0B" />
            <Text style={styles.ratingText}>{guide.rating}</Text>
            <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>
              ({guide.reviews} {t('reviews')})
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.bio, { color: colors.text }]}>
          {guide.bio}
        </Text>
        
        <View style={styles.specializationContainer}>
          {guide.specializations.map((spec, index) => (
            <View 
              key={index} 
              style={[styles.specializationTag, { backgroundColor: colors.primary + '20' }]}
            >
              <Text style={[styles.specializationText, { color: colors.primary }]}>
                {spec}
              </Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: colors.primary }]}
        >
          <MessageCircle color={Colors.white} size={18} />
          <Text style={styles.contactButtonText}>{t('contactGuide')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  guidePhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  guideInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  guideName: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 2,
  },
  content: {
    padding: 16,
  },
  bio: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  specializationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specializationTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  specializationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    marginLeft: 8,
  },
});