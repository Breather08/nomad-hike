import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Settings, MapPin } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function ProfileHeader() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mock user data
  const user = {
    name: 'Alex Morgan',
    location: 'Almaty, Kazakhstan',
    photo: 'https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=150',
    tripsCompleted: 12,
    hikingBuddies: 8,
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.headerTop}>
        <Text style={styles.screenTitle}>{t('profile')}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="white" size={24} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileContent}>
        <Image source={{ uri: user.photo }} style={styles.profileImage} />
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin color="white" size={14} />
            <Text style={styles.locationText}>{user.location}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.tripsCompleted}</Text>
          <Text style={styles.statLabel}>{t('trips')}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.hikingBuddies}</Text>
          <Text style={styles.statLabel}>{t('buddies')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Rubik-Medium',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Rubik-Bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
    opacity: 0.9,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});