"use client";

import { useStore } from "@/context/StoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Recruiter() {
  const router = useRouter();
  const { user, organization } = useStore();

  useEffect(() => {
    if (user?.isOnboardComplete === false) {
      router.push("/recruiter/setup-profile");
    } else {
      router.push("/recruiter");
    }
  }, [router, user?.isOnboardComplete]);

  console.log(organization);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:py-14">
      Recruiter page coming soon...
    </div>
  );
}
