import axios from "axios";

export const getOpponents = async ({ queryKey }) => {
  if (queryKey[1] == "all") {
    const res = await axios.get("https://api.opendota.com/api/proPlayers");
    return res.data;
  } else if (queryKey[1]) {
    const res = await axios.get(
      "https://api.opendota.com/api/players/" + queryKey[1]
    );
    console.log(res.data);
    return res.data;
  }
};

const swipeLeft = async (oppId) => {
  const response = await fetch(`/api/swipeLeft/${oppId}`, { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to swipe left");
  }
};

const swipeRight = async (oppId) => {
  const response = await fetch(`/api/swipeRight/${oppId}`, { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to swipe right");
  }
};
