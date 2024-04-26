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
import { ActivityIndicator, Modal, StyleSheet } from "react-native";
import { Button } from "components/Button";
import Swiper from "react-native-deck-swiper";
import { SwipeCard } from "components/SwipeCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOpponents } from "utils/api";
import OppModal from "components/oppModal";
import { useRouter } from "expo-router";
import { useUser } from "contexts/user.context";
import { LogoMark } from "components/LogoMark";
import { Opponent } from "constants/type";

const Home = () => {
  const [opps, setOpps] = React.useState([]);
  const [filter, setFilter] = React.useState("all");
  // const [expanded, setExpanded] = React.useState<Opp | null>(null);
  const router = useRouter();
  const { opponents, addOpponent, refetchOpponents } = useUser();

  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View bg={1} style={{ flex: 1 }}>
      {/* {!!expanded && (
        <OppModal opp={expanded} dismiss={() => setExpanded(null)} />
      )} */}
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
          <LogoMark />

          <IconButton name="notifications" />
          {/* <IconButton name="add" href="/add-friend" /> */}
        </View>
      </View>
      <View flex style={{ top: -30, zIndex: 200 }}>
        {opponents?.length ? (
          <Swiper
            disableBottomSwipe
            containerStyle={{
              padding: 0,
              margin: 0,
            }}
            cards={opponents?.length ? opponents?.slice(0, 10) : []}
            renderCard={(card: Opponent, i) => {
              return (
                <SwipeCard
                  data={card}
                  i={i}
                  // expand={() => {
                  //   router.push(`opps/${i}`);
                  // }}
                />
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
              const opp = opponents[cardIndex];
              if (opp.rightYou) {
                addOpponent({
                  _id: opp._id,
                  images: opp.images,
                  username: opp.username,
                });
                router.push(
                  `/match/${opp._id}?profileImage=${opp.images[0]}&name=${opp.username}`
                );
              }
              console.log(cardIndex, "onSwipedRight");
            }}
            overlayOpacityHorizontalThreshold={0.1}
            overlayOpacityVerticalThreshold={0.1}
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
                title: "FIGHT",
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
          <View flex center>
            <ActivityIndicator />
          </View>
        )}
        <View flex center>
          <IconButton name="refresh" size={40} onPress={refetchOpponents} />
          <Text variant="subtitle"> U ran out of matches, hehe</Text>
          <Text>invite more friends so you can discover more people</Text>
        </View>
      </View>
      <SafeBottom />
    </View>
  );
};
export default Home;
