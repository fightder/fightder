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
  variant,
  ...props
}: {
  onPress?: () => void;
  name: keyof typeof Ionicons.glyphMap;
  href?: string;
  variant?: "circle" | "default";
} & React.ComponentProps<typeof Ionicons> &
  React.ComponentProps<typeof MotiPressable>) => {
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
      style={[
        {
          borderRadius: variant == "circle" ? 100 : 10,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor:
            variant == "circle"
              ? mode == "dark"
                ? "white"
                : "black"
              : "transparent",
        },
        props.style,
      ]}
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
        style={{
          alignSelf: "center",
        }}
        color={
          variant == "circle"
            ? mode == "dark"
              ? "black"
              : "white"
            : mode == "dark"
              ? "white"
              : "black"
        }
        // {...props}
      />
    </MotiPressable>
  );
};
