import { Factory } from "native-base";
import { TouchableHighlight as NormalTouchableHighlight } from "react-native-gesture-handler";
import { ImageBackground as NormalImageBackground } from "react-native";
import { LinearGradient as NormalLinearGradient } from "expo-linear-gradient";

export const TouchableHighlight = Factory(NormalTouchableHighlight);

export const ImageBackground = Factory(NormalImageBackground);

export const LinearGradient = Factory(NormalLinearGradient);
