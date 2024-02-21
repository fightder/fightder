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
import { FightCard } from "components/FightCard";
import { useUser } from "contexts/user.context";

const Fights = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  const { fights } = useUser();
  return (
    <View bg={1} style={{ flex: 1, paddingRight: 20 }}>
      <FlatList
        data={fights}
        keyExtractor={(item) => item.id + fights.length}
        renderItem={({ item }) => <FightCard fight={item} />}
      />
    </View>
  );
};
export default Fights;
