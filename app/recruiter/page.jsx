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
      <p className="mb-6">Recruiter page coming soon...</p>
      <Link href={"/recruiter/jobs/post-job"}>
        <Button>Post a Job</Button>
      </Link>
    </Container>
  );
}
