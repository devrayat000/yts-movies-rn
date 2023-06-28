import { Stack } from "expo-router";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  HStack,
  Icon,
  IconButton,
  FavouriteIcon,
  MoonIcon,
} from "native-base";
import Octicons from "@expo/vector-icons/Octicons";
import LatestMovies from "../src/components/LatestMovies";

export default function index() {
  return (
    <ScrollView p="2.5">
      <Stack.Screen
        options={{
          headerTitle: "YTS Movies",
          headerRight(props) {
            return (
              <HStack space="1">
                <IconButton
                  rounded="full"
                  icon={<MoonIcon />}
                  _icon={{ color: "gray.900" }}
                />
                <IconButton
                  rounded="full"
                  icon={<FavouriteIcon />}
                  _icon={{ color: "rose.600" }}
                />
              </HStack>
            );
          },
        }}
      />
      <Pressable>
        <HStack
          px="6"
          py="3.5"
          alignItems="center"
          space="4"
          shadow="5"
          _light={{ bg: "gray.200" }}
          _dark={{ bg: "blueGray.700" }}
          rounded="sm"
        >
          <Icon as={Octicons} name="search" color="gray.500" />
          <Text color="gray.500">Search movies</Text>
        </HStack>
      </Pressable>

      <LatestMovies />
    </ScrollView>
  );
}
