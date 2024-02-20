import React, { useState } from "react";
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
import { ChatItem } from "components/ChatItem";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "utils/api";

const Fights = () => {
  const {
    status,
    data: chats,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });
  // const [chats, setChats] = useState([
  //   {
  //     id: "1",
  //     opponentId: "1",
  //     opponentImage: "https://picsum.photos/200",
  //     inviterId: "2",
  //     inviterImage: "https://picsum.photos/200",
  //     matchAt: "2022-01-01",
  //   },
  // ]);

  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View bg={1} flex>
      <SafeTop title={"Chats"} />
      {!status == "success" ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={chats}
          style={{
            padding: 10,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatItem chat={item} />}
        />
      )}
    </View>
  );
};
export default Fights;
