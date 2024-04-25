import React, { useEffect } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { useLocalSearchParams } from "expo-router";
import { getFights, getOpponents } from "utils/api";
import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "components/JsonViewer";
import { SafeTop } from "components/SafeTop";
import { Image } from "react-native";
import { useUser } from "contexts/user.context";

const Fight = () => {
  const { id } = useLocalSearchParams();
  console.log(id, "her");

  const { user, fights } = useUser();
  useEffect(() => {
    console.log(fights.length, "fights");
  }, [fights]);
  const { status, data, error } = useQuery({
    queryKey: ["fight", id],
    queryFn: getFights,
  });

  // if (status != "success") {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  return (
    <View flex bg={1}>
      <SafeTop back title="fight" />
      <Text>{JSON.stringify(fights)}</Text>
      {/* <Image
        source={{
          uri: user.profilePicture,
        }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      /> */}
      {/* <JsonViewer json={data} /> */}
      {/* <Text>{JSON.stringify(data)}</Text> */}
    </View>
  );
};

export default Fight;
