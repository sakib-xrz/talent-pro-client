"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import APIKit from "@/common/APIkit";
import HTTPKit from "@/common/HTTPkit";

import { selectUser, setUserData } from "@/redux/reducers/userSlice";

export const setJWTokenAndRedirect = async (token, redirect = () => {}) => {
  try {
    const client = await APIKit.setClientToken(token);
    const authToken = client.defaults.headers.common["Authorization"].replace(
      "Bearer ",
      "",
    );
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    HTTPKit.defer.resolve(client);
    redirect();
  } catch (error) {
    console.error(error);
  }
};

export default function CandidateAuthGuardHOC({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const fetchMe = async () => {
    try {
      const { data } = await APIKit.me.getMe();
      dispatch(setUserData(data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchMe)
        .catch((error) => {
          console.log(error?.response);
          router.push("/logout");
        });
    } else {
      const nextURL = { next: pathname };
      const queryParams = new URLSearchParams(nextURL).toString();
      router.push(`/login?${queryParams}`);
    }
  }, []);

  return user.email ? children : null;
  // return children;
}
