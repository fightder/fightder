import { COLORS } from "constants/colors";
import { ComponentProps } from "react";
import { Text as DefaultText, StyleSheet, useColorScheme } from "react-native";

export const Text = ({
  children,
  fontSize,
  variant,
  style,
  color = "default",
  ...props
}: {
  children: React.ReactNode;
  fontSize?: "sm" | "md" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  variant?: "header" | "title" | "subtitle" | "body" | "caption";
  color?:
    | "default"
    | "inverted"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "white";
} & ComponentProps<typeof DefaultText>) => {
  const mode = useColorScheme();
  return (
    <DefaultText
      style={[
        { fontFamily: "Outfit_400Regular" },
        fontStyles[variant],
        fontSize
          ? {
              fontSize: fontSizes[fontSize],
            }
          : {},
        color == "white" ? { color: "white" } : textColorTheme[mode][color],

        style,
      ]}
      {...props}
    >
      {children}
    </DefaultText>
  );
};

export const fontStyles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontFamily: "Outfit_700Bold",
  },
  title: {
    fontSize: 24,
    fontFamily: "Outfit_700Bold",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
  },
  body: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
  },
  caption: {
    fontSize: 12,
    fontFamily: "Outfit_300Light",
  },
});

export const textColorTheme = {
  light: StyleSheet.create({
    default: {
      color: COLORS.background[900],
    },
    inverted: {
      color: COLORS.background[50],
    },
    primary: {
      color: COLORS.primary[600],
    },
    secondary: {
      color: COLORS.secondary[600],
    },
    error: {
      color: COLORS.error[800],
    },
    success: {
      color: COLORS.secondary[800],
    },
    warning: {
      color: COLORS.error[600],
    },
  }),

  dark: StyleSheet.create({
    default: {
      color: COLORS.background[50],
    },
    inverted: {
      color: COLORS.background[900],
    },
    primary: {
      color: COLORS.primary[500],
    },
    secondary: {
      color: COLORS.secondary[500],
    },
    error: {
      color: COLORS.error[600],
    },
    success: {
      color: COLORS.secondary[300],
    },
    warning: {
      color: COLORS.error[300],
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
