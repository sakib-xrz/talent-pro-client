"use client";

const defaultLabelClassNames = "block text-sm font-semibold text-gray-800";

const defaultClassNames =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 py-2 pl-14 pr-3 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm disabled:cursor-not-allowed disabled:opacity-50";

export default function PhoneInputField({
  name,
  label,
  labelClassName = defaultLabelClassNames,
  className = defaultClassNames,
  defaultValue,
  disabled,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  value,
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <input
          autoComplete="none"
          name={name}
          type="text"
          className={className}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          onBlur={onBlur}
          value={value}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-sm text-grey-400">
          +880
        </span>
      </div>
    </div>
  );
}
