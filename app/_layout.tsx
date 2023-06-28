import { Stack, SplashScreen } from "expo-router";
import {
  Heading,
  NativeBaseProvider,
  extendTheme,
  useColorModeValue,
  useToken,
} from "native-base";
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
import { Platform, type AppStateStatus } from "react-native";
import { useOnlineManager } from "../src/hooks/useOnlineManager";
import { useAppState } from "../src/hooks/useAppState";
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

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useOnlineManager();
  useAppState(onAppStateChange);

  if (!isFontLoaded) {
    return <SplashScreen />;
  }

  return (
    <NativeBaseProvider theme={theme}>
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
        headerTitle(props) {
          return <Heading size="md" {...props} />;
        },
        contentStyle: { backgroundColor: bg },
      }}
    />
  );
}
