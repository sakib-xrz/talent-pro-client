import {
  EmploymentType,
  ExperienceLevel,
  LocationType,
  SortOptions,
} from "@/common/KeyChain";

import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function RecruiterJobSearchSortFilter({ params, setParams }) {
  const [expand, setExpand] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-grow">
          <Search
            value={params.search}
            onChange={(e) =>
              setParams((prevParams) => ({
                ...prevParams,
                search: e?.target?.value,
              }))
            }
            onReset={() => {
              setParams((prevParams) => ({
                ...prevParams,
                search: "",
              }));
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
              defaultValue={{ label: "Newest", value: "descending" }}
            />
          </div>
          <div>
            <Button
              onClick={() => setExpand(!expand)}
              className={"w-fit gap-2"}
            >
              <div>
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
              </div>
              <p className="hidden sm:block">Filters</p>
            </Button>
          </div>
        </div>
      </div>

      {expand && (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <SelectField
              options={EmploymentType}
              onChange={(SelectedOption) =>
                setParams((prevParams) => ({
                  ...prevParams,
                  job_type: SelectedOption?.value,
                }))
              }
              value={EmploymentType.filter(
                (el) => el.value === params.job_type,
              )}
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
              value={LocationType.filter(
                (el) => el.value === params.location_type,
              )}
              placeholder={"Filter by location type"}
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
              value={ExperienceLevel.filter(
                (el) => el.value === params.experience_level,
              )}
              placeholder={"Filter by experience level"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
