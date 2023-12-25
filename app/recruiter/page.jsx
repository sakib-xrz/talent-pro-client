"use client";

import Container from "@/components/shared/Container";
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

  return <Container>Recruiter page coming soon...</Container>;
}
