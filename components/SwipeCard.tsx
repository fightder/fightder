import React from "react";
import { User } from "constants/type";
import { View } from "./View";
import { Text } from "./Text";
import { Image } from "react-native";

// {
//   "team_id": 8597976,
//   "rating": 1383.46,
//   "wins": 254,
//   "losses": 176,
//   "last_match_time": 1706958485,
//   "name": "Talon",
//   "tag": "TLN",
//   "logo_url": "https://steamusercontent-a.akamaihd.net/ugc/2028347991408203552/8DC9872DA88071D728A914CE17279959423FA340/"
//   },

type Opp = {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
};
export const SwipeCard = ({ data: opp }: { data: Opp }) => {
  console.log(opp);
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
      <Image
        source={{ uri: opp.logo_url }}
        style={{ width: "100%", height: "80%" }}
      />
      <View flex>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.name}
        </Text>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.tag}
        </Text>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.rating}
        </Text>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.wins}
        </Text>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.losses}
        </Text>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.last_match_time}
        </Text>
        <Text variant="header" style={{ textAlign: "center" }}>
          {opp.team_id}
        </Text>
      </View>
    </View>
  );
};
