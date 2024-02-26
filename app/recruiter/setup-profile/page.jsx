"use client";

import { useState } from "react";

import { toast } from "sonner";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";
import { useStore } from "@/context/StoreProvider";

import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Success from "./components/Success";

export default function OrganizationSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, refetchMe, refetchWe } = useStore();

  const initialValues = {
    user_id: user?.id,
    company_logo: null,
    logo_preview: "",
    company_name: "Google",
    industry: "INFORMATION_TECHNOLOGY",
    company_size: "51-200",
    company_location: "1600 Amphitheatre Parkway, California.",
    website: "https://www.google.com",
    linkedin_link: "https://www.linkedin.com/company/google",
    slogan: "Build for everyone.",
    about_us:
      "A problem isn't truly solved until it's solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setLoading(true);

      const handleSuccess = () => {
        setCurrentStep(3);
        refetchMe("recruiter");
        refetchWe();
        formik.resetForm();
      };

      const handleFailure = (error) => {
        console.log(error);
        throw error;
      };

      const promise = APIKit.we
        .setupProfile(values)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

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
            loading={loading}
          />
        )}

        {currentStep === 3 && <Success />}
      </div>
    </div>
  );
}
