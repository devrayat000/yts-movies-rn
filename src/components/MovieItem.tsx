import { Link } from "expo-router";
import { AspectRatio, Box, Heading, Pressable, Text } from "native-base";

import type { Movie } from "../types/movie";
import ExpoImage from "./ExpoImage";

export interface MovieItemProps {
  index: number;
  movie: Pick<
    Movie,
    "id" | "title" | "title_long" | "year" | "medium_cover_image" | "language"
  >;
}

export default function MovieItem({ movie, index }: MovieItemProps) {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable
        flex={1}
        ml={index % 2 === 1 ? "1" : undefined}
        mr={index % 2 === 0 ? "1" : undefined}
        android_ripple={{ borderless: false, foreground: true }}
        rounded="md"
      >
        <AspectRatio ratio={2 / 3}>
          <ExpoImage
            source={{
              uri: movie.medium_cover_image,
              cacheKey: `cover_medium_${movie.id}`,
            }}
            // placeholder={require("../../assets/www.YTS.MX.jpg")}
            rounded="md"
            borderWidth="4"
            borderColor="gray.300"
            _dark={{ borderColor: "gray.50" }}
          />
        </AspectRatio>
        <Box mt="1.5" mx="1">
          <Heading size="xs">
            {!!movie.language && movie.language !== "en" && (
              <Text color="indigo.500" _dark={{ color: "indigo.400" }}>
                [{movie.language}]{" "}
              </Text>
            )}
            {movie.title}
          </Heading>
          <Text fontSize="xs">{movie.year}</Text>
        </Box>
      </Pressable>
    </Link>
  );
}
