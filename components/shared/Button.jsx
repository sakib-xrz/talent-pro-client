"use client";

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

const AnimatingSpinner = ({ variant }) => (
  <svg
    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className={`${variant === "secondary" && "text-gray-400"}  opacity-25`}
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className={`${variant === "secondary" && "text-primary"}  opacity-50`}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  extraClassName = "",
  type = "button",
  isLoading = false,
  disabled,
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
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <AnimatingSpinner variant={variant} /> : null}
      {children}
    </button>
  );
};

export default Button;
