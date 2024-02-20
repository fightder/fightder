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
import { windowSize } from "constants/size";
import { MotiImage } from "moti";

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
      <Text
        style={{
          position: "absolute",
          alignSelf: "center",
          top: windowSize.height / 2,
          zIndex: 1,
          transform: [{ rotate: "-15deg" }],
        }}
        variant="header"
      >
        It's a Fight!!!
      </Text>
      {/* <View
        // row
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      > */}
      <MotiImage
        source={{
          uri: profileImage,
        }}
        from={{
          opacity: 0,
          scale: 0.9,
          left: -200,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          left: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        exitTransition={{
          type: "timing",
          duration: 2500,
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 0,
          position: "absolute",
          left: 0,
        }}
      />
      <Image
        source={{
          uri: user.profilePicture,
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 0,
          position: "absolute",
          right: 0,
        }}
      />

      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Match;
