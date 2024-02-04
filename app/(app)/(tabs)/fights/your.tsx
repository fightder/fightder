import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { View } from "components/View";
import { SafeTop } from "components/SafeTop";
import { Text } from "components/Text";
import { IconButton } from "components/IconButton";
import { FlatList, Image } from "react-native";

const Fights = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return <View bg={1} style={{ flex: 1 }}></View>;
};
export default Fights;
