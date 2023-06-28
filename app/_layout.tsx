import { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClientProvider,
  QueryClient,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { AppState, Platform, type AppStateStatus } from "react-native";
// export const unstable_settings = {
//   initialRouteName: "(auth)/login",
// };

const theme = extendTheme({
  fontConfig: {
    Inter: {
      400: { normal: "Inter_400Regular" },
      600: { normal: "Inter_600SemiBold" },
      700: { normal: "Inter_700Bold" },
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },
});

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return subscription.remove;
  }, []);

  if (!isFontLoaded) {
    return <SplashScreen />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
