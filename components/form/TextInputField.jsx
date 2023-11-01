"use client";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-800";

const defaultClassNames =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm";

export default function TextInputField({
  type = "text",
  name,
  label,
  labelClassName = defaultLabelClassNames,
  className = defaultClassNames,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
