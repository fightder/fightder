import { useSession } from "contexts/auth.context";
import { Blurhash } from "react-native-blurhash";
import { Link, router, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

import { IconButton } from "components/IconButton";
import { UploadFile, storage } from "utils/storage";
import { uploadToS3 } from "utils/s3";
import { JsonViewer } from "components/JsonViewer";
import * as Burnt from "burnt";
import { ScrollView } from "components/ScrollView";
import { Skeleton } from "moti/skeleton";
import { rotate } from "@shopify/react-native-skia";

export type ImageItem = {
  asset?: ImagePicker.ImagePickerAsset;
  uploadedUrl?: string | null;
  blurhash?: string | null;
};
export default function Images() {
  const { signIn, isLoading, session } = useSession();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<ImageItem[]>(
    storage.getString("images") ? JSON.parse(storage.getString("images")) : []
  );
  const [canNext, setCanNext] = useState(false);

  const memoizedImageData = useMemo(() => {
    return images.length < 6 ? [...images, null] : images;
  }, [images]);
  const MemoizedImagePickerButton = React.memo(ImagePickerButton);

  const pickImage = (index: number) => async () => {
    // storage.delete("images");
    // storage.set("images", undefined);
    console.log(storage.getString("images"), "tmgs");
    // No permissions request is necessary for launching the image library
    console.log(images.length, index);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
      allowsMultipleSelection: true,
      selectionLimit: 6 - images.length,
    });

    if (result.canceled) {
      return;
    }
    result.assets.forEach((file) => {
      setImages((imgs) => [
        ...imgs.slice(0, index),
        {
          asset: file,
          blurhash: "loading",
          uploadedUrl: "loading",
        },
        ...imgs.slice(index),
      ]);
    });
    const hashImages = result.assets.map(async (file, i) => {
      const blurhash = await Blurhash.encode(file.uri, 4, 3);
      console.log(blurhash, "blurhash");
      setImages((imgs) => [
        ...imgs.slice(0, index + i),
        {
          ...imgs[index + i],
          blurhash,
        },
        ...imgs.slice(index + i + 1),
      ]);
    });

    const uploadImages = result.assets.map(async (file, i) => {
      const url = await uploadToS3(file);
      if (url == null) {
        // show error
        setError("Error uploading image " + i + 1 + index);
        setImages((images) => [
          ...images.slice(0, index + i),
          {
            ...images[index + i],
            uploadedUrl: "error",
          },
          ...images.slice(index + i + 1),
        ]);
        Burnt.toast({
          title: "Error Uploading Image",
          preset: "error",
          message: "Please retry",
        });
        return;
      }
      setImages((images) => [
        ...images.slice(0, index + i),
        {
          ...images[index + i],
          uploadedUrl: url,
        },
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
    setImages((prevImages) => prevImages.filter((_, index) => index !== i));
  };

  const reUploadImage = (index: number) => async () => {
    const image = images[index];
    if (!image.asset) {
      return;
    }
    const url = await uploadToS3(image.asset);
    if (url == null) {
      // show error
      setError("Error uploading image " + index);
      setImages((images) => [
        ...images.slice(0, index),
        {
          ...images[index],
          uploadedUrl: "error",
        },
        ...images.slice(index + 1),
      ]);
      return;
    }
    setImages((images) => [
      ...images.slice(0, index),
      {
        ...images[index],
        uploadedUrl: url,
      },
      ...images.slice(index + 1),
    ]);
  };

  useEffect(() => {
    console.log(storage.getString("images"), "tmgs");
    if (images.length >= 3) {
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
        {/* <JsonViewer json={images} /> */}

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
              justifyContent: "flex-start",
            }}
          >
            {/* {[...images, ...Array(3).fill("")] */}
            {/* {[...images, ...Array(6).fill("")]
              .slice(0, 6) */}
            {memoizedImageData.map((image, index) => (
              <MemoizedImagePickerButton
                key={`${image}-${index}`}
                index={index}
                onPick={pickImage(index)}
                onReload={reUploadImage(index)}
                onRemove={onRemove(index)}
                image={image || ""}
              />
            ))}
          </View>
          <View row gap={5} center></View>
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
  onPick,
  onReload,
  onRemove,
  image,
  index,
}: {
  onPick: () => void;
  onReload: () => void;
  onRemove: () => void;
  image: ImageItem | "";
  index: number;
}) => {
  // console.log(image.uploadedUrl, "image");
  if (image === "" || !image.asset) {
    return (
      <Button key={index + "ipb"} onPress={onPick}>
        <View
          m={5}
          bg={4}
          gap={10}
          r={10}
          style={{ width: 110, height: 170 }}
          center
        >
          <IconButton name="add" variant="circle" onPress={onPick} />
        </View>
      </Button>
    );
  }

  // if image is loading
  if (image.uploadedUrl == "loading" || !image.uploadedUrl) {
    if (image.blurhash)
      return (
        <View m={5}>
          <Blurhash
            blurhash={image.blurhash}
            style={{
              width: 110,
              height: 170,
              margin: 5,
              borderRadius: 10,
            }}
          />
        </View>
      );

    return (
      <View m={5}>
        <Skeleton width={110} height={170} radius={10} />
      </View>
    );
  }

  // if image is error
  if (image.uploadedUrl == "error") {
    if (image.blurhash) {
      return (
        <View
          m={5}
          // bg={4}
          // gap={10}
          r={10}
          style={{ width: 110, height: 170, overflow: "hidden" }}
          center
        >
          <View
            bg={2}
            r={100}
            style={{
              padding: 7,
              zIndex: 200,

              position: "absolute",
            }}
          >
            <IconButton
              name="reload"
              onPress={onReload}
              size={30}
              style={
                {
                  // right: 0,
                }
              }
            />
          </View>
          <Blurhash
            blurhash={image.blurhash}
            style={{
              // position: "absolute",
              width: 110,
              height: 170,
              // margin: 5,
              // overflow: "hidden",
              borderRadius: 10,
              zIndex: -10,
            }}
          />
        </View>
      );
    }
    return (
      <View
        m={5}
        bg={4}
        gap={10}
        r={10}
        style={{ width: 110, height: 170 }}
        center
      >
        <IconButton name="reload" onPress={onReload} />
      </View>
    );
  }
  // if image is uploaded
  return (
    <>
      <View
        m={5}
        // bg={4}
        // gap={10}
        r={10}
        style={{ width: 110, height: 170 }}
        // center
      >
        <IconButton
          name="close"
          onPress={onRemove}
          variant="circle"
          style={{
            position: "absolute",
            top: -5,
            left: -5,
            zIndex: 2000,
          }}
        />
        <Image
          source={{ uri: image.uploadedUrl }}
          placeholder={image.blurhash}
          style={{
            // width: 110,
            flex: 1,
            height: 170,
            // margin: 5,
            borderRadius: 10,
            zIndex: -21,
          }}
          transition={1000}
        />
      </View>
    </>
  );
};
