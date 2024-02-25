"use client";

import {
  EmployStatus,
  GenderOptions,
  IndustryOptions,
} from "@/common/KeyChain";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "@/components/ui/phone";
import Radio from "@/components/form/Radio";
import SelectField from "@/components/form/SelectField";
import DatePicker from "@/components/form/DatePicker";

export default function Step1Form({ formik, handleCompleteStep1 }) {
  const handleIndustryChange = (selectedOption) => {
    formik.setFieldValue(
      "industry",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleGenderChange = (selectedOption) => {
    formik.setFieldValue("gender", selectedOption ? selectedOption.value : "");
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
            Step 1/4
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-1/3 rounded-lg bg-primary p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
            <span className="h-2 w-1/3 rounded-lg bg-input p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 ">
          <h4 className="text-lg font-semibold">Personal Information</h4>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Gender <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="gender"
                name="gender"
                placeholder="Select your gender"
                options={GenderOptions}
                onChange={handleGenderChange}
                value={GenderOptions.find(
                  (el) => el.value === formik.values.gender,
                )}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="w-full space-y-2">
            <p className="font-medium text-primary">
              Date of birth <span className="text-destructive">*</span>
            </p>
            <DatePicker
              name="date_of_birth"
              id="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Your phone number <span className="text-destructive">*</span>
            </p>
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
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Location <span className="text-destructive">*</span>
            </p>
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
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              What’s your industry? <span className="text-destructive">*</span>
            </p>
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
                isSearchable
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              What’s your job status?{" "}
              <span className="text-destructive">*</span>
            </p>
            <div>
              {EmployStatus.map((item, i) => (
                <Radio
                  key={i}
                  htmlFor={item.value}
                  type="radio"
                  id={item.value}
                  name="job_status"
                  value={item.value}
                  onChange={formik.handleChange}
                  checked={formik.values.job_status === item.value}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          <div></div>
          <div className="border-t border-neutral-200 py-4">
            <Button
              onClick={() => handleCompleteStep1(formik.values)}
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
