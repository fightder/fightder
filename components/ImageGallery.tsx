import React, { useState } from "react";
import { AnimatePresence, MotiImage } from "moti";
import { Pressable, StyleSheet } from "react-native";
import { windowSize } from "constants/size";
import { View } from "./View";

const ImageGallery = (props: { images: string[] }) => {
  const { images } = props;
  console.log(images);
  const [index, setIndex] = useState(0);
  const PAGE_WIDTH = windowSize.width;

  return (
    <View flex>
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
            if (prev + 1 < images.length) return prev + 1;
            return images.length - 1;
          });
        }}
      />
      <AnimatePresence initial={false}>
        <MotiImage
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              alignSelf: "center",
              // height: "100%",
            },
            { width: PAGE_WIDTH },
          ]}
          key={index}
          source={{ uri: images[index] }}
          transition={{
            opacity: { duration: 200, type: "timing" },
          }}
        />
      </AnimatePresence>
    </View>
  );
};

export default ImageGallery;
