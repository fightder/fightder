import { S3Client } from "@aws-sdk/client-s3";
import { MMKV } from "react-native-mmkv";
import { encode } from "base-64";

export const storage = new MMKV();
let inited = false;

export const initb2 = async () => {
  const id_and_key =
    process.env.EXPO_PUBLIC_B2_KEY_ID +
    ":" +
    process.env.EXPO_PUBLIC_B2_ACCESS_KEY;
  const base64EncodedString = encode(id_and_key);
  const basic_auth_string = "Basic " + base64EncodedString;
  const b2_auth_url =
    "https://api.backblazeb2.com/b2api/v2/b2_authorize_account";

  console.log(basic_auth_string, "basic_auth_string");
  const b2_auth_headers = new Headers();
  b2_auth_headers.append("Authorization", basic_auth_string);
  const b2_auth_response = await fetch(b2_auth_url, {
    method: "GET",
    headers: b2_auth_headers,
  });

  const b2_auth_json = await b2_auth_response.json();

  console.log(b2_auth_json, "auth json");

  const b2_api_url = b2_auth_json.apiUrl;
  const b2_download_url = b2_auth_json.downloadUrl;
  const b2_auth_token = b2_auth_json.authorizationToken;
  const b2_bucket_id = "08fff948cde403ed8ce90e18";

  const b2_get_upload_url = b2_api_url + "/b2api/v2/b2_get_upload_url";

  const b2_upload_headers = new Headers();
  b2_upload_headers.append("Authorization", b2_auth_token);

  const b2_upload_response = await fetch(b2_get_upload_url, {
    method: "POST",
    headers: b2_upload_headers,
    body: JSON.stringify({
      bucketId: b2_bucket_id,
    }),
  });

  const b2_upload_json = await b2_upload_response.json();
  // console.log(b2_upload_json, "b2_upload_json");

  const b2_upload_url = b2_upload_json.uploadUrl;
  const b2_upload_auth_token = b2_upload_json.authorizationToken;

  // console.log([b2_upload_url, b2_upload_auth_token, b2_download_url]);
  // if ok, print ok
  if (b2_upload_url && b2_upload_auth_token && b2_download_url)
    console.log("B2 inited successfully");
  inited = true;
  storage.set("b2_upload_url", b2_upload_url);
  storage.set("b2_upload_auth_token", b2_upload_auth_token);
  storage.set("b2_download_url", b2_download_url);
  return {
    b2_upload_url,
    b2_upload_auth_token,
    b2_download_url,
  };
};

const getCredentials = async () => {
  let up = "";
  let auth = "";
  let down = "";
  if (!inited) {
    const { b2_upload_url, b2_upload_auth_token, b2_download_url } =
      await initb2();

    up = b2_upload_url;
    auth = b2_upload_auth_token;
    down = b2_download_url;
  }
  if (storage.getString("b2_upload_url")) {
    return {
      b2_upload_url: storage.getString("b2_upload_url"),
      b2_upload_auth_token: storage.getString("b2_upload_auth_token"),
      b2_download_url: storage.getString("b2_download_url"),
    };
  }

  return {
    b2_upload_url: up,
    b2_upload_auth_token: auth,
    b2_download_url: down,
  };
};
// export const UploadFile = async (file: Blob, name?: string, type?: string) => {
//   const { b2_upload_url, b2_upload_auth_token, b2_download_url } =
//     await initb2();
//   // await getCredentials();
//   const ab = getArrayBufferForBlob(file);

//   const shaab = await Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA1, ab);
//   const sha1 = [...new Uint8Array(shaab)]
//     .map((x) => x.toString(16).padStart(2, "0"))
//     .join("");
//   const extension = type.split("/")[1];

//   console.log(sha1, "sha1");

//   const b2_upload_headers = new Headers();
//   b2_upload_headers.append("Authorization", b2_upload_auth_token);
//   b2_upload_headers.append(
//     "X-Bz-File-Name",
//     encodeURIComponent(name + Date.now() + "." + extension)
//   );

//   b2_upload_headers.append("X-Bz-Content-Sha1", sha1);
//   b2_upload_headers.append("Content-Type", type);
//   b2_upload_headers.append("Content-Length", file.size.toString());

//   const b2_upload_response = await fetch(b2_upload_url, {
//     method: "POST",
//     headers: b2_upload_headers,
//     body: file,
//   });

//   const b2_upload_json = await b2_upload_response.json();

//   console.log(b2_upload_json, "upload res");
//   const url =
//     b2_download_url +
//     "/file/" +
//     encodeURIComponent("fightder" + "/" + b2_upload_json.fileName);

//   console.log(url, "urll");

//   return url;
// };
