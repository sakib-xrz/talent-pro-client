import Container from "@/components/shared/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function BannerSectionSkeleton() {
  return (
    <Container>
      <div>
        <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-8 ">
          <div className="flex w-full flex-col gap-3 md:gap-6 md:text-left">
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start">
                <Skeleton className="h-10 w-10/12 md:mr-auto" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-center md:justify-start">
                  <Skeleton className="h-4 w-9/12 " />
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-2 md:justify-start">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>

          <div className="w-full">
            <Skeleton className="h-52 w-full md:ml-auto md:h-60 md:w-10/12 lg:h-72"></Skeleton>
          </div>
        </div>
      </div>
    </Container>
  );
}
