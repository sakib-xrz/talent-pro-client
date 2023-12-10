"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import TitleWithDescription from "../../components/TitleWithDescription";
import Image from "next/image";
import FileUpload from "@/components/form/FileUpload";
import { useState } from "react";
import { useUser } from "@/context/UserProvider";
import APIKit from "@/common/APIkit";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Phone } from "@/components/ui/phone";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Label } from "@/components/ui/label";

export default function PersonalInformation() {
  const { user, refetchMe } = useUser();
  console.log(user);
  const [image, setImage] = useState(user?.image_url);

  const formik = useFormik({
    initialValues: {
      first_name: user?.name?.first_name,
      last_name: user?.name?.last_name,
      email: user?.email,
    },
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
      //   loading: "Loading...",
      //   success: "Personal information edited successfully!",
      //   error: "Something went wrong!",
      // });
    },
  });

  const handleProfileImageUpload = (event) => {
    const formData = new FormData();
    formData.append("profile-picture", event.target.files[0]);
    const promise = APIKit.me
      .updateProfilePicture(formData)
      .then(({ data }) => {
        refetchMe();
        setImage(data?.image_url);
      })
      .catch((error) => {
        throw error;
      });

    return toast.promise(promise, {
      loading: "Updating profile picture...",
      success: "Profile picture updated successfully",
      error: "Something went wrong",
    });
  };

  return (
    <div className="space-y-3">
      <TitleWithDescription
        title="Personal Information"
        desc="Welcome to your personal information hub! This is the space where you can effortlessly check and refine your personal details."
      />
      <hr />

      <div>
        {image ? (
          <div className="flex w-full flex-col gap-3 lg:flex-row">
            <div className="w-full text-neutral-800 md:w-2/5">
              <label className="text-sm font-semibold text-neutral-800">
                Profile Image
              </label>
              <p className="text-sm font-medium">Shows up on your profile</p>
            </div>
            <div className="flex w-full items-center">
              <div className="relative h-44 w-40 rounded-md">
                <XMarkIcon
                  className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-full border bg-white p-1"
                  onClick={() => {
                    setImage("");
                  }}
                />
                <Image
                  className="h-44 w-40 rounded-md border border-border object-cover object-center"
                  src={image || "/images/empty_user.jpg"}
                  height={500}
                  width={500}
                  alt="profile-image"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col">
            <FileUpload
              id="profile-picture"
              name="profile-picture"
              label="Profile Image"
              title="Upload your profile picture"
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-5 pt-4 md:pt-4 "
        >
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
              value={formik.values.email}
              disabled
            />
          </div>
          {/* 
          <Phone
            label="Contact Number"
            name="contact_number"
            id="contact_number"
            placeholder="Your Contact Number"
            value={formik.values.contact_number}
            onChange={formik.handleChange}
          /> */}

          <div className="flex items-center justify-end gap-2 pt-2">
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
      </div>
    </div>
  );
}
