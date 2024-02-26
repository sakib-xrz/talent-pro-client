import { CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  EmploymentType,
  ExperienceLevel,
  IndustryOptions,
  LocationType,
  WeekDay,
} from "@/common/KeyChain";

import { Button } from "@/components/ui/button";

import CreatableSelectField from "@/components/form/CreatableSelectField";
import DatePicker from "@/components/form/DatePicker";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/form/SelectField";
import TimePicker from "@/components/form/TimePicker";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useFormik } from "formik";

import { pickDifference } from "@/common/UtilKit";
import APIKit from "@/common/APIkit";

export default function EditJobFrom({ job }) {
  const initialValues = {
    createdBy: job.createdBy._id || "",
    organization: job.organization._id || "",
    job_title: job.job_title || "",
    job_description: job.job_description || "",
    industry: job.organization.industry || "",
    job_type: job.job_type || "",
    experience_level: job.experience_level || "",
    years_of_experience: job.years_of_experience || 0,
    required_skills: job.required_skills || [],
    location_type: job.location_type || "",
    address: job.address || "",
    start_day: job.start_day || "",
    end_day: job.end_day || "",
    start_time: job.start_time || "",
    end_time: job.end_time || "",
    deadline: job.deadline || "",
    num_of_vacancy: job.num_of_vacancy || 0,
    salary: {
      min: job.salary.min || 0,
      max: job.salary.max || 0,
    },
    is_negotiable: job.is_negotiable || false,
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setLoading(true);

      const handleSuccess = () => {
        router.push(`/recruiter/jobs/${job._id}`);
      };

      const handleFailure = (error) => {
        console.log(error);
        throw error;
      };

      const payload = pickDifference(initialValues, values);

      const promise = APIKit.we.job
        .updateJob(job._id, payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Job update successful!",
        error: (error) => error.message,
      });
    },
  });

  const handleFieldChange = (fieldName, selectedOption) => {
    formik.setFieldValue(fieldName, selectedOption ? selectedOption.value : "");
  };

  return (
    <CardContent className="mt-5">
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <p className="font-medium text-primary">
            Job Title <span className="text-destructive">*</span>
          </p>
          <div>
            <Input
              type="text"
              id="job_title"
              name="job_title"
              placeholder="e.g. Product Designer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job_title}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-primary">
            Job Description <span className="text-destructive">*</span>
          </p>
          <div>
            <DynamicQuill
              placeholder="e.g. Skills, Requirements, Responsibilities"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
                clipboard: {
                  matchVisual: false,
                },
              }}
              theme="snow"
              value={formik.values.job_description}
              onChange={(value) =>
                formik.setFieldValue("job_description", value)
              }
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Industry <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="industry"
                name="industry"
                placeholder="e.g. Information Technology"
                options={IndustryOptions}
                onChange={(selectedOption) =>
                  handleFieldChange("industry", selectedOption)
                }
                value={IndustryOptions.find(
                  (el) => el.value === formik.values.industry,
                )}
                onBlur={formik.handleBlur}
                isSearchable
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Job Type <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="job_type"
                name="job_type"
                placeholder="e.g. Full Time"
                options={EmploymentType}
                onChange={(selectedOption) =>
                  handleFieldChange("job_type", selectedOption)
                }
                value={EmploymentType.find(
                  (el) => el.value === formik.values.job_type,
                )}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Experience Level <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="experience_level"
                name="experience_level"
                placeholder="e.g. Senior Level"
                options={ExperienceLevel}
                onChange={(selectedOption) =>
                  handleFieldChange("experience_level", selectedOption)
                }
                value={ExperienceLevel.find(
                  (el) => el.value === formik.values.experience_level,
                )}
                onBlur={formik.handleBlur}
                isSearchable
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Years of Experience <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="number"
                id="years_of_experience"
                name="years_of_experience"
                placeholder="e.g. 3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.years_of_experience}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-primary">
            Required Skills <span className="text-destructive">*</span>
          </p>
          <div>
            <CreatableSelectField
              id="required_skills"
              name="required_skills"
              placeholder="e.g. Python, React"
              onChange={(selectedOption) => {
                const skills = selectedOption.map((obj) => ({
                  label: obj.label.charAt(0).toUpperCase() + obj.label.slice(1),
                  value: obj.value.toUpperCase().replace(/\s+/g, "_"),
                }));
                formik.setFieldValue("required_skills", skills);
              }}
              value={formik.values.required_skills}
              onBlur={formik.handleBlur}
              isClearable
              isMulti
              isSearchable
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Location Type <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="location_type"
                name="location_type"
                placeholder="e.g. Onsite"
                options={LocationType}
                onChange={(selectedOption) =>
                  handleFieldChange("location_type", selectedOption)
                }
                value={LocationType.find(
                  (el) => el.value === formik.values.location_type,
                )}
                onBlur={formik.handleBlur}
                isSearchable
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Address <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="e.g. Dhaka, Bangladesh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Weekly Start Day <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="start_day"
                name="start_day"
                placeholder="e.g. Monday"
                options={WeekDay}
                onChange={(selectedOption) =>
                  handleFieldChange("start_day", selectedOption)
                }
                value={WeekDay.find(
                  (el) => el.value === formik.values.start_day,
                )}
                onBlur={formik.handleBlur}
                isSearchable
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Weekly End Day <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="end_day"
                name="end_day"
                placeholder="e.g. Friday"
                options={WeekDay}
                onChange={(selectedOption) =>
                  handleFieldChange("end_day", selectedOption)
                }
                value={WeekDay.find((el) => el.value === formik.values.end_day)}
                onBlur={formik.handleBlur}
                isSearchable
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Office Start Time <span className="text-destructive">*</span>
            </p>
            <div>
              <TimePicker
                name="start_time"
                id="start_time"
                value={formik.values.start_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Office End Time <span className="text-destructive">*</span>
            </p>
            <div>
              <TimePicker
                name="end_time"
                id="end_time"
                value={formik.values.end_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Set a Deadline <span className="text-destructive">*</span>
            </p>
            <div>
              <DatePicker
                name="deadline"
                id="deadline"
                value={formik.values.deadline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Number of Vacancy <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="number"
                id="num_of_vacancy"
                name="num_of_vacancy"
                placeholder="e.g. 10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.num_of_vacancy}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Minimum Expected Salary{" "}
              <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="number"
                id="salary.min"
                name="salary.min"
                placeholder="e.g. 50,000 BDT"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary.min}
              />
            </div>
          </div>
          <div className="w-full space-y-2 md:w-1/2">
            <p className="font-medium text-primary">
              Maximum Expected Salary{" "}
              <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="number"
                id="salary.max"
                name="salary.max"
                placeholder="e.g. 75,000 BDT"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary.max}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_negotiable"
              name="is_negotiable"
              onChange={formik.handleChange}
              checked={formik.values.is_negotiable}
              className="accent-primary"
            />
            <label
              htmlFor="is_negotiable"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Negotiable
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link
            href={`/recruiter/jobs/${job._id}`}
            className="block w-full md:w-fit"
          >
            <Button
              className={"w-full md:w-fit"}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </Link>
          <Button
            className={"w-full md:w-fit"}
            type="submit"
            isLoading={loading}
            disabled={job.total_applications}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
