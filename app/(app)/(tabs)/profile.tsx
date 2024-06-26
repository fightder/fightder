import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useUser } from "contexts/user.context";
import { Button, FlatList, Image, Pressable } from "react-native";
import { dataAPI, useSession } from "contexts/auth.context";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { IconButton } from "components/IconButton";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { View } from "components/View";

import { useSharedValue, useDerivedValue } from "react-native-reanimated";
import { MotiView, ScrollView } from "moti";
import { JsonViewer } from "components/JsonViewer";
import { ProfileImage } from "components/ProfileImage";
import TagList from "components/TagList";
const App = () => {
  const { user, chats } = useUser();
  // const { signOut } = useSession();
  const [show, setShow] = React.useState(true);
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  const isValid = useSharedValue(false);
  console.log(user, "user");

  return (
    <View bg={1} flex>
      <SafeTop />
      <MotiView
        animate={useDerivedValue(() => ({
          opacity: isValid.value ? 1 : 0,
        }))}
        transition={useDerivedValue(() => ({
          delay: isValid.value ? 0 : 100,
        }))}
      />
      <View
        row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "transparent",
        }}
      >
        <Image
          source={require("assets/adaptive-icon.png")}
          style={{ width: 60, height: 60 }}
        />
        {/* <IconButton name="menu" /> */}
        <Text variant="header" style={{ textAlign: "center" }}>
          {user?.username}
        </Text>

        <View row gap={30}>
          <IconButton href="/settings" name="settings-sharp" />
          {/* <IconButton name="pencil" href="/edit-profile" /> */}
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, marginLeft: 10, marginRight: 10 }}>
          <FlatList
            data={user.images}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: 200,
                    height: 340,
                    margin: 5,
                  }}
                />
              );
            }}
          />
          {/* <ProfileImage
            source={{ uri: user?.images[0].uri }}
            size={100}
            radius={35}
          /> */}
          <TagList tags={user?.activities} />
          {/* <Text>{user?.name}</Text> */}
          {/* {user?.bio && <Text fontSize="md"> {user?.bio}</Text>} */}
          {/* <Text fontSize="xl">Matches: {chats.length}</Text> */}
          {/* <Canvas style={{ width, height }}>
          <Group blendMode="exclusion">
            <Circle cx={r} cy={r} r={r} color="cyan" />
            <Circle cx={width - r} cy={r} r={r} color="magenta" />
          </Group>
        </Canvas> */}
        </View>
        <Button
          title="get"
          onPress={() => {
            dataAPI
              .find({
                dataSource: "users",
                database: "dev",
              })
              .then((res) => {
                console.log(res, "shit");
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        />
      </ScrollView>
    </View>
  );
};
export default App;
