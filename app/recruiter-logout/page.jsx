"use client";

import { useUser } from "@/context/UserProvider";
import { useEffect } from "react";

export default function RecruiterLogout() {
  const { logoutRecruiter } = useUser();

  useEffect(() => {
    logoutRecruiter();
  }, [logoutRecruiter]);

  return null;
}
