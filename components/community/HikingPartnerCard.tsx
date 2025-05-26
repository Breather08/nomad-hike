import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { CalendarDays, MapPin, Users, ArrowRight } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { HikingPartner } from '@/types/community';
import { useTranslation } from '@/hooks/useTranslation';

interface HikingPartnerCardProps {
  partner: HikingPartner;
}

export default function HikingPartnerCard({ partner }: HikingPartnerCardProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: partner.userPhoto }} style={styles.userPhoto} />
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {partner.userName}
            </Text>
            <Text style={[styles.userLevel, { color: colors.textSecondary }]}>
              {partner.experience}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.viewProfileButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.viewProfileText}>{t('viewProfile')}</Text>
          <ArrowRight color={Colors.white} size={16} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.description, { color: colors.text }]}>
          {partner.description}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin color={colors.primary} size={16} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {partner.location}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <CalendarDays color={colors.primary} size={16} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {partner.date}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users color={colors.primary} size={16} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {partner.groupSize}
            </Text>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  userLevel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewProfileText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
});