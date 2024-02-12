import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOpponents } from "utils/api";
import { BlurView } from "expo-blur";
import { SafeTop } from "components/SafeTop";
import { View } from "components/View";
import { Text } from "components/Text";
import { AnimatePresence } from "moti";
import Animated from "react-native-reanimated";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { windowSize } from "constants/size";

const Opp = () => {
  const params = useLocalSearchParams();
  const [imageIndex, setIndex] = React.useState(Number(params.imageIndex));
  const [filter, setFilter] = React.useState("all");
  const [currentOpp, setCurrentOpp] = React.useState(null);
  const PAGE_WIDTH = windowSize.width;
  const index = Number(params.index);

  console.log("imageIndex", params);

  const { status, data, error } = useQuery({
    queryKey: ["opponents", filter],
    queryFn: getOpponents,
  });

  useEffect(() => {
    // set current opp
    if (status == "success") setCurrentOpp(data[index]);
  }, [data, status]);

  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <BlurView intensity={40} style={{ flex: 1 }}>
      <ScrollView>
        <SafeTop back title={data[index].name} />
        <View>
          <Pressable
            style={{
              position: "absolute",
              width: "50%",
              height: "65%",
              zIndex: 1000,
            }}
            onPress={() => {
              console.log("BAC");
              setIndex((prev) => {
                console.log(prev);
                if (prev > 0) return prev - 1;
                return 0;
              });
            }}
          />
          <Pressable
            style={{
              position: "absolute",
              width: "50%",
              height: "65%",
              marginLeft: "50%",
              // backgroundColor: "red",
              zIndex: 1000,
            }}
            onPress={() => {
              console.log("pressable");
              setIndex((prev) => {
                // return 2;
                if (prev + 1 < photos.length) return prev + 1;
                return photos.length - 1;
              });
            }}
          />
          {photos[imageIndex] && (
            <Image
              // sharedTransitionTag="image"
              style={[{ width: PAGE_WIDTH, height: 500 }]}
              key={imageIndex}
              source={{ uri: photos[imageIndex] }}
            />
          )}
        </View>
        {status == "success" ? (
          <Text>{JSON.stringify(data[index])}</Text>
        ) : (
          <Text>Loading...</Text>
        )}
        <Text>current</Text>
      </ScrollView>
    </BlurView>
  );
};

export default Opp;

const photos = [
  `https://images.unsplash.com/photo-1551871812-10ecc21ffa2f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=929&q=80`,
  `https://images.unsplash.com/photo-1530447920184-b88c8872?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHJvY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
  `https://images.unsplash.com/photo-1581069700310-8cf2e1b6baf0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHJvY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
  `https://images.unsplash.com/photo-1562802378-063ec186a863?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
];
