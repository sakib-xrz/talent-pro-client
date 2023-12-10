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
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
      Candidate page coming soon...
    </div>
  );
}
