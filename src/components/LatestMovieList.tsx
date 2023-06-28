import { useQuery } from "@tanstack/react-query";
import { FlatList, Box, Text } from "native-base";

import { getLatestMovies } from "../services/movies";

export default function LatestMovieList() {
  const { data } = useQuery(
    ["movies", "latest"],
    ({}) => getLatestMovies({ limit: 50 }),
    { suspense: true }
  );

  return (
    <FlatList
      data={data.data.movies}
      renderItem={({ item: movie }) => (
        <Box px="3" py="2">
          <Text>{movie.title}</Text>
        </Box>
      )}
    />
  );
}
