import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList } from "native-base";
import { RefreshControl } from "react-native";

import { getMoviesList } from "../services/movies";
import MovieItem from "./MovieItem";
import { useRefreshByUser } from "../hooks/useRefreshByUser";

export default function HDMovieList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["movies", "hd"],
    ({ pageParam }) => getMoviesList({ page: pageParam, quality: "2160p" }),
    { getNextPageParam: (page) => page.data.page_number + 1 }
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser([
    "movies",
    "hd",
  ]);

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
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      renderItem={({ item: movie, index }) => (
        <MovieItem index={index} movie={movie} />
      )}
    />
  );
}
