import Image from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { EyeIcon, ShareIcon, UsersIcon } from "@heroicons/react/24/outline";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecruiterJobCard() {
  return (
    <Card className={"space-y-4"}>
      <div className="flex items-center justify-between">
        <p>Posted 4 hours ago</p>
        <div className="flex items-center gap-6 ">
          <div className="flex items-center gap-2 text-primary">
            <EyeIcon className="h-6 w-6" />
            <p className="font-medium">0 Views</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <UsersIcon className="h-6 w-6" />
            <p className="font-medium">0 Applied</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={"/images/google.jpg"}
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="font-semibold text-primary">
              Junior Software Developer
            </h3>
            <CardDescription>Google • Berlin, Germany</CardDescription>
          </div>
        </div>
        <div className="space-x-2">
          <Badge variant="secondary">Full time</Badge>
          <Badge variant="secondary">Onsite</Badge>
        </div>
      </div>
      <div>
        <SelectField
          options={[{ label: "Published", value: "PUBLISHED" }]}
          defaultValue={{ label: "Published", value: "PUBLISHED" }}
        />
      </div>
      <div>
        <div className="flex gap-4">
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
