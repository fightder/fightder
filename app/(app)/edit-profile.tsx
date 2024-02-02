import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useUser } from "contexts/user.context";
import { Button, Image, Pressable, View } from "react-native";
import { useSession } from "contexts/auth.context";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "components/IconButton";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const Edit = () => {
  const { user } = useUser();
  const { signOut } = useSession();
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SafeTop />

        <View
          style={{
            padding: 10,
            marginLeft: "auto",
            marginRight: 10,
            gap: 10,
            flexDirection: "row",
          }}
        >
          <IconButton
            name="checkmark"
            onPress={() => {
              console.log("hi");
            }}
          />
        </View>

        <View style={{ padding: 10, marginLeft: 10, marginRight: 10 }}>
          <Skeleton show={true}>
            <Image
              source={{ uri: user?.profilePicture }}
              style={{ width: 100, height: 100, borderRadius: 35 }}
            />
          </Skeleton>
          <Text>{user?.name}</Text>
          {user.bio && <Text fontSize="md"> {user.bio}</Text>}
          <Text fontSize="xl"> Friends: {user?.friends.length}</Text>
          <Text fontSize="xl"> Friendships: {"notyet"}</Text>
          <Text fontSize="xl"> interests: {"notyet"}</Text>
          {/* <Canvas style={{ width, height }}>
          <Group blendMode="exclusion">
            <Circle cx={r} cy={r} r={r} color="cyan" />
            <Circle cx={width - r} cy={r} r={r} color="magenta" />
          </Group>
        </Canvas> */}
        </View>
      </View>
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
export default Edit;
