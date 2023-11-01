import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-800";
const defaultClassNames =
  "resize-none mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm";

export default function TextAreaField({
  name,
  id,
  type = "text",
  value,
  label,
  placeholder,
  defaultValue,
  labelClassName = defaultLabelClassNames,
  className = defaultClassNames,
  minRows = 1,
  maxRows = 5,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <ReactTextareaAutosize
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        className={className}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
