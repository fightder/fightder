import {
  ImageSourcePropType,
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { ComponentProps } from "react";
import { BlurView } from "expo-blur";
import { SafeTop } from "components/SafeTop";
import { useLocalSearchParams } from "expo-router";
import { View } from "./View";
import { Text } from "./Text";
import { IconButton } from "./IconButton";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { windowSize } from "constants/size";
import ImageGallery from "./ImageGallery";
import { ScrollView } from "react-native-gesture-handler";
import { Opponent } from "constants/type";

const OppModal = ({
  opp,
  dismiss,
  ...props
}: {
  opp: Opponent;
  dismiss: () => void;
} & ComponentProps<typeof Modal>) => {
  const pressAnim = useSharedValue<number>(0);
  const PAGE_WIDTH = useWindowDimensions().width;
  const progressValue = useSharedValue<number>(0);
  const pages = [opp.logo_url, opp.logo_url, opp.logo_url];

  const carouselRef = React.useRef<ICarouselInstance>();
  console.log(opp, "opp\n\n");
  return (
    <Modal animationType="fade" transparent={true} {...props}>
      <BlurView intensity={100} style={{ flex: 1 }}>
        <SafeTop />
        <ImageGallery images={pages} />
        <IconButton name="close" onPress={dismiss} />
      </BlurView>
    </Modal>
  );
};

export default OppModal;

interface ItemProps {
  pressAnim: Animated.SharedValue<number>;
  source: ImageSourcePropType;
}

const CustomItem: React.FC<ItemProps> = ({ pressAnim, source }) => {
  // const animStyle = useAnimatedStyle(() => {
  //   const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
  //   const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);

  //   return {
  //     transform: [{ scale }],
  //     borderRadius,
  //   };
  // }, []);

  return (
    <Animated.View style={[{ flex: 1, overflow: "hidden" }]}>
      <Animated.Image
        source={source}
        resizeMode="cover"
        style={{ width: "100%", height: "80%" }}
      />
    </Animated.View>
  );
};

const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = (props) => {
  const { animValue, index, length, isRotate } = props;
  const width = windowSize.width / length - 10;

  const animStyle = useAnimatedStyle(() => {
    console.log(animValue?.value, "animValue?.value");
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={{
        backgroundColor: "white",
        width,
        height: 5,
        marginHorizontal: 5,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: "red",
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};
