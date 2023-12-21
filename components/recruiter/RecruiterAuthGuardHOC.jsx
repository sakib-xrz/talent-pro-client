"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import { setJWTokenAndRedirect } from "@/common/UtilKit";
import { useUser } from "@/context/UserProvider";

export default function RecruiterAuthGuardHOC({ children }) {
  const { fetchMe, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchMe)
        .catch((error) => {
          console.log(error?.response);
          router.push("/recruiter-logout");
        });
    } else {
      const nextURL = { next: pathname };
      const queryParams = new URLSearchParams(nextURL).toString();
      router.push(`/recruiter-login?${queryParams}`);
    }
  }, []);

  return user?.email && user?.role === "recruiter" ? children : null;
}
