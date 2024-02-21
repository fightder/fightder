import React from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Link, router, useLocalSearchParams } from "expo-router";
import { getChat, getChats, getFights, getOpponents } from "utils/api";
import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "components/JsonViewer";
import { SafeBottom, SafeTop } from "components/SafeTop";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useUser } from "contexts/user.context";
import { Input } from "components/Input";
import { IconButton } from "components/IconButton";
import { Button } from "components/Button";

const Chat = () => {
  const { id } = useLocalSearchParams();
  console.log(id, "her");

  const { user, chats, setChats } = useUser();
  const [chat, setChat] = React.useState(chats[Number(id) - 1]);
  const [message, setMessage] = React.useState("");
  // const { status, data, error } = useQuery({
  //   queryKey: [id],
  //   queryFn: getChat,
  // });

  // if (status != "success") {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  return (
    <View flex bg={1}>
      <SafeTop back title={chat.opponentName} />
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior="padding"
        enabled
      >
        <FlatList
          data={chats[Number(id) - 1]?.logs}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View
                row
                p={5}
                style={{ alignItems: "baseline", justifyContent: "flex-start" }}
              >
                <Image
                  source={{
                    uri:
                      item.from != id
                        ? user.profilePicture
                        : chat.opponentImage,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
                <View
                  flex
                  col
                  style={{
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <View row>
                    <Text variant="subtitle" style={{}}>
                      {item.from == id ? chat.opponentName : user.name}
                    </Text>
                    <View flex />
                    <Text
                      variant="body"
                      style={{
                        opacity: 0.7,
                      }}
                    >
                      {new Date(item.time).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text variant="body" style={{ opacity: 0.9 }}>
                    {item.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View row p={10} px={10}>
          <Input
            placeholder="Type a message"
            returnKeyType="send"
            bg={4}
            r={50}
            value={message}
            onChangeText={(text) => setMessage(text)}
            onSubmitEditing={(e) => {
              console.log(e.nativeEvent.text);
              setMessage("");

              setChat({
                ...chat,
                logs: [
                  ...chat.logs,
                  {
                    from: user._id,
                    message: e.nativeEvent.text,
                    time: new Date().toISOString(),
                  },
                ],
              });
              setChats(
                chats.map((chat) => {
                  if (chat._id === id) {
                    // Assuming each chat has a unique `id` or similar identifier
                    return {
                      ...chat,
                      logs: [
                        ...chat.logs,
                        {
                          from: user._id,
                          message: e.nativeEvent.text,
                          time: new Date().toISOString(),
                        },
                      ],
                    };
                  } else {
                    return chat;
                  }
                })
              );
            }}
            p={5}
            rightItem={
              <Link
                href={{
                  pathname: "chats/[id]/create-fight",
                  params: { id: chat._id },
                }}
                asChild
              >
                <Button mx={5}>
                  <Text variant="header">👊</Text>
                </Button>
              </Link>
            }
          />
        </View>
      </KeyboardAvoidingView>
      <SafeBottom />
    </View>
  );
};

export default Chat;
