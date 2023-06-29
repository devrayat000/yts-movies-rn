import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, FlatList, useBreakpointValue } from "native-base";
import { RefreshControl } from "react-native";

import { getMoviesList } from "../services/movies";
import MovieItem from "./MovieItem";
import { useRefreshByUser } from "../hooks/useRefreshByUser";

export default function LatestMovieList() {
  const numCol = useBreakpointValue({ base: 2, md: 3, lg: 5 });
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["movies", "latest"],
    ({ pageParam }) => getMoviesList({ page: pageParam, limit: 8 * numCol }),
    { getNextPageParam: (page) => page.data.page_number + 1 }
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser([
    "movies",
    "latest",
  ]);

  function loadNextPage() {
    if (hasNextPage) {
      return fetchNextPage();
    }
  }

  return (
    <FlatList
      p="2.5"
      numColumns={numCol}
      contentContainerStyle={{ gap: 12 }}
      data={data.pages.flatMap((page) => page.data.movies)}
      keyExtractor={(movie) => String(movie.id)}
      onEndReached={loadNextPage}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      renderItem={({ item: movie, index }) => (
        <MovieItem index={index} movie={movie} />
      )}
      ListFooterComponent={() => <Box h="4" />}
    />
  );
}
