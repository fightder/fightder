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
    <View bg={1} style={{ flex: 1, paddingRight: 20 }}>
      <FlatList
        data={[
          {
            id: "1",
            title: "Godzilla vs King Kong",
            description:
              "The two most powerful forces of nature will clash on the big screen in a spectacular battle for the ages.",
            rule: "No biting",
            date: "2022-01-01",
            location: "New York, NY",
            opponentId: "1",
            opponentImage: "https://picsum.photos/200",
            inviterId: "2",
            inviterImage: "https://picsum.photos/200",
            prize: "a banana",
            public: true,
            spectators: [
              "https://picsum.photos/200",
              "https://picsum.photos/200",
            ],
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FightCard fight={item} />}
      />
    </View>
  );
};
export default Fights;
