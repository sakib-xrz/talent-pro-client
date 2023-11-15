"use client";

import { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { selectUser } from "@/redux/reducers/userSlice";

import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import Success from "./components/Success";
import Step4From from "./components/Step4From";

const validationSchema = Yup.object().shape({
  // Add validation rules as needed
});

export default function CandidateSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const user = useSelector(selectUser);

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
      console.log(values);
      setSubmitting(true);
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
    console.log(formik.values);
    setCurrentStep(5);
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="mx-auto max-w-xl px-5 pt-20">
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
