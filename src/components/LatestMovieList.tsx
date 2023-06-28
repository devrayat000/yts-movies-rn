import { useQuery } from "@tanstack/react-query";
import { FlatList, Box, Text } from "native-base";
import { RefreshControl } from "react-native";

import { getLatestMovies } from "../services/movies";
import MovieItem from "./MovieItem";

export default function LatestMovieList() {
  const { data, isRefetching, refetch } = useQuery(["movies", "latest"], ({}) =>
    getLatestMovies({})
  );

  return (
    <FlatList
      p="2.5"
      key={"dd"}
      numColumns={2}
      contentContainerStyle={{ gap: 12 }}
      data={data.data.movies}
      keyExtractor={(movie) => String(movie.id)}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      renderItem={({ item: movie, index }) => (
        <MovieItem index={index} movie={movie} />
      )}
    />
  );
}
