"use client";

import {
  EmploymentType,
  ExperienceLevel,
  IndustryOptions,
  LocationType,
  WeekDay,
} from "@/common/KeyChain";
import CreatableSelectField from "@/components/form/CreatableSelectField";
import DatePicker from "@/components/form/DatePicker";
import SelectField from "@/components/form/SelectField";
import TimePicker from "@/components/form/TimePicker";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const initialValues = {
  job_title: "",
  job_description: "",
  industry: "",
  job_type: "",
  experience_level: "",
  years_of_experience: null,
  required_skills: [],
  location_type: "",
  address: "",
  start_day: "",
  end_day: "",
  start_time: "",
  end_time: "",
  deadline: "",
  num_of_vacancy: null,
  salary: {
    min: null,
    max: null,
  },
  is_negotiable: false,
};

export default function PostJob() {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      // const handleSuccess = () => {
      //   formik.resetForm();
      // };

      // const handleFailure = (error) => {
      //   console.log(error);
      //   throw error;
      // };

      // const promise = APIKit.job
      //   .postJob(values)
      //   .then(handleSuccess)
      //   .catch(handleFailure)
      //   .finally(() => setSubmitting(false));

      // return toast.promise(promise, {
      //   loading: "Loading...",
      //   success: "Profile setup successful!",
      //   error: "Something went wrong!",
      // });
    },
  });

  const handleIndustryChange = (selectedOption) => {
    formik.setFieldValue(
      "industry",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleEmploymentTypeChange = (selectedOption) => {
    formik.setFieldValue(
      "job_type",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleExperienceLevelChange = (selectedOption) => {
    formik.setFieldValue(
      "experience_level",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleLocationTypeChange = (selectedOption) => {
    formik.setFieldValue(
      "location_type",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleWeekDayChange = (selectedOption) => {
    formik.setFieldValue(
      "start_day",
      selectedOption ? selectedOption.value : "",
    );
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <h2 className="text-center text-2xl font-semibold text-primary ">
            Post a new Job
          </h2>
          <CardDescription className="text-justify">
            Add fundamental information about the job. This typically includes:{" "}
            <span className="font-semibold">
              Job Title, Job Description, Responsibilities
            </span>
            . Candidates will see this information when they are going to apply
            for the job.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-10">
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
                <DynamicQuill placeholder="e.g. Skills, Requirements, Responsibilities" />
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
                    onChange={handleIndustryChange}
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
                    onChange={handleEmploymentTypeChange}
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
                    onChange={handleExperienceLevelChange}
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
                  Years of Experience{" "}
                  <span className="text-destructive">*</span>
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
                      label:
                        obj.label.charAt(0).toUpperCase() + obj.label.slice(1),
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
                    onChange={handleLocationTypeChange}
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
                    onChange={handleWeekDayChange}
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
                    onChange={handleWeekDayChange}
                    value={WeekDay.find(
                      (el) => el.value === formik.values.end_day,
                    )}
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

            <div className="flex justify-end">
              <Button
                className={"w-full md:w-fit"}
                type="submit"
                isLoading={formik.isSubmitting}
                onClick={() => handleCompleteStep4(formik.values)}
              >
                Publish Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
