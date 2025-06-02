import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Mountain } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface PlaceholderImageProps {
  style?: ViewStyle;
  iconSize?: number;
  icon?: React.ComponentType<{ color: string; size: number }>;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  style, 
  iconSize = 48,
  icon: Icon = Mountain 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.border }, style]}>
      <Icon color={colors.textSecondary} size={iconSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaceholderImage;
