import * as Linking from "expo-linking";
import { Box, Toast } from "native-base";

export async function openUrl(url: string) {
  if (await Linking.canOpenURL(url)) {
    await Linking.openURL(url);
  } else {
    await Toast.show({
      id: url,
      render(props) {
        return (
          <Box bg="error.500" px="2" py="1" rounded="sm" mb={5} {...props}>
            Sorry! Cannot open url.
          </Box>
        );
      },
    });
  }
}
