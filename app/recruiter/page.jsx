"use client";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/StoreProvider";
import Link from "next/link";
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
    <Container>
      <Link
        href={"/recruiter/jobs/post-job"}
        className="flex w-full justify-center"
      >
        <Button className="flex w-full justify-center px-6">Post a Job</Button>
      </Link>
    </Container>
  );
}
