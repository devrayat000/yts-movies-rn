import { Suspense } from "react";
import {
  Pressable,
  HStack,
  Text,
  ChevronRightIcon,
  ScrollView,
  AspectRatio,
  View,
  Skeleton,
} from "native-base";
import { Link } from "expo-router";
import { type QueryKey, useQuery } from "@tanstack/react-query";

import { getMoviesList } from "../services/movies";
import ExpoImage from "./ExpoImage";
import type { MovieListResponse } from "../types/movie";

export function LatestMovies() {
  return (
    <HeroList title="Latest Movies">
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
    <HeroList title="4k Movies">
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
    <HeroList title="Highly Rated Movies">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroLoader
          queryKey={["movies", "rated", "hero"]}
          queryFn={() => getMoviesList({ minimum_rating: 5, limit: 10 })}
        />
      </Suspense>
    </HeroList>
  );
}

function HeroList(props: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl">{props.title}</Text>
        <ChevronRightIcon size="6" />
      </HStack>
      <ScrollView horizontal h="48" mt="1">
        {props.children}
      </ScrollView>
    </View>
  );
}

function HeroLoader<Key extends QueryKey>(props: {
  queryKey: Key;
  queryFn: () => Promise<MovieListResponse>;
}) {
  const { data } = useQuery(props.queryKey, props.queryFn);

  return (
    <HStack space="1.5">
      {data.data.movies.map((movie) => (
        <AspectRatio ratio={2 / 3} key={movie.id}>
          <ExpoImage source={{ uri: movie.medium_cover_image }} rounded="sm" />
        </AspectRatio>
      ))}
    </HStack>
  );
}

function HeroSkeleton() {
  return (
    <HStack space="1.5">
      {Array.from(new Array(6).keys()).map((idx) => (
        <AspectRatio ratio={2 / 3} key={idx}>
          <Skeleton h="100%" rounded="sm" />
        </AspectRatio>
      ))}
    </HStack>
  );
}
