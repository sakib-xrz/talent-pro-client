import axios from "axios";

import { deferred } from "./UtilKit";

export let client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const defer = new deferred();

let clientIsAuthenticated = false;

const setClientToken = (token) => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    clientIsAuthenticated = true;
    defer.resolve(client);
  } catch (error) {
    defer.reject(error);
  }

  return defer.promise;
};

const HTTPKit = {
  setClientToken,
  defer,
  get: (url, options) => {
    return client.get(url, options);
  },
  post: (url, payload) => {
    return client.post(url, payload);
  },
  put: (url, payload) => {
    return client.put(url, payload);
  },
  patch: (url, payload) => {
    return client.patch(url, payload);
  },
  delete: (url) => {
    return client.delete(url);
  },
};

export default HTTPKit;
