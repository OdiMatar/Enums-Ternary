import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      {/* De schermen hebben zelf een duidelijke knop terug naar het menu. */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Weerwijs' }} />
        <Stack.Screen name="enum_example" options={{ title: 'Weer kiezen · Weerwijs' }} />
        <Stack.Screen name="ternary_example" options={{ title: 'Dag & temperatuur · Weerwijs' }} />
      </Stack>
    </>
  );
}
