"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();
  const pathName = usePathname();

  const handleBackToHome = () => {
    if (pathName.split("/").includes("recruiter")) {
      router.push("/recruiter");
    } else if (pathName.split("/").includes("candidate")) {
      router.push("/candidate");
    } else if (pathName.split("/").includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleBackToHome();
    }, 5000);
  }, [handleBackToHome]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 px-4 md:px-0">
      <Image
        className="w-96 object-cover"
        src="/images/404.svg"
        priority
        height={500}
        width={500}
        alt="404"
      />
      <h2 className="text-center font-semibold text-gray-700 ">
        It looks like the page you are looking for has been removed or does not
        exist.
      </h2>
      <Button variant="secondary" onClick={handleBackToHome}>
        Go Back to Home
      </Button>
    </div>
  );
}
