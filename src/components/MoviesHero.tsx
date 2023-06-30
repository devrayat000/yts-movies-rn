import { Suspense } from "react";
import {
  Pressable,
  HStack,
  Text,
  ChevronRightIcon,
  AspectRatio,
  Skeleton,
  useBreakpointValue,
  useToken,
  Box,
} from "native-base";
import { Link } from "expo-router";
import { type QueryKey, useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

import { getMoviesList } from "../services/movies";
import ExpoImage from "./ExpoImage";
import type { MovieListResponse } from "../types/movie";
import { TouchableHighlight } from "./Factory";

export function LatestMovies() {
  return (
    <HeroList title="Latest Movies" href="/latest">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroLoader
          queryKey={["movies", "latest", "hero"]}
          queryFn={() => getMoviesList({ limit: 10 })}
        />
      </Suspense>
    </HeroList>
  );
}

export function HDMovies() {
  return (
    <HeroList title="4k Movies" href="/hd">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroLoader
          queryKey={["movies", "hd", "hero"]}
          queryFn={() => getMoviesList({ quality: "2160p", limit: 10 })}
        />
      </Suspense>
    </HeroList>
  );
}

export function RatedMovies() {
  return (
    <HeroList title="Highly Rated Movies" href="/rated">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroLoader
          queryKey={["movies", "rated", "hero"]}
          queryFn={() => getMoviesList({ minimum_rating: 5, limit: 10 })}
        />
      </Suspense>
    </HeroList>
  );
}

function HeroList(props: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={props.href} asChild>
      <Pressable android_ripple={{ borderless: false, foreground: true }}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
            {props.title}
          </Text>
          <ChevronRightIcon size="6" />
        </HStack>
        {props.children}
      </Pressable>
    </Link>
  );
}

function HeroLoader<Key extends QueryKey>(props: {
  queryKey: Key;
  queryFn: () => Promise<MovieListResponse>;
}) {
  const width = useToken<number>(
    "sizes",
    useBreakpointValue({ base: "32", sm: "40", md: "48", lg: "56" })
  );
  const { data } = useQuery(props.queryKey, props.queryFn);

  return (
    <FlashList
      horizontal
      contentContainerStyle={{ paddingTop: 4 }}
      data={data.data.movies}
      estimatedItemSize={width}
      ItemSeparatorComponent={() => <Box width={useToken("space", "1.5")} />}
      renderItem={({ item: movie }) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
          <Pressable
            android_ripple={{ borderless: false, foreground: true }}
            w={{ base: "32", sm: "40", md: "48", lg: "56" }}
          >
            <AspectRatio ratio={2 / 3} key={movie.id}>
              <ExpoImage
                source={{ uri: movie.medium_cover_image }}
                rounded="sm"
              />
            </AspectRatio>
          </Pressable>
        </Link>
      )}
    />
  );
}

function HeroSkeleton() {
  const width = useToken<number>(
    "sizes",
    useBreakpointValue({ base: "32", sm: "40", md: "48", lg: "56" })
  );

  return (
    <FlashList
      horizontal
      contentContainerStyle={{ paddingTop: 4 }}
      data={Array.from(new Array(6).keys())}
      keyExtractor={String}
      estimatedItemSize={width}
      ItemSeparatorComponent={() => <Box width={useToken("space", "1.5")} />}
      renderItem={() => (
        <AspectRatio
          ratio={2 / 3}
          w={{ base: "32", sm: "40", md: "48", lg: "56" }}
        >
          <Skeleton rounded="sm" h="full" />
        </AspectRatio>
      )}
    />
  );
}
