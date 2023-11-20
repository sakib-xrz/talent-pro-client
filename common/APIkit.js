import HTTPKit, { client } from "./HTTPkit";

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  server: {
    start: () => {
      const url = "/start";
      return client.get(url);
    },
  },

  auth: {
    register: (payload) => {
      const url = "/auth/register";
      return client.post(url, payload);
    },

    token: (payload) => {
      const url = "/auth/token";
      return client.post(url, payload);
    },
  },

  me: {
    getMe: () => {
      const url = "/me";
      return client.get(url);
    },
  },
};

export default APIKit;
