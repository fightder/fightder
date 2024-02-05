import React from "react";
import { User } from "constants/type";
import { View } from "./View";
import { Text } from "./Text";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  useWindowDimensions,
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
  const PAGE_WIDTH = useWindowDimensions().width;
  console.log(opp);
  const pressAnim = useSharedValue<number>(0);
  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);
  if (!opp) {
    return <View />;
  }
  return (
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
        <Carousel
          width={PAGE_WIDTH}
          data={[opp.logo_url, opp.logo_url, opp.logo_url]}
          autoPlay={true}
          onScrollBegin={() => {
            pressAnim.value = withTiming(1);
          }}
          onScrollEnd={() => {
            pressAnim.value = withTiming(0);
          }}
          renderItem={({ index, item }) => {
            return (
              <CustomItem
                source={{ uri: item }}
                key={index}
                pressAnim={pressAnim}
              />
            );
          }}
          customAnimation={animationStyle}
          scrollAnimationDuration={1200}
        />

        <View style={{ position: "absolute", bottom: 0 }} flex p={5} row m={10}>
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
