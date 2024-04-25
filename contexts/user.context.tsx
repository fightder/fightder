import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { Chat, Opponent, User } from "constants/type";
import { Linking } from "react-native";
import endpoints from "constants/endpoints";
import * as WebBrowser from "expo-web-browser";
import { storage } from "utils/storage";
import { getCurrentUserFromFync } from "utils/fync";
import { Fight } from "utils/type";
import Chats from "app/(app)/(tabs)/chats";
import { useSession } from "./auth.context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getOpponents, getProfile } from "utils/api";

const UserContext = React.createContext<{
  user: User;
  opponents: Opponent[];
  fights: Fight[];
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  createFight: (fight: Fight) => void;
  cancelFight: (fight: Fight) => void;
  addOpponent: (opp: User) => void;
  notifications: string[];
}>({
  user: {},
  opponents: [],
  fights: [],
  createFight: () => {},
  cancelFight: () => {},
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
  const { signIn, isLoading, session, signInWithEmail } = useSession();
  // const [user, setUser] = useState<User>();

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
  const {
    status: userStatus,
    data: user,
    error: userError,
  } = useQuery({
    queryKey: ["profile", "me"],
    queryFn: getProfile(session),
  });
  const [opponentsFilter, setOpponentsFilter] = useState<string>("all");
  const {
    status: opponentsStatus,
    data: opponents,
    error: opponentsError,
  } = useQuery({
    queryKey: ["opponents", opponentsFilter],
    queryFn: getOpponents(session),
  });

  const [error, setError] = useState<string>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userStatus === "success") {
      setLoaded(true);
    }
  }, [userStatus]);

  const createFight = (fight: Fight) => {
    console.log(fight, "fight");
    const opponent = chats.find((chat) => chat._id === fight.opponentId);
    setFights((fights) => [
      ...fights,
      {
        ...fight,
        status: "pending",

        _id: String(fights.length + 1),
        opponentId: fight.opponentId,
        opponentImage: opponent?.opponentImage,
        opponentName: opponent?.opponentName,
        inviterId: user._id,
        inviterImage: user.images[0].uri,
        inviterName: user.username,
        matchAt: new Date().toISOString(),
      },
    ]);

    setChats(
      chats.map((chat) => {
        if (chat.opponentId === fight.opponentId) {
          // Assuming each chat has a unique `id` or similar identifier
          return {
            ...chat,
            logs: [
              ...chat.logs,
              {
                from: user._id,
                message:
                  "You sent a fight request;;" + String(fights.length + 1),
                time: new Date().toISOString(),
              },
            ],
          };
        } else {
          return chat;
        }
      })
    );
  };

  const cancelFight = (fightId: string) => {
    setFights(fights.filter((f) => f._id !== fightId));
    const opponentId = fights.find((f) => f._id === fightId).opponentId;

    setChats(
      chats.map((chat) => {
        if (chat.opponentId === opponentId) {
          // Assuming each chat has a unique `id` or similar identifier
          return {
            ...chat,
            logs: [
              ...chat.logs,
              {
                from: user._id,
                message: "You cancelled the fight request",
                time: new Date().toISOString(),
              },
            ],
          };
        } else {
          return chat;
        }
      })
    );
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

  // useEffect(() => {
  //   (async () => {
  //     const jsonUser = storage.getString("user");
  //     console.log(jsonUser, "jsonUser");
  //     if (
  //       !jsonUser ||
  //       jsonUser === "undefined" ||
  //       jsonUser === "{}" ||
  //       !jsonUser.includes("_id")
  //     ) {
  //       console.log("fetching user");
  //       // setUser({
  //       //   _id: "0",
  //       //   email: "b@gg.gg",
  //       //   name: "B",
  //       //   profilePicture:
  //       //     "https://cdn.discordapp.com/attachments/1143923878696075415/1202256650564816966/IMG_3188.jpg?ex=65e87b42&is=65d60642&hm=defe8ad7dd300af37cc700d9513ef8cd2359269b2c9daabab2061ed710fa529c&",
  //       //   bio: "I am a cool person",
  //       // });

  //       // storage.set("user", JSON.stringify(user));
  //       return;
  //     }
  //     const userObject = JSON.parse(jsonUser);
  //     console.log(userObject);
  //     setUser(userObject);
  //   })();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        opponents,
        chats,
        setChats,
        fights,
        createFight,
        cancelFight,
        notifications,

        addOpponent,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
