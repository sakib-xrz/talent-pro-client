import HTTPKit, { client } from "./HTTPkit";

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

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
};

export default APIKit;
