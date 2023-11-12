import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="flex aspect-[32/13] w-full items-center justify-center bg-[url('/images/home-banner.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="space-y-4 px-5 py-10 lg:space-y-8 lg:text-center">
        <div className="space-y-2 lg:space-y-4">
          <h1 className="max-w-xs text-2xl font-semibold text-primary-foreground sm:max-w-sm sm:text-3xl md:mx-auto md:max-w-md md:text-center lg:max-w-4xl lg:text-6xl">
            Connecting Opportunities and Empowering Careers
          </h1>
          <p className="max-w-xs text-sm text-primary-foreground sm:max-w-md md:mx-auto md:text-center lg:max-w-2xl lg:text-lg">
            Where Aspirations Meet Careers, and Recruiters Discover Exceptional
            Talent Your Gateway to Professional Excellence!
          </p>
        </div>
        <div className="hidden items-center justify-center gap-4 lg:flex">
          <Link href={"/register"}>
            <Button
              variant="outline"
              className="hover:bg-primary-foreground hover:text-primary"
            >
              Sign Up as Job Seeker
            </Button>
          </Link>
          <Link href={"/recruiter/register"}>
            <Button
              variant="outline"
              className="bg-transparent text-primary-foreground hover:bg-transparent hover:text-primary-foreground"
            >
              Sign Up as Recruiter
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap items-start justify-start gap-2 md:justify-center lg:hidden">
          <Link href={"/register"}>
            <Button
              size={"sm"}
              variant="outline"
              className="hover:bg-primary-foreground hover:text-primary"
            >
              Sign Up as Job Seeker
            </Button>
          </Link>
          <Link href={"/recruiter/register"}>
            <Button
              size={"sm"}
              variant="outline"
              className="bg-transparent text-primary-foreground hover:bg-transparent hover:text-primary-foreground"
            >
              Sign Up as Recruiter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
