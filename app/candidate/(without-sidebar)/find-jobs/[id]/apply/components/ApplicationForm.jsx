import * as Yup from "yup";

import { Phone } from "@/components/ui/phone";
import PersonalInfo from "./PersonalInfo";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useStore } from "@/context/StoreProvider";
import CreatableSelectField from "@/components/form/CreatableSelectField";
import FileUpload from "@/components/form/FileUpload";
import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import APIKit from "@/common/APIkit";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormikErrorBox from "@/components/form/FormikErrorBox";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^(?:\+?88|01)?\d{11}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  years_of_experience: Yup.number().min(
    0,
    "Years of experience must be non-negative",
  ),
  current_company: Yup.string().optional(),
  current_role: Yup.string().optional(),
  skills: Yup.array()
    .min(1, "At least one skill is required")
    .required("Skill is required"),
  resume: Yup.string().required("Resume is required"),
});

export default function ApplicationForm({ job, candidate }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useStore();

  const isAppliedJob = job.applied_by.some((id) => id === user._id);

  const formik = useFormik({
    initialValues: {
      user: user?._id,
      candidate: candidate?._id,
      organization: job?.organization?._id,
      job: {
        _id: job?._id,
        job_title: job?.job_title,
        job_type: job?.job_type,
        experience_level: job?.experience_level,
        location_type: job?.location_type,
        address: job?.address,
      },
      phone: candidate?.phone,
      years_of_experience: 0,
      current_company: "",
      current_role: "",
      skills: [],
      resume: "",
      resume_preview: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const handleSuccess = () => {
        formik.resetForm();
        router.push("/candidate/my-applications");
      };

      const handleFailure = (error) => {
        console.log(error);
        throw error;
      };

      const promise = APIKit.me.job.application
        .applyJob(job?._id, values)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Successfully applied this job!",
        error: "Something went wrong!",
      });
    },
  });

  const handleFileUpload = (e) => {
    formik.setFieldValue("resume", e.target.files[0]);
    URL.createObjectURL(e.target.files[0]);
    formik.setFieldValue(
      "resume_preview",
      URL.createObjectURL(e.target.files[0]),
    );
  };

  console.log(formik.errors);

  return (
    <div className="space-y-5">
      <PersonalInfo user={user} candidate={candidate} />
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <div className="space-y-2">
            <p className="font-medium text-primary">
              Email address <span className="text-destructive">*</span>
            </p>
            <div>
              <Input name="email" id="email" value={user.email} disabled />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-primary">
              Contact Number <span className="text-destructive">*</span>
            </p>
            <div>
              <Phone
                id="phone"
                name="phone"
                placeholder="01XXX-XXXXXX"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values.phone.startsWith("+88")
                    ? formik.values.phone.substring(3)
                    : formik.values.phone
                }
              />
              <FormikErrorBox formik={formik} field="phone" />
            </div>
          </div>
        </div>
        <hr />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary">
            Work Experience
          </h2>
          <div className="space-y-2">
            <p className="font-medium text-primary">
              Years of Experience <span className="text-destructive">*</span>
            </p>
            <div>
              <Input
                type="number"
                min="0"
                name="years_of_experience"
                id="years_of_experience"
                value={formik.values.years_of_experience}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FormikErrorBox formik={formik} field="years_of_experience" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Current Company (If any)</p>
            <div>
              <Input
                id="current_company"
                name="current_company"
                placeholder="eg. Google"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.current_company}
              />

              <FormikErrorBox formik={formik} field="current_company" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">Current Role (If any)</p>

            <div>
              <Input
                id="current_role"
                name="current_role"
                placeholder="eg. Software Engineer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.current_role}
              />

              <FormikErrorBox formik={formik} field="current_role" />
            </div>
          </div>
        </div>
        <hr />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary">
            Skills and Resume
          </h2>
          <div className="space-y-2">
            <p className="font-medium text-primary">
              Skills <span className="text-destructive">*</span>
            </p>
            <div>
              <CreatableSelectField
                id="skills"
                name="skills"
                placeholder="e.g. Python, React"
                options={candidate?.skills}
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
                isMulti
                isSearchable
              />

              <FormikErrorBox formik={formik} field="skills" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-primary">
              {formik.values.resume_preview && formik.values.resume
                ? "Attached File"
                : "Upload Your Resume"}{" "}
              <span className="text-destructive">*</span>
            </p>
            <div>
              {formik.values.resume_preview && formik.values.resume ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div className="flex items-center gap-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-input/50">
                        <DocumentTextIcon className="h-6 w-6 text-primary" />
                      </div>
                      <p>{formik.values.resume?.name}</p>
                    </div>
                    <XMarkIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => {
                        formik.setFieldValue("resume", "");
                        formik.setFieldValue("resume_preview", "");
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <FileUpload
                    id="resume"
                    name="resume"
                    htmlFor="resume"
                    title="Select and upload your resume"
                    helperText="Supported only PDF up to 10 mb"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />

                  <FormikErrorBox formik={formik} field="resume" />
                </>
              )}
            </div>
          </div>
        </div>

        {isAppliedJob ? (
          <Button className="w-full" type="button" disabled>
            Already Applied
          </Button>
        ) : (
          <Button className="w-full" type="submit" isLoading={loading}>
            Apply Now
          </Button>
        )}
      </form>
    </div>
  );
}
