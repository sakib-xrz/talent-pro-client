"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import APIKit from "@/common/APIkit";
import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import { setJWTokenAndRedirect } from "@/common/UtilKit";

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

  const logoutRecruiter = () => {
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/recruiter-login");
  };

  const userInfo = {
    user,
    fetchMe,
    refetchMe,
    logout,
    logoutRecruiter,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
