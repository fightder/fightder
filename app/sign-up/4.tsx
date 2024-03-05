import { useSession } from "contexts/auth.context";
import { Link, router, useGlobalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { Image, KeyboardAvoidingView } from "react-native";
import SignInForm from "components/SignInForm";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { supabase } from "utils/supabase";
import { Input } from "components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MotiView } from "moti";
import { IconButton } from "components/IconButton";
import { storage } from "utils/storage";
import DropDownPicker from "react-native-dropdown-picker";

export default function Images() {
  const { signIn, isLoading, session } = useSession();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(
    JSON.parse(storage.getString("images") || "[]") || []
    // []
  );
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    console.log(storage.getString("images"), "tmgs");
    if (images.length >= 3) {
      setCanNext(true);
    }
  }, [images]);

  const onNext = () => {
    // check if date is valid

    storage.set("images", JSON.stringify(images));

    router.push("/sign-up/5");
  };

  return (
    <View flex bg={1}>
      <SafeTop back logo />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View flex style={{ paddingHorizontal: 20 }}>
          <View m={30} gap={5}>
            <Text variant="header">Images</Text>
          </View>
          {[1, 2, 3].map((i) => (
            <View key={i} m={0} gap={10}>
              <Text variant="header">Image {i}</Text>
              <Input
                placeholder="https://example.com/image.jpg"
                value={images[i - 1]}
                onChangeText={(text) => {
                  const newImages = [...images];
                  newImages[i - 1] = text;
                  setImages(newImages);
                }}
              />
            </View>
          ))}
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
