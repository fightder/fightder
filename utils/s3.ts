import { Buffer } from "buffer";
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

import * as FileSystem from "expo-file-system";
// import "react-native-get-random-values";
// import "react-native-url-polyfill/auto";
// import { ReadableStream } from "web-streams-polyfill/ponyfill";
// globalThis.ReadableStream = ReadableStream;
import { fileURLtoBlob } from "app/sign-up/finish";
import AWS from "aws-sdk";
import * as ImagePicker from "expo-image-picker";
AWS.config.update({
  region: "us-east-005",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_B2_KEY_ID,
    secretAccessKey: process.env.EXPO_PUBLIC_B2_ACCESS_KEY,
  },
});

// const s3 = new AWS.S3({
//   endpoint: "https://s3.us-east-005.backblazeb2.com",
// });

const s3 = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_B2_KEY_ID,
    secretAccessKey: process.env.EXPO_PUBLIC_B2_ACCESS_KEY,
  },
});

// Create a bucket and upload something into it
var bucketName = "fightder";

// try {
//   ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     quality: 1,
//     base64: true,
//     allowsMultipleSelection: true,
//     selectionLimit: 6,
//   }).then((result) => {
//     manipulateAsync(
//       result.assets[0].uri,
//       [
//         {
//           resize: {
//             height: 900,
//           },
//         },
//       ],
//       { compress: 0.6, format: SaveFormat.JPEG, base64: true }
//     ).then((manipres) => {
//       const buffer = Buffer.from(manipres.base64, "base64");
//       s3.send(
//         new PutObjectCommand({
//           Bucket: bucketName,
//           Key: result.assets[0].fileName,
//           Body: buffer,
//           ContentType: result.assets[0].type,
//         })
//       ).then((data) => {
//         console.log(data);
//         console.log(
//           "Successfully uploaded data to " +
//             bucketName +
//             "https://fightder.s3.us-east-005.backblazeb2.com/" +
//             encodeURIComponent(result.assets[0].fileName)
//         );
//       });
//     });
//   });
// } catch (err) {
//   console.log("Error: ", err);
// }

export const uploadManyToS3 = async (
  assets: ImagePicker.ImagePickerAsset[],
  startIndex: number,
  callback: (i: number, url: string) => void
) => {
  try {
    const urls = assets.map(async (asset, i) => {
      const res = await manipulateAsync(
        asset.uri,
        [
          {
            resize: {
              height: 900,
            },
          },
        ],
        { compress: 0.6, format: SaveFormat.JPEG, base64: true }
      );
      const buffer = Buffer.from(res.base64, "base64");

      const uploadParams = {
        Bucket: bucketName,
        Key: asset.fileName,
        Body: buffer,
        ContentType: asset.type,
      };

      const data = await s3.send(new PutObjectCommand(uploadParams));

      const url = `https://fightder.s3.us-east-005.backblazeb2.com/${encodeURIComponent(
        asset.fileName
      )}`;
      callback(i + startIndex, url);
      console.log(`Successfully uploaded data to ${bucketName} at ${url}`);

      return url;
    });
  } catch (err) {
    console.log("Error uploading to S3:", err);
    throw err;
  }
};
export const uploadToS3 = async (asset: ImagePicker.ImagePickerAsset) => {
  try {
    const res = await manipulateAsync(
      asset.uri,
      [
        {
          resize: {
            height: 900,
          },
        },
      ],
      { compress: 0.6, format: SaveFormat.JPEG, base64: true }
    );
    const buffer = Buffer.from(res.base64, "base64");

    const uploadParams = {
      Bucket: bucketName,
      Key: asset.fileName,
      Body: buffer,
      ContentType: asset.type,
    };

    const data = await s3.send(new PutObjectCommand(uploadParams));

    const url = `https://fightder.s3.us-east-005.backblazeb2.com/${encodeURIComponent(
      asset.fileName
    )}`;
    console.log(`Successfully uploaded data to ${bucketName} at ${url}`);

    return url;
  } catch (err) {
    console.log("Error uploading to S3:", err);
    return null;
  }
};
// ImagePicker.launchImageLibraryAsync({
//   mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   quality: 1,
//   base64: true,
//   allowsMultipleSelection: true,
//   selectionLimit: 6,
// }).then((result) => {
//   uploadToS3(result.assets, 0, console.log).then((urls) => {
//     console.log(urls);
//   });
// });
