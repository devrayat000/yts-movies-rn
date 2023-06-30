import { Suspense } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View, Center } from "native-base";

import MovieList from "../src/components/MovieList";
import { getMoviesList } from "../src/services/movies";

export default function LatestMoviesPage() {
  return (
    <View h="full">
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
        <MovieList
          queryKey="latest"
          queryFn={(props) => getMoviesList(props)}
        />
      </Suspense>
    </View>
  );
}

export { default as ErrorBoundary } from "../src/components/ErrorBoundary";
