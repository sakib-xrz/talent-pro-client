"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";
import { useUser } from "@/context/UserProvider";

import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import Step4From from "./components/Step4From";

export default function CandidateSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user, refetchMe } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user?.isOnboardComplete) {
      router.back();
    }
  }, [router, user?.isOnboardComplete]);

  const initialValues = {
    user_id: user?.id,
    phone: "01409029742",
    location: "Dhaka, Bangladesh",
    industry: "INFORMATION_TECHNOLOGY",
    job_status: "EMPLOYED",
    experience: {
      company_name: "Repliq Limited",
      designation: "Frontend Developer",
      job_type: "FULL_TIME",
      start_date: "2023-07-17",
      end_date: "",
      work_currently: true,
    },
    education: {
      institute_name: "Daffodil International University",
      degree: "B.Sc",
      major: "Computer Science and Engineering",
      location: "Dhaka, Bangladesh",
      start_date: "2018-09-20",
      end_date: "",
      study_currently: true,
    },
    skills: [
      { label: "React", value: "REACT" },
      { label: "NextJs", value: "NEXTJS" },
      { label: "JavaScript", value: "JAVASCRIPT" },
      { label: "Tailwind Css", value: "TAILWIND_CSS" },
    ],
    portfolio: "https://sakib-dev.netlify.app/",
    resume: "",
    resume_preview: "",
    desired_salary: {
      min: "24000",
      max: "28000",
    },
    open_to_work_remotely: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      const handleSuccess = () => {
        refetchMe();
        formik.resetForm();
        router.push("/candidate/setup-profile/success");
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
      </div>
    </div>
  );
}
