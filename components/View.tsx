import { COLORS } from "constants/colors";
import { ComponentProps } from "react";
import { View as DefaultView, StyleSheet, useColorScheme } from "react-native";

export const View = ({
  children,
  row,
  col,
  gap,
  p,
  px,
  m,
  r,
  flex,
  style,
  bg,
  variant,
  color,
  glass,
  z,
  ...props
}: {
  children?: React.ReactNode;
  row?: boolean;
  col?: boolean;
  gap?: number;
  p?: number;
  px?: number;
  r?: number;
  m?: number;
  flex?: boolean;
  bg?: 1 | 2 | 3 | 4;
  variant?: "primary" | "secondary" | "text";
  color?: string;
  glass?: boolean;
  z?: number;
} & ComponentProps<typeof DefaultView>) => {
  const mode = useColorScheme();

  return (
    <DefaultView
      style={[
        row
          ? {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }
          : col
            ? {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }
            : {},
        color ? { backgroundColor: color } : {},
        backgrounds[mode][variant || bg || 0],
        p ? { padding: p } : {},
        px ? { paddingHorizontal: px } : {},
        m ? { margin: m } : {},
        r ? { borderRadius: r } : {},
        z ? { zIndex: z } : {},
        gap ? { gap } : {},
        flex ? { flex: 1 } : {},
        glass
          ? {
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }
          : {},
        style,
      ]}
      {...props}
    >
      {children}
    </DefaultView>
  );
};

const backgrounds = {
  dark: StyleSheet.create({
    0: {},
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
    primary: {
      backgroundColor: COLORS.primary[700],
    },
    secondary: {
      backgroundColor: COLORS.secondary[700],
    },
    text: {
      backgroundColor: COLORS.background[100],
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
    primary: {
      backgroundColor: COLORS.primary[300],
    },
    secondary: {
      backgroundColor: COLORS.secondary[300],
    },
    text: {
      backgroundColor: COLORS.background[900],
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
