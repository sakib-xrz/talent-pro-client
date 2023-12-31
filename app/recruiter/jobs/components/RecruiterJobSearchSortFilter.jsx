import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

import {
  EmploymentType,
  ExperienceLevel,
  JobOptions,
  LocationType,
  SortOptions,
} from "@/common/KeyChain";
import { formatText } from "@/common/UtilKit";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import SelectField from "@/components/form/SelectField";

export default function RecruiterJobSearchSortFilter({ params, setParams }) {
  const [expand, setExpand] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const handleResetFilter = (paramName) => {
    setParams((prevParams) => ({
      ...prevParams,
      [paramName]: "",
    }));

    setExpand(false);
    router.replace(pathname);
  };

  const debounced = useDebouncedCallback((value) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: value,
    }));
  }, 500);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-grow">
          <Search
            value={searchKey}
            onChange={(e) => {
              debounced(e.target.value);
              setSearchKey(e.target.value);
            }}
            onReset={() => {
              setParams((prevParams) => ({
                ...prevParams,
                search: "",
              }));
              setSearchKey("");
            }}
            placeholder={"Search by job title..."}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-grow">
            <SelectField
              options={SortOptions}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  sortOrder: SelectedOption?.value,
                }))
              }
              value={SortOptions.find((el) => el.value === params.sortOrder)}
            />
          </div>
          <div>
            <Button
              onClick={() => setExpand(!expand)}
              className={"w-fit gap-2"}
            >
              <div>
                {expand ? (
                  <XMarkIcon className="h-4 w-4" />
                ) : (
                  <AdjustmentsHorizontalIcon className="h-4 w-4" />
                )}
              </div>
              <p className="hidden sm:block">Filters</p>
            </Button>
          </div>
        </div>
      </div>

      {expand && (
        <div className="grid grid-cols-1 gap-4 rounded-md border border-border bg-white p-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="w-full">
            <SelectField
              options={JobOptions}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  status: SelectedOption?.value,
                }))
              }
              value={JobOptions.find((el) => el.value === params.status)}
              placeholder={"Filter by job status"}
            />
          </div>
          <div className="w-full">
            <SelectField
              options={ExperienceLevel}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  experience_level: SelectedOption?.value,
                }))
              }
              value={ExperienceLevel.find(
                (el) => el.value === params.experience_level,
              )}
              placeholder={"Filter by experience level"}
            />
          </div>
          <div className="w-full">
            <SelectField
              options={EmploymentType}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  job_type: SelectedOption?.value,
                }))
              }
              value={EmploymentType.find((el) => el.value === params.job_type)}
              placeholder={"Filter by job type"}
            />
          </div>
          <div className="w-full">
            <SelectField
              options={LocationType}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  location_type: SelectedOption?.value,
                }))
              }
              value={LocationType.find(
                (el) => el.value === params.location_type,
              )}
              placeholder={"Filter by location type"}
            />
          </div>
        </div>
      )}

      {params.search && (
        <p className="truncate text-sm text-primary">
          Showing jobs for{" "}
          <span className="font-bold">{`"${params.search}"`}</span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {params.status && (
          <Badge
            size={"lg"}
            onClick={() => handleResetFilter("status")}
            variant="outline"
            className="group cursor-pointer space-x-1 hover:border-destructive hover:text-destructive"
          >
            <span>{formatText(params.status)}</span>
            <XMarkIcon className="h-4 w-4 group-hover:text-destructive" />
          </Badge>
        )}

        {params.experience_level && (
          <Badge
            size={"lg"}
            onClick={() => handleResetFilter("experience_level")}
            variant="outline"
            className="group cursor-pointer space-x-1 hover:border-destructive hover:text-destructive"
          >
            <span>{`${formatText(params.experience_level)} level`}</span>
            <XMarkIcon className="h-4 w-4 group-hover:text-destructive" />
          </Badge>
        )}

        {params.job_type && (
          <Badge
            size={"lg"}
            onClick={() => handleResetFilter("job_type")}
            variant="outline"
            className="group cursor-pointer space-x-1 hover:border-destructive hover:text-destructive"
          >
            <span>{formatText(params.job_type)}</span>
            <XMarkIcon className="h-4 w-4 group-hover:text-destructive" />
          </Badge>
        )}

        {params.location_type && (
          <Badge
            size={"lg"}
            onClick={() => handleResetFilter("location_type")}
            variant="outline"
            className="group cursor-pointer space-x-1 hover:border-destructive hover:text-destructive"
          >
            <span>{formatText(params.location_type)}</span>
            <XMarkIcon className="h-4 w-4 group-hover:text-destructive" />
          </Badge>
        )}
      </div>
    </div>
  );
}
