import { ApplicationStatus } from "@/common/KeyChain";
import { formatDate, generateAge } from "@/common/UtilKit";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function CandidateSIdebarCard({ data }) {
  return (
    <Card className="h-fit !p-5 md:col-span-4 xl:col-span-3">
      <div class="space-y-6">
        <div class="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
              <Image
                src={data.user.image_url}
                width={100}
                height={100}
                alt="candidate-image"
                className="h-12 w-12 object-cover"
              />
            </div>

            <div>
              <p className="text-left font-semibold text-primary">
                {data.user?.name?.first_name && data.user?.name?.last_name
                  ? `${
                      data.user.name.first_name + " " + data.user.name.last_name
                    }`
                  : "Name not set"}
              </p>
              <p className="text-sm lowercase text-primary first-letter:uppercase">
                {data.candidate?.gender || "Gender not set"} &bull;{" "}
                {data.candidate?.date_of_birth
                  ? generateAge(data.candidate?.date_of_birth)
                  : "Age not set"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p>Applied on {formatDate(data.createdAt)}</p>

            <SelectField
              options={ApplicationStatus}
              value={ApplicationStatus.find((el) => el.value === data?.status)}
              onChange={(selectedOption) => {
                // router.push(selectedOption.value);
                console.log(selectedOption);
              }}
            />

            <Link href={data?.resume} target="_blank" className="block">
              <Button className="w-full">View Resume</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
