import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Bell } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function DashboardHeader() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContent}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            {t('welcome')}
          </Text>
          <Text style={[styles.appName, { color: colors.text }]}>
            {t('appName')}
          </Text>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell color={colors.text} size={24} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.emergency.main,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});