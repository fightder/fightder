import {
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { ComponentProps } from "react";
import { BlurView } from "expo-blur";
import { SafeTop } from "components/SafeTop";
import { useLocalSearchParams } from "expo-router";
import { Opp } from "./SwipeCard";
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

const OppModal = ({
  opp,
  dismiss,
  ...props
}: {
  opp: Opp;
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
      <BlurView
        intensity={100}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ScrollView>
          <SafeTop />
          <View
            flex
            bg={3}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!!progressValue && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // width: 100,
                  // alignSelf: "center",
                  marginTop: 20,
                }}
              >
                {pages.map((_, index) => {
                  return (
                    <PaginationItem
                      animValue={progressValue}
                      index={index}
                      key={index}
                      length={pages.length}
                    />
                  );
                })}
              </View>
            )}
            <Carousel
              width={PAGE_WIDTH}
              style={{ flex: 1 }}
              data={pages}
              onScrollBegin={() => {
                pressAnim.value = withTiming(1);
              }}
              onScrollEnd={() => {
                pressAnim.value = withTiming(0);
              }}
              ref={carouselRef}
              renderItem={({ index, item }) => {
                // return <Text>sddf</Text>;
                return (
                  <>
                    <Pressable
                      style={{
                        position: "absolute",
                        width: "50%",
                        height: "100%",
                        // backgroundColor: "red",
                        zIndex: 1000,
                      }}
                      onPress={() => {
                        console.log("pressable");
                        carouselRef?.current.prev();
                      }}
                    />
                    <Pressable
                      style={{
                        position: "absolute",
                        width: "50%",
                        height: "100%",
                        marginLeft: "50%",
                        // backgroundColor: "red",
                        zIndex: 1000,
                      }}
                      onPress={() => {
                        console.log("pressable");
                        carouselRef?.current.next();
                      }}
                    />
                    <CustomItem
                      source={{ uri: item }}
                      key={index}
                      pressAnim={pressAnim}
                    />
                  </>
                );
              }}
            />
            <IconButton name="close" onPress={dismiss} />
          </View>
        </ScrollView>
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
