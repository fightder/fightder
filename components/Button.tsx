import { MotiPressable } from "moti/interactions";
import { useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useColorScheme } from "react-native";

export const Button = ({
  onPress,
  href,
  mx,
  children,
  ...props
}: {
  onPress?: () => void;
  mx?: number;
  href?: string;
} & React.ComponentProps<typeof MotiPressable>) => {
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
      style={{
        // padding: 10,
        // borderRadius: 10,
        // backgroundColor: mode == "dark" ? "#fff" : "#000",
        marginHorizontal: mx || 0,
      }}
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
      {...props}
    >
      {children}
    </MotiPressable>
  );
};
