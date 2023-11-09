"use client";

import Link from "next/link";

import classNames from "classnames";

const defaultClasses = "font-medium text-primary";

export default function LinkButton({
  href,
  children,
  extraClassName = "",
  ...props
}) {
  const className = classNames(defaultClasses, extraClassName);
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
