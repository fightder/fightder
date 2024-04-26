import React from "react";
import { View } from "./View";
import { Text } from "./Text";

const TagList = ({ tags }: { tags: string[] }) => {
  return (
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
      {tags?.map((tag, index) => {
        return (
          <View r={50} m={5} p={8} variant="secondary" key={index}>
            <Text key={index}>{tag}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default TagList;
