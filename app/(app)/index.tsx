import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { View } from "react-native";
import { SafeTop } from "components/SafeTop";
import { Text } from "components/Text";
import { router } from "expo-router";

const Home = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  useEffect(() => {
    router.push("/home");
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeTop />
      <Text variant="header">Fync</Text>
      {/* <Canvas style={{ width, height }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas> */}
    </GestureHandlerRootView>
  );
};
export default Home;
