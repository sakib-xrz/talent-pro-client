"use client";

import { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-800";

const defaultClassNames =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm disabled:cursor-not-allowed disabled:opacity-50";

export default function PasswordInputField({
  name,
  label,
  labelClassName = defaultLabelClassNames,
  placeholder,
  className = defaultClassNames,
  defaultValue,
  disabled,
  value,
  onChange,
  onBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <input
          autoComplete="new-password"
          type={`${showPassword ? "text" : "password"}`}
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
          defaultValue={defaultValue}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer"
        >
          {showPassword ? (
            <EyeSlashIcon className="absolute right-3 top-1/2 h-5 w-6 -translate-y-1/2 transform text-primary" />
          ) : (
            <EyeIcon className="absolute right-3 top-1/2 h-5 w-6 -translate-y-1/2 transform text-primary" />
          )}
        </div>
      </div>
    </div>
  );
}
