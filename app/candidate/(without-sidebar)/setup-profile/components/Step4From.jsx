"use client";

import {
  ChevronLeftIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useStore } from "@/context/StoreProvider";

import { Button } from "@/components/ui/button";
import CreatableSelectField from "@/components/form/CreatableSelectField";
import FileUpload from "@/components/form/FileUpload";
import { Input } from "@/components/ui/input";

export default function Step4From({
  formik,
  handleCompleteStep4,
  handleBackToStep3,
  loading,
}) {
  const { user } = useStore();
  const { resume, resume_preview } = formik.values || {};

  const handleFileUpload = (e) => {
    formik.setFieldValue("resume", e.target.files[0]);
    URL.createObjectURL(e.target.files[0]);
    formik.setFieldValue(
      "resume_preview",
      URL.createObjectURL(e.target.files[0]),
    );
  };

  return (
    <div className="rounded-2xl bg-white shadow">
      <div className="mx-auto max-w-3xl">
        <div className=" flex justify-center border-b border-neutral-200 px-8 py-4 text-2xl font-semibold text-accent-foreground">
          <h2 className="text-center text-lg font-semibold text-neutral-700 sm:text-left md:text-2xl">
            Set up your profile
          </h2>
        </div>
        <div className="els-start flex flex-col justify-start gap-1 p-4 sm:p-8">
          <p className="text-base font-medium text-accent-foreground">
            Step 4/4
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 ">
          <h4 className="text-lg font-semibold">Skills and Expertise</h4>
          <div className="space-y-2">
            <p className="font-medium text-primary">
              Add Skills <span className="text-destructive">*</span>
            </p>
            <div>
              <CreatableSelectField
                id="skills"
                name="skills"
                placeholder="e.g. Python, React"
                onChange={(selectedOption) => {
                  const skills = selectedOption.map((obj) => ({
                    label:
                      obj.label.charAt(0).toUpperCase() + obj.label.slice(1),
                    value: obj.value.toUpperCase().replace(/\s+/g, "_"),
                  }));
                  formik.setFieldValue("skills", skills);
                }}
                value={formik.values.skills}
                onBlur={formik.handleBlur}
                isClearable
                isMulti
                isSearchable
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Portfolio</p>
            <div>
              <Input
                type="text"
                id="portfolio"
                name="portfolio"
                placeholder="e.g. www.example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.portfolio}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              {resume_preview && resume
                ? "Attached File"
                : "Upload Your Resume"}{" "}
              <span className="text-destructive">*</span>
            </p>
            <div>
              {resume_preview && resume ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div className="flex items-center gap-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-input/50">
                        <DocumentTextIcon className="h-6 w-6 text-primary" />
                      </div>
                      <p>{resume?.name}</p>
                    </div>
                    <XMarkIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => {
                        formik.setFieldValue("resume", "");
                        formik.setFieldValue("resume_preview", "");
                      }}
                    />
                  </div>
                </div>
              ) : (
                <FileUpload
                  id="resume"
                  name="resume"
                  htmlFor="resume"
                  title="Select and upload your resume"
                  helperText="Supported only PDF up to 10 mb"
                  accept=".pdf"
                  onChange={handleFileUpload}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              What is your desired salary?{" "}
              <span className="text-destructive">*</span>
            </p>
            <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="desired_salary.min"
                  name="desired_salary.min"
                  placeholder="Set min range"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.desired_salary.min}
                />
              </div>
              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="desired_salary.max"
                  name="desired_salary.max"
                  placeholder="Set max range"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.desired_salary.max}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="open_to_work_remotely"
                name="open_to_work_remotely"
                onChange={formik.handleChange}
                checked={formik.values.open_to_work_remotely}
                className="accent-primary"
              />
              <label
                htmlFor="open_to_work_remotely"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Open to working remotely
              </label>
            </div>
          </div>

          <div></div>
          <div className="border-t border-neutral-200 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToStep3}
                className="flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Back
              </Button>
              {user?.isOnboardComplete ? (
                <Button type="button" disabled>
                  Setup Completed
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={loading}
                  onClick={() => handleCompleteStep4(formik.values)}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
