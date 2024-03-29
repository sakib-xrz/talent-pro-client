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
  LocationType,
  SortOptions,
} from "@/common/KeyChain";
import { formatText } from "@/common/UtilKit";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "@/components/ui/search";
import SelectField from "@/components/form/SelectField";

export default function CandidateJobSearchSortFilter({ params, setParams }) {
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
      page: "1",
    }));
  }, 500);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <div className="flex-grow">
          <Label>Search</Label>
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
        <div className="flex items-end gap-4">
          <div className="flex-grow">
            <Label>Sort By</Label>
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
              variant="outline"
              onClick={() => setExpand(!expand)}
              className={"w-fit gap-2 hover:bg-white"}
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
        <div className="grid grid-cols-1 gap-4 rounded-md border border-border bg-white p-5 lg:grid-cols-3">
          <div className="w-full">
            <SelectField
              options={ExperienceLevel}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  experience_level: SelectedOption?.value,
                  page: "1",
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
                  page: "1",
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
                  page: "1",
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
