import React from "react";
import { View } from "./View";
import { Text } from "./Text";
import { Image, Pressable } from "react-native";
import { IconButton } from "./IconButton";
import { Link } from "expo-router";
import { Fight } from "utils/type";

export const FightCard = ({ fight }: { fight: Fight }) => {
  return (
    <Link href={{ pathname: "fights/[id]", params: { id: "123" } }} asChild>
      <Pressable>
        <View flex bg={2} r={20} p={10} my={10}>
          <Text variant="subtitle">{fight.sport}</Text>
          <View row p={10}>
            <Image
              source={{ uri: fight.inviterImage }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
            <Text variant="header">VS</Text>
            <Image
              source={{ uri: fight.opponentImage }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          </View>
          <View row>
            <Text>{fight.date}</Text>
            <Text>{fight.location}</Text>
          </View>
          <View
            row
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <IconButton name="eye" />
            {fight?.spectators
              ?.slice(0, 8)
              .map((spectator) => (
                <Image
                  source={{ uri: spectator }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
              ))}
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
