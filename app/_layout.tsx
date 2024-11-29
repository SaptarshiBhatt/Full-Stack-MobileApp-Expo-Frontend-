import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import * as eva from "@eva-design/eva";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import { useAtom } from "jotai";
import { darkAtom } from "@/utlis/darkatom";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [dark, setDark] = useAtom(darkAtom);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    // monsb: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    // monb: require("../assets/fonts/Montserrat-Bold.ttf"),
    ...FontAwesome.font,
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
    <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/login"
            options={{
              title: "Log In Or Sign Up",
              headerTitleAlign: "center",
              headerTitleStyle: {},
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <AntDesign name="close" size={28} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modals)/register"
            options={{
              title: "Sourav",
              headerTitleAlign: "center",
              headerTitleStyle: {},
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <AntDesign name="close" size={28} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </ThemeProvider>
    </ApplicationProvider>
  );
}
