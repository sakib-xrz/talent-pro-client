"use client";

import { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";

import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import Success from "./components/Success";
import Step4From from "./components/Step4From";
import { useUser } from "@/context/UserProvider";

const validationSchema = Yup.object({
  candidate_id: Yup.string(),
  phone: Yup.string().required("Phone is required"),
  location: Yup.string().required("Location is required"),
  industry: Yup.string().required("Industry is required"),
  job_status: Yup.string().required("Job status is required"),
  experience: Yup.object().shape({
    company_name: Yup.string(),
    designation: Yup.string(),
    job_type: Yup.string(),
    start_date: Yup.date(),
    // end_date: Yup.date().when("work_currently", {
    //   is: false,
    //   then: Yup.date(),
    // }),
    work_currently: Yup.boolean(),
  }),
  education: Yup.object().shape({
    institute_name: Yup.string().required("Institute Name is required"),
    degree: Yup.string().required("Degree is required"),
    major: Yup.string().required("Major is required"),
    location: Yup.string().required("Education Location is required"),
    start_date: Yup.date().required("Start Date is required"),
    // end_date: Yup.date().when("study_currently", {
    //   is: false,
    //   then: Yup.date().required(
    //     "End Date is required when not currently studying",
    //   ),
    // }),
    study_currently: Yup.boolean().required(),
  }),
  skill: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    )
    .min(1, "At least one skill is required"),
  portfolio: Yup.string().required("Portfolio is required"),
  resume: Yup.mixed()
    .required("Resume is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;
      return value.type === "application/pdf";
    }),
  resume_preview: Yup.string(),
  desired_salary: Yup.object().shape({
    min: Yup.string().required("Minimum Salary is required"),
    max: Yup.string().required("Maximum Salary is required"),
  }),
  open_to_work_remotely: Yup.boolean(),
});

export default function CandidateSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  const initialValues = {
    candidate_id: user?.id,
    phone: "",
    location: "",
    industry: "",
    job_status: "",
    experience: {
      company_name: "",
      designation: "",
      job_type: "",
      start_date: "",
      end_date: "",
      work_currently: false,
    },
    education: {
      institute_name: "",
      degree: "",
      major: "",
      location: "",
      start_date: "",
      end_date: "",
      study_currently: false,
    },
    skills: [],
    portfolio: "",
    resume: "",
    resume_preview: "",
    desired_salary: {
      min: "",
      max: "",
    },
    open_to_work_remotely: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log(values);
    },
  });

  const handleCompleteStep1 = (data) => {
    formik.setValues({ ...formik.values, ...data });
    setCurrentStep(2);
  };

  const handleCompleteStep2 = (data) => {
    formik.setValues({ ...formik.values, ...data });
    setCurrentStep(3);
  };

  const handleCompleteStep3 = (data) => {
    formik.setValues({ ...formik.values, ...data });
    setCurrentStep(4);
  };

  const handleCompleteStep4 = (data) => {
    formik.setValues({ ...formik.values, ...data });
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="mx-auto max-w-xl py-10 lg:py-14">
      <div className="rounded-2xl bg-white shadow">
        {currentStep === 1 && (
          <Step1Form
            formik={formik}
            handleCompleteStep1={handleCompleteStep1}
          />
        )}

        {currentStep === 2 && (
          <Step2Form
            formik={formik}
            handleCompleteStep2={handleCompleteStep2}
            handleBackToStep1={() => handleStepChange(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3Form
            formik={formik}
            handleCompleteStep3={handleCompleteStep3}
            handleBackToStep2={() => handleStepChange(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4From
            formik={formik}
            handleCompleteStep4={handleCompleteStep4}
            handleBackToStep3={() => handleStepChange(3)}
          />
        )}
        {currentStep === 5 && <Success />}
      </div>
    </div>
  );
}
