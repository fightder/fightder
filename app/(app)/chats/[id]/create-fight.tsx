import { KeyboardAvoidingView } from "react-native";
import React from "react";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { View } from "components/View";
import { Text } from "components/Text";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { useUser } from "contexts/user.context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const CreateFight = () => {
  const { createFight, setChats, chats } = useUser();
  const { id } = useLocalSearchParams();
  const [datetime, setDatetime] = React.useState(new Date());
  const [location, setLocation] = React.useState("");
  const [sport, setSport] = React.useState("");
  const [opponent, setOpponent] = React.useState("");
  const [visibility, setVisibility] = React.useState("public");
  const [notes, setNotes] = React.useState("");
  const [items, setItems] = React.useState([
    { label: "Boxing", value: "boxing" },
    { label: "MMA", value: "mma" },
    { label: "Kickboxing", value: "kickboxing" },
    { label: "Other", value: "other" },
  ]);
  const [open, setOpen] = React.useState(false);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View bg={1} flex>
        <SafeTop back title="Create Fight" />
        <View p={10} gap={10}>
          <Text variant="title">Date and time</Text>
          <DateTimePicker
            value={datetime}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || datetime;
              setDatetime(currentDate);
            }}
          />
          <Text variant="title">Location</Text>
          <Input
            placeholder="CU Sports complex"
            value={location}
            onChangeText={setLocation}
            m={10}
          />
          <Text variant="title">Sport</Text>
          <DropDownPicker
            open={open}
            value={sport}
            items={items}
            setOpen={setOpen}
            setValue={setSport}
            setItems={setItems}
          ></DropDownPicker>

          <Text variant="title">Notes</Text>
          <Input placeholder="Notes" value={notes} onChangeText={setNotes} />
        </View>
        <View flex />
        <Button
          onPress={() => {
            console.log("Create Fight");
            if (!datetime || !location || !sport || !visibility) {
              alert("Please fill all the fields");
              return;
            }
            createFight({
              datetime: datetime.toISOString(),
              location,
              sport,
              opponentId: id as string,
              visibility,
              notes,
              createdAt: new Date().toISOString(),
            });

            router.push("/chats/" + id);
          }}
        >
          <LinearGradient
            colors={["#rgb(214,24,93)", "rgb(222,132,94)", "#39e"]}
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 10,
              margin: 10,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* <View variant="primary" r={20} m={10} p={10}> */}
            <Text variant="title">Create Fight</Text>
            {/* </View> */}
          </LinearGradient>
        </Button>
        <SafeBottom />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateFight;
