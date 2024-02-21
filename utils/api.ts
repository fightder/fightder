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

export const getFights = async ({ queryKey }) => {
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

export const getChats = async ({ queryKey }) => {
  console.log(queryKey, "wqererqk");
  if (queryKey.length == 1) {
    return [
      {
        _id: "1",
        opponentId: "1",
        opponentImage: "https://picsum.photos/200",
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
    ];
  } else {
    const id = queryKey[1];
    return {
      _id: id,
      opponentId: id,
      opponentImage: "https://picsum.photos/200",
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
    };
  }
};

export const getChat = async ({ queryKey }) => {
  console.log(queryKey, "wqererqk");
  if (queryKey.length == 1) {
    return {
      _id: "1",
      opponentId: "1",
      opponentImage: "https://picsum.photos/200",
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
    };
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
