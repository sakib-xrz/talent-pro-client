"use client";

import { EmployStatus, IndustryOptions } from "@/common/KeyChain";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "@/components/ui/phone";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Step1Form({ formik, handleCompleteStep1 }) {
  const handleIndustryChange = (selectedOption) => {
    formik.setFieldValue(
      "industry",
      selectedOption ? selectedOption.value : "",
    );
  };

  return (
    <div className="rounded-2xl bg-white shadow">
      <div className="mx-auto max-w-3xl">
        <div className="els-center flex justify-center border-b border-neutral-200 px-8 py-4 text-2xl font-semibold text-accent-foreground">
          <h2 className="text-center text-lg font-semibold text-neutral-700 sm:text-left md:text-2xl">
            Set up your profile
          </h2>
        </div>
        <div className="els-start flex flex-col justify-start gap-1 p-4 sm:p-8">
          <p className="text-base text-accent-foreground">Step 1/3</p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <h4 className="text-lg font-semibold">Personal Information</h4>
          <div className="space-y-2">
            <p className="font-medium text-primary">Your phone number</p>
            <div>
              <Phone
                id="phone"
                name="phone"
                placeholder="01XXX-XXXXXX"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
            <FormikErrorBox formik={formik} field="phone" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Company Name</p>
            <div>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Dhaka, Bangladesh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
              />
            </div>
            <FormikErrorBox formik={formik} field="location" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">What’s your industry?</p>
            <div>
              <SelectField
                id="industry"
                name="industry"
                placeholder="Select Your Industry"
                options={IndustryOptions}
                onChange={handleIndustryChange}
                value={IndustryOptions.find(
                  (el) => el.value === formik.values.industry,
                )}
                onBlur={formik.handleBlur}
                isClearable
                isSearchable
              />
            </div>
            <FormikErrorBox formik={formik} field="industry" />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">What’s your job status?</p>
            <div className="space-y-2">
              <div className="space-y-1 pl-2">
                <RadioGroup
                  name={"employ_status"}
                  onValueChange={(value) =>
                    formik.setFieldValue("employ_status", value)
                  }
                  defaultValue={formik.values.employ_status || ""}
                >
                  {EmployStatus.map((el, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={el.value} id={el.value} />
                      <Label htmlFor={el.value}>{el.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <FormikErrorBox formik={formik} field="employ_status" />
          </div>

          <div></div>
          <div className="border-t border-neutral-200 py-4">
            <Button
              onClick={() => handleCompleteStep1()}
              className="flex w-full justify-center"
            >
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
