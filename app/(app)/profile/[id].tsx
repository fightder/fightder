import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { View } from "components/View";
import { Text } from "components/Text";
import { SafeTop } from "components/SafeTop";
import { MotiView } from "moti";
import { useDerivedValue } from "react-native-reanimated";
import { IconButton } from "components/IconButton";
import { ScrollView } from "components/ScrollView";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { useUser } from "contexts/user.context";
import { User } from "constants/type";
import { useSession } from "contexts/auth.context";
import { ProfileImage } from "components/ProfileImage";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session, getFyncUserById } = useSession();
  const { user, chats } = useUser();
  // const [user, setUser] = useState<User>({} as User);
  const [show, setShow] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const user = await getFyncUserById(id);
  //     console.log(user, "uuu");
  //     if (user) setUser(user);
  //   })();
  // }, []);

  return (
    <View bg={1} flex>
      <SafeTop back title={user.username} />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, marginLeft: 10, marginRight: 10 }}>
          <ProfileImage source={{ uri: user?.profilePicture }} size={100} />
          <Text>{user?.name}</Text>
          {user?.bio && <Text fontSize="md"> {user.bio}</Text>}
          <Text fontSize="xl">Matches: {chats.length}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
