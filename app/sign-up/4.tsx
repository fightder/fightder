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
import * as ImagePicker from "expo-image-picker";
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
    storage.getString("images")
      ? JSON.parse(storage.getString("images"))
      : ["", "", "", "", "", ""]
  );
  const [canNext, setCanNext] = useState(false);

  const pickImage = (i: number) => async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.assets) {
      // setImage(result.assets[0].uri);
      setImages([
        ...images.slice(0, i),
        result.assets[0].uri,
        ...images.slice(i + 1),
      ]);
    }
  };

  useEffect(() => {
    console.log(storage.getString("images"), "tmgs");
    const imagescount = images.filter((i) => i !== "").length;
    if (imagescount >= 3) {
      storage.set("images", JSON.stringify(images));
      setCanNext(true);
    }
  }, [images]);

  const onNext = () => {
    // check if date is valid

    storage.set("images", JSON.stringify(images));

    router.push("/sign-up/finish");
  };

  return (
    <View flex bg={1}>
      <SafeTop back logo />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View flex style={{ paddingHorizontal: 10, gap: 10 }}>
          <View m={30} gap={10}>
            <Text variant="header">Images</Text>
          </View>
          <View row gap={10} center>
            {images.slice(0, 3).map((image, index) => (
              <ImagePickerButton
                index={index}
                onPress={pickImage(index)}
                image={image}
              />
            ))}
          </View>
          <View row gap={10} center>
            {images.slice(3, 6).map((image, index) => {
              index += 3;
              return (
                <ImagePickerButton
                  index={index}
                  onPress={pickImage(index)}
                  image={image}
                />
              );
            })}
          </View>
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

export const ImagePickerButton = ({ onPress, image, index }) => {
  return (
    <Button key={index + "ipb"} onPress={onPress}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 110, height: 170, margin: 5, borderRadius: 10 }}
        />
      ) : (
        <View
          key={index}
          m={5}
          bg={4}
          gap={10}
          r={10}
          style={{ width: 110, height: 170 }}
          center
        >
          <IconButton name="add" />
        </View>
      )}
    </Button>
  );
};
