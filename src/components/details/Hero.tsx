import {
  AspectRatio,
  HStack,
  Pressable,
  Text,
  VStack,
  View,
  useColorMode,
  useMediaQuery,
  useToken,
} from "native-base";
import ExpoImage from "../ExpoImage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";

import MovieSuggestion from "../MovieSuggestion";
import type { Movie } from "../../types/single-movie";
import Intro from "./Intro";

export default function MovieDetailsHero({ movie }: { movie: Movie }) {
  const [isBig] = useMediaQuery({
    minWidth: useToken("breakpoints", "md"),
  });
  const { colorMode } = useColorMode();

  async function openImdb() {
    await WebBrowser.openBrowserAsync(
      `https://www.imdb.com/title/${movie.imdb_code}`
    );
  }

  return (
    <View position="relative" w="full" mt={!isBig ? "3" : undefined}>
      <ExpoImage
        rounded="lg"
        shadow={8}
        source={{
          uri: movie.background_image,
          cacheKey: `bg_${movie.id}`,
        }}
        zIndex={1}
        w="full"
        h="100%"
        position="absolute"
        contentFit="cover"
      />
      <BlurView
        intensity={90}
        tint={colorMode}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      >
        <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.95)"]} />
      </BlurView>
      <HStack zIndex={2} flex={1} m="1" space="2.5" alignItems="flex-start">
        <AspectRatio ratio={2 / 3} flex={1}>
          <ExpoImage
            source={{
              uri: movie.medium_cover_image,
              cacheKey: `cover_medium_${movie.id}`,
            }}
            rounded="md"
          />
        </AspectRatio>
        <VStack flex={isBig ? 2 : 1} alignItems="flex-start">
          {isBig && <Intro movie={movie} />}
          <Pressable
            mt={isBig ? "2" : undefined}
            onPress={openImdb}
            accessibilityLabel="Open in IMDB"
          >
            <HStack
              rounded="full"
              bg="gray.200"
              alignItems="center"
              space="1.5"
              px="3"
              py="1.5"
              shadow="1"
            >
              <ExpoImage
                source={require("../../../assets/imdb.png")}
                h={5}
                w={10}
              />
              <Text>{movie.rating} / 10</Text>
            </HStack>
          </Pressable>
        </VStack>
        {isBig && <MovieSuggestion />}
      </HStack>
    </View>
  );
}
