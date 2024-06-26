import React, { useState } from "react";
import { View } from "./View";
import { Text } from "./Text";
import {
  FlatList,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Opponent, User } from "constants/type";
import TagList from "./TagList";
import { Image } from "expo-image";

export const SwipeCard = ({ data: opp, i }: { data: Opponent; i: number }) => {
  const [index, setIndex] = useState(0);
  const PAGE_WIDTH = useWindowDimensions().width;
  console.log(opp, "here?", opp.activities);

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
          setIndex((prev) => {
            // return 2;
            if (prev + 1 < opp.images.length) return prev + 1;
            return opp.images.length - 1;
          });
        }}
      />
      <View
        m={10}
        row
        z={200}
        style={{
          position: "absolute",
          alignContent: "center",
          alignItems: "center",
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        {opp.images?.map((photo, i) => (
          <View
            key={i}
            r={50}
            style={{
              zIndex: 20,
              width: PAGE_WIDTH / opp.images.length - 25,
              marginHorizontal: 5,

              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 3.84,
              elevation: 5,
              height: 3,
              backgroundColor: i === index ? "white" : "grey",
            }}
          />
        ))}
      </View>
      <View
        flex
        col
        r={20}
        bg={3}
        style={{ maxHeight: "80%", overflow: "hidden" }}
      >
        <LinearGradient
          colors={[
            "#00000000",
            "#00000000",
            "#00000000",
            "#00000000",
            "#00000000",
            "#00000000",
            "#000",
          ]}
          style={{
            flex: 1,
            width: "100%",
            position: "absolute",
            height: "100%",
            opacity: 0.8,
            borderRadius: 20,
            zIndex: 10,
          }}
        ></LinearGradient>

        {opp.images[index] && (
          <Image
            // sharedTransitionTag="image"
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                alignSelf: "center",
              },
              ,
              { width: PAGE_WIDTH },
            ]}
            key={index}
            source={{ uri: opp.images[index].uri }}
            placeholder={{ uri: opp.images[index].blurhash }}
          />
        )}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 20,
            // width: "100%",
            // justifyContent: "center",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          // onPress={expand}
        >
          <Link
            href={{
              pathname: "/opps/[index]",
              params: { index: i, imageIndex: index },
            }}
          >
            <View p={10} flex>
              <Text variant="title" color="white">
                {opp.username},{" "}
                {Math.floor(
                  (Number(new Date()) - Number(new Date(2000, 1, 1))) /
                    31557600000
                )}
              </Text>
              {index == 0 ? (
                <View
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    // justifyContent: "flex-start",
                    // alignItems: "flex-start",
                  }}
                >
                  {opp.activities.map((tag, index) => {
                    return (
                      <View r={50} m={5} p={8} variant="secondary" key={index}>
                        <Text key={index}>{tag}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : // <Text color="white" variant="body">
              //   {Math.floor(
              //     (Number(new Date()) - Number(new Date(2000, 1, 1))) /
              //       31557600000
              //   )}
              // </Text>
              index == 1 ? (
                <Text color="white" variant="body">
                  {/* {opp.fantasy_role} */}
                  {opp.birthdate}
                </Text>
              ) : (
                <Text variant="body" color="white">
                  {opp.birthdate}
                </Text>
              )}
            </View>
          </Link>
        </View>
      </View>
    </>
  );
};
