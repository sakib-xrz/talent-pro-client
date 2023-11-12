"use client";

import { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import Success from "./components/Success";

const initialValues = {
  industry: {
    label: "",
    value: "",
  },
  employ_status: "",
  employment_type: "",
};

const validationSchema = Yup.object().shape({
  // Add validation rules as needed
});

export default function CandidateSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);

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
        {currentStep === 4 && <Success />}
      </div>
    </div>
  );
}
