import { formatDate, formatText } from "@/common/UtilKit";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function ExperienceSection({ data }) {
  return (
    <div>
      <div>
        <h2 className="text-base font-semibold text-primary">Experience</h2>
      </div>

      <div className="space-y-4 pt-4">
        {data?.experiences?.length > 0 ? (
          data.experiences.map((experience) => (
            <div className="flex gap-4" key={experience._id}>
              <div className="flex items-start justify-center">
                <BriefcaseIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {experience?.designation || "Not set"}
                </h3>
                <p className="text-base font-medium">
                  {experience?.company_name || "Not set"} •{" "}
                  {formatText(experience?.job_type) || "Not Set"}
                </p>
                <p className="text-sm font-medium text-accent-foreground">
                  {formatDate(experience?.start_date) || "Not set"} -{" "}
                  {experience?.work_currently
                    ? "Present"
                    : experience?.end_date
                    ? formatDate(experience?.end_date)
                    : "Not set"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No experience found!</p>
        )}
      </div>
    </div>
  );
}
