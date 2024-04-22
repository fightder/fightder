import React, { useEffect } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { Linking } from "react-native";
import endpoints from "constants/endpoints";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { User } from "constants/type";
import { set } from "zod";
import { storage } from "utils/storage";
import { createMongoDBDataAPI } from "mongodb-data-api";
import * as Crypto from "expo-crypto";
import { hashPassword, verifyPassword } from "utils/hash";
import { router } from "expo-router";
// or init by app ID
export const dataAPI = createMongoDBDataAPI({
  apiKey: process.env.EXPO_PUBLIC_MONGO_API_KEY,
  urlEndpoint: process.env.EXPO_PUBLIC_URL_ENDPOINT,
  // appId: process.env.EXPO_PUBLIC_MONGO_APP_ID,
});
// (async () => {
//   const password = await hashPassword("password", "man");
//   // Store hash in your password DB.
//   dataAPI
//     .insertOne({
//       dataSource: "dev",
//       database: "fightder_dev",
//       collection: "users",
//       document: {
//         name: "Bro",
//         username: "man",
//         password,
//         age: 19,
//       },
//     })
//     .then((result) => {
//       console.log(result.insertedId, "insertedId ");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// })();

const AuthContext = React.createContext<{
  signIn: () => Promise<void | string>;
  signOut: () => void;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signUpWithEmail: (data: {
    email: string;
    birthdate: string;
    activities: string[];
    images: {
      uri: string;
      blurhash: string;
    }[];
    username: string;
    password: string;
  }) => Promise<string>;
  getFyncUserById: (id: string) => Promise<User | null>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  signInWithEmail: () => null,
  signUpWithEmail: () => null,
  getFyncUserById: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

function exchangeCodeForToken(authorizationCode) {
  console.log(process.env.EXPO_PUBLIC_FYNC_CLIENT_ID);
  const tokenRequestBody = new FormData();
  tokenRequestBody.append("grant_type", "authorization_code");
  tokenRequestBody.append("code", authorizationCode);
  tokenRequestBody.append("client_id", process.env.EXPO_PUBLIC_FYNC_CLIENT_ID);
  tokenRequestBody.append(
    "client_secret",
    process.env.EXPO_PUBLIC_FYNC_CLIENT_SECRET
  );

  return fetch(endpoints.fync.auth.token.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenRequestBody,
  })
    .then((response) => response.json())
    .then((tokenData) => {
      console.log(tokenData);
      // Handle the obtained access token (tokenData.access_token)
      console.log("Access Token:", tokenData.access_token);
      return tokenData.access_token;
    })
    .catch((error) => console.error("Error during token exchange:", error));
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async () => {
    const authUrl = process.env.EXPO_PUBLIC_FYNC_AUTH_URL;
    const res = await WebBrowser.openAuthSessionAsync(authUrl);
    // Perform sign-in logic here
    console.log(res);

    if (res.type !== "success") {
      return;
    }
    const code = res.url.split("?code=")[1];

    // get access token
    try {
      const accessToken = await exchangeCodeForToken(code);
      console.log(accessToken);
      if (accessToken) {
        setSession(accessToken);
      } else {
        console.log("no access token");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = () => {
    storage.clearAll();
    setSession(null);
  };
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const res = await dataAPI.find({
        dataSource: "dev",
        database: "fightder_dev",
        collection: "users",
        filter: {
          $or: [{ email }, { username: email }],
        },
      });

      const users = res.documents;

      console.log(users);
      const foundUser = users.find((user) => {
        console.log(user, "user");
        if (verifyPassword(password, user.password)) {
          console.log("password correct", user);
          return true; // Stops iteration when correct password is found
        } else {
          console.log("password incorrect");
          return false;
        }
      });

      if (foundUser) {
        setSession(foundUser._id);
        return foundUser;
      } else {
        return null;
        // Handle case when password is not found
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        signInWithEmail,
        signUpWithEmail: async ({
          email,
          birthdate,
          activities,
          images,
          username,
          password,
        }: {
          email: string;
          birthdate: string;
          activities: string[];
          images: {
            uri: string;
            blurhash: string;
          }[];
          username: string;
          password: string;
        }) => {
          // check if user exists by email or username
          const res = await dataAPI.find({
            dataSource: "dev",
            database: "fightder_dev",
            collection: "users",
            filter: {
              $or: [{ email }, { username: email }],
            },
          });

          const users = res.documents;

          console.log(users);
          if (users.length > 0) {
            console.log("user exists");
            return;
          } else {
            const newUser = await dataAPI.insertOne({
              dataSource: "dev",
              database: "fightder_dev",
              collection: "users",
              document: {
                email,
                birthdate,
                activities,
                images,
                username,
                password: await hashPassword(password, username),
              },
            });
            console.log(newUser.insertedId, "insertedId");
            setSession(newUser.insertedId);

            return newUser.insertedId;
          }
        },
        getFyncUserById: async (id: string) => {
          console.log(session, id, "ssidd");
          try {
            const response = await axios.get(endpoints.fync.user.url(id), {
              headers: {
                Authorization: `Bearer ${session}`,
              },
            });
            const data = response.data;
            console.log(data, "data");

            return data;
          } catch (error) {
            console.log(error.response.data.message);
            if (
              error.response.data.message === "Unauthorized - Token expired"
            ) {
              setSession(null);
              return null;
            }
            return null;
          }
        },
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
