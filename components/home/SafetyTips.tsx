import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { ShieldCheck, ChevronRight } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function SafetyTips() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get a random safety tip from translations
  const safetyTips = [
    t('stayOnTrail'),
    t('tellSomeone'),
    t('checkWeather'),
    t('bringWater'),
    t('dressAppropriately'),
    t('bringFirstAid'),
  ];
  
  const randomTip = safetyTips[Math.floor(Math.random() * safetyTips.length)];
  
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t('safetyTips')}
      </Text>
      
      <TouchableOpacity 
        style={[styles.tipCard, { backgroundColor: Colors.success.light, borderColor: Colors.success.main }]}
      >
        <View style={styles.tipHeader}>
          <ShieldCheck color={Colors.success.main} size={24} />
          <Text style={[styles.tipTitle, { color: Colors.success.dark }]}>
            {t('dailySafetyTip')}
          </Text>
        </View>
        
        <Text style={[styles.tipContent, { color: Colors.success.dark }]}>
          {randomTip}
        </Text>
        
        <View style={styles.tipFooter}>
          <Text style={[styles.viewMoreText, { color: Colors.success.main }]}>
            {t('viewAll')}
          </Text>
          <ChevronRight color={Colors.success.main} size={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    marginBottom: 12,
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginLeft: 8,
  },
  tipContent: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  tipFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
});