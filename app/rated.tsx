import { Suspense } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View, Center } from "native-base";

import RatedMovieList from "../src/components/RatedMovieList";

export default function RatedMoviesPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Highly Rated Movies",
        }}
      />
      <Suspense
        fallback={
          <Center h="100%">
            <ActivityIndicator size="large" />
          </Center>
        }
      >
        <RatedMovieList />
      </Suspense>
    </View>
  );
}

export { default as ErrorBoundary } from "../src/components/ErrorBoundary";
