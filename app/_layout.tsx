import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useColorScheme, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  useFrameworkReady();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          // In production, you would send this to your error tracking service
          console.error('App Error:', error, errorInfo);
        }}
      >
        {/* Redirect to the tabs/index screen when app starts */}
        <Redirect href="/(tabs)" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            // animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="trail-details/[id]"
            options={{
              contentStyle: { backgroundColor: colors.background },
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ErrorBoundary>
    </View>
  );
}
