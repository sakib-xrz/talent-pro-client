"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import { clearUserData } from "@/redux/reducers/userSlice";

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearUserData());
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/login");
  }, []);

  return null;
}
