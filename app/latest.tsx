import { Suspense } from "react";
import { ErrorBoundaryProps, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { View, Text, Button, Center, Heading } from "native-base";
import LatestMovieList from "../src/components/LatestMovieList";

export default function LatestPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Latest Movies",
        }}
      />
      <Suspense
        fallback={
          <Center>
            <ActivityIndicator size="large" />
          </Center>
        }
      >
        <LatestMovieList />
      </Suspense>
    </View>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{props.error.message}</Text>
      <Button variant="ghost" color="error.500" onPress={props.retry}>
        Try Again?
      </Button>
    </View>
  );
}
