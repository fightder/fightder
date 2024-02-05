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

const Fights = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View bg={1} style={{ flex: 1 }}>
      <FlatList
        data={[
          {
            title: "Fight Night",
            description:
              "Fight Night is a weekly event where we all get together and fight",
            date: "2022-01-01",
            location: "New York, NY",
            image:
              "https://images.unsplash.com/photo-1631583525743-1f3c1f5e6f1e",
          },
        ]}
        renderItem={({ item }) => (
          <FightCard
            fight={item}
            // title="Fight Night"
            // description="Fight Night is a weekly event where we all get together and fight"
            // date="2022-01-01"
            // location="New York, NY"
            // image="https://images.unsplash.com/photo-1631583525743-1f3c1f5e6f1e"
          />
        )}
      />
    </View>
  );
};
export default Fights;
