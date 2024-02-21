import React, { useEffect, useState } from "react";
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
import { useUser } from "contexts/user.context";

const Chats = () => {
  const { chats } = useUser();
  // const {
  //   status,
  //   data: chats,
  //   error,
  // } = useQuery({
  //   queryKey: ["chats"],
  //   queryFn: getChats,
  // });
  useEffect(() => {
    // getChats();

    console.log(chats.length, "chats");
  }, [chats]);

  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View bg={1} flex>
      <SafeTop title={"Chats"} />
      {/* {!(status == "success") || !chats ? ( */}
      {/* <Text>Loading...</Text> */}
      {/* ) : ( */}
      <FlatList
        data={chats}
        style={{
          padding: 10,
        }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatItem chat={item} />}
      />
      {/* )} */}
    </View>
  );
};
export default Chats;
