import { COLORS } from "constants/colors";
import { ComponentProps } from "react";
import {
  TextInput as DefaultInput,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { View } from "./View";
import { fontStyles, textColorTheme } from "./Text";

export const Input = ({
  leftItem,
  rightItem,
  col,
  gap,
  p,
  m,
  r,
  style,
  bg,
  fontSize,
  variant = "body",
  color = "default",
  ...props
}: {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  col?: boolean;
  gap?: number;
  p?: number;
  r?: number;
  m?: number;
  bg?: 1 | 2 | 3 | 4;
  fontSize?: "sm" | "md" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  variant?: "header" | "title" | "subtitle" | "body" | "caption";
  color?:
    | "default"
    | "inverted"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning";
} & ComponentProps<typeof DefaultInput>) => {
  const mode = useColorScheme();

  return (
    <View
      row
      gap={5}
      p={p || 5}
      r={r || 5}
      m={m}
      bg={bg}
      style={{
        paddingLeft: p * 2 || 10,
        // flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      {leftItem ? leftItem : null}
      <DefaultInput
        style={[
          p ? { padding: p } : {},
          r ? { borderRadius: r } : {},
          gap ? { gap } : {},
          // { flexGrow: 1 },
          // { alignContent: "stretch" },

          { fontFamily: "Outfit_400Regular" },
          { flex: 1 },
          fontStyles[variant],
          textColorTheme[mode][color],
          fontSize
            ? {
                fontSize: fontSizes[fontSize],
              }
            : {},
          style,
        ]}
        {...props}
      />
      {rightItem ? rightItem : null}
    </View>
  );
};

const backgrounds = {
  dark: StyleSheet.create({
    1: {
      backgroundColor: COLORS.background[950],
    },
    2: {
      backgroundColor: COLORS.background[900],
    },
    3: {
      backgroundColor: COLORS.background[800],
    },
    4: {
      backgroundColor: COLORS.background[700],
    },
  }),
  light: StyleSheet.create({
    1: {
      backgroundColor: COLORS.background[50],
    },
    2: {
      backgroundColor: COLORS.background[100],
    },
    3: {
      backgroundColor: COLORS.background[200],
    },
    4: {
      backgroundColor: COLORS.background[300],
    },
  }),
};

export const fontSizes = {
  sm: 12,
  md: 16,
  l: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
  "6xl": 72,
};
