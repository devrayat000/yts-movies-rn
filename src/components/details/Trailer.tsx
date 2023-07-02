import { Heading, View, useBreakpointValue } from "native-base";
import { useWindowDimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Trailer({ videoId }: { videoId: string }) {
  const headingSize = useBreakpointValue(["sm", "md"]);
  const { width } = useWindowDimensions();
  return (
    <View mt="5" flex={1}>
      <Heading size={headingSize}>Trailer</Heading>
      <View mt="2" rounded="md" overflow="hidden">
        <YoutubePlayer
          height={((width - 20) / 16) * 9}
          videoId={videoId}
          onError={() => console.log("error while loading video")}
        />
      </View>
    </View>
  );
}
