"use client";

import {
  ChevronLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/form/DatePicker";
import { Input } from "@/components/ui/input";

export default function Step3Form({
  formik,
  handleCompleteStep3,
  handleBackToStep2,
}) {
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
            Step 3/4
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <h4 className="text-lg font-semibold">Education</h4>
          <div className="flex items-center gap-2 rounded-md bg-primary/10 p-2">
            <InformationCircleIcon className="h-5 w-5" />
            <p className="text-sm font-medium">You can skip this step</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-primary">Institute name</p>
            <div>
              <Input
                type="text"
                id="institute_name"
                name="education.institute_name"
                placeholder="e.g. California University"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.education.institute_name}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Degree</p>
            <div>
              <Input
                type="text"
                id="degree"
                name="education.degree"
                placeholder="e.g. Bachelor’s"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.education.degree}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Field of Study</p>
            <div>
              <Input
                type="text"
                id="major"
                name="education.major"
                placeholder="e.g. Computer Science & Engineering"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.education.major}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Location</p>
            <div>
              <Input
                type="text"
                id="education.location"
                name="education.location"
                placeholder="e.g. Dhaka, Bangladesh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.education.location}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="w-full space-y-2">
                <p className="font-medium text-primary">Start Date</p>
                <DatePicker
                  name="education.start_date"
                  id="education.start_date"
                  value={formik.values.education.start_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="w-full space-y-2">
                <p
                  className={`font-medium ${
                    formik.values?.education?.study_currently
                      ? "text-primary/30"
                      : "text-primary"
                  }`}
                >
                  End Date
                </p>
                <DatePicker
                  disabled={formik.values?.education?.study_currently}
                  name="education.end_date"
                  id="education.end_date"
                  value={formik.values.education.end_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="study_currently"
                name="education.study_currently"
                onChange={(e) => {
                  formik.handleChange(e);
                  if (e.target.checked) {
                    formik.setFieldValue("education.end_date", "");
                  }
                }}
                checked={formik.values.education.study_currently}
                className="accent-primary"
              />
              <label
                htmlFor="study_currently"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I currently study here
              </label>
            </div>
          </div>

          <div></div>
          <div className="border-t border-neutral-200 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToStep2}
                className="flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => handleCompleteStep3(formik.values)}>
                Save & Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
