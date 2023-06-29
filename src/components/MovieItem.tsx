import { Link } from "expo-router";
import { AspectRatio, Box, Heading, Pressable, Text } from "native-base";

import type { Movie } from "../types/movie";
import ExpoImage from "./ExpoImage";

export interface MovieItemProps {
  index: number;
  movie: Pick<
    Movie,
    "id" | "title" | "title_long" | "year" | "medium_cover_image"
  >;
}

export default function MovieItem({ movie, index }: MovieItemProps) {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable
        flex={1}
        ml={index % 2 === 1 ? "1" : undefined}
        mr={index % 2 === 0 ? "1" : undefined}
      >
        <AspectRatio ratio={3 / 4}>
          <ExpoImage
            source={{
              uri: movie.medium_cover_image,
              cacheKey: `cover_medium_${movie.id}`,
            }}
            // placeholder={{ uri: require("../../assets/www.YTS.MX.jpg") }}
            // alt={movie.title_long}
            // sharedTransitionTag={`hero_${movie.id}`}
            rounded="md"
            borderWidth="4"
            borderColor="gray.300"
            _dark={{ borderColor: "gray.50" }}
          />
        </AspectRatio>
        <Box mt="1.5" mx="1">
          <Heading size="xs">{movie.title}</Heading>
          <Text fontSize="xs">{movie.year}</Text>
        </Box>
      </Pressable>
    </Link>
  );
}
