import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { Chat, User } from "constants/type";
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
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  createFight: (fight: Fight) => void;
  addOpponent: (opp: User) => void;
  notifications: string[];
}>({
  user: {},
  fights: [],
  createFight: () => {},
  chats: [],
  setChats: () => {},
  addOpponent: () => {},
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
  const [chats, setChats] = useState<Chat[]>([
    {
      _id: "1",
      opponentId: "1",
      opponentImage:
        "https://cdn.discordapp.com/attachments/1205397025869537302/1209928077564584066/images.png?ex=65e8b455&is=65d63f55&hm=73be4cd733b9b925c6b3ce23b9bee435a17abf3c7895b1cb926554c8dd3eb669&",
      opponentName: "Mike Tyson",
      matchAt: "2021-08-01T00:00:00.000Z",
      logs: [
        {
          from: "1",
          message: "Hello",
          to: "2",
          time: "2021-08-01T00:00:00.000Z",
        },
      ],
    },
  ]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const [error, setError] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const { session } = useSession();

  const createFight = (fight: Fight) => {
    console.log(fight, "fight");
    setFights((fights) => [...fights, fight]);
  };
  const addOpponent = (opp: User) => {
    // add to chats
    console.log(opp, "opxxx\n\n\n");
    setChats((chats) => [
      ...chats,
      {
        _id: String(chats.length + 1),
        opponentId: opp._id,
        opponentImage: opp.profilePicture,
        opponentName: opp.name,
        logs: [],
        matchAt: new Date().toISOString(),
      },
    ]);
  };

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
          _id: "0",
          email: "b@gg.gg",
          name: "B",
          profilePicture:
            "https://cdn.discordapp.com/attachments/1143923878696075415/1202256650564816966/IMG_3188.jpg?ex=65e87b42&is=65d60642&hm=defe8ad7dd300af37cc700d9513ef8cd2359269b2c9daabab2061ed710fa529c&",
          bio: "I am a cool person",
        });

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
        setChats,
        fights,
        createFight,
        notifications,

        addOpponent,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
