import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function WeatherWidget() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mock weather data - in a real app this would come from an API
  const weatherData = {
    location: 'Almaty',
    temperature: 18,
    condition: 'Partly Cloudy',
    humidity: 45,
    windSpeed: 10,
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('todayWeather')}</Text>
        <Text style={[styles.location, { color: colors.textSecondary }]}>{weatherData.location}</Text>
      </View>
      
      <View style={styles.mainWeather}>
        <View style={styles.temperatureContainer}>
          <Text style={[styles.temperature, { color: colors.text }]}>
            {weatherData.temperature}°C
          </Text>
          <Text style={[styles.condition, { color: colors.textSecondary }]}>
            {weatherData.condition}
          </Text>
        </View>
        
        <View style={styles.iconContainer}>
          <Cloud color={colors.primary} size={48} />
          <Sun color="#F59E0B" size={24} style={styles.sunIcon} />
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Droplets color={colors.primary} size={20} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{t('humidity')}</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{weatherData.humidity}%</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.detailItem}>
          <Wind color={colors.primary} size={20} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{t('windSpeed')}</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{weatherData.windSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  mainWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 36,
    fontFamily: 'Rubik-Bold',
  },
  condition: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  iconContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
});