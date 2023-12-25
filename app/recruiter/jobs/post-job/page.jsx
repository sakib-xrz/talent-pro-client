"use client";

import Container from "@/components/shared/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const initialValues = {};

export default function PostJob() {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      // const handleSuccess = () => {
      //   formik.resetForm();
      // };

      // const handleFailure = (error) => {
      //   console.log(error);
      //   throw error;
      // };

      // const promise = APIKit.job
      //   .postJob(values)
      //   .then(handleSuccess)
      //   .catch(handleFailure)
      //   .finally(() => setSubmitting(false));

      // return toast.promise(promise, {
      //   loading: "Loading...",
      //   success: "Profile setup successful!",
      //   error: "Something went wrong!",
      // });
    },
  });
  return (
    <Container>
      <Card>
        <CardHeader>
          <h2 className="text-center text-2xl font-semibold text-primary ">
            Post a new Job
          </h2>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Add fundamental information about the job. This typically includes:{" "}
            <span className="font-semibold italic">
              Job Title, Job Description, Responsibilities
            </span>
            . Candidates will see this information when they are going to apply
            for the job.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-10">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <p className="font-medium text-primary">
                Job Title <span className="text-destructive">*</span>
              </p>
              <div>
                <Input
                  type="text"
                  id="job_title"
                  name="job_title"
                  placeholder="e.g. Product Designer"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.job_title}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-primary">
                Job Description <span className="text-destructive">*</span>
              </p>
              <div>
                <DynamicQuill placeholder="e.g. Skills, Requirements, Responsibilities" />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
