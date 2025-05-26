import { StyleSheet, Text, View, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { MapPin, Mountain, Clock, BadgeCheck } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Trail } from '@/types/trail';

interface TrailCardProps {
  trail: Trail;
  onPress: () => void;
  style?: ViewStyle;
}

export default function TrailCard({ trail, onPress, style }: TrailCardProps) {
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
      style={[
        styles.container, 
        { backgroundColor: colors.card, borderColor: colors.border },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: trail.image }} style={styles.image} />
      
      {trail.verified && (
        <View style={styles.verifiedBadge}>
          <BadgeCheck color="white" size={14} />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>
          {trail.name}
        </Text>
        
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
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 160,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.info.main,
    borderRadius: 12,
    padding: 4,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginBottom: 6,
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
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
});