import Link from "next/link";

import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  EnvelopeIcon,
  InboxStackIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "@/common/UtilKit";

export default function InfoSection({ data }) {
  return (
    <div>
      <div>
        <h2 className="text-base font-semibold text-primary">About</h2>
      </div>
      <div className="space-y-2 pt-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3">
            <div>
              <EnvelopeIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-primary">
                Email Address
              </h1>
              {data?.user?.email ? (
                <Link
                  href={`mailto:${data?.user?.email}`}
                  className="text-base font-medium text-primary hover:underline"
                >
                  {data?.user?.email}
                </Link>
              ) : (
                <p className="text-base font-medium text-primary">Not set</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div>
              <PhoneIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-primary">Phone</h1>
              <p className="text-base font-medium text-primary">
                {data?.phone ? (
                  <Link
                    href={`tel:${data?.phone}`}
                    className="text-base font-medium text-primary hover:underline"
                  >
                    {data?.phone}
                  </Link>
                ) : (
                  <p className="text-base font-medium text-primary">Not set</p>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <BriefcaseIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-primary">
                Work Experience
              </h1>
              <p className="text-base font-medium text-primary">
                {data?.years_of_experience !== undefined
                  ? data?.years_of_experience < 1
                    ? "0 year"
                    : data?.years_of_experience === 1
                    ? "1 year"
                    : data?.years_of_experience + " years"
                  : "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div>
              <BuildingOffice2Icon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-primary">
                Current Company
              </h1>
              <p className="text-base font-medium text-primary">
                {data?.current_company || "Not Provided"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div>
              <InboxStackIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-primary">Current Role</h1>
              <p className="text-base font-medium text-primary">
                {data?.current_role || "Not Provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div>
              <CalendarIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium text-primary">
                Date of Birth
              </h3>
              <span className="text-base font-medium">
                {data?.candidate?.date_of_birth
                  ? formatDate(data?.candidate?.date_of_birth)
                  : "Not Set"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <MapPinIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-primary">Location</h1>
              <p className="text-base font-medium text-primary">
                {data?.candidate?.location || "Not Provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
