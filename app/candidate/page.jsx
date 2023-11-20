"use client";

import { useUser } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Candidate() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user?.isOnboardComplete === false) {
      router.push("/candidate/setup-profile");
    } else {
      router.push("/candidate");
    }
  }, [router, user?.isOnboardComplete]);
  return <div className="text-gray-700">Candidate</div>;
}
