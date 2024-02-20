import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "constants/type";
import { Linking } from "react-native";
import endpoints from "constants/endpoints";
import * as WebBrowser from "expo-web-browser";
import { storage } from "utils/storage";
import { useSession } from "./auth.context";
import { getCurrentUserFromFync } from "utils/fync";
import { Fight } from "utils/type";

const UserContext = React.createContext<{
  user: User;
  fights: Fight[];
  chats: any[];
  notifications: string[];
}>({
  user: {},
  fights: [],
  chats: [],
  notifications: [],
});

// This hook can be used to access the user info.
export function useUser() {
  const value = React.useContext(UserContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function UserProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const [fights, setFights] = useState<Fight[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const [error, setError] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    (async () => {
      const jsonUser = storage.getString("user");
      console.log(jsonUser, "jsonUser");
      if (
        !jsonUser ||
        jsonUser === "undefined" ||
        jsonUser === "{}" ||
        !jsonUser.includes("_id")
      ) {
        console.log("fetching user");
        setUser({
          _id: "1",
          email: "b@gg.gg",
          name: "B",
          profilePicture: "https://picsum.photos/200",
          bio: "I am a cool person",
        });

        setFights([
          {
            date: "2022-01-01",
            description:
              "The two most powerful forces of nature will clash on the big screen in a spectacular battle for the ages.",
            id: "1",
            inviterId: "2",
            inviterImage: "https://picsum.photos/200",
            location: "New York, NY",
            opponentId: "1",
            opponentImage: "https://picsum.photos/200",
            prize: "a banana",
            public: true,
            rule: "No biting",
            spectators: [
              "https://picsum.photos/200",
              "https://picsum.photos/200",
            ],
            title: "Godzilla vs King Kong",
          },
        ]);

        // setChats
        // setChats([
        //   {
        //     id: "1",
        //     opponentId: "1",
        //     opponentImage: "https://picsum.photos/200",
        //     inviterId: "2",
        //     inviterImage: "https://picsum.photos/200",
        //     matchAt: "2022-01-01",
        //   },
        // ]);

        storage.set("user", JSON.stringify(user));
        return;
      }
      const userObject = JSON.parse(jsonUser);
      console.log(userObject);
      setUser(userObject);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        chats,
        fights,
        notifications,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
