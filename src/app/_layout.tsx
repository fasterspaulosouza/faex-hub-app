import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_700Bold,
} from "@expo-google-fonts/lexend-deca";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
