import { dataAPI, useSession } from "contexts/auth.context";
import "react-native-get-random-values";

import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { Image, KeyboardAvoidingView, LogBox } from "react-native";
import { Input } from "components/Input";
import { UploadFile, storage } from "utils/storage";
import { ImageItem } from "./images";
// import {
//   S3Client,
//   CreateBucketCommand,
//   PutObjectCommand,
//   ListBucketsCommand,
// } from "@aws-sdk/client-s3";

export default function Finish() {
  const { signIn, isLoading, signUpWithEmail } = useSession();
  const [username, setUsername] = useState("");
  const [canNext, setCanNext] = useState(false);
  const images: ImageItem[] = JSON.parse(storage.getString("images"));
  const email = storage.getString("email");
  const birthdate = storage.getString("birthdate");
  const activities = JSON.parse(storage.getString("activities"));

  useEffect(() => {
    if (username && username.length > 3) {
      storage.set("username", username);
      setCanNext(true);
    }
  }, [username]);

  const onNext = async () => {
    // check if date is valid
    console.log(username, images, email, birthdate, activities, "datanext");
    if (!canNext) {
      console.log("cant next");
      return;
    }

    storage.set("username", username);

    try {
      const res = await signUpWithEmail({
        email,
        birthdate,
        activities,
        images: images.map((i) => ({
          uri: i.uploadedUrl,
          blurhash: i.blurhash,
        })),
        username,
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }

    // storage.set("images", JSON.stringify(images));
  };

  return (
    <View flex bg={1}>
      <SafeTop back logo />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View flex style={{ paddingHorizontal: 10, gap: 10 }}>
          <View m={30} gap={10}>
            <Text variant="header">Finishing up</Text>
          </View>

          <View m={30} gap={5}>
            <Text variant="title">Please Enter your username</Text>
            <Input
              value={username}
              onChangeText={(t) => setUsername(t)}
              placeholder="username"
              autoCorrect={false}
              autoCapitalize="none"
              bg={3}
              p={5}
              variant="subtitle"
            />
            <Text variant="caption">Atleast 4 characters</Text>
          </View>
        </View>
        <Button style={{ margin: 20 }} onPress={onNext} disabled={!canNext}>
          <View center variant={canNext ? "primary" : "muted"} p={10} r={100}>
            <Text variant="title">Next</Text>
          </View>
        </Button>
        {/* <Button style={{ margin: 20 }} onPress={onNext} disabled={!canNext}>
          <View center variant={canNext ? "primary" : "muted"} p={10} r={100}>
            <Text variant="title">Next</Text>
          </View>
        </Button> */}
      </KeyboardAvoidingView>
      <SafeBottom />
    </View>
  );
}

export async function fileURLtoBlob(url: string) {
  const response = await fetch(url);
  const data = await response.blob();

  console.log(data, "response.body");
  return data;
}

async function fileURLtoArrayBuffer(url: string) {
  const response = await fetch(url);
  // console.log(response.type, "response.type");
  const data = await response.arrayBuffer();
  return data;
}
