export default {
  fync: {
    auth: {
      register: {
        url: "https://fync.in/oauth2/login",
      },
      token: {
        method: "POST",
        url: "https://fync.in/api/oauth/token",
      },
    },
    me: {
      url: "https://api.fync.in/v1/users/@me",
    },
    user: {
      url: (id: string) => `https://api.fync.in/v1/users/${id}`,
    },
    search: {
      user: {
        url: "https://api.fync.in/v1/users",
      },
    },
  },
};
