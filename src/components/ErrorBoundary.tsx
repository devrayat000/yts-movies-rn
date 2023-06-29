import type { ErrorBoundaryProps } from "expo-router";
import { Button, Center, Text } from "native-base";

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <Center flex={1} h="100%">
      <Text>{props.error.message}</Text>
      <Button variant="ghost" color="error.500" onPress={props.retry}>
        Try Again?
      </Button>
    </Center>
  );
}
