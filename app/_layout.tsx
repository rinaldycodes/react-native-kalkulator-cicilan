import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "Kalkulator Cicilan", headerRight: () => (
          <Pressable onPress={() => router.push('/about')}>
            <AntDesign name="infocirlceo" size={20} color="black" />
          </Pressable>
        ) }} />
        <Stack.Screen name='about' options={{ headerTitle: "Tentang Aplikasi"}} />
        <Stack.Screen name='export-detail' options={{ headerTitle: "Ekspor Detail"}} />
        <Stack.Screen name='privacy-policy' options={{ headerTitle: "Kebijakan Privasi"}} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
