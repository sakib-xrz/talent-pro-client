import HTTPKit, { client } from "./HTTPkit";

const defaultFileUploadConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

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

  candidate: {
    setupProfile: (payload) => {
      const url = "/me/profile";
      return client.post(url, payload, defaultFileUploadConfig);
    },
  },

  me: {
    getMe: () => {
      const url = "/me";
      return client.get(url);
    },
    getInfo: () => {
      const url = "/me/info";
      return client.get(url);
    },
    getExperience: () => {
      const url = "/me/experience";
      return client.get(url);
    },
    updateProfilePicture: (payload) => {
      const url = "/me/image";
      return client.patch(url, payload, defaultFileUploadConfig);
    },
  },
};

export default APIKit;
