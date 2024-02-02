import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useUser } from "contexts/user.context";
import { View } from "components/View";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";
const Friends = () => {
  const { user } = useUser();
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View style={{ flex: 1 }}>
      <SafeTop title={"Friends"} />
      <IconButton
        name="add"
        // type={"primary"}
        style={{
          // position: "absolute",
          zIndex: 20,
          padding: 5,
          marginLeft: "auto",
          // right: 20,
        }}
        size={30}
        href="/add-friend"
      />
      <FlatList
        data={user.friends}
        renderItem={(friend) => {
          return (
            <View>
              <Text>{friend.item.user}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Friends;
