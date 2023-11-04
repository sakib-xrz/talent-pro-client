"use client";

import Select from "react-select";

export default function SelectField({
  name,
  label,
  isDisabled = false,
  isSearchable = false,
  isClearable = false,
  isMulti = false,
  onChange,
  options,
  placeholder,
  value,
  defaultValue,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="block whitespace-nowrap text-sm font-semibold text-gray-800"
      >
        {label}
      </label>
      <Select
        name={name}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        styles={{
          control: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            boxShadow: "none",
            borderRadius: "6px",
            paddingTop: "1px",
            paddingBottom: "1px",
            borderColor: isFocused ? "#65a30d" : "#D1D5DB",
            ":hover": { borderColor: "#65a30d" },
          }),
          option: (baseStyles, { isFocused }) => ({
            backgroundColor: isFocused ? "#65a30d" : "#fff",
            padding: "8px",
            color: isFocused ? "#fff" : "#1F2937",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
      />
    </div>
  );
}
