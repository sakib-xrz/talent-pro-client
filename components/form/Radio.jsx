export default function Radio({
  htmlFor,
  id,
  name,
  type,
  value,
  onChange,
  checked,
  label,
  disabled,
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex items-center space-x-2 px-4 py-1`}
    >
      <input
        id={id}
        type={type}
        className="accent-primary focus:ring-primary"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <p className="flex cursor-pointer flex-col items-start text-sm text-primary">
        {label}
      </p>
    </label>
  );
}
