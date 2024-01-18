"use client";

import Container from "@/components/shared/Container";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";
import ApplicantsTable from "./components/ApplicantsTable";

export default function RecruiterApplications() {
  return (
    <Container>
      <div className="space-y-4">
        <PageTitleWithButton title={"All Applicants"} />
        <div className="overflow-x-scroll rounded-md border border-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-[5px]">
          <ApplicantsTable />
        </div>
      </div>
    </Container>
  );
}
