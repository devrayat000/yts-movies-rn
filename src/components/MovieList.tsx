import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Text, useBreakpointValue } from "native-base";
import { RefreshControl, useWindowDimensions } from "react-native";

import MovieItem from "./MovieItem";
import { useRefreshByUser } from "../hooks/useRefreshByUser";
import { MovieListResponse } from "../types/movie";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";

export interface MovieListProps {
  queryKey: string;
  queryFn: (props: {
    page: number;
    limit: number;
  }) => Promise<MovieListResponse>;
}

export default function MovieList({ queryKey, queryFn }: MovieListProps) {
  const numCol = useBreakpointValue({ base: 2, md: 3, lg: 5 });
  const { width } = useWindowDimensions();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["movies", queryKey],
    ({ pageParam }) => queryFn({ page: pageParam, limit: 8 * numCol }),
    { getNextPageParam: (page) => page.data.page_number + 1 }
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser([
    "movies",
    queryKey,
  ]);

  const movies = useMemo(
    () => data.pages.flatMap((page) => page.data.movies),
    [data]
  );

  function loadNextPage() {
    if (hasNextPage) {
      return fetchNextPage();
    }
  }

  return (
    <FlashList
      numColumns={numCol}
      contentContainerStyle={{ padding: 2.5 * 4 }}
      data={movies}
      keyExtractor={(movie) => String(movie.id)}
      onEndReached={loadNextPage}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      getItemType={(movies) => movies.genres[0]}
      estimatedItemSize={(width / numCol / 2) * 3.2}
      renderItem={({ item: movie, index }) => (
        <MovieItem index={index} movie={movie} />
      )}
      ItemSeparatorComponent={() => <Box h="3" />}
    />
  );
}
