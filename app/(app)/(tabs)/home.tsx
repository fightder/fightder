import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { SafeTop } from "components/SafeTop";
import { Text } from "components/Text";
import { View } from "components/View";
import { IconButton } from "components/IconButton";

const Home = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View bg={1} style={{ flex: 1 }}>
      <SafeTop />
      <View
        row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "transparent",
        }}
      >
        {/* <IconButton name="menu" /> */}
        <Text variant="header" style={{ textAlign: "center" }}>
          Fync
        </Text>

        <View row gap={30}>
          <IconButton name="notifications" />
          <IconButton name="add" href="/add-friend" />
        </View>
      </View>
      <ScrollView>
        <Text variant="title" style={{ textAlign: "center" }}>
          Friends activities
        </Text>
        <Text variant="title" style={{ textAlign: "center" }}>
          Friends
        </Text>
        {/* <Canvas style={{ width, height }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas> */}
      </ScrollView>
    </View>
  );
};
export default Home;
