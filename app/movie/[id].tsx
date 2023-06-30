import { useQuery } from "@tanstack/react-query";
import {
  Center,
  Text,
  View,
  Button,
  ScrollView,
  Heading,
  AspectRatio,
  ZStack,
  HStack,
  Box,
  Container,
  useBreakpointValue,
  VStack,
  useMediaQuery,
  useToken,
  useColorMode,
  Skeleton,
} from "native-base";
import { useGlobalSearchParams, Stack } from "expo-router";
import { ActivityIndicator, RefreshControl } from "react-native";
import { BlurView } from "expo-blur";

import { getMovieById } from "../../src/services/movies";
import ExpoImage from "../../src/components/ExpoImage";
import ErrorBoundary from "../../src/components/ErrorBoundary";
import { useRefreshByUser } from "../../src/hooks/useRefreshByUser";
import { LinearGradient } from "../../src/components/Factory";
import MovieSuggestion from "../../src/components/MovieSuggestion";

type SearchParams = Record<string, string | string[]>;

interface MovieDetailsParams extends SearchParams {
  id: string;
}

export default function MovieDetailsPage() {
  const { id = "52943" } = useGlobalSearchParams<MovieDetailsParams>();
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["movie", id],
    getMovieById,
    { suspense: false }
  );
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(["movie", id]);

  const headingSize = useBreakpointValue(["md", "lg", "xl"]);
  const [isBig] = useMediaQuery({
    minWidth: useToken("breakpoints", "md"),
  });
  const { colorMode } = useColorMode();

  if (isLoading) {
    return (
      <Center h="100%">
        <ActivityIndicator size="large" />
        <Stack.Screen options={{ headerShown: false }} />
      </Center>
    );
  }

  if (isError && error instanceof Error) {
    return <ErrorBoundary error={error} retry={() => void refetch()} />;
  }

  if (!data) {
    return null;
  }

  const movie = data.data.movie;

  return (
    <ScrollView
      p="2.5"
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <Stack.Screen options={{ title: movie.title, headerShown: true }} />
      <VStack>
        {!isBig && (
          <Box>
            <Heading size={headingSize}>{movie.title}</Heading>
            <Text fontSize={["md", "lg", "xl"]}>
              {movie.year}{" "}
              <Text color="indigo.500" _dark={{ color: "indigo.400" }}>
                [{movie.language}]
              </Text>
            </Text>
            <HStack flexWrap="wrap" style={{ gap: 3 }}>
              {movie.genres.map((genre) => (
                <Box
                  key={genre}
                  borderWidth="1"
                  borderColor="gray.600"
                  _dark={{ borderColor: "gray.300" }}
                  rounded="sm"
                  px="1"
                  mt="0.5"
                >
                  <Text fontSize={["sm", "lg"]}>{genre}</Text>
                </Box>
              ))}
            </HStack>
          </Box>
        )}

        <View position="relative" w="full" mt={!isBig ? "3" : undefined}>
          <ExpoImage
            // size="64"
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
                // placeholder={{ uri: require("../../assets/www.YTS.MX.jpg") }}
                rounded="md"
                borderWidth="4"
                borderColor="gray.300"
                _dark={{ borderColor: "gray.50" }}
              />
            </AspectRatio>
            <VStack flex={isBig ? 2 : 1} alignItems="flex-start">
              {isBig && (
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
                      <Box
                        key={genre}
                        borderWidth="1"
                        borderColor="gray.600"
                        _dark={{ borderColor: "gray.300" }}
                        rounded="sm"
                        px="1"
                        mt="0.5"
                      >
                        <Text fontSize={["sm", "lg"]}>{genre}</Text>
                      </Box>
                    ))}
                  </HStack>
                </View>
              )}
              <View mt={isBig ? "2" : undefined}>
                <HStack
                  rounded="full"
                  bg="gray.200"
                  alignItems="center"
                  space="1.5"
                  px="3"
                  py="1.5"
                >
                  <ExpoImage
                    source={require("../../assets/imdb.png")}
                    h={5}
                    w={10}
                  />
                  <Text>{movie.rating} / 10</Text>
                </HStack>
              </View>
            </VStack>
            {isBig && <MovieSuggestion />}
          </HStack>
        </View>
      </VStack>
    </ScrollView>
  );
}

export { default as ErrorBoundary } from "../../src/components/ErrorBoundary";
