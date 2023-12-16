import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="rounded-2xl bg-white px-8 py-8 shadow">
      <div className="mx-auto space-y-6">
        <div className="mx-auto w-24">
          <Image
            height={400}
            width={400}
            alt=""
            src="/images/success-icon.svg"
            className="h-fit w-fit"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-1 text-center">
            <p className="text-xl font-semibold text-primary md:text-2xl">
              Your profile has been setup successfully!
            </p>
            <p className="text-muted-foreground">
              {"Now, let's find the right job for you."}
            </p>
          </div>

          <Link href={"/candidate"} className="flex w-full justify-center">
            <Button className="flex w-fit justify-center px-6">
              Explore Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
