import { useSession } from "contexts/auth.context";
import { Link, router, useGlobalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { Image, KeyboardAvoidingView } from "react-native";
import { storage } from "utils/storage";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "constants/colors";

export default function Activities() {
  const { signIn, isLoading, session } = useSession();
  const [open, setOpen] = useState(false);

  const [activities, setActivities] = useState(
    storage.getString("activities")
      ? JSON.parse(storage.getString("activities"))
      : []
  );
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (activities.length >= 1) {
      setCanNext(true);
    }
  }, [activities]);
  const onNext = () => {
    // check if date is valid

    storage.set("activities", JSON.stringify(activities));

    router.push("/sign-up/4");
  };

  return (
    <View flex bg={1}>
      <SafeTop back logo />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View flex gap={30} my={50} style={{ paddingHorizontal: 20 }}>
          <View m={0} gap={10}>
            <Text variant="header">Activities</Text>
          </View>
          <DropDownPicker
            items={[
              { label: "Basketball", value: "basketball" },
              { label: "Soccer", value: "soccer" },
              { label: "Running", value: "running" },
              { label: "Swimming", value: "swimming" },
              { label: "Cycling", value: "cycling" },
              { label: "Gym", value: "gym" },
              { label: "Yoga", value: "yoga" },
              { label: "Dance", value: "dance" },
              { label: "Martial Arts", value: "martial-arts" },
              { label: "Other", value: "other" },
            ]}
            value={activities}
            open={open}
            setOpen={setOpen}
            multiple
            searchable
            mode="BADGE"
            min={3}
            max={10}
            placeholder="Select activities"
            containerStyle={{ height: 40 }}
            setValue={setActivities}
            theme="DARK"
            style={{ borderRadius: 25 }}
            listMode="MODAL"
            badgeDotColors={["#345", "#af0", "#93b", "#2fa", "#a9a"]}
            modalAnimationType="slide"
            searchTextInputStyle={{
              borderRadius: 25,
              paddingVertical: 10,
            }}
            modalContentContainerStyle={{
              // borderRadius: 25,
              backgroundColor: COLORS.background[800],
            }}
          />
        </View>
        <Button style={{ margin: 20 }} onPress={onNext} disabled={!canNext}>
          <View center variant={canNext ? "primary" : "muted"} p={10} r={100}>
            <Text variant="title">Next</Text>
          </View>
        </Button>
      </KeyboardAvoidingView>
      <SafeBottom />
    </View>
  );
}
