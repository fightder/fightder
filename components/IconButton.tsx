import { MotiPressable } from "moti/interactions";
import { useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useColorScheme } from "react-native";

export const IconButton = ({
  onPress,
  name,
  href,
  dynamicTypeRamp,
  ...props
}: {
  onPress?: () => void;
  name: keyof typeof Ionicons.glyphMap;
  href?: string;
} & React.ComponentProps<typeof Ionicons>) => {
  const mode = useColorScheme();
  return (
    <MotiPressable
      onPress={
        href
          ? () => {
              router.push(href);
            }
          : onPress
      }
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              opacity: hovered || pressed ? 0.5 : 1,
            };
          },
        []
      )}
      transition={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              delay: hovered || pressed ? 0 : 100,
            };
          },
        []
      )}
    >
      <Ionicons
        name={name}
        size={24}
        color={mode == "dark" ? "white" : "black"}
        {...props}
      />
    </MotiPressable>
  );
};
