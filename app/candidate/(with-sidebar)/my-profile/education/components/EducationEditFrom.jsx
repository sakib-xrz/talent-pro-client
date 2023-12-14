import APIKit from "@/common/APIkit";
import DatePicker from "@/components/form/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import toast from "react-hot-toast";

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
    onSubmit: (values) => {
      const uid = values._id;
      const payload = {
        institute_name: values.institute_name,
        degree: values.degree,
        major: values.major,
        location: values.location,
        start_date: values.start_date,
        end_date: values.end_date,
        study_currently: values.study_currently,
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
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <Label htmlFor="institute_name" className="md:w-2/5">
            Institute name
          </Label>
          <Input
            type="text"
            name="institute_name"
            id="institute_name"
            placeholder="e.g. California University"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.institute_name}
          />
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <Label htmlFor="degree" className="md:w-2/5">
            Degree
          </Label>
          <Input
            type="text"
            id="degree"
            name="degree"
            placeholder="e.g. Bachelor's"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.degree}
          />
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <Label htmlFor="major" className="md:w-2/5">
            Field of Study
          </Label>
          <Input
            type="text"
            id="major"
            name="major"
            placeholder="e.g. Computer Science & Engineering"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.major}
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <Label htmlFor="location" className="md:w-2/5">
            Location
          </Label>
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
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
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
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
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
