import Banner from "@/components/pages/home/Banner";
import HeadingWithSubtitle from "@/components/shared/HeadingWithSubtitle";
import RootFooter from "@/components/shared/RootFooter";
import RootNavbar from "@/components/shared/RootNavbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
      <RootNavbar />
      <div className="space-y-6 lg:space-y-24">
        <Banner />
        <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-8 lg:space-y-14">
          <HeadingWithSubtitle
            title={"We have everything that you need"}
            subtitle={
              "Discover the Tools and Resources You Need to Land Your Dream Job"
            }
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <Card>
              <CardHeader>
                <SparklesIcon className="bg- h-10 w-10 rounded-md bg-sky-200 p-2 text-[#0369A1]" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">Jobs that Fit You</h4>
              </CardContent>
              <CardFooter>
                <p className="text-base">
                  Our smart recommendation engine matches you with jobs
                  perfectly suited to your skills, interests, and career
                  aspirations.
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <SparklesIcon className="bg- h-10 w-10 rounded-md bg-[#FFEDD5] p-2 text-[#1F2937]" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">Easy Apply</h4>
              </CardContent>
              <CardFooter>
                <p className="text-base">
                  {
                    "With our 'Easy Apply' feature, you can effortlessly submit your applications to multiple jobs in seconds."
                  }
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <SparklesIcon className="bg- h-10 w-10 rounded-md bg-[#EDE9FE] p-2 text-[#5B21B6]" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">Showcase Your Talents</h4>
              </CardContent>
              <CardFooter>
                <p className="text-base">
                  Build Your Professional Portfolio. Display your skills,
                  accomplishments, and experiences in one place.
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <SparklesIcon className="bg- h-10 w-10 rounded-md bg-[#ECFDF5] p-2 text-[#059669]" />
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold">Job Vault</h4>
              </CardContent>
              <CardFooter>
                <p className="text-base">
                  Never Lose Track of Your Next Big Opportunity. Save jobs you
                  love, and watch your career path unfold
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div></div>
      </div>
      <RootFooter />
    </>
  );
}
