import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, Box, Text } from "native-base";
import { RefreshControl } from "react-native";

import { getLatestMovies } from "../services/movies";
import MovieItem from "./MovieItem";

export default function LatestMovieList() {
  const { data, isRefetching, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["movies", "latest"],
      ({ pageParam }) => getLatestMovies({ page: pageParam }),
      { getNextPageParam: (page) => page.data.page_number + 1 }
    );

  function loadNextPage() {
    if (hasNextPage) {
      return fetchNextPage();
    }
  }

  return (
    <FlatList
      p="2.5"
      key={"dd"}
      numColumns={2}
      contentContainerStyle={{ gap: 12 }}
      data={data.pages.flatMap((page) => page.data.movies)}
      keyExtractor={(movie) => String(movie.id)}
      onEndReached={loadNextPage}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      renderItem={({ item: movie, index }) => (
        <MovieItem index={index} movie={movie} />
      )}
    />
  );
}
