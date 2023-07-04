import { Heading, View, useBreakpointValue } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Trailer({ videoId }: { videoId: string }) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string>(null);

  const headingSize = useBreakpointValue(["sm", "md"]);
  const { width } = useWindowDimensions();
  const height = ((width - 20) / 16) * 9;

  return (
    <View mt="5" flex={1}>
      <Heading size={headingSize}>Trailer</Heading>
      <View mt="2" rounded="md" overflow="hidden">
        <YoutubePlayer
          height={height}
          videoId={videoId}
          onError={setError}
          onReady={() => setIsReady(true)}
        />
      </View>
    </View>
  );
}
