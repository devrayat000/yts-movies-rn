import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useGlobalSearchParams } from "expo-router";
import {
  AspectRatio,
  HStack,
  Heading,
  Pressable,
  Skeleton,
  VStack,
} from "native-base";

import { getSuggestedMovies } from "../services/movies";
import ExpoImage from "./ExpoImage";

export default function MovieSuggestion() {
  return (
    <VStack flex={1}>
      <Heading size="md">Similar Movies</Heading>
      <Suspense fallback={<SuggestionSkeleton />}>
        <SuggestedMoviesList />
      </Suspense>
    </VStack>
  );
}

function SuggestedMoviesList() {
  const { id = "52943" } = useGlobalSearchParams<{ id: string }>();
  const { data } = useQuery(["movie", "suggestion", id], getSuggestedMovies);

  return (
    <HStack
      mt="2"
      flexWrap="wrap"
      style={{ rowGap: 8 }}
      justifyContent="space-between"
    >
      {data.data.movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
          <Pressable
            android_ripple={{ borderless: false, foreground: true }}
            flexBasis="49%"
          >
            <AspectRatio ratio={2 / 3} key={movie.id}>
              <ExpoImage
                source={{ uri: movie.medium_cover_image }}
                rounded="sm"
              />
            </AspectRatio>
          </Pressable>
        </Link>
      ))}
    </HStack>
  );
}

function SuggestionSkeleton() {
  return (
    <HStack
      mt="2"
      flexWrap="wrap"
      style={{ rowGap: 8 }}
      justifyContent="space-between"
    >
      {Array.from(new Array(4).keys()).map((i) => (
        <AspectRatio key={i} flexBasis="49%">
          <Skeleton rounded="md" w="full" />
        </AspectRatio>
      ))}
    </HStack>
  );
}
