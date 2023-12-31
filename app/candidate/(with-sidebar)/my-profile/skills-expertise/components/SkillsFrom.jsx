"use client";

import APIKit from "@/common/APIkit";
import CreatableSelectField from "@/components/form/CreatableSelectField";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

export default function SkillsFrom({ initialValues, refetch }) {
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        skills: values?.skills,
        portfolio: values?.portfolio,
        desired_salary: {
          min: values?.desired_salary?.min,
          max: values?.desired_salary?.max,
        },
        open_to_work_remotely: values?.open_to_work_remotely,
      };

      const handleSuccess = () => {
        setShowActionButtons(false);
        refetch();
      };

      const handleFailure = (error) => {
        throw error;
      };

      const promise = APIKit.me.expertise
        .updateSkillAndExpertise(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Updating skill and expertise...",
        success: "Expertise edited successfully!",
        error: "Something went wrong!",
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 pt-4 md:pt-4 ">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="portfolio" className="md:w-2/5">
          Portfolio
        </Label>
        <div className="w-full">
          <Input
            name="portfolio"
            id="portfolio"
            placeholder="Your Portfolio"
            onChange={(e) => {
              formik.handleChange(e);
              setShowActionButtons(true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.portfolio}
          />
          <FormikErrorBox formik={formik} field={"portfolio"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="skills" className="md:w-2/5">
          Skills
        </Label>
        <div className="w-full">
          <CreatableSelectField
            id="skills"
            name="skills"
            placeholder="e.g. Python, React"
            onChange={(selectedOption) => {
              setShowActionButtons(true);
              const skills = selectedOption.map((obj) => ({
                label: obj.label.charAt(0).toUpperCase() + obj.label.slice(1),
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
          <FormikErrorBox formik={formik} field={"skills"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="desired_salary.min" className="md:w-2/5">
          Expected Salary (min)
        </Label>
        <div className="w-full">
          <Input
            name="desired_salary.min"
            id="desired_salary.min"
            placeholder="Set min range"
            onChange={(e) => {
              formik.handleChange(e);
              setShowActionButtons(true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.desired_salary.min}
          />
          <FormikErrorBox formik={formik} field={"desired_salary.min"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="desired_salary.max" className="md:w-2/5">
          Expected Salary (max)
        </Label>
        <div className="w-full">
          <Input
            name="desired_salary.max"
            id="desired_salary.max"
            placeholder="Set max range"
            onChange={(e) => {
              formik.handleChange(e);
              setShowActionButtons(true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.desired_salary.max}
          />
          <FormikErrorBox formik={formik} field={"desired_salary.max"} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-end space-x-2">
          <input
            type="checkbox"
            id="open_to_work_remotely"
            name="open_to_work_remotely"
            onChange={(e) => {
              formik.handleChange(e);
              setShowActionButtons(true);
            }}
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

      <div
        className={`${
          showActionButtons ? "flex" : "hidden"
        }  items-center justify-end gap-2 pt-2`}
      >
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              formik.resetForm(), setShowActionButtons(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            Save
          </Button>
        </>
      </div>
    </form>
  );
}
