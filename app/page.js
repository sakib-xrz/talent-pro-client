"use client";

import SelectField from "@/components/form/SelectField";
import Button from "@/components/shared/Button";
import { useState } from "react";

const ImageSelectOptions = [
  {
    label: "Prescription",
    value: "Prescription",
  },
  {
    label: "Test Report",
    value: "Test report",
  },
  {
    label: "Image",
    value: "Image",
  },
];

export default function Home() {
  const [fileType, setFileType] = useState();
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="pt-20 text-center text-2xl font-bold text-primary">
        Welcome to Talent Pro
      </h1>
      <div className="space-y-2">
        <SelectField
          options={ImageSelectOptions}
          onChange={setFileType}
          placeholder={"Select Document Type"}
          value={fileType}
        />
        <hr />
        <Button extraClassName="w-full">Primary Button</Button>
        <hr />
        <Button variant="secondary" extraClassName="w-full">
          Secondary Button
        </Button>
      </div>
    </div>
  );
}
