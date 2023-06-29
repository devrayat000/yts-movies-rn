import { Suspense } from "react";
import { ErrorBoundaryProps, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View, Text, Button, Center, Heading } from "native-base";

import LatestMovieList from "../src/components/LatestMovieList";

export default function LatestPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Latest Movies",
        }}
      />
      <Suspense
        fallback={
          <Center h="100%">
            <ActivityIndicator size="large" />
          </Center>
        }
      >
        <LatestMovieList />
      </Suspense>
    </View>
  );
}

export { default as ErrorBoundary } from "../src/components/ErrorBoundary";
