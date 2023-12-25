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
            src="/images/success-recruiter.png"
            className="h-fit w-fit"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-1 text-center">
            <p className="text-xl font-semibold text-primary md:text-2xl">
              Your Company has been created successfully!
            </p>
            <p className="text-muted-foreground">
              {"Now, let's create a job for your company."}
            </p>
          </div>

          <div className="flex gap-2">
            <Link href={"/recruiter"} className="flex w-full justify-center">
              <Button
                variant={"outline"}
                className="flex w-full justify-center px-6"
              >
                Go to Dashboard
              </Button>
            </Link>
            <Link
              href={"/recruiter/jobs/post-job"}
              className="flex w-full justify-center"
            >
              <Button className="flex w-full justify-center px-6">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
