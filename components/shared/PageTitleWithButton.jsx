import Link from "next/link";

import { Button } from "../ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function PageTitleWithButton({
  title,
  buttonText,
  href = "#",
  icon = true,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 md:gap-0">
      <h2 className="text-lg font-semibold text-primary md:text-2xl">
        {title}
      </h2>
      <div className="w-full sm:w-fit">
        {buttonText ? (
          <Link href={href}>
            <Button className="w-full justify-center">
              {icon && <PlusIcon className="mr-2 h-4 w-4 text-white" />}
              {buttonText}
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
