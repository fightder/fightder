import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { Text } from "components/Text";
import { View } from "components/View";
import { IconButton } from "components/IconButton";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Button } from "components/Button";
import Swiper from "react-native-deck-swiper";
import { SwipeCard } from "components/SwipeCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOpponents } from "utils/api";

const Home = () => {
  const [opps, setOpps] = React.useState([]);
  const [filter, setFilter] = React.useState("all");
  // function fetchTodoList({ queryKey }) {
  //   const [_key, { status, page }] = queryKey
  //   return new Promise()
  // }
  const { status, data, error } = useQuery({
    queryKey: ["opponents", filter],
    queryFn: getOpponents,
  });

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View bg={1} style={{ flex: 1 }}>
      <SafeTop />
      <View
        row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "transparent",
        }}
      >
        {/* <IconButton name="menu" /> */}
        <View flex row gap={30}>
          <Text variant="header" style={{ textAlign: "center" }}>
            🔥
          </Text>
          <Text variant="header" style={{ textAlign: "center" }}>
            Fightder
          </Text>

          <IconButton name="notifications" />
          {/* <IconButton name="add" href="/add-friend" /> */}
        </View>
      </View>
      <View flex style={{ top: -20, zIndex: 200 }}>
        {status == "success" ? (
          <Swiper
            disableBottomSwipe
            containerStyle={{}}
            cards={status == "success" ? data : []}
            renderCard={(card) => {
              return <SwipeCard data={card} />;
              return (
                <View flex bg={3} r={20}>
                  <Text variant="header">{card}</Text>
                </View>
              );
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log("onSwipedAll");
            }}
            onSwipedLeft={(cardIndex) => {
              console.log(cardIndex, "onSwipedLeft");
            }}
            onSwipedRight={(cardIndex) => {
              console.log(cardIndex, "onSwipedRight");
            }}
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: "LIKE",
                style: {
                  label: {
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
              top: {
                title: "🔥",
                style: {
                  label: {
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              },
            }}
            cardIndex={0}
            stackSize={3}
            backgroundColor="transparent"
          ></Swiper>
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <SafeBottom />
    </View>
  );
};
export default Home;
