import React from "react";
import { View } from "./View";
import { Text } from "./Text";
import { Image, Pressable } from "react-native";
import { IconButton } from "./IconButton";
import { Link } from "expo-router";
import { Fight } from "utils/type";
import { Chat } from "constants/type";

export const ChatItem = ({ chat }: { chat: Chat }) => {
  console.log(chat, "chat");
  return (
    <Link href={{ pathname: "chats/[id]", params: { id: chat._id } }} asChild>
      <Pressable>
        <View flex row bg={2} r={20} p={10} my={10}>
          <Image
            source={{ uri: chat.opponentImage }}
            style={{ width: 100, height: 100, borderRadius: 20 }}
          />
          <View
            flex
            col
            px={10}
            style={{ justifyContent: "space-between", alignItems: "stretch" }}
          >
            <View flex row style={{ alignItems: "baseline" }}>
              <Text variant="title">{chat.opponentName}</Text>
              <Text variant="subtitle">
                {chat.logs.length
                  ? new Date(
                      chat.logs[chat.logs.length - 1].time
                    ).toLocaleDateString()
                  : "Just Matched"}
              </Text>
            </View>
            <Text variant="subtitle" style={{ opacity: 0.7 }}>
              {chat.logs.length
                ? chat.logs[chat.logs.length - 1].message
                : "Make your first move?"}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
