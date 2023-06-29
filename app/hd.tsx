import { Suspense } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View, Center } from "native-base";

import HDMovieList from "../src/components/HDMovies";

export default function HDMoviesPage() {
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
        <HDMovieList />
      </Suspense>
    </View>
  );
}

export { default as ErrorBoundary } from "../src/components/ErrorBoundary";
