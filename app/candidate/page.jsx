"use client";

import Container from "@/components/shared/Container";
import { useStore } from "@/context/StoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Candidate() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (user?.isOnboardComplete === false) {
      router.push("/candidate/setup-profile");
    } else {
      router.push("/candidate/dashboard");
    }
  }, [router, user?.isOnboardComplete]);
  return <Container>Candidate page coming soon...</Container>;
}
