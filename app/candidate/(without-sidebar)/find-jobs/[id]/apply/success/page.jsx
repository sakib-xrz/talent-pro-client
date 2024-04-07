import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ApplySuccessPage() {
  return (
    <div className="mx-auto max-w-xl py-10 lg:py-14">
      <div className="rounded-2xl bg-white px-8 py-8 shadow">
        <div className="mx-auto space-y-6">
          <div className="mx-auto w-24">
            <Image
              height={400}
              width={400}
              alt=""
              src="/images/success-icon.png"
              className="h-fit w-fit"
            />
          </div>

          <div className="space-y-5">
            <div className="space-y-1 text-center">
              <p className="text-xl font-semibold text-primary md:text-2xl">
                Thank you for your application!
              </p>
              <p className="text-muted-foreground">
                We're currently reviewing all submissions and will be in touch
                soon.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href={"/candidate/my-applications"}
                className="block w-full"
              >
                <Button className="w-full" variant="outline">
                  Go to My Applications
                </Button>
              </Link>
              <Link href={"/candidate/find-jobs"} className="block w-full">
                <Button className="w-full">Explore Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
