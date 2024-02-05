import React from "react";
import { View } from "./View";
import { Text } from "./Text";

export const FightCard = (props: {
  fight: {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    image: string;
  };
}) => {
  return (
    <View bg={2} r={20} p={20} m={10}>
      <Text variant="title">FightCard</Text>
    </View>
  );
};
