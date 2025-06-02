import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { MapPin, Mountain, Clock, BadgeCheck } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Trail } from '@/types/trail';
import LazyImage from '@/components/common/LazyImage';

interface TrailCardProps {
  trail: Trail;
  onPress: () => void;
  style?: ViewStyle;
}

const TrailCard: React.FC<TrailCardProps> = ({ trail, onPress, style }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Memoize difficulty color calculation
  const difficultyColor = useMemo(() => {
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
  }, [trail.difficulty, colors.textSecondary]);
  
  // Memoize container style
  const containerStyle = useMemo(() => [
    styles.container, 
    { backgroundColor: colors.card, borderColor: colors.border },
    style
  ], [colors.card, colors.border, style]);
  
  return (
    <TouchableOpacity 
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LazyImage 
        source={{ uri: trail.image }} 
        style={styles.image}
        fadeDuration={200}
      />
      
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
            <Mountain color={difficultyColor} size={14} />
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
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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

// Memoize the entire component
export default React.memo(TrailCard, (prevProps, nextProps) => {
  return (
    prevProps.trail.id === nextProps.trail.id &&
    prevProps.trail.conditions?.status === nextProps.trail.conditions?.status &&
    prevProps.style === nextProps.style
  );
});
