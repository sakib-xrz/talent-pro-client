import { formatCurrency, formatDate, formatText } from "@/common/UtilKit";

import { Badge } from "@/components/ui/badge";

export default function JobInfoSection({ job }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Experience Level
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.experience_level
              ? `${formatText(job?.experience_level)} level`
              : "Job level not set"}
          </p>
        </div>
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Job Type
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.job_type
              ? `${formatText(job?.job_type)}`
              : "Job type not set"}
          </p>
        </div>
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Location Type
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.location_type
              ? `${formatText(job?.location_type)}`
              : "Location type not set"}
          </p>
        </div>
      </div>
      <div>
        <div className="space-y-2">
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Required Skills
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {job?.required_skills?.length
              ? job?.required_skills.map((skill) => (
                  <Badge variant="secondary" size="lg" key={skill._id}>
                    {skill.label}
                  </Badge>
                ))
              : "No skill required"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Working Days
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.start_day ? formatText(job?.start_day) : "Start day not set"}{" "}
            - {job?.end_day ? formatText(job?.end_day) : "End day not set"}
          </p>
        </div>
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Working Hours
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.working_hours
              ? `${parseInt(job?.working_hours)} hours`
              : "Working hours not set"}
          </p>
        </div>
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Minimum Experience
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.years_of_experience || "Not set"} year
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Number of Vacancy
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.num_of_vacancy || "Not set"}
          </p>
        </div>
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Deadline
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            {job?.deadline ? formatDate(job?.deadline) : "Not set"}
          </p>
        </div>
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            Salary or Compensation
          </h3>
          <p className="line-clamp-1 text-sm lg:line-clamp-none">
            ৳{" "}
            {job?.salary?.min
              ? formatCurrency(job?.salary?.min)
              : "Minimum salary not set"}{" "}
            - ৳{" "}
            {job?.salary?.max
              ? formatCurrency(job?.salary?.max)
              : "Maximum salary not set"}
          </p>
        </div>
      </div>
    </div>
  );
}
