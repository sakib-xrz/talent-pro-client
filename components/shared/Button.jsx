import classNames from "classnames";

const defaultButtonClasses =
  "inline-flex justify-center items-center rounded-md border font-medium shadow-sm focus:outline-none focus:ring-none disabled:cursor-not-allowed";

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variants = {
  primary:
    "bg-primary text-white border border-transparent hover:bg-primary-700 disabled:bg-primary/50 ",
  secondary:
    "bg-transparent text-primary border border-primary hover:bg-primary-100 disabled:hover:bg-transparent disabled:text-primary/50 disabled:border-opacity-50",
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  extraClassName = "",
  type = "button",
  ref,
  ...props
}) => {
  const variantClasses = variants[variant];
  const sizeClass = sizeClasses[size];
  const className = classNames(
    defaultButtonClasses,
    variantClasses,
    sizeClass,
    extraClassName,
  );

  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
