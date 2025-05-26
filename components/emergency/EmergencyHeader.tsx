import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export default function EmergencyHeader() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, { backgroundColor: Colors.emergency.main }]}>
      <AlertTriangle color={Colors.white} size={24} />
      <Text style={styles.title}>
        {t('emergency')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
    color: 'white',
    marginLeft: 8,
  },
});