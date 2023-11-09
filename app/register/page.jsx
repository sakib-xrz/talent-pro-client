"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikErrorBox from "@/components/form/FormikErrorBox";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function CandidateRegister() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const payload = {
        name: {
          first_name: values.first_name,
          last_name: values.last_name,
        },
        email: values.email,
        password: values.password,
      };
      console.log(payload);
    },
  });
  return (
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
        <h2 className="scroll-m-20 text-center text-3xl font-semibold tracking-tight first:mt-0">
          Create an Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="email">First Name</Label>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="e.g. Jhon"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              <FormikErrorBox formik={formik} field="first_name" />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Last Name</Label>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="e.g. Wick"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              <FormikErrorBox formik={formik} field="last_name" />
            </div>
          </div>
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
              name="password"
              placeholder="min 8 characters"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <FormikErrorBox formik={formik} field="password" />
          </div>
          <div>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Password
              id="confirm_password"
              name="confirm_password"
              placeholder="retype your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
            <FormikErrorBox formik={formik} field="confirm_password" />
          </div>
          <div className="w-full">
            <Button type="submit" className="mt-2 w-full">
              Sign Up
            </Button>
          </div>
          <p className="text-center text-sm font-medium leading-none">
            Already have an account?{" "}
            <Link href={"/login"}>
              <Button variant="link" className="p-0 font-bold">
                Sign In
              </Button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
