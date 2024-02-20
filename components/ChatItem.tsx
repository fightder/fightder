import React from "react";
import { View } from "./View";
import { Text } from "./Text";
import { Image, Pressable } from "react-native";
import { IconButton } from "./IconButton";
import { Link } from "expo-router";
import { Fight } from "utils/type";

export const ChatItem = ({
  chat,
}: {
  chat: {
    id: string;
    opponentId: string;
    opponentImage: string;
    inviterId: string;
    inviterImage: string;
    matchAt: string;
  };
}) => {
  return (
    <Link href={{ pathname: "chats/[id]", params: { id: chat.id } }} asChild>
      <Pressable>
        <View flex bg={2} r={20} p={10} my={10}>
          <Text variant="subtitle">{chat.id}</Text>
        </View>
      </Pressable>
    </Link>
  );
};
