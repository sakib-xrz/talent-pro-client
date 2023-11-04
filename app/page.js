"use client";

import FormikErrorBox from "@/components/form/FormikErrorBox";
import PasswordInputField from "@/components/form/PasswordInputField";
import PhoneInputField from "@/components/form/PhoneInputField";
import SelectField from "@/components/form/SelectField";
import TextAreaField from "@/components/form/TextAreaField";
import TextInputField from "@/components/form/TextInputField";
import Button from "@/components/shared/Button";
import { useState } from "react";

const ImageSelectOptions = [
  {
    label: "Option 1",
    value: "1",
  },
  {
    label: "Option 2",
    value: "2",
  },
  {
    label: "Option 3",
    value: "3",
  },
];

export default function Home() {
  const [fileType, setFileType] = useState();

  return (
    <div className="mx-auto max-w-7xl px-5">
      <h1 className="pb-5 pt-20 text-center text-2xl font-bold text-primary">
        Welcome to Talent Pro
      </h1>
      <div className="space-y-4">
        <SelectField
          options={ImageSelectOptions}
          onChange={setFileType}
          placeholder={"Select a option"}
          value={fileType}
          isClearable={true}
          isSearchable={true}
        />
        <TextInputField
          placeholder="Enter your email"
          label="Email"
          id="email"
          name="email"
          type="text"
        />
        <PhoneInputField
          placeholder="e.g. 01xxxxxxxxx"
          label="Phone"
          name="phone"
          id="name"
        />
        <div>
          <PasswordInputField
            label="Password"
            name="password"
            autoComplete="phone"
            placeholder="Enter your Password"
          />
          <FormikErrorBox />
        </div>
        <TextAreaField
          placeholder="Enter your address"
          label="Address"
          id="address"
          name="address"
          minRows={2}
        />
        <Button extraClassName="w-full">Primary Button</Button>
        <Button variant="secondary" extraClassName="w-full" isLoading>
          Secondary Button
        </Button>
      </div>
    </div>
  );
}
