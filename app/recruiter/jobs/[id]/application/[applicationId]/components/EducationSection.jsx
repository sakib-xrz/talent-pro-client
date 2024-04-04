import { formatDate } from "@/common/UtilKit";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function EducationSection({ data }) {
  return (
    <div>
      <div>
        <h2 className="text-base font-semibold text-primary">Education</h2>
      </div>

      <div className="space-y-4 pt-4">
        {data?.educations?.length > 0 ? (
          data.educations.map((education) => (
            <div className="flex gap-4" key={education?._id}>
              <div className="flex items-start justify-center">
                <AcademicCapIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {education?.institute_name || "Not set"}
                </h3>
                <p className="text-base font-medium">
                  {education?.degree || "Not set"} •{" "}
                  {education?.major || "Not set"}
                </p>
                <p className="text-base font-medium">
                  {education?.location || "Not set"}
                </p>
                <p className="mt-2 text-sm font-medium text-accent-foreground">
                  {formatDate(education?.start_date) || "Not set"} -{" "}
                  {education?.study_currently
                    ? "Present"
                    : education?.end_date
                    ? formatDate(education?.end_date)
                    : "Not set"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No education found!</p>
        )}
      </div>
    </div>
  );
}
