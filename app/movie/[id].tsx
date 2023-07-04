import { useQuery } from "@tanstack/react-query";
import {
  Center,
  View,
  ScrollView,
  useBreakpointValue,
  VStack,
  useMediaQuery,
  useToken,
  useColorMode,
  Heading,
  Text,
  Flex,
} from "native-base";
import { useGlobalSearchParams, Stack } from "expo-router";
import { ActivityIndicator, RefreshControl } from "react-native";

import { getMovieById } from "../../src/services/movies";
import ErrorBoundary from "../../src/components/ErrorBoundary";
import { useRefreshByUser } from "../../src/hooks/useRefreshByUser";
import MovieSuggestion from "../../src/components/MovieSuggestion";
import MovieDetailsHero from "../../src/components/details/Hero";
import Intro from "../../src/components/details/Intro";
import Trailer from "../../src/components/details/Trailer";
import Torrents from "../../src/components/details/Torrents";

type SearchParams = Record<string, string | string[]>;

interface MovieDetailsParams extends SearchParams {
  id: string;
}

export default function MovieDetailsPage() {
  const { id } = useGlobalSearchParams<MovieDetailsParams>();
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["movie", id],
    getMovieById,
    { suspense: false, enabled: !!id }
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(["movie", id]);

  const headingSize = useBreakpointValue(["md", "lg", "xl"]);
  const flexDir = useBreakpointValue({ base: "column", md: "row-reverse" });
  const [isBig] = useMediaQuery({
    minWidth: useToken("breakpoints", "md"),
  });

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
      <VStack mb="6">
        {!isBig && <Intro movie={movie} />}

        <MovieDetailsHero movie={movie} />

        <Torrents torrents={movie.torrents} />

        <Flex direction={flexDir} mt="5" style={{ gap: 16 }}>
          <View flex={1}>
            <Heading size={headingSize}>Synopsis</Heading>
            <Text fontSize="sm" textAlign="justify" mt="2">
              {movie.description_intro}
            </Text>
          </View>
          <Trailer videoId={movie.yt_trailer_code} />
        </Flex>
        {!isBig && (
          <View mt="5">
            <MovieSuggestion />
          </View>
        )}
      </VStack>
    </ScrollView>
  );
}

export { default as ErrorBoundary } from "../../src/components/ErrorBoundary";
