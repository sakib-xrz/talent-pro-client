"use client";

import APIKit from "@/common/APIkit";
import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import { setJWTokenAndRedirect } from "@/common/UtilKit";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchMe = async () => {
    try {
      const { data } = await APIKit.me.getMe();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refetchMe = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchMe)
        .catch((error) => {
          console.log(error?.response);
        });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/login");
  };

  const userInfo = {
    user,
    fetchMe,
    refetchMe,
    logout,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
