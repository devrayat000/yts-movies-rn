import { useQuery } from "@tanstack/react-query";
import {
  Center,
  Text,
  View,
  Button,
  ScrollView,
  Heading,
  AspectRatio,
  ZStack,
  HStack,
  Box,
  Container,
} from "native-base";
import { useGlobalSearchParams, Stack } from "expo-router";
import { ActivityIndicator, RefreshControl } from "react-native";

import { getMovieById } from "../../src/services/movies";
import ExpoImage from "../../src/components/ExpoImage";
import ErrorBoundary from "../../src/components/ErrorBoundary";
import { useRefreshByUser } from "../../src/hooks/useRefreshByUser";

type SearchParams = Record<string, string | string[]>;

interface MovieDetailsParams extends SearchParams {
  id: string;
}

export default function MovieDetailsPage() {
  const { id = "52943" } = useGlobalSearchParams<MovieDetailsParams>();
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["movie", id],
    getMovieById,
    { suspense: false }
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(["movie", id]);

  if (isLoading) {
    return (
      <Center h="100%">
        <ActivityIndicator size="large" />
        <Stack.Screen options={{ headerShown: false }} />
      </Center>
    );
  }

  if (isError && error instanceof Error) {
    return <ErrorBoundary error={error} retry={() => void refetch()} />;
  }

  if (!data) {
    return null;
  }

  const movie = data.data.movie;

  return (
    <ScrollView
      p="2.5"
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <Stack.Screen options={{ title: movie.title, headerShown: true }} />
      <Heading size="md">{movie.title}</Heading>
      <Text fontSize="md">{movie.year}</Text>
      <HStack flexWrap="wrap" style={{ gap: 3 }}>
        {movie.genres.map((genre) => (
          <Box
            key={genre}
            borderWidth="1"
            borderColor="gray.600"
            _dark={{ borderColor: "gray.300" }}
            rounded="sm"
            px="1"
            mt="0.5"
          >
            <Text>{genre}</Text>
          </Box>
        ))}
      </HStack>
      <AspectRatio ratio={4 / 3} mt="1.5">
        <ZStack alignItems="center" justifyContent="center">
          <AspectRatio w="100%" flex={1} ratio={4 / 3}>
            <ExpoImage
              // size="64"
              rounded="lg"
              shadow={8}
              source={{
                uri: movie.background_image,
                cacheKey: `bg_${movie.id}`,
              }}
              zIndex={1}
            />
          </AspectRatio>
          <HStack zIndex={2} flex={1} m="1" space="2.5">
            <AspectRatio ratio={2 / 3} flex={1}>
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
            <Container flex={1}>
              <HStack
                rounded="full"
                bg="gray.200"
                alignItems="center"
                space="1.5"
                px="3"
                py="1.5"
              >
                <ExpoImage
                  source={require("../../assets/imdb.png")}
                  h={5}
                  w={10}
                />
                <Text>{movie.rating} / 10</Text>
              </HStack>
            </Container>
          </HStack>
        </ZStack>
      </AspectRatio>
    </ScrollView>
  );
}

export { default as ErrorBoundary } from "../../src/components/ErrorBoundary";
