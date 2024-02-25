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
    const dateParts = format(dateString, "PP").split(" ");
    const month = dateParts[0];
    const day = dateParts[1].slice(0, -1);
    const year = dateParts[2];

    return `${day} ${month}, ${year}`;
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

export function getTimeDifference(timestamp) {
  const currentDate = new Date();
  const providedDate = new Date(timestamp);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate - providedDate) / 1000,
  );

  if (timeDifferenceInSeconds < 60) {
    return timeDifferenceInSeconds === 1
      ? "1 min ago"
      : `${timeDifferenceInSeconds} seconds ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
}

export const getBaseUrl = () => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ":" + window.location.port : ""
  }`;
  return baseUrl;
};

export function formatCurrency(amount) {
  const formatCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "BDT",
  });

  return formatCurrency.format(amount).slice(4).slice(0, -3);
}

function objectToGetParams(object) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );

  return params.length > 0 ? `?${params.join("&")}` : "";
}

export function facebookLink(url, { hashtag } = {}) {
  return (
    "https://www.facebook.com/sharer/sharer.php" +
    objectToGetParams({ u: url, hashtag })
  );
}

export function linkedinLink(url, { title, summary, source } = {}) {
  return (
    "https://linkedin.com/shareArticle" +
    objectToGetParams({ url, mini: "true", title, summary, source })
  );
}

export function generateAge(dateString) {
  if (dateString) {
    const birthDate = new Date(dateString);

    const currentDate = new Date();

    const timeDifference = currentDate - birthDate;

    const ageInYears = Math.floor(
      timeDifference / (365.25 * 24 * 60 * 60 * 1000),
    );

    return `${ageInYears} years`;
  }
  return "";
}
