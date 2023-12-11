"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import TitleWithDescription from "../../components/TitleWithDescription";
import Image from "next/image";
import FileUpload from "@/components/form/FileUpload";
import { useState } from "react";
import { useUser } from "@/context/UserProvider";
import APIKit from "@/common/APIkit";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import InfoFrom from "./components/InfoFrom";

export default function PersonalInformation() {
  const { user, refetchMe } = useUser();
  const [image, setImage] = useState(user?.image_url);

  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-info", user?.email],
    queryFn: () => APIKit.me.getInfo().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }

  const { phone, location, industry, job_status } = userInfo;

  const initialValues = {
    first_name: user?.name?.first_name,
    last_name: user?.name?.last_name,
    email: user?.email,
    phone: phone,
    location: location,
    industry: industry,
    job_status: job_status,
  };

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
              <label className="text-sm font-medium">Profile Image</label>
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

        <InfoFrom initialValues={initialValues} refetch={refetch} />
      </div>
    </div>
  );
}
