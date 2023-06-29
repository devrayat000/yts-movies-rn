import { useQuery } from "@tanstack/react-query";
import {
  Center,
  Text,
  View,
  Button,
  ScrollView,
  Heading,
  Breadcrumb,
  AspectRatio,
} from "native-base";
import { useGlobalSearchParams, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

import { getMovieById } from "../../src/services/movies";
import ExpoImage from "../../src/components/ExpoImage";

type SearchParams = Record<string, string | string[]>;

interface MovieDetailsParams extends SearchParams {
  id: string;
}

export default function MovieDetailsPage() {
  const { id } = useGlobalSearchParams<MovieDetailsParams>();
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["movie", id],
    getMovieById,
    { suspense: false }
  );

  if (isLoading) {
    return (
      <Center h="100%">
        <ActivityIndicator size="large" />
        <Stack.Screen options={{ headerShown: false }} />
      </Center>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text>{error.message}</Text>
        <Button variant="ghost" color="error.500" onPress={() => refetch()}>
          Try Again?
        </Button>
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const movie = data.data.movie;

  return (
    <ScrollView p="2.5">
      <Stack.Screen options={{ title: movie.title, headerShown: true }} />
      <Heading size="md">{movie.title}</Heading>
      <Text fontSize="md">{movie.year}</Text>
      <AspectRatio ratio={3 / 4}>
        <ExpoImage
          source={{
            uri: movie.medium_cover_image,
            cacheKey: `cover_medium_${movie.id}`,
          }}
          // placeholder={{ uri: require("../../assets/www.YTS.MX.jpg") }}
          rounded="md"
          borderWidth="4"
          borderColor="gray.300"
          _dark={{ borderColor: "gray.50" }}
        />
      </AspectRatio>
    </ScrollView>
  );
}

export { default as ErrorBoundary } from "../../src/components/ErrorBoundary";
