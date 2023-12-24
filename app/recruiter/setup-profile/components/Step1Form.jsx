"use client";

import Image from "next/image";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { CompanySizeOptions, IndustryOptions } from "@/common/KeyChain";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/form/FileUpload";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/form/SelectField";

export default function Step1Form({ formik, handleCompleteStep1 }) {
  const handleIndustryChange = (selectedOption) => {
    formik.setFieldValue(
      "industry",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleCompanySizeChange = (selectedOption) => {
    formik.setFieldValue(
      "company_size",
      selectedOption ? selectedOption.value : "",
    );
  };

  const handleLogoUpload = (e) => {
    formik.setFieldValue("company_logo", e.target.files[0]);
    URL.createObjectURL(e.target.files[0]);
    formik.setFieldValue(
      "logo_preview",
      URL.createObjectURL(e.target.files[0]),
    );
  };

  return (
    <div className="rounded-2xl bg-white shadow">
      <div className="mx-auto max-w-3xl">
        <div className=" flex justify-center border-b border-neutral-200 px-8 py-4 text-2xl font-semibold text-accent-foreground">
          <h2 className="text-center text-lg font-semibold text-neutral-700 sm:text-left md:text-2xl">
            Set up your company profile
          </h2>
        </div>
        <div className="els-start flex flex-col justify-start gap-1 p-4 sm:p-8">
          <p className="text-base font-medium text-accent-foreground">
            Step 1/2
          </p>
          <div className="flex w-full gap-2">
            <span className="h-2 w-2/4 rounded-lg bg-primary p-1" />
            <span className="h-2 w-2/4 rounded-lg bg-input p-1" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5 px-4 sm:px-8">
          <div className="space-y-2">
            <p className="font-medium text-primary">Company Logo</p>
            <div>
              {formik.values.company_logo ? (
                <div className="relative h-44 w-40 rounded-md">
                  <XMarkIcon
                    className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-full border bg-white p-1"
                    onClick={() => {
                      formik.setFieldValue("company_logo", null);
                      formik.setFieldValue("logo_preview", "");
                    }}
                  />
                  <Image
                    className="h-44 w-40 rounded-md border border-border object-cover object-center"
                    src={formik.values.logo_preview}
                    height={500}
                    width={500}
                    alt="profile-image"
                  />
                </div>
              ) : (
                <FileUpload
                  id="company_logo"
                  name="company_logo"
                  htmlFor="company_logo"
                  title="Upload your company logo"
                  helperText="Supported .jpg .jpeg .png up to 10 mb"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Company Name <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="text"
                id="company_name"
                name="company_name"
                placeholder="e.g. Google"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company_name}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Industry <span className="text-destructive">*</span>
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
                isClearable
                isSearchable
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Company Size <span className="text-destructive">*</span>
            </p>
            <div>
              <SelectField
                id="company_size"
                name="company_size"
                placeholder="Select Your Company Size"
                options={CompanySizeOptions}
                onChange={handleCompanySizeChange}
                value={CompanySizeOptions.find(
                  (el) => el.value === formik.values.company_size,
                )}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              Company Location <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="text"
                id="company_location"
                name="company_location"
                placeholder="e.g. Dhaka, Bangladesh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company_location}
              />
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
