import React, { useState } from "react";
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
import { Link } from "expo-router";
import { User } from "constants/type";
import TagList from "./TagList";

export type Opp = {
  // [x: string]: any;
  _id: string;
  canMatch: boolean;
  tags: string[];
  bio: string;
  images: string[];
  account_id: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  personaname: string;
  last_login: string;
  full_history_time: string;
  cheese: string;
  fh_unavailable: boolean;
  loccountrycode: string;
  name: string;
  country_code: string;
  fantasy_role: boolean;
  team_id: number;
  team_name: string;
  team_tag: string;
  is_locked: boolean;
  is_pro: boolean;
};

export const SwipeCard = ({ data: opp, i }: { data: User; i: number }) => {
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
            source={{ uri: opp.images[index] }}
          />
        )}

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 20,
            // width: "100%",
            justifyContent: "center",
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
                <TagList tags={opp.activities} />
              ) : // <Text color="white" variant="body">
              //   {Math.floor(
              //     (Number(new Date()) - Number(new Date(2000, 1, 1))) /
              //       31557600000
              //   )}
              // </Text>
              index == 1 ? (
                <Text color="white" variant="body">
                  {/* {opp.fantasy_role} */}
                  {opp.country_code}
                  {opp.team_name}
                </Text>
              ) : (
                <Text variant="body" color="white">
                  {opp.team_tag}
                  {opp.team_name}
                  {opp.team_id}
                </Text>
              )}
            </View>
          </Link>
        </View>
      </View>
    </>
  );
};
