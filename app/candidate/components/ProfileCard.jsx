import { Card } from "@/components/ui/card";
import { useStore } from "@/context/StoreProvider";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { generateAge } from "@/common/UtilKit";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/shared/Container";
import APIKit from "@/common/APIkit";

export default function ProfileCard() {
  const { user } = useStore();

  const { data, isLoading } = useQuery({
    queryKey: ["my-info", user?.email],
    queryFn: () => APIKit.me.info.getInfo().then(({ data }) => data),
  });

  return (
    <div className="w-full lg:w-4/12">
      <Card>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 xs:flex-row">
              <Image
                height={200}
                width={200}
                alt=""
                src={user?.image_url || "/images/avatar.png"}
                className="h-28 w-28 shrink-0 rounded-full border border-border object-cover xs:h-16 xs:w-16"
              />

              <div className="text-center xs:text-left">
                <h3 className="text-md font-semibold sm:text-lg">
                  {user?.name?.first_name && user?.name?.last_name
                    ? `${user?.name?.first_name + " " + user?.name?.last_name}`
                    : "Not Set"}
                </h3>

                <p className="text-xs text-muted-foreground  sm:text-base">
                  {data?.current_company || data?.current_role ? (
                    `${data?.current_company} | ${data?.current_role}`
                  ) : (
                    <span className="lowercase first-letter:uppercase">
                      `${data?.gender} | ${generateAge(data?.date_of_birth)}`
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div>
              <h3 className="mt-6 text-lg font-semibold">Profile Strength</h3>
              <p className="text-sm text-muted-foreground">
                Congratulations! Your profile is complete. You're all set to
                attract recruiters!
              </p>

              <Link href="/candidate/my-profile/info" className="mt-3 block">
                <Button className="w-full xs:w-fit lg:w-full">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
