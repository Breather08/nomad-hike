import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { useColorScheme } from 'react-native';
import { Users, UserCog, CalendarDays, MessageSquare } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

interface CommunityTabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function CommunityTabs({ activeTab, onChangeTab }: CommunityTabsProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const tabs = [
    { id: 'partners', icon: Users, label: t('hikingPartners') },
    { id: 'guides', icon: UserCog, label: t('guides') },
    { id: 'events', icon: CalendarDays, label: t('events') },
    { id: 'forum', icon: MessageSquare, label: t('forum') },
  ];
  
  const renderTab = ({ item: tab }) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          isActive && [styles.activeTab, { borderColor: colors.primary }]
        ]}
        onPress={() => onChangeTab(tab.id)}
      >
        <Icon 
          color={isActive ? colors.primary : colors.textSecondary} 
          size={20} 
        />
        <Text 
          style={[
            styles.tabLabel,
            { color: isActive ? colors.primary : colors.textSecondary }
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const keyExtractor = (item) => item.id;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <FlatList
        data={tabs}
        renderItem={renderTab}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        windowSize={5}
        initialNumToRender={4}
        getItemLayout={(data, index) => ({
          length: 120, // Approximate tab width
          offset: 120 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    minWidth: 100,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2B6CB0',
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
});