import { cn } from "@/lib/utils";

const defaultClassName =
  "block w-full mt-1 rounded-md border border-border pl-3 pr-10 font-semibold focus:border-border focus:outline-none focus:ring-primary text-sm";

const Select = ({
  name = "",
  id = "",
  extraClassName,
  value = "",
  options,
  onChange = () => {},
}) => {
  return (
    <div className="">
      <select
        id={id}
        name={name}
        className={cn(defaultClassName, extraClassName)}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="font-semibold"
            disabled={option.isDisabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
