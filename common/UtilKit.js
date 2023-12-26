import { format } from "date-fns";
import APIKit from "./APIkit";
import HTTPKit from "./HTTPkit";
import { AUTH_TOKEN_KEY } from "./KeyChain";

export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export const setJWTokenAndRedirect = async (token, redirect = () => {}) => {
  try {
    const client = await APIKit.setClientToken(token);
    const authToken =
      client.defaults.headers.common["Authorization"].split(" ")[1];
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    HTTPKit.defer.resolve(client);
    redirect();
  } catch (error) {
    console.error(error);
  }
};

export const formatText = (text) => {
  if (text) {
    const textLowerCase = text.split("_").join(" ").toLowerCase();
    const formattedText =
      textLowerCase.charAt(0).toUpperCase() + textLowerCase.slice(1);
    return formattedText;
  } else {
    return "";
  }
};

export const formatDate = (date) => {
  if (date) {
    const dateString = new Date(date);
    const formattedDate = format(dateString, "PP");
    return formattedDate;
  } else {
    return "";
  }
};

export function generateQueryString(params) {
  const isEmpty = Object.values(params).every((value) => value === "");

  if (isEmpty) {
    return "";
  }

  const queryString = Object.entries(params)
    .filter(([key, value]) => value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return `?${queryString}`;
}
