import React, { useState } from "react";
import { User } from "constants/type";
import { View } from "./View";
import { Text } from "./Text";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "./IconButton";
import OppModal from "./oppModal";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { AnimatePresence, MotiImage } from "moti";

export type Opp = {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
};

export const SwipeCard = ({
  data: opp,
  expand,
}: {
  data: Opp;
  expand: () => void;
}) => {
  const [index, setIndex] = useState(0);
  const PAGE_WIDTH = useWindowDimensions().width;
  console.log(opp);

  if (!opp) {
    return <View />;
  }
  return (
    <>
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
          setIndex((prev) => prev < photos.length && prev + 1);
        }}
      />
      <View
        flex
        col
        r={30}
        bg={3}
        style={{ maxHeight: "80%", overflow: "hidden" }}
      >
        <LinearGradient
          colors={["#00000000", "#000555"]}
          style={{ flex: 1, width: "100%", height: "100%", borderRadius: 30 }}
        >
          <AnimatePresence initial={false}>
            <MotiImage
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  alignSelf: "center",
                },
                ,
                { width: PAGE_WIDTH },
              ]}
              key={index}
              source={{ uri: photos[index] }}
              transition={{
                translateX: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 200, type: "timing" },
              }}
            />
          </AnimatePresence>
          {/* <View style={styles.actions}>
          <Text selectable={false} style={styles.button} onPress={paginate(-1)}>
            👈
          </Text>
          <Text selectable={false} style={styles.button} onPress={paginate(1)}>
            👉
          </Text>
        </View> */}
          <View
            style={{ position: "absolute", bottom: 0, zIndex: 20 }}
            flex
            p={5}
            row
            m={10}
          >
            <View p={10}>
              <Text variant="title">{opp.name}</Text>
              <Text variant="body" style={{ textAlign: "center" }}>
                {opp.tag}
                {opp.rating}
                {opp.wins}
                {opp.losses}
                {opp.last_match_time}
                {opp.team_id}
              </Text>
            </View>
            <IconButton size={30} name="eye" onPress={expand} />
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

interface ItemProps {
  pressAnim: Animated.SharedValue<number>;
  source: ImageSourcePropType;
}

const CustomItem: React.FC<ItemProps> = ({ pressAnim, source }) => {
  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
    const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);

    return {
      transform: [{ scale }],
      borderRadius,
    };
  }, []);

  return (
    <Animated.View style={[{ flex: 1, overflow: "hidden" }, animStyle]}>
      <Animated.Image
        source={source}
        resizeMode="cover"
        style={{ width: "100%", height: "80%" }}
      />
    </Animated.View>
  );
};

const photos = [
  `https://images.unsplash.com/photo-1551871812-10ecc21ffa2f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=929&q=80`,
  `https://images.unsplash.com/photo-1530447920184-b88c8872?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHJvY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
  `https://images.unsplash.com/photo-1581069700310-8cf2e1b6baf0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHJvY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
  `https://images.unsplash.com/photo-1562802378-063ec186a863?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
];
