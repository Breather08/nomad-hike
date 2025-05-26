import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { MapPin, Mountain, Clock, BadgeCheck } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Trail } from '@/types/trail';

interface TrailListItemProps {
  trail: Trail;
  onPress: () => void;
}

export default function TrailListItem({ trail, onPress }: TrailListItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch (trail.difficulty) {
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
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: trail.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.text }]}>
            {trail.name}
          </Text>
          
          {trail.verified && (
            <BadgeCheck color={Colors.info.main} size={16} />
          )}
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin color={colors.primary} size={14} />
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {trail.location}
          </Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Mountain color={getDifficultyColor()} size={14} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {trail.difficulty}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock color={colors.textSecondary} size={14} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {trail.duration}
            </Text>
          </View>
          
          <Text style={[styles.distance, { color: colors.textSecondary }]}>
            {trail.distance}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    flex: 1,
    marginRight: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  distance: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    marginLeft: 'auto',
  },
});