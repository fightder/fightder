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
const Explore = () => {
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
          Explore
        </Text>

        <View row gap={30}>
          <IconButton name="add" href="/create-event" />
        </View>
      </View>
      <ScrollView>
        <Text variant="title" style={{ textAlign: "center" }}>
          Events
        </Text>

        <Text variant="title" style={{ textAlign: "center" }}>
          Friends
        </Text>
        <FlatList
          data={[{ type: "person" }, { type: "event" }]}
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          renderItem={({ item }) =>
            item.type == "event" ? (
              <View
                row
                flex
                bg={2}
                p={5}
                r={10}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  width={30}
                  height={30}
                  source={require("assets/favicon.png")}
                />
                <Text>{item.type}</Text>
              </View>
            ) : (
              <View style={{ width: "50%" }}>
                <Text>{item.type}</Text>
              </View>
            )
          }
        />
      </ScrollView>
    </View>
  );
};
export default Explore;
