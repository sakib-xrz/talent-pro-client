import * as Yup from "yup";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/form/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormikErrorBox from "@/components/form/FormikErrorBox";

const validationSchema = Yup.object().shape({
  institute_name: Yup.string().required("Institute name is required"),
  degree: Yup.string().required("Degree is required"),
  major: Yup.string().required("Major is required"),
  location: Yup.string().required("Location is required"),
  study_currently: Yup.boolean(),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().min(
    Yup.ref("start_date"),
    "End date must be after start date",
  ),
});

export default function EducationEditFrom({
  education,
  setShowEducationEditForm,
  refetch,
}) {
  const formik = useFormik({
    initialValues: {
      _id: education?._id,
      institute_name: education.institute_name,
      degree: education.degree,
      major: education.major,
      location: education.location,
      start_date: education.start_date,
      end_date: education.end_date,
      study_currently: education.study_currently,
    },
    validationSchema,
    onSubmit: (values) => {
      const uid = values._id;
      const payload = {
        institute_name: values.institute_name,
        degree: values.degree,
        major: values.major,
        location: values.location,
        start_date: values.start_date,
        end_date: values.end_date,
        study_currently: values.study_currently ? values.study_currently : true,
      };
      const handleSuccess = () => {
        refetch();
        setShowEducationEditForm(false);
      };
      const handleFailure = (error) => {
        throw error;
      };
      const promise = APIKit.me.education
        .updateEducation(uid, payload)
        .then(handleSuccess)
        .catch(handleFailure);
      return toast.promise(promise, {
        loading: "Updating education...",
        success: "Education edited successfully!",
        error: "Something went wrong!",
      });
    },
  });

  return (
    <div className="pt-3">
      <h3 className="mb-6 text-base font-semibold text-neutral-800">
        Edit Education
      </h3>
      <form onSubmit={formik.handleSubmit} className="space-y-5 pt-4 md:pt-4 ">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="institute_name" className="md:w-2/5">
            Institute name
          </Label>
          <div className="w-full">
            <Input
              type="text"
              name="institute_name"
              id="institute_name"
              placeholder="e.g. California University"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.institute_name}
            />
            <FormikErrorBox formik={formik} field={"institute_name"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="degree" className="md:w-2/5">
            Degree
          </Label>
          <div className="w-full">
            <Input
              type="text"
              id="degree"
              name="degree"
              placeholder="e.g. Bachelor's"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.degree}
            />
            <FormikErrorBox formik={formik} field={"degree"} />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="major" className="md:w-2/5">
            Field of Study
          </Label>
          <div className="w-full">
            <Input
              type="text"
              id="major"
              name="major"
              placeholder="e.g. Computer Science & Engineering"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.major}
            />
            <FormikErrorBox formik={formik} field={"major"} />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Label htmlFor="location" className="md:w-2/5">
            Location
          </Label>
          <div className="w-full">
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="e.g. Dhaka, Bangladesh"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            <FormikErrorBox formik={formik} field={"location"} />
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
              disabled={formik.values.study_currently}
            />
            <FormikErrorBox formik={formik} field={"end_date"} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-end space-x-2">
            <input
              type="checkbox"
              id="study_currently"
              name="study_currently"
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.checked) {
                  formik.setFieldValue("end_date", "");
                }
              }}
              checked={formik.values.study_currently}
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
        <div className="flex items-center justify-end gap-2 pt-2">
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowEducationEditForm(false)}
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
