import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useUser } from "contexts/user.context";
import { Image, Pressable, SectionList } from "react-native";
import { useSession } from "contexts/auth.context";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";
import { View } from "components/View";
import { Button } from "components/Button";
import * as ImagePicker from "expo-image-picker";

const DATA = [
  // {
  //   title: "Main dishes",
  //   data: ["Pizza", "Burger", "Risotto"],
  // },
  // {
  //   title: "Sides",
  //   data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  // },
  // {
  //   title: "Drinks",
  //   data: ["Water", "Coke", "Beer"],
  // },
  {
    // title: "Desserts",
    data: [
      {
        name: "Log out",
        icon: "log-out",
      },
    ],
  },
];

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useSession();
  const [image, setImage] = React.useState(null);
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View flex bg={1}>
      <SafeTop back title="settings" />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <Button
            onPress={() => {
              signOut();
            }}
          >
            <View
              row
              p={15}
              bg={3}
              r={20}
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "center",
                gap: 10,
              }}
            >
              <IconButton
                name={item.icon as any}
                color={"red"}
                onPress={() => {
                  signOut();
                }}
              />
              <Text>{item.name}</Text>
            </View>
            <Button onPress={pickImage}>
              <Text>Pick</Text>
            </Button>
          </Button>
        )}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
    </View>
  );
};
export default Settings;
