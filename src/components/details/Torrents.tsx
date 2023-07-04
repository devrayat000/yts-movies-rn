import { useWindowDimensions } from "react-native";
import {
  TabView,
  TabBar,
  type SceneRendererProps,
  type NavigationState,
  type Route as IRoute,
} from "react-native-tab-view";
import {
  View,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Divider,
  useToken,
  Pressable,
} from "native-base";
import { useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import type { SingleMovieResponse, Torrent } from "../../types/single-movie";
import { useQuery } from "@tanstack/react-query";
import { Link, useGlobalSearchParams } from "expo-router";
import getMagnet from "../../utils/getMagnet";

interface Route extends Torrent, IRoute {}
interface TabProps {
  route: Route;
  jumpTo: (key: string) => void;
}

function TorrentTab({ route: torrent }: TabProps) {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data } = useQuery<SingleMovieResponse>(["movie", id]);

  return (
    <VStack flex={1} bg="blueGray.100">
      <HStack space="6" p="4">
        {/* <Ionicons name="folder" /> */}
        <Icon as={Ionicons} name="folder-open" size="md" />
        <Text fontSize="md">{torrent.size}</Text>
      </HStack>
      <Divider />
      <HStack space="6" p="4">
        <Icon as={Ionicons} name="resize-outline" size="md" />
        <Text fontSize="md">{torrent.quality}</Text>
      </HStack>
      <Divider />
      <HStack space="6" p="4">
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          P / S
        </Text>
        <Text fontSize="md">
          {torrent.peers} / {torrent.seeds}
        </Text>
      </HStack>
      <Divider />
      <Link asChild href={getMagnet(data.data.movie.title_long, torrent)}>
        <Pressable android_ripple={{ borderless: false, foreground: true }}>
          <HStack space="6" p="4">
            <Icon as={Ionicons} name="download" size="md" />
            <Text fontSize="md">Download</Text>
          </HStack>
        </Pressable>
      </Link>
    </VStack>
  );
}

function TBar(
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>;
  }
) {
  return (
    <TabBar<Route>
      {...props}
      activeColor={useColorModeValue("#000", "#e5e5e5")}
      inactiveColor={useColorModeValue("#1f2937", "#a1a1aa")}
      style={{
        backgroundColor: useToken(
          "colors",
          useColorModeValue("gray.50", "blueGray.700")
        ),
      }}
      indicatorStyle={{ backgroundColor: useToken("colors", "cyan.500") }}
    />
  );
}

export default function Torrents({ torrents }: { torrents: Torrent[] }) {
  const [index, setIndex] = useState(0);
  const routes = useMemo(
    () =>
      torrents.map<Route>((t) => ({
        ...t,
        key: `${t.quality}-${t.type}`,
        title: `${t.quality}-${t.type}`,
        accessible: true,
        accessibilityLabel: `${t.quality} ${t.type}`,
      })),
    [torrents]
  );
  const { width } = useWindowDimensions();

  return (
    <View
      mt="5"
      borderColor="blueGray.200"
      borderWidth="1"
      rounded="xs"
      p="1.5"
      h="72"
    >
      <TabView<Route>
        navigationState={{
          index,
          routes,
        }}
        renderScene={TorrentTab}
        renderTabBar={TBar}
        onIndexChange={setIndex}
        initialLayout={{ width }}
      />
    </View>
  );
}
