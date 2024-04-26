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

    router.push("/sign-up/images");
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
              { label: "Tennis", value: "tennis" },
              { label: "Badminton", value: "badminton" },
              { label: "Golf", value: "golf" },
              { label: "Volleyball", value: "volleyball" },
              { label: "Baseball", value: "baseball" },
              { label: "Softball", value: "softball" },
              { label: "American Football", value: "american-football" },
              { label: "Rugby", value: "rugby" },
              { label: "Cricket", value: "cricket" },
              { label: "Skating", value: "skating" },
              { label: "Skiing", value: "skiing" },
              { label: "Snowboarding", value: "snowboarding" },
              { label: "Surfing", value: "surfing" },
              { label: "Rowing", value: "rowing" },
              { label: "Kayaking", value: "kayaking" },
              { label: "Canoeing", value: "canoeing" },
              { label: "Hiking", value: "hiking" },
              { label: "Climbing", value: "climbing" },
              { label: "Boxing", value: "boxing" },
              { label: "Wrestling", value: "wrestling" },
              { label: "Fencing", value: "fencing" },
              { label: "Archery", value: "archery" },
              { label: "Equestrian", value: "equestrian" },
              { label: "Ice Hockey", value: "ice-hockey" },
              { label: "Field Hockey", value: "field-hockey" },
              { label: "Lacrosse", value: "lacrosse" },
              { label: "Squash", value: "squash" },
              { label: "Racquetball", value: "racquetball" },
              { label: "Table Tennis", value: "table-tennis" },
              { label: "Handball", value: "handball" },
              { label: "Water Polo", value: "water-polo" },
              { label: "Futsal", value: "futsal" },
              { label: "Fishing", value: "fishing" },
              { label: "Hunting", value: "hunting" },
              { label: "Billiards", value: "billiards" },
              { label: "Bowling", value: "bowling" },
              { label: "Darts", value: "darts" },
              { label: "Frisbee", value: "frisbee" },
              { label: "Skateboarding", value: "skateboarding" },
              { label: "Roller Skating", value: "roller-skating" },
              { label: "BMX", value: "bmx" },
              { label: "Weightlifting", value: "weightlifting" },
              { label: "Powerlifting", value: "powerlifting" },
              { label: "CrossFit", value: "crossfit" },
              { label: "Triathlon", value: "triathlon" },
              { label: "Athletics", value: "athletics" },
              { label: "Gymnastics", value: "gymnastics" },
              { label: "Cheerleading", value: "cheerleading" },
              { label: "Curling", value: "curling" },
              { label: "Bocce", value: "bocce" },
              { label: "Paintball", value: "paintball" },
              { label: "Laser Tag", value: "laser-tag" },
              { label: "Airsoft", value: "airsoft" },
              { label: "Disc Golf", value: "disc-golf" },
              { label: "Dodgeball", value: "dodgeball" },
              { label: "Kickball", value: "kickball" },
              { label: "Ultimate Frisbee", value: "ultimate-frisbee" },
              { label: "Quidditch", value: "quidditch" },
              { label: "Parkour", value: "parkour" },
              { label: "Bouldering", value: "bouldering" },
              { label: "Scuba Diving", value: "scuba-diving" },
              { label: "Snorkeling", value: "snorkeling" },
              { label: "Windsurfing", value: "windsurfing" },
              { label: "Kiteboarding", value: "kiteboarding" },
              { label: "Wakeboarding", value: "wakeboarding" },
              { label: "Water Skiing", value: "water-skiing" },
              { label: "Jet Skiing", value: "jet-skiing" },
              { label: "Paddle Boarding", value: "paddle-boarding" },
              { label: "Rafting", value: "rafting" },
              { label: "Kayak Polo", value: "kayak-polo" },
              { label: "Zorbing", value: "zorbing" },
              { label: "Sledding", value: "sledding" },
              { label: "Snowshoeing", value: "snowshoeing" },
              { label: "Biathlon", value: "biathlon" },
              { label: "Luge", value: "luge" },
              { label: "Bobsleigh", value: "bobsleigh" },
              { label: "Curling", value: "curling" },
              { label: "Figure Skating", value: "figure-skating" },
              { label: "Speed Skating", value: "speed-skating" },
              { label: "Dog Sledding", value: "dog-sledding" },
              { label: "Jousting", value: "jousting" },
              { label: "Polo", value: "polo" },
              { label: "Bull Riding", value: "bull-riding" },
              { label: "Rodeo", value: "rodeo" },
              { label: "Motocross", value: "motocross" },
              { label: "Supercross", value: "supercross" },
              { label: "Dirt Biking", value: "dirt-biking" },
              { label: "Drag Racing", value: "drag-racing" },
              { label: "Rally Racing", value: "rally-racing" },
              { label: "Formula One", value: "formula-one" },
              { label: "NASCAR", value: "nascar" },
              { label: "Esports", value: "esports" },
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
