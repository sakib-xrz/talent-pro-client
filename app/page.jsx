import { SparklesIcon } from "@heroicons/react/24/outline";

import Banner from "@/components/pages/home/Banner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import HeadingWithSubtitle from "@/components/shared/HeadingWithSubtitle";
import RootFooter from "@/components/shared/RootFooter";
import RootNavbar from "@/components/shared/RootNavbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const feature = [
  {
    id: 1,
    title: "Jobs that Fit You",
    details:
      "Our smart recommendation engine matches you with jobs perfectly suited to your skills, interests, and career aspirations.",
    logo_color: "text-sky-700 bg-sky-100",
  },
  {
    id: 2,
    title: "Easy Apply",
    details:
      "With our 'Easy Apply' feature, you can effortlessly submit your applications to multiple jobs in seconds.",
    logo_color: "text-orange-700 bg-orange-100",
  },
  {
    id: 3,
    title: "Showcase Your Talents",
    details:
      "Build Your Professional Portfolio. Display your skills, accomplishments, and experiences in one place.",
    logo_color: "text-purple-700 bg-purple-100",
  },
  {
    id: 4,
    title: "Job Vault",
    details:
      "Never Lose Track of Your Next Big Opportunity. Save jobs you love, and watch your career path unfold.",
    logo_color: "text-emerald-700 bg-emerald-100",
  },
];

const steps = [
  {
    id: 1,
    name: "Set up Company profile",
    details: "Craft your company's online presence to attract top talent",
  },
  {
    id: 2,
    name: "Post Jobs",
    details: "Create and customize your job posts as needed",
  },
  {
    id: 3,
    name: "Manage Applications",
    details:
      "Track, review, and manage job applications to find your ideal candidate",
  },
  {
    id: 4,
    name: "Hire Talents",
    details: "Get the best talents on board",
  },
];

export default function Home() {
  return (
    <>
      <RootNavbar />
      <div className="space-y-12 lg:space-y-24">
        <Banner />
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-8 lg:space-y-14">
          <HeadingWithSubtitle
            title={"We have everything that you need"}
            subtitle={
              "Discover the Tools and Resources You Need to Land Your Dream Job"
            }
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {feature.map((el) => (
              <Card key={el.id}>
                <CardHeader className="pb-3">
                  <SparklesIcon
                    className={`h-10 w-10 rounded-md p-2 ${el.logo_color}`}
                  />
                </CardHeader>
                <CardContent className="pb-2">
                  <h4 className="text-lg font-semibold lg:text-xl">
                    {el.title}
                  </h4>
                </CardContent>
                <CardFooter>
                  <p className="text-muted-foreground">{el.details}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-accent">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row-reverse sm:items-center sm:px-8">
            <div className="sm:w-1/2">
              <Image
                height={500}
                width={500}
                src="/images/start-apply.webp"
                alt=""
                className="aspect-auto w-full rounded-lg object-cover object-center"
              />
            </div>
            <div className="sm:1/2 space-y-2 md:space-y-6">
              <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                Start Applying today
              </h2>
              <p className="text-base sm:max-w-md">
                Transform your job search into a journey of success. Get started
                today and open doors to new opportunities
              </p>
              <div className="pt-2">
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-8 lg:space-y-14">
          <HeadingWithSubtitle
            title={"Simplifying Your Hiring Journey"}
            subtitle={
              "Follow our Simple Steps to Start Hiring Top Talent and Growing Your Team"
            }
          />
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2">
              <Image
                height={500}
                width={500}
                src="/images/recruiter.webp"
                alt=""
                className="h-auto w-full rounded-lg object-cover object-center"
              />
            </div>
            <div className="space-y-5 sm:w-1/2">
              {steps.map((el) => (
                <div key={el.id} className="flex items-start gap-6">
                  <span>
                    <SparklesIcon className="h-12 w-12 rounded-md bg-accent p-2" />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold lg:text-xl">
                      {el.name}
                    </h4>
                    <p className="max-w-sm text-muted-foreground sm:line-clamp-1 lg:line-clamp-none">
                      {el.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-accent">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row-reverse sm:items-center sm:px-8">
            <div className="sm:w-1/2">
              <Image
                height={500}
                width={500}
                src="/images/start-hire.webp"
                alt=""
                className="aspect-auto w-full rounded-lg object-cover object-center"
              />
            </div>
            <div className="sm:1/2 space-y-2 md:space-y-6">
              <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                Start Hiring today
              </h2>
              <p className="text-base sm:max-w-md">
                Join the future of recruitment and take the first step towards
                building your dream team.
              </p>
              <div className="pt-2">
                <Link href="/recruiter-register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-8 lg:space-y-14">
          <HeadingWithSubtitle title={"Why choose Talent Pro to hire talent"} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4 border-l-2 pl-8">
              <SparklesIcon className="h-12 w-12 rounded-md bg-sky-100 p-2 text-sky-700" />

              <h4 className="text-lg font-semibold lg:text-xl">Time Saving</h4>
              <p className="text-muted-foreground">
                Our recruitment tool is designed to put time back in your hands.
                Say goodbye to lengthy, manual processes, and hello to a
                streamlined, efficient solution.
              </p>
            </div>

            <div className="space-y-4 border-l-2 pl-8">
              <SparklesIcon className="h-12 w-12 rounded-md bg-sky-100 p-2 text-sky-700" />

              <h4 className="text-lg font-semibold lg:text-xl">Time Saving</h4>
              <p className="text-muted-foreground">
                Our recruitment tool is designed to put time back in your hands.
                Say goodbye to lengthy, manual processes, and hello to a
                streamlined, efficient solution.
              </p>
            </div>

            <div className="space-y-4 border-l-2 pl-8">
              <SparklesIcon className="h-12 w-12 rounded-md bg-sky-100 p-2 text-sky-700" />

              <h4 className="text-lg font-semibold lg:text-xl">Time Saving</h4>
              <p className="text-muted-foreground">
                Our recruitment tool is designed to put time back in your hands.
                Say goodbye to lengthy, manual processes, and hello to a
                streamlined, efficient solution.
              </p>
            </div>
          </div>
        </div>

        <div></div>
      </div>
      <RootFooter />
    </>
  );
}
