import { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";

import APIKit from "@/common/APIkit";
import { EmployStatus, GenderOptions } from "@/common/KeyChain";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "@/components/ui/phone";
import Radio from "@/components/form/Radio";
import FormikErrorBox from "@/components/form/FormikErrorBox";
import SelectField from "@/components/form/SelectField";
import DatePicker from "@/components/form/DatePicker";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^01[3-9]\d{8}$/, "Invalid phone number")
    .required("Phone is required"),

  location: Yup.string().required("Location is required"),

  industry: Yup.string().required("Industry is required"),
});

export default function InfoFrom({ initialValues, refetch }) {
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        gender: values.gender,
        date_of_birth: values.date_of_birth,
        phone: values.phone,
        location: values.location,
        industry: values.industry,
        job_status: values.job_status,
      };

      const handleSuccess = () => {
        setShowActionButtons(false);
        refetch();
      };

      const handleFailure = (error) => {
        throw error;
      };

      const promise = APIKit.me.info
        .updateInfo(payload)
        .then(handleSuccess)
        .catch(handleFailure)
        .finally(() => setLoading(false));

      return toast.promise(promise, {
        loading: "Updating personal information...",
        success: "Personal info edited successfully!",
        error: "Something went wrong!",
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 pt-4 md:pt-4 ">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="first_name" className="md:w-2/5">
          First Name
        </Label>
        <Input
          name="first_name"
          id="first_name"
          placeholder="Your First name"
          value={formik.values.first_name}
          disabled
        />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="last_name" className="md:w-2/5">
          Last Name
        </Label>
        <Input
          name="last_name"
          id="last_name"
          placeholder="Your Last Name"
          value={formik.values.last_name}
          disabled
        />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="email" className="md:w-2/5">
          Email Address
        </Label>
        <Input
          name="email"
          id="email"
          placeholder="Your Email Address"
          value={formik.values.email}
          disabled
        />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="gender" className="md:w-2/5">
          Gender
        </Label>
        <div className="w-full">
          <SelectField
            id="gender"
            name="gender"
            options={GenderOptions}
            onChange={(selectedOption) => {
              setShowActionButtons(true);
              formik.setFieldValue("gender", selectedOption.value);
            }}
            value={GenderOptions.find(
              (el) => el.value === formik.values.gender,
            )}
            onBlur={formik.handleBlur}
          />
          <FormikErrorBox formik={formik} field={"gender"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="date_of_birth" className="md:w-2/5">
          Date of birth
        </Label>
        <div className="w-full">
          <DatePicker
            name="date_of_birth"
            id="date_of_birth"
            value={formik.values.date_of_birth}
            onChange={(date) => {
              formik.handleChange(date);
              setShowActionButtons(true);
            }}
            onBlur={formik.handleBlur}
          />
          <FormikErrorBox formik={formik} field={"date_of_birth"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="phone" className="md:w-2/5">
          Contact Number
        </Label>
        <div className="w-full">
          <Phone
            name="phone"
            id="phone"
            placeholder="01XXX-XXXXXX"
            value={formik.values?.phone}
            onChange={(e) => {
              formik.handleChange(e);
              setShowActionButtons(true);
            }}
            onBlur={formik.handleBlur}
          />
          <FormikErrorBox formik={formik} field={"phone"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Label htmlFor="location" className="md:w-2/5">
          Location
        </Label>
        <div className="w-full">
          <Input
            name="location"
            id="location"
            placeholder="Your Location"
            onChange={(e) => {
              formik.handleChange(e);
              setShowActionButtons(true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          <FormikErrorBox formik={formik} field={"location"} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        <Label htmlFor="job_status" className="md:w-2/5">
          Job Status
        </Label>
        <div className="w-full">
          {EmployStatus.map((item, i) => (
            <Radio
              key={i}
              htmlFor={item.value}
              type="radio"
              id={item.value}
              name="job_status"
              value={item.value}
              onChange={(e) => {
                formik.handleChange(e);
                setShowActionButtons(true);
              }}
              checked={formik.values.job_status === item.value}
              label={item.label}
            />
          ))}
        </div>
      </div>

      <div
        className={`${
          showActionButtons ? "flex" : "hidden"
        }  items-center justify-end gap-2 pt-2`}
      >
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              formik.resetForm(), setShowActionButtons(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            Save
          </Button>
        </>
      </div>
    </form>
  );
}
