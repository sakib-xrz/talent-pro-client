"use client";

import { selectUser } from "@/redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Candidate() {
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isOnboardComplete === false) {
      router.push("/candidate/setup-profile");
    } else {
      router.push("/candidate");
    }
  }, [router, user.isOnboardComplete]);
  return <div className="text-gray-700">Candidate</div>;
}
