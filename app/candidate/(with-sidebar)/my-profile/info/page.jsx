"use client";

import { useState } from "react";
import Image from "next/image";

import InfoFrom from "./components/InfoFrom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { XMarkIcon } from "@heroicons/react/24/outline";

import APIKit from "@/common/APIkit";
import { useStore } from "@/context/StoreProvider";

import FileUpload from "@/components/form/FileUpload";
import TitleWithDescription from "../../components/TitleWithDescription";

export default function PersonalInformation() {
  const { user, refetchMe } = useStore();
  const [image, setImage] = useState(user?.image_url);

  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-info", user?.email],
    queryFn: () => APIKit.me.info.getInfo().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }

  const initialValues = {
    first_name: user?.name?.first_name,
    last_name: user?.name?.last_name,
    email: user?.email,
    gender: userInfo?.gender || "",
    date_of_birth: userInfo?.date_of_birth || "",
    current_company: userInfo?.current_company || "",
    current_role: userInfo?.current_role || "",
    phone: userInfo?.phone || "",
    location: userInfo?.location || "",
    industry: userInfo?.industry || "",
    job_status: userInfo?.job_status || "",
  };

  const handleProfileImageUpload = (event) => {
    const formData = new FormData();
    formData.append("profile-picture", event.target.files[0]);
    const promise = APIKit.me
      .updateProfilePicture(formData)
      .then(({ data }) => {
        refetchMe("candidate");
        setImage(data?.image_url);
      })
      .catch((error) => {
        throw error;
      });

    return toast.promise(promise, {
      loading: "Updating profile picture...",
      success: "Profile picture updated successfully!",
      error: "Something went wrong!",
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
          <div className="flex w-full flex-col gap-3 md:flex-row">
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
              helperText="Supported .jpg .jpeg .png up to 10 mb"
            />
          </div>
        )}

        <InfoFrom initialValues={initialValues} refetch={refetch} />
      </div>
    </div>
  );
}
