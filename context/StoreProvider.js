"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import APIKit from "@/common/APIkit";
import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import { setJWTokenAndRedirect } from "@/common/UtilKit";
import { toast } from "sonner";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);

  const fetchMe = async (role) => {
    try {
      const { data } = await APIKit.me.getMe();
      if (data) {
        if (data.role !== role) {
          toast.error("You Don't have permission to access this.");
          router.push(role === "recruiter" ? "/recruiter-logout" : "/logout");
        }
        setUser(data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      router.push("/logout");
    }
  };

  const fetchWe = async () => {
    try {
      const { data } = await APIKit.we.getWe();
      if (data) {
        setOrganization(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refetchMe = (role) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchMe(role))
        .catch((error) => {
          console.log(error?.response);
        });
    }
  };

  const refetchWe = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchWe)
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
    organization,
    fetchMe,
    fetchWe,
    refetchMe,
    refetchWe,
    logout,
    logoutRecruiter,
  };

  return (
    <StoreContext.Provider value={userInfo}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => {
  return useContext(StoreContext);
};
