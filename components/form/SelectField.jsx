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
            borderColor: isFocused ? "#059669" : "#D1D5DB",
            ":hover": { borderColor: "#059669" },
          }),
          option: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            backgroundColor: isFocused ? "#059669" : "#fff",
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
