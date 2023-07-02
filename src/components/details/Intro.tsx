import { HStack, Heading, Text, View, useBreakpointValue } from "native-base";

import { Movie } from "../../types/single-movie";

export default function Intro({ movie }: { movie: Movie }) {
  const headingSize = useBreakpointValue(["md", "lg", "xl"]);

  return (
    <View>
      <Heading size={headingSize}>{movie.title}</Heading>
      <Text fontSize={["md", "lg", "xl"]}>
        {movie.year}{" "}
        <Text color="indigo.500" _dark={{ color: "indigo.400" }}>
          [{movie.language}]
        </Text>
      </Text>
      <HStack flexWrap="wrap" style={{ gap: 3 }}>
        {movie.genres.map((genre) => (
          <View
            key={genre}
            borderWidth="1"
            borderColor="gray.600"
            _dark={{ borderColor: "gray.300" }}
            rounded="sm"
            px="1"
            mt="0.5"
          >
            <Text fontSize={["sm", "lg"]}>{genre}</Text>
          </View>
        ))}
      </HStack>
    </View>
  );
}
