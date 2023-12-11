import { useFormik } from "formik";

import { Button } from "@/components/ui/button";
import { Phone } from "@/components/ui/phone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Radio from "@/components/form/Radio";
import { EmployStatus } from "@/common/KeyChain";

export default function InfoFrom({ initialValues, refetch }) {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      // const handleSuccess = ({ data }) => {
      //   router.push("/candidate/my-profile");
      // };

      // const handleFailure = (error) => {
      //   throw error;
      // };

      // const promise = APIKit.me
      //   .patchProfileInformation({ ...values, gender: values.gender.value })
      //   .then(handleSuccess)
      //   .catch(handleFailure);

      // return toast.promise(promise, {
      //   loading: "Updating personal information...",
      //   success: "Personal information edited successfully!",
      //   error: "Something went wrong!",
      // });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 pt-4 md:pt-4 ">
      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
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

      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
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

      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
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

      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        <Label htmlFor="phone" className="md:w-2/5">
          Contact Number
        </Label>
        <Phone
          name="phone"
          id="phone"
          placeholder="01XXX-XXXXXX"
          value={formik.values?.phone}
          onChange={formik.handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        <Label htmlFor="email" className="md:w-2/5">
          Location
        </Label>
        <Input
          name="location"
          id="location"
          placeholder="Your Location"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.location}
        />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        <Label htmlFor="email" className="md:w-2/5">
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
              onChange={formik.handleChange}
              checked={formik.values.job_status === item.value}
              label={item.label}
            />
          ))}
        </div>
      </div>

      <div
        className={`${
          formik.dirty ? "flex" : "hidden"
        }  items-center justify-end gap-2 pt-2`}
      >
        <>
          <Button
            href="/candidate/my-profile"
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </>
      </div>
    </form>
  );
}
