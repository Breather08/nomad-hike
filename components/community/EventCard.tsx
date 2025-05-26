import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Calendar, MapPin, Users } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Event } from '@/types/community';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Image source={{ uri: event.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {event.title}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Calendar color={colors.primary} size={16} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {event.date}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin color={colors.primary} size={16} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {event.location}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users color={colors.primary} size={16} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {event.participants} {t('participants')}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {event.description}
        </Text>
        
        <TouchableOpacity 
          style={[styles.joinButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.joinButtonText}>{t('joinEvent')}</Text>
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
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
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
  description: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  joinButton: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
  },
});