import React, { useEffect } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { router, useLocalSearchParams } from "expo-router";
import { getOpponents } from "utils/api";
import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "components/JsonViewer";
import { SafeTop } from "components/SafeTop";
import { Image } from "react-native";
import { useUser } from "contexts/user.context";
import { windowSize } from "constants/size";
import { MotiImage, MotiText } from "moti";

const Match = () => {
  const { id, profileImage, name } = useLocalSearchParams();
  console.log(id);

  const { user, addOpponent } = useUser();
  const { status, data, error } = useQuery({
    queryKey: ["opponents", id],
    queryFn: getOpponents,
  });
  console.log(data, "data");

  useEffect(() => {
    setTimeout(() => {
      router.push("/chats");
    }, 2000);
  }, []);

  if (status != "success") {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View flex bg={1}>
      <SafeTop />
      <MotiText
        style={{
          position: "absolute",
          alignSelf: "center",
          top: windowSize.height / 2,
          zIndex: 1,
          // transform: [{ rotate: "-15deg" }],
          color: "white",
          fontFamily: "Outfit_700Bold",
          fontSize: 48,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
        }}
        from={{
          opacity: 0,
          scale: 0.5,
          transform: [{ rotate: "-2225deg" }],
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transform: [{ rotate: "-10deg" }],
        }}
        // variant="header"
      >
        It's a Fight!!!
      </MotiText>
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
          width: 300,
          height: 300,
          borderRadius: 0,
          position: "absolute",
          top: 100,
          left: 0,
        }}
      />
      <MotiImage
        source={{
          uri: user.profilePicture,
        }}
        from={{
          opacity: 0,
          scale: 0.9,
          right: -200,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          right: 0,
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
          width: 300,
          height: 300,
          borderRadius: 0,
          position: "absolute",
          bottom: 100,
          right: 0,
        }}
      />
    </View>
  );
};

export default Match;
