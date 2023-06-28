import { IconButton, MoonIcon, SunIcon, useColorMode } from "native-base";

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      rounded="full"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      _icon={{ color: "gray.900", _dark: { color: "gray.50" } }}
      onPress={toggleColorMode}
    />
  );
}
