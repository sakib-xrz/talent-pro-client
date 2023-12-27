"use client";

import {
  EmploymentType,
  ExperienceLevel,
  LocationType,
  SortOptions,
} from "@/common/KeyChain";
import { generateQueryString } from "@/common/UtilKit";
import SelectField from "@/components/form/SelectField";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { Transition } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function AllJobs() {
  const [expand, setExpand] = useState(false);
  const [params, setParams] = useState({
    search: "",
    job_type: "",
    location_type: "",
    experience_level: "",
    sortBy: "createdAt",
    sortOrder: "descending",
    page: "",
    limit: "",
  });

  const queryString = generateQueryString(params);
  console.log(queryString);

  return (
    <Container>
      <div className="space-y-4">
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
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
                <p className="hidden sm:block">Filters</p>
              </Button>
            </div>
          </div>
        </div>
        <Transition
          show={expand}
          enter="transition-all duration-500"
          enterFrom="opacity-0 translate-y-0"
          enterTo="opacity-100 translate-y-2"
          leave="transition-all duration-200"
          leaveFrom="opacity-100 translate-y-2"
          leaveTo="opacity-0 translate-y-0"
        >
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
        </Transition>
      </div>
    </Container>
  );
}
