import { Suspense } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View, Center } from "native-base";

import MovieList from "../src/components/MovieList";
import { getMoviesList } from "../src/services/movies";

export default function RatedMoviesPage() {
  return (
    <View h="full">
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
        <MovieList
          queryKey="rated"
          queryFn={(props) => getMoviesList({ ...props, minimum_rating: 5 })}
        />
      </Suspense>
    </View>
  );
}

export { default as ErrorBoundary } from "../src/components/ErrorBoundary";
