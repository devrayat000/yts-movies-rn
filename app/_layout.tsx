import { Stack, SplashScreen } from "expo-router";
import {
  Heading,
  NativeBaseProvider,
  extendTheme,
  useColorModeValue,
  useToken,
  type StorageManager,
  type ColorMode,
} from "native-base";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SecureStore from "expo-secure-store";
import {
  QueryClientProvider,
  QueryClient,
  focusManager,
} from "@tanstack/react-query";
import { Platform, type AppStateStatus } from "react-native";
import { useOnlineManager } from "../src/hooks/useOnlineManager";
import { useAppState } from "../src/hooks/useAppState";
import { useEffect } from "react";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      networkMode: "offlineFirst",
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      cacheTime: 15 * 3_600,
      retry: 2,
    },
  },
});

const colorModeManager: StorageManager = {
  async get(init) {
    const storedMode = await SecureStore.getItemAsync("color-mode");
    return (storedMode as ColorMode) ?? init;
  },
  set(value) {
    return SecureStore.setItemAsync("color-mode", value);
  },
};

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useOnlineManager();
  useAppState(onAppStateChange);

  useEffect(() => {
    if (isFontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

function Root() {
  const headerColor = useToken(
    "colors",
    useColorModeValue("cyan.100", "blueGray.800")
  );
  const bg = useToken("colors", useColorModeValue("gray.50", "blueGray.700"));

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: headerColor },
        headerTitle({ children }) {
          return <Heading size="md">{children}</Heading>;
        },
        contentStyle: { backgroundColor: bg },
      }}
    />
  );
}
