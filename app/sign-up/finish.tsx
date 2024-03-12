import { dataAPI, useSession } from "contexts/auth.context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

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
import { UploadFile, storage } from "utils/storage";
// import {
//   S3Client,
//   CreateBucketCommand,
//   PutObjectCommand,
//   ListBucketsCommand,
// } from "@aws-sdk/client-s3";

export default function Finish() {
  const { signIn, isLoading, session } = useSession();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [canNext, setCanNext] = useState(false);
  const images: string[] = JSON.parse(storage.getString("images"));
  const email = storage.getString("email");
  const birthdate = storage.getString("birthdate");
  const activities = JSON.parse(storage.getString("activities"));

  //   useEffect(() => {
  //     console.log(images, email, birthdate, activities, "finish");

  //     dataAPI.insertOne({
  //       dataSource: "dev",
  //       database: "fightder",
  //       collection: "users",
  //       document: {
  //         email,
  //         birthdate,
  //         activities,
  //         images,
  //       },
  //     });
  //   }, []);
  useEffect(() => {
    if (username) {
      storage.set("username", username);
      setCanNext(true);
    }
  }, [username]);

  const onNext = async () => {
    // check if date is valid
    if (!canNext) return;

    storage.set("username", username);

    // s3.send(new ListBucketsCommand({}))
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // s3.send(
    //   new CreateBucketCommand({
    //     Bucket: "fightder",
    //   })
    // )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    const imagesUrls = Array(images.length).fill("");
    try {
      images.forEach(async (image, i) => {
        console.log(image, i);
        if (image) {
          const blob = await fileURLtoBlob(image);
          console.log(blob, "blob");
          // const res = await s3.send(
          //   new PutObjectCommand({
          //     Bucket: "fightder",
          //     Key: username + "pfp" + Date.now() + ".png",
          //     Body: blob,
          //   })
          // );
          const res = await UploadFile(
            new File([blob], "pfp"),
            username + "pfp" + Date.now()
          );
          console.log(res);
          imagesUrls[i] =
            "https://fightder.s3.us-east-005.backblazeb2.com/" +
            username +
            "pfp" +
            Date.now() +
            ".png";
        }
      });
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
            <Text variant="header">Please Enter your username</Text>
            <Input
              value={username}
              onChangeText={(t) => setUsername(t)}
              placeholder="username"
              bg={3}
              p={5}
              variant="subtitle"
            />
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

async function fileURLtoBlob(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  return data;
}
