import { cn } from "@/lib/utils";

const DATE_LABEL_STYLES =
  "appearance-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const DATE_BOX_STYLES =
  "cursor-pointer appearance-none block w-full text-sm rounded-md text-primary border border-border px-3 py-2 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-primary-500 active:border-primary-500 cursor-text bg-transparent disabled:opacity-60 disabled:text-primary/50 disabled:cursor-not-allowed";

export default function DatePicker({
  label,
  name,
  id,
  value,
  onChange,
  disabled,
  ...props
}) {
  const DATE_FIELD_STYLES = cn(DATE_BOX_STYLES);
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className={DATE_LABEL_STYLES}>
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={DATE_FIELD_STYLES}
        {...props}
      />
    </div>
  );
}
