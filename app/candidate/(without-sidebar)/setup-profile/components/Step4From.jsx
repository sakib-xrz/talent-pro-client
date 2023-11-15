"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreatableSelectField from "@/components/form/CreatableSelectField";

export default function Step4From({
  formik,
  handleCompleteStep4,
  handleBackToStep3,
}) {
  return (
    <div className="rounded-2xl bg-white shadow">
      <div className="mx-auto max-w-3xl">
        <div className="els-center flex justify-center border-b border-neutral-200 px-8 py-4 text-2xl font-semibold text-accent-foreground">
          <h2 className="text-center text-lg font-semibold text-neutral-700 sm:text-left md:text-2xl">
            Set up your profile
          </h2>
        </div>
        <div className="els-start flex flex-col justify-start gap-1 p-4 sm:p-8">
          <p className="text-base font-medium text-accent-foreground">
            Step 4/4
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <h4 className="text-lg font-semibold">Skills and Expertise</h4>
          <div className="space-y-2">
            <p className="font-medium text-primary">Add Skills</p>
            <div>
              <CreatableSelectField
                id="skills"
                name="skills"
                placeholder="e.g. Python, React"
                // options={IndustryOptions}
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
            <FormikErrorBox formik={formik} field="education.institute_name" />
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
            <FormikErrorBox formik={formik} field="education.degree" />
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
            <FormikErrorBox formik={formik} field="education.major" />
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
            <FormikErrorBox formik={formik} field="education.location" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="w-full space-y-2">
                <p className="font-medium text-primary">Start Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.education.start_date &&
                          "text-muted-foreground hover:bg-transparent",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.education.start_date ? (
                        formik.values.education.start_date
                      ) : (
                        <span>dd/mm/yy</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formik.values.education.start_date}
                      onSelect={(newDate) => {
                        const formattedStartDate = format(
                          newDate,
                          "dd/MM/yyyy",
                        );
                        formik.setFieldValue(
                          "education.start_date",
                          formattedStartDate,
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={formik.values?.education?.study_currently}
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.education.end_date &&
                          "text-muted-foreground hover:bg-transparent",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.education.end_date ? (
                        formik.values.education.end_date
                      ) : (
                        <span>dd/mm/yy</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formik.values.education.end_date}
                      onSelect={(newDate) => {
                        const formattedEndDate = format(newDate, "dd/MM/yyyy");
                        formik.setFieldValue(
                          "education.end_date",
                          formattedEndDate,
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="study_currently"
                name="education.study_currently"
                onChange={formik.handleChange}
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
                onClick={handleBackToStep3}
                className="flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => handleCompleteStep4()}>
                Save & Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
