import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "./IconButton";
import { router } from "expo-router";
import { Text } from "./Text";

export function SafeTop({
  back,
  title,
  ...props
}: { back?: boolean; title?: string } & ViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          // height: insets.top + (back ? 30 : 0),
          // flex: 1,
          flexDirection: "row",
          marginTop: insets.top,
          backgroundColor: "transparent",
          // overflow: "visible",
        },
        props.style,
      ]}
      {...props}
    >
      {back && (
        <View
          style={{
            // overflow: "visible",
            // position: "absolute",
            // top: insets.top,
            // left: 0,
            margin: 10,
            // padding: 10,
            // marginLeft: 10,
            // marginRight: 10,
            // gap: 10,
            // flexDirection: "row",
            // justifyContent: "flex-start",
          }}
        >
          <IconButton
            name="arrow-back"
            onPress={() => {
              router.back();
            }}
          />
        </View>
      )}
      {title && (
        <Text
          // style={{ top: insets.top, left: 60, overflow: "visible" }}
          variant="header"
        >
          {title}
        </Text>
      )}
    </View>
  );
}

export function SafeBottom(props: ViewProps) {
  const insets = useSafeAreaInsets();
  const { style, ...otherProps } = props;
  return (
    <View
      style={[
        {
          height: insets.bottom,
          backgroundColor: "transparent",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
