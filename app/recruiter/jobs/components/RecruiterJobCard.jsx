import Image from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { EyeIcon, ShareIcon, UsersIcon } from "@heroicons/react/24/outline";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobOptions } from "@/common/KeyChain";

export default function RecruiterJobCard() {
  return (
    <Card className={"space-y-4"}>
      <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row lg:items-center">
        <CardDescription>Posted 4 hours ago</CardDescription>
        <div className="flex items-center gap-6 ">
          <div className="flex items-center gap-2 text-primary">
            <EyeIcon className="h-5 w-5" />
            <CardDescription>0 Views</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <UsersIcon className="h-5 w-5" />
            <CardDescription>0 Applied</CardDescription>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={"/images/google.jpg"}
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
              Junior Software Developer
            </h3>
            <CardDescription className="line-clamp-1 sm:line-clamp-none">
              Google • Berlin, Germany
            </CardDescription>
          </div>
        </div>
        <div className="space-x-2">
          <Badge variant="secondary">Full time</Badge>
          <Badge variant="secondary">Onsite</Badge>
        </div>
      </div>
      <div>
        <SelectField
          options={JobOptions}
          defaultValue={{ label: "Published", value: "PUBLISHED" }}
        />
      </div>
      <div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Button variant="secondary" className="w-full gap-2">
            <div>
              <ShareIcon className="h-4 w-4" />
            </div>{" "}
            <p> Get Shared Link</p>
          </Button>
          <Button className="w-full">View Job Details</Button>
        </div>
      </div>
    </Card>
  );
}
