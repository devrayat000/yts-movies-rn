import { Pressable, HStack, Text, ChevronRightIcon } from "native-base";
import { Link } from "expo-router";

export default function LatestMovies() {
  return (
    <Link href="/latest" asChild>
      <Pressable mt="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Latest Movies</Text>
          <ChevronRightIcon size="6" />
        </HStack>
      </Pressable>
    </Link>
  );
}
