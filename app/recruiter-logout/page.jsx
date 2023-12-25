"use client";

import { useStore } from "@/context/StoreProvider";
import { useEffect } from "react";

export default function RecruiterLogout() {
  const { logoutRecruiter } = useStore();

  useEffect(() => {
    logoutRecruiter();
  }, [logoutRecruiter]);

  return null;
}
