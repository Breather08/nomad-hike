import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Users, UserPlus, MessageCircle, Calendar } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { Guides } from '@/data/guidesData';
import { HikingPartners } from '@/data/communityData';
import { Events } from '@/data/eventsData';
import ScreenHeader from '@/components/common/ScreenHeader';
import CommunityTabs from '@/components/community/CommunityTabs';
import HikingPartnerCard from '@/components/community/HikingPartnerCard';
import EventCard from '@/components/community/EventCard';
import GuideCard from '@/components/community/GuideCard';

export default function CommunityScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [activeTab, setActiveTab] = useState('partners');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'partners':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('findHikingPartners')}
              </Text>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/add-partner-post')}
              >
                <UserPlus color={Colors.white} size={18} />
                <Text style={styles.addButtonText}>{t('post')}</Text>
              </TouchableOpacity>
            </View>
            
            {HikingPartners.map(partner => (
              <HikingPartnerCard key={partner.id} partner={partner} />
            ))}
          </View>
        );
        
      case 'guides':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('localGuides')}
              </Text>
            </View>
            
            {Guides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </View>
        );
        
      case 'events':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('upcomingEvents')}
              </Text>
            </View>
            
            {Events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        );
        
      case 'forum':
        return (
          <View style={styles.tabContent}>
            <View style={styles.forumContainer}>
              <MessageCircle color={colors.textSecondary} size={48} />
              <Text style={[styles.forumTitle, { color: colors.text }]}>
                {t('comingSoon')}
              </Text>
              <Text style={[styles.forumDescription, { color: colors.textSecondary }]}>
                {t('forumComingSoon')}
              </Text>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title={t('community')} />
      
      <CommunityTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      
      <ScrollView style={styles.scrollContainer}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  forumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  forumTitle: {
    fontSize: 20,
    fontFamily: 'Rubik-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  forumDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});