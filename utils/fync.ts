import axios, { AxiosError } from "axios";
import endpoints from "constants/endpoints";
import { useSession } from "contexts/auth.context";

export const getCurrentUserFromFync = async (session: string) => {
  console.log(session);
  const response = await fetch(endpoints.fync.me.url, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const data = await response.json();

  console.log(data, "data");
  return data;
};

export const getFyncUserById = async (session: string, id: string) => {
  console.log(session, id, "ssidd");
  try {
    const response = await axios.get("https://api.fync.in/v1/users/@me", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    const data = response.data;
    console.log(data, "data");

    return data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data === 401) {
      return "unauthorized";
    }
    return null;
  }
};

export const addFriend = async (session: string, id: string) => {
  console.log(session, id, "ssidd");
  try {
    const response = await axios.get("https://api.fync.in/v1/users/", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    const data = response.data;
    console.log(data, "data");

    return data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data === 401) {
      return "unauthorized";
    }
    return null;
  }
};
