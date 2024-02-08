import axios from "axios";

export const getOpponents = async () => {
  const res = await axios.get("https://api.opendota.com/api/teams", {
    params: {
      limit: 50, // Set the limit to the number of rows you want
    },
  });
  return res.data;
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