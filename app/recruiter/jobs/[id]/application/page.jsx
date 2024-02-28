"use client";

import APIKit from "@/common/APIkit";
import { ApplicationStatus } from "@/common/KeyChain";
import { formatDate, generateAge, generateQueryString } from "@/common/UtilKit";
import ApplicationSearchSortFilter from "@/components/application/ApplicationSearchSortFilter";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Select from "@/components/form/Select";
import Container from "@/components/shared/Container";
import DataTable from "@/components/shared/DataTable";
import EmptyState from "@/components/shared/EpmtyState";
import Pagination from "@/components/shared/Pagination";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplicationForJob({ params: { id } }) {
  const contents = [
    { href: "/recruiter/jobs", label: "Jobs" },
    { href: `/recruiter/jobs/${id}`, label: "Job Details" },
    { href: null, label: "Applicants" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "descending",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
  });

  const queryString = generateQueryString(params);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  const { data: applications, isLoading } = useQuery({
    queryKey: [`/we/job/${id}/applications${queryString}`],
    queryFn: () =>
      APIKit.we.job.application
        .getAllApplicationForJob(id, queryString)
        .then((data) => data),
  });

  const getDynamicEmptyStateTitle = () => {
    let title = "";
    if (params.search.length > 0) {
      return (title = `Couldn't find any application which job title is "${params.search}"`);
    }
    return "Couldn't find any applications";
  };

  const tableColumns = [
    {
      title: <p className="text-center">#</p>,
      renderer: (_, rowIndex) => (
        <p className="text-center font-semibold">{rowIndex + 1}</p>
      ),
    },
    {
      title: "Applicant",
      renderer: (data) => (
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src={data.user.image_url}
              width={48}
              height={48}
              alt="user-image"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-left font-semibold">
              {data.user?.name?.first_name && data.user?.name?.last_name
                ? `${
                    data.user.name.first_name + " " + data.user.name.last_name
                  }`
                : "Name not set"}
            </p>
            <p className="font-medium lowercase first-letter:uppercase">
              {data.candidate?.gender || "Gender not set"},{" "}
              {data.candidate?.date_of_birth
                ? generateAge(data.candidate?.date_of_birth)
                : "Age not set"}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Applied on",
      renderer: (data) => formatDate(data?.createdAt) || "Not available",
    },
    {
      title: "Contact Information",
      renderer: (data) => (
        <div onClick={(e) => e.stopPropagation()}>
          {data.user?.email ? (
            <Link
              href={`mailto:${data.user.email}`}
              className="line-clamp-1 hover:underline"
            >
              {data.user.email}
            </Link>
          ) : (
            <p className="line-clamp-1">Email not set</p>
          )}
          {data?.phone ? (
            <Link
              href={`tel:${data.phone}`}
              className="line-clamp-1 hover:underline"
            >
              {data.phone}
            </Link>
          ) : (
            <p className="line-clamp-1">Phone not set</p>
          )}
        </div>
      ),
    },
    {
      title: "Resume",
      renderer: (data) =>
        data?.resume ? (
          <Link
            href={data.resume}
            className="cursor-pointer font-semibold underline "
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </Link>
        ) : (
          "Resume not provided"
        ),
    },
    {
      title: "Address",
      renderer: (data) => (
        <p className="max-w-[240px] whitespace-normal">
          {data?.candidate?.location || "Not set"}
        </p>
      ),
    },
    {
      title: "Experience",
      renderer: (data) =>
        data?.years_of_experience < 1
          ? `${data?.years_of_experience} Year`
          : `${data?.years_of_experience} Years` || "0 Year",
    },
    {
      title: "Expected Salary",
      renderer: (data) => (
        <p>
          ৳ {data.candidate?.desired_salary?.min || 0} - ৳{" "}
          {data.candidate?.desired_salary?.max || 0}
        </p>
      ),
    },
    {
      title: "Status",
      renderer: (data) => (
        <div className="mx-auto w-52">
          <Select
            options={ApplicationStatus}
            value={data.status}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Container>
      <div className="space-y-4">
        <Breadcrumb contents={contents} />

        <ApplicationSearchSortFilter
          params={params}
          setParams={setParams}
          searchPlaceholder={"Search by applicant name, email or phone..."}
        />

        {isLoading ? (
          <div>Loading...</div>
        ) : applications?.meta?.total ? (
          <div className="space-y-4">
            <DataTable
              cols={tableColumns}
              data={applications.data}
              wrapperClassName="max-h-[calc(100vh-200px)] whitespace-nowrap font-medium"
              theadClassName="sticky top-0 z-10"
            />
            <Pagination
              params={params}
              setParams={setParams}
              dataLength={applications.meta.total}
            />
          </div>
        ) : (
          <EmptyState
            src="/empty/application-empty.svg"
            title={getDynamicEmptyStateTitle()}
            helperText="Once we found, you will see a list of applications."
          />
        )}
      </div>
    </Container>
  );
}
