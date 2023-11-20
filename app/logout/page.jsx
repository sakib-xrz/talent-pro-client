"use client";

import { useUser } from "@/context/UserProvider";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
