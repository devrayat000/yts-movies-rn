import type { ErrorBoundaryProps } from "expo-router";
import { Button, Text, View } from "native-base";

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{props.error.message}</Text>
      <Button variant="ghost" color="error.500" onPress={props.retry}>
        Try Again?
      </Button>
    </View>
  );
}
