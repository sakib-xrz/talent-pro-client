"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";
import {
  EmploymentType,
  ExperienceLevel,
  IndustryOptions,
  LocationType,
  WeekDay,
} from "@/common/KeyChain";
import { useStore } from "@/context/StoreProvider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Container from "@/components/shared/Container";
import CreatableSelectField from "@/components/form/CreatableSelectField";
import DatePicker from "@/components/form/DatePicker";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/form/SelectField";
import TimePicker from "@/components/form/TimePicker";

export default function PostJob() {
  const { user, organization } = useStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      createdBy: "",
      organization: "",
      job_title: "Frontend Developer",
      job_description:
        "<h3><strong>Job brief</strong></h3><p>We are looking for a qualified Front-end developer to join our IT team. You will be responsible for building the ‘client-side’ of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications.</p><p><br></p><h3><strong>Responsibilities</strong></h3><ul><li>Use markup languages like HTML to create user-friendly web pages</li><li>Maintain and improve website</li><li>Optimize applications for maximum speed</li><li>Design mobile-based features</li><li>Collaborate with back-end developers and web designers to improve usability</li><li>Get feedback from, and build solutions for, users and customers</li><li>Write functional requirement documents and guides</li><li>Create quality mockups and prototypes</li><li>Help back-end developers with coding and troubleshooting</li><li>Ensure high quality graphic standards and brand consistency</li><li>Stay up-to-date on emerging technologies</li></ul><p><br></p><h3><strong>Requirements and skills</strong></h3><ul><li>Proven work experience as a Front-end developer</li><li>Hands on experience with markup languages</li><li>Experience with JavaScript, CSS and jQuery</li><li>Familiarity with browser testing and debugging</li><li>In-depth understanding of the entire web development process (design, development and deployment)</li><li>Understanding of layout aesthetics</li><li>Knowledge of SEO principles</li><li>Familiarity with software like Adobe Suite, Photoshop and content management systems</li><li>An ability to perform well in a fast-paced environment</li><li>Excellent analytical and multitasking skills</li><li>BSc degree in Computer Science or relevant field</li></ul>",
      industry: "INFORMATION_TECHNOLOGY",
      job_type: "FULL_TIME",
      experience_level: "ENTRY",
      years_of_experience: 1,
      required_skills: [
        { label: "React", value: "REACT" },
        { label: "NextJs", value: "NEXTJS" },
        { label: "JavaScript", value: "JAVASCRIPT" },
        { label: "Tailwind Css", value: "TAILWIND_CSS" },
      ],
      location_type: "ONSITE",
      address: "Mirpur 10, Dhaka, Bangladesh",
      start_day: "MONDAY",
      end_day: "FRIDAY",
      start_time: "10:00",
      end_time: "19:00",
      deadline: "2023-12-31",
      num_of_vacancy: 5,
      salary: {
        min: 25000,
        max: 35000,
      },
      is_negotiable: true,
    },
    onSubmit: (values) => {
      setLoading(true);

      const handleSuccess = () => {
        formik.resetForm();
        router.push("/recruiter/jobs");
      };

      const handleFailure = (error) => {
        console.log(error);
        throw error;
      };

      const promise = APIKit.job
        .postJob(values)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Job published successful!",
        error: "Something went wrong!",
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("createdBy", user?._id);
    formik.setFieldValue("organization", organization?._id);
  }, [organization?._id, user?._id]);

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
          <h2 className="text-center text-3xl font-semibold text-primary ">
            Post a new Job
          </h2>
          <CardDescription>
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
                <DynamicQuill
                  placeholder="e.g. Skills, Requirements, Responsibilities"
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
                isLoading={loading}
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
