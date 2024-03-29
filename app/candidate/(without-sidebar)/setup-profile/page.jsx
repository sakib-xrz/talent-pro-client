"use client";

import { useState } from "react";

import { toast } from "sonner";
import { useFormik } from "formik";

import APIKit from "@/common/APIkit";
import { useStore } from "@/context/StoreProvider";

import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import Step4From from "./components/Step4From";
import Success from "./components/Success";

export default function CandidateSetupProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, refetchMe } = useStore();

  const initialValues = {
    user_id: user?.id,
    gender: "MALE",
    date_of_birth: "1998-08-22",
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

  // const initialValues = {
  //   user_id: user?.id,
  //   gender: "",
  //   date_of_birth: "",
  //   phone: "",
  //   location: "",
  //   industry: "",
  //   job_status: "",
  //   experience: {
  //     company_name: "",
  //     designation: "",
  //     job_type: "",
  //     start_date: "",
  //     end_date: "",
  //     work_currently: false,
  //   },
  //   education: {
  //     institute_name: "",
  //     degree: "",
  //     major: "",
  //     location: "",
  //     start_date: "",
  //     end_date: "",
  //     study_currently: false,
  //   },
  //   skills: [],
  //   portfolio: "",
  //   resume: "",
  //   resume_preview: "",
  //   desired_salary: {
  //     min: "",
  //     max: "",
  //   },
  //   open_to_work_remotely: false,
  // };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setLoading(true);

      let payload = { ...values };

      payload.experience = [payload.experience];
      payload.education = [payload.education];

      if (
        !payload.experience[0]?.company_name ||
        !payload.experience[0]?.designation
      ) {
        payload.experience = [];
      }

      if (
        !payload.education[0]?.institute_name ||
        !payload.education[0]?.degree
      ) {
        payload.education = [];
      }

      const handleSuccess = () => {
        setCurrentStep(5);
        refetchMe("candidate");
        formik.resetForm();
      };

      const handleFailure = (error) => {
        console.log(error);
        throw error;
      };

      const promise = APIKit.me
        .setupProfile(payload)
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
            loading={loading}
          />
        )}
        {currentStep === 5 && <Success />}
      </div>
    </div>
  );
}
