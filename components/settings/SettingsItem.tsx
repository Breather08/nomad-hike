import { StyleSheet, Text, View, TouchableOpacity, TextStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
}

export default function SettingsItem({
  icon,
  title,
  subtitle,
  titleStyle,
  onPress,
  showArrow,
  rightElement,
}: SettingsItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }, titleStyle]}>
            {title}
          </Text>
          
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {rightElement ? (
        rightElement
      ) : (
        showArrow && <ChevronRight color={colors.textSecondary} size={20} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});