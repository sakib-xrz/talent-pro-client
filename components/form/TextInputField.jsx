"use client";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-800";

const defaultClassNames =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm disabled:cursor-not-allowed disabled:opacity-50";

export default function TextInputField({
  type = "text",
  name,
  label,
  labelClassName = defaultLabelClassNames,
  className = defaultClassNames,
  defaultValue,
  disabled,
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
        defaultValue={defaultValue}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
