import { useSession } from "contexts/auth.context";
import { Blurhash } from "react-native-blurhash";
import { Link, router, useGlobalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import SignInForm from "components/SignInForm";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "utils/supabase";
import { Input } from "components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MotiView } from "moti";
import { IconButton } from "components/IconButton";
import { UploadFile, storage } from "utils/storage";
import DropDownPicker from "react-native-dropdown-picker";
import { fileURLtoBlob } from "./finish";
import { uploadToS3 } from "utils/s3";
import { JsonViewer } from "components/JsonViewer";

export default function Images() {
  const { signIn, isLoading, session } = useSession();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(
    storage.getString("images") ? JSON.parse(storage.getString("images")) : [""]
  );
  const [imagesLoading, setImagesLoading] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [blurhashes, setBlurhashes] = useState([""]);
  const [canNext, setCanNext] = useState(false);

  const pickImage = (index: number) => async () => {
    // No permissions request is necessary for launching the image library
    console.log(blurhashes.filter((b) => b != "").length);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
      selectionLimit: 6 - index,
    });

    if (result.canceled) {
      return;
    }

    // const onCallback = (i: number, url) => {
    //   setImagesLoading({ ...imagesLoading, [i]: false });
    //   setImages([...images.slice(0, i), url, ...images.slice(i + 1)]);
    // };

    // result.assets.forEach(async (file, i) => {
    //   setImagesLoading({ ...imagesLoading, [index + i]: true });

    //   const blurhash = await Blurhash.encode(file.uri, 4, 3);
    //   setBlurhashes([
    //     ...blurhashes.slice(0, index + i),
    //     blurhash,
    //     ...blurhashes.slice(index + i + 1),
    //   ]);
    //   const url = await uploadToS3(file);

    //   setImagesLoading({ ...imagesLoading, [index + i]: false });
    //   setImages([
    //     ...images.slice(0, index + i),
    //     url,
    //     ...images.slice(index + i + 1),
    //   ]);
    // });

    const hashImages = result.assets.map(async (file, i) => {
      setImagesLoading({ ...imagesLoading, [index + i]: true });

      const blurhash = await Blurhash.encode(file.uri, 4, 3);
      console.log(blurhash, "blurhash");
      setBlurhashes([
        ...blurhashes.slice(0, index + i),
        blurhash,
        ...blurhashes.slice(index + i + 1),
      ]);
    });

    const uploadImages = result.assets.map(async (file, i) => {
      const url = await uploadToS3(file);

      setImagesLoading({ ...imagesLoading, [index + i]: false });
      setImages([
        ...images.slice(0, index + i),
        url,
        ...images.slice(index + i + 1),
      ]);
    });

    Promise.all([hashImages, uploadImages])
      .then(() => {
        console.log("All uploads completed successfully");
      })
      .catch((error) => {
        console.error("Error during uploads:", error);
      });
  };

  const onRemove = (i: number) => () => {
    if (i == 0) {
      setImages([...images.slice(1)]);
      setBlurhashes([...blurhashes.slice(1)]);
      return;
    }
    if (images.length == 1) {
      setImages([""]);
      setBlurhashes([""]);
      return;
    }
    setImages([...images.slice(0, i), ...images.slice(i + 1)]);
    setBlurhashes([...blurhashes.slice(0, i), ...blurhashes.slice(i + 1)]);
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
        <JsonViewer json={images} />
        <JsonViewer json={blurhashes} />
        <Text>{JSON.stringify(imagesLoading)}</Text>

        <View flex style={{ paddingHorizontal: 10, gap: 10 }}>
          <View m={30} gap={10}>
            <Text variant="header">Images</Text>
            <Text variant="subtitle">Pick atleast 3 images</Text>
          </View>
          <View
            row
            gap={5}
            center
            style={{
              flexWrap: "wrap",
            }}
          >
            {/* {[...images, ...Array(3).fill("")] */}
            {[...images, ...Array(6).fill("")]
              .slice(0, 6)
              .map((image, index) => (
                <ImagePickerButton
                  index={index}
                  loading={imagesLoading[index]}
                  onPress={pickImage(index)}
                  onRemove={onRemove(index)}
                  image={image}
                  hash={blurhashes[index]}
                  key={index + "ipb"}
                />
              ))}
          </View>
          <View row gap={5} center>
            {/* {[...images.slice(3, 6), ...Array(3).fill("")]
              .slice(0, 3)
              .map((image, index) => {
                index += 3;
                return (
                  <ImagePickerButton
                    index={index}
                    onPress={pickImage(index)}
                    onRemove={onRemove(index)}
                    hash={blurhashes[index]}
                    image={image}
                    loading={imagesLoading[index]}
                    key={index + "ipb"}
                  />
                );
              })} */}
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

export const ImagePickerButton = ({
  onPress,
  onRemove,
  image,
  index,
  loading,
  hash,
}) => {
  return (
    <>
      <Button key={index + "ipb"} onPress={!loading && onPress}>
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1000,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 10,
            }}
            center
          >
            <Text>{hash}</Text>
            <Blurhash blurhash={hash} style={{ flex: 1 }} />
            {/* <ActivityIndicator size="large" color={"white"} /> */}
          </View>
        )}
        {image ? (
          <>
            <IconButton
              name="close"
              onPress={onRemove}
              variant="circle"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 2000,
              }}
            />
            <Image
              source={{ uri: image }}
              style={{
                width: 110,
                height: 170,
                margin: 5,
                borderRadius: 10,
                zIndex: -21,
              }}
            />
          </>
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
            <IconButton
              name="add"
              variant="circle"
              onPress={!loading && onPress}
            />
          </View>
        )}
      </Button>
      {hash && (
        <Blurhash
          blurhash={hash}
          style={{
            position: "absolute",
            width: 110,
            height: 170,
            margin: 5,
            overflow: "hidden",
            zIndex: -61,
          }}
        />
      )}
    </>
  );
};
