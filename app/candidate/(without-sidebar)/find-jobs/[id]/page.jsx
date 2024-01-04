import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import banner_side from "@/public/images/job-details-side-image.png";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function CandidateJobDetails({ id }) {
  return (
    <div>
      <div className="bg-[url('/images/job-details-banner.png')] bg-cover">
        <Container>
          <Link href="/candidate/find-jobs">
            <div className="flex w-fit items-center gap-2 border-b border-transparent py-1 font-medium text-primary hover:border-primary">
              <ArrowLeftIcon className="h-5 w-5 " />
              <p>Go Back to Jobs</p>
            </div>
          </Link>

          <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-8 ">
            <div className="flex w-full flex-col gap-3 text-center md:gap-6 md:text-left">
              <div className="space-y-3 text-primary">
                <p className="text-2xl font-semibold lg:text-4xl">
                  Senior UI/ UX Designer <span>at</span>{" "}
                  <span className="capitalize">Google</span>
                </p>
                <p className="mx-auto max-w-xl text-sm md:mx-0 lg:text-base">
                  We are a global technology leader dedicated to organizing and
                  making the world's information universally accessible.
                </p>
              </div>
              <div className="flex justify-center md:justify-start">
                <p className="text-md flex w-fit gap-2 rounded-md bg-amber-100 px-2 py-1 text-left font-medium text-amber-500 lg:items-center">
                  <div>
                    <ExclamationTriangleIcon className="mt-0.5 h-3 w-3 lg:mt-0" />
                  </div>
                  <p className="text-xs">
                    Job temporarily on hold. Save this opportunity for future
                    updates.
                  </p>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Button variant="outline" className="hover:bg-white">
                  Save Job
                </Button>
                <Link
                  href={`/candidate/find-jobs/${id}/apply`}
                  className="w-fit"
                >
                  <Button>Apply Now</Button>
                </Link>
              </div>
            </div>
            <Image
              alt=""
              src={banner_side}
              placeholder="blur"
              className="w-auto"
              quality={100}
            />
          </div>
        </Container>
      </div>
      <Container>
        {/* <p className="text-md mx-auto flex w-fit items-center justify-center gap-2 rounded-md bg-amber-100 px-2 py-1 font-medium text-amber-500">
          <div>
            <ExclamationTriangleIcon className="h-5 w-5" />
          </div>
          Job temporarily on hold. Save this opportunity for future updates.
        </p> */}
      </Container>
    </div>
  );
}
