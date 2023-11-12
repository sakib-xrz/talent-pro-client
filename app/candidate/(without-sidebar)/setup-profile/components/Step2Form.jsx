"use client";

import { EmploymentType } from "@/common/KeyChain";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

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
          <p className="text-base text-accent-foreground">Step 2/3</p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <div className="space-y-2">
            <p className="font-medium text-primary">
              What’s your employment status?
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">
                Employment status
              </p>
              <div className="space-y-1">
                <RadioGroup
                  name={"employment_type"}
                  onValueChange={(value) =>
                    formik.setFieldValue("employment_type", value)
                  }
                  defaultValue={formik.values.employment_type || ""}
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
            <FormikErrorBox formik={formik} field="employment_type" />
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
