import { User } from "constants/type";
import { View } from "./View";
import { Image } from "react-native";
import { Text } from "./Text";
import { JsonViewer } from "./JsonViewer";
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";

// user here should be diff...
// needs field like, mutual friends, mutual apps, mutual activity, already friends, etc
export function UserCard({ user }: { user: User }) {
  return (
    <Button href={`/profile/${user._id}`}>
      <View row m={5} p={5} r={5} bg={2}>
        <View>
          <ProfileImage
            source={{ uri: user.profilePicture }}
            size={50}
            radius={5}
          />
          <Text>{user.name}</Text>
        </View>
        <View>
          <Text>Mutual Friends</Text>
          <Text>Mutual apps?</Text>
          <Text>Mutual activity?</Text>
        </View>

        <IconButton
          name="person-add"
          onPress={() => {
            // add friend
          }}
        />
        {/* <JsonViewer json={JSON.stringify(user)} /> */}
      </View>
    </Button>
  );
}
