import React from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { useLocalSearchParams } from "expo-router";
import { getOpponents } from "utils/api";
import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "components/JsonViewer";
import { SafeTop } from "components/SafeTop";
import { Image } from "react-native";
import { useUser } from "contexts/user.context";

const Match = () => {
  const { id, profileImage } = useLocalSearchParams();
  console.log(id);

  const { user } = useUser();
  const { status, data, error } = useQuery({
    queryKey: ["opponents", id],
    queryFn: getOpponents,
  });
  console.log(data, "data");

  if (status != "success") {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View flex bg={1}>
      <SafeTop back />
      <Text variant="header">You Got A Match</Text>
      <Image
        source={{
          uri: profileImage,
        }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Image
        source={{
          uri: user.profilePicture,
        }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      {/* <JsonViewer json={data} /> */}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Match;
