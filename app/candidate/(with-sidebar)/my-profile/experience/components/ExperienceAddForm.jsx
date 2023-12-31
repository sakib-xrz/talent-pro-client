import * as Yup from "yup";
import { toast } from "sonner";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";
import { EmploymentType } from "@/common/KeyChain";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/form/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Radio from "@/components/form/Radio";
import FormikErrorBox from "@/components/form/FormikErrorBox";

const validationSchema = Yup.object({
  company_name: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Company name is required"),
  designation: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Designation is required"),
  job_type: Yup.string()
    .oneOf(["INTERN", "FULL_TIME", "PART_TIME"], "Invalid job type")
    .required("Job type is required"),
  work_currently: Yup.boolean(),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().min(
    Yup.ref("start_date"),
    "End date must be after start date",
  ),
});

export default function ExperienceAddForm({
  setShowAddExperienceForm,
  refetch,
}) {
  const formik = useFormik({
    initialValues: {
      company_name: "Algosoft Technologies Limited",
      designation: "Frontend Developer",
      job_type: "INTERN",
      start_date: "2023-01-20",
      end_date: "2023-06-30",
      work_currently: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        company_name: values.company_name,
        designation: values.designation,
        job_type: values.job_type,
        start_date: values.start_date,
        end_date: values.end_date,
        work_currently: values.end_date ? values.work_currently : true,
      };
      const handleSuccess = () => {
        refetch();
        setShowAddExperienceForm(false);
      };
      const handleFailure = (error) => {
        throw error;
      };
      const promise = APIKit.me.experience
        .addExperience(payload)
        .then(handleSuccess)
        .catch(handleFailure);
      return toast.promise(promise, {
        loading: "Adding professional experience...",
        success: "Experience added successfully!",
        error: "Something went wrong!",
      });
    },
  });

  return (
    <div className="pt-3">
      <h3 className="mb-6 text-base font-semibold text-neutral-800">
        Add Experience
      </h3>
      <form onSubmit={formik.handleSubmit} className="space-y-5 pt-4 md:pt-4 ">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="company_name" className="md:w-2/5">
            Company Name
          </Label>
          <div className="w-full">
            <Input
              type="text"
              name="company_name"
              id="company_name"
              placeholder="e.g. Google"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company_name}
            />
            <FormikErrorBox formik={formik} field={"company_name"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="designation" className="md:w-2/5">
            Designation
          </Label>
          <div className="w-full">
            <Input
              type="text"
              id="designation"
              name="designation"
              placeholder="e.g. Product Designer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.designation}
            />
            <FormikErrorBox formik={formik} field={"designation"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <Label htmlFor="company_name" className="md:w-2/5">
            Job type
          </Label>
          <div className="w-full">
            {EmploymentType.map((item, i) => (
              <Radio
                key={i}
                htmlFor={item.value}
                type="radio"
                id={item.value}
                name="job_type"
                value={item.value}
                onChange={formik.handleChange}
                checked={formik.values.job_type === item.value}
                label={item.label}
              />
            ))}
            <FormikErrorBox formik={formik} field={"job_type"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="start_date" className="md:w-2/5">
            Start Date
          </Label>
          <div className="w-full">
            <DatePicker
              name="start_date"
              id="start_date"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormikErrorBox formik={formik} field={"start_date"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="end_date" className="md:w-2/5">
            End Date
          </Label>
          <div className="w-full">
            <DatePicker
              name="end_date"
              id="end_date"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.values.work_currently}
            />
            <FormikErrorBox formik={formik} field={"end_date"} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-end space-x-2">
            <input
              type="checkbox"
              id="work_currently"
              name="work_currently"
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.checked) {
                  formik.setFieldValue("end_date", "");
                }
              }}
              checked={formik.values.work_currently}
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

        <div className="flex items-center justify-end gap-2 pt-2">
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddExperienceForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </>
        </div>
      </form>
    </div>
  );
}
