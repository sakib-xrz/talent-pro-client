"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Logo from "public/images/logo.png";

import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import APIKit from "@/common/APIkit";
import { setJWTokenAndRedirect } from "@/common/UtilKit";

import { Button } from "@/components/ui/button";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import RootFooter from "@/components/shared/RootFooter";
import RootNavbar from "@/components/shared/RootNavbar";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "google.hr@gmail.com",
  password: "Google.hr@123",
};

export default function RecruiterLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousURL = searchParams.get("next");
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const payload = {
        email: values.email,
        password: values.password,
      };

      const handleSuccess = ({ data }) => {
        formik.resetForm();
        setJWTokenAndRedirect(data.access, () => {
          if (previousURL) {
            router.push(previousURL);
          } else {
            router.push("/recruiter");
          }
        });
      };

      const handleFailure = (error) => {
        throw error;
      };

      const promise = APIKit.auth
        .token(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setSubmitting(false));

      return toast.promise(promise, {
        loading: "Signing you in...",
        success: "Signed in successfully",
        error: (error) => error.message,
      });
    },
  });
  return (
    <>
      <RootNavbar />
      <div className="mx-auto w-full sm:w-2/3 sm:py-10 xl:w-1/3">
        <div className="space-y-8 rounded-md bg-white px-8 py-10 shadow">
          <div className="flex justify-center">
            <Image
              src={Logo}
              width={200}
              height={50}
              alt="Talent Pro Logo"
              style={{ height: "auto", width: "auto" }}
            />
          </div>
          <h2 className=" text-center text-3xl font-semibold tracking-tight first:mt-0">
            Sign in as a Recruiter
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormikErrorBox formik={formik} field="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Password
                id="password"
                placeholder="min 8 characters"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FormikErrorBox formik={formik} field="password" />
              <p className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 font-semibold"
                >
                  Forget Password
                </Button>
              </p>
            </div>
            <Button
              type="submit"
              className="w-full"
              isLoading={formik.isSubmitting}
            >
              Sign in
            </Button>
            <p className="text-center text-sm font-medium leading-none">
              Don’t have an account?{" "}
              <Link href={"/recruiter-register"}>
                <Button variant="link" className="p-0 font-bold">
                  Create Account
                </Button>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <RootFooter />
    </>
  );
}
