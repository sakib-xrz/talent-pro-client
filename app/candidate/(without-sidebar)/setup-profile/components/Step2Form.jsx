"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { EmploymentType } from "@/common/KeyChain";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Step2Form({
  formik,
  handleCompleteStep2,
  handleBackToStep1,
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
            Step 2/4
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <h4 className="text-lg font-semibold">Work Experience</h4>
          <div className="space-y-2">
            <p className="font-medium text-primary">Company Name</p>
            <div>
              <Input
                type="text"
                id="company_name"
                name="experience.company_name"
                placeholder="e.g. Google"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.experience.company_name}
              />
            </div>
            <FormikErrorBox formik={formik} field="experience.company_name" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Designation</p>
            <div>
              <Input
                type="text"
                id="designation"
                name="experience.designation"
                placeholder="e.g. Product Designer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.experience.designation}
              />
            </div>
            <FormikErrorBox formik={formik} field="experience.designation" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Job type?</p>
            <div className="space-y-2">
              <div className="ml-2 space-y-1">
                <RadioGroup
                  name={"experience.job_type"}
                  onValueChange={(value) =>
                    formik.setFieldValue("experience.job_type", value)
                  }
                  defaultValue={formik.values.experience.job_type || ""}
                >
                  {EmploymentType.map((el, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={el.value} id={el.value} />
                      <Label htmlFor={el.value}>{el.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <FormikErrorBox formik={formik} field="experience.job_type" />
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
                        !formik.values.experience.start_date &&
                          "text-muted-foreground hover:bg-transparent",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.experience.start_date ? (
                        formik.values.experience.start_date
                      ) : (
                        <span>dd/mm/yy</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formik.values.experience.start_date}
                      onSelect={(newDate) => {
                        const formattedStartDate = format(
                          newDate,
                          "dd/MM/yyyy",
                        );
                        formik.setFieldValue(
                          "experience.start_date",
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
                    formik.values?.experience?.work_currently
                      ? "text-primary/30"
                      : "text-primary"
                  }`}
                >
                  End Date
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={formik.values?.experience?.work_currently}
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.experience.end_date &&
                          "text-muted-foreground hover:bg-transparent",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.experience.end_date ? (
                        formik.values.experience.end_date
                      ) : (
                        <span>dd/mm/yy</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formik.values.experience.end_date}
                      onSelect={(newDate) => {
                        const formattedEndDate = format(newDate, "dd/MM/yyyy");
                        formik.setFieldValue(
                          "experience.end_date",
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
                id="work_currently"
                name="experience.work_currently"
                onChange={formik.handleChange}
                checked={formik.values.experience.work_currently}
                className="accent-primary"
              />
              <label
                htmlFor="work_currently"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I currently work here
              </label>
            </div>
          </div>

          <div></div>
          <div className="border-t border-neutral-200 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToStep1}
                className="flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => handleCompleteStep2()}>
                Save & Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
