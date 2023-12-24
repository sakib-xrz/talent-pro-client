"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";
import { useUser } from "@/context/UserProvider";

import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Success from "./components/Success";

export default function OrganizationSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user, refetchMe } = useUser();

  const initialValues = {
    user_id: user?.id,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      const handleSuccess = () => {
        setCurrentStep(3);
        refetchMe();
        formik.resetForm();
      };

      const handleFailure = (error) => {
        console.log(error);
        throw error;
      };

      const promise = APIKit.candidate
        .setupProfile(values)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Loading...",
        success: "Profile setup successful!",
        error: "Something went wrong!",
      });
    },
  });

  const handleCompleteStep1 = (data) => {
    formik.setValues({ ...formik.values, ...data });
    setCurrentStep(2);
  };

  const handleCompleteStep2 = (data) => {
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

        {currentStep === 3 && <Success />}
      </div>
    </div>
  );
}
