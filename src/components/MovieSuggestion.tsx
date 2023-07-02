import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useGlobalSearchParams } from "expo-router";
import {
  AspectRatio,
  Flex,
  Heading,
  Pressable,
  Skeleton,
  VStack,
  useBreakpointValue,
  useMediaQuery,
  useToken,
} from "native-base";

import { getSuggestedMovies } from "../services/movies";
import ExpoImage from "./ExpoImage";

export default function MovieSuggestion() {
  const headingSize = useBreakpointValue(["sm", "md"]);
  return (
    <VStack flex={1} h="full">
      <Heading size={headingSize}>Similar Movies</Heading>
      <Suspense fallback={<SuggestionSkeleton />}>
        <SuggestedMoviesList />
      </Suspense>
    </VStack>
  );
}

function SuggestedMoviesList() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data } = useQuery(["movie", "suggestion", id], getSuggestedMovies, {
    enabled: !!id,
  });
  const [isBig] = useMediaQuery({
    minWidth: useToken("breakpoints", "md"),
  });

  return (
    <Flex
      mt="2"
      justify="space-between"
      align="stretch"
      wrap="wrap"
      direction="row"
      style={{ rowGap: 12 }}
    >
      {data.data.movies.map((movie, index) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
          <Pressable
            android_ripple={{ borderless: false, foreground: true }}
            rounded="md"
            flexGrow={0}
            flexShrink={0}
            flexBasis="48%"
            {...(!isBig
              ? {
                  borderWidth: "2",
                  borderColor: "gray.300",
                  _dark: { borderColor: "gray.50" },
                }
              : undefined)}
          >
            <AspectRatio ratio={2 / 3}>
              <ExpoImage
                source={{ uri: movie.medium_cover_image }}
                rounded="md"
              />
            </AspectRatio>
          </Pressable>
        </Link>
      ))}
    </Flex>
  );
}

function SuggestionSkeleton() {
  return (
    <Flex
      mt="2"
      justify="space-between"
      align="stretch"
      wrap="wrap"
      direction="row"
      style={{ rowGap: 12 }}
    >
      {Array.from(new Array(4).keys()).map((i) => (
        <AspectRatio
          key={i}
          flexGrow={0}
          flexShrink={0}
          flexBasis="48%"
          ratio={2 / 3}
        >
          <Skeleton rounded="md" w="full" />
        </AspectRatio>
      ))}
    </Flex>
  );
}
