import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

import { ApplicationStatus, SortOptions } from "@/common/KeyChain";
import { formatText } from "@/common/UtilKit";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search } from "@/components/ui/search";
import SelectField from "@/components/form/SelectField";

export default function MyApplicationSearchSortFilter({ params, setParams }) {
  const [searchKey, setSearchKey] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const handleResetFilter = (paramName) => {
    setParams((prevParams) => ({
      ...prevParams,
      [paramName]: "",
    }));

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
      <div className="flex flex-col gap-2 xl:flex-row xl:gap-4">
        <div className="xl:w-7/12">
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

        <div className="flex flex-col items-center gap-2 xs:flex-row xl:w-5/12 xl:gap-4">
          <div className="w-full xl:w-6/12">
            <Label>Sort By Applied Time</Label>
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
          <div className="w-full xl:w-6/12">
            <Label>Filter by Application Status</Label>
            <SelectField
              placeholder={"Select status"}
              options={ApplicationStatus}
              onChange={(SelectedOption) => {
                console.log(SelectedOption);
                setParams((prevParams) => ({
                  ...prevParams,
                  status: SelectedOption === null ? "" : SelectedOption?.value,
                }));
              }}
              value={ApplicationStatus.find((el) => el.value === params.status)}
              isClearable
            />
          </div>
        </div>
      </div>

      {params.search && (
        <p className="truncate text-sm text-primary">
          Showing jobs for{" "}
          <span className="font-bold">{`"${params.search}"`}</span>
        </p>
      )}
    </div>
  );
}
