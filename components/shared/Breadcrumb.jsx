import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Breadcrumb({ contents }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2">
      {contents.map((content) => (
        <div key={content.label}>
          {content.href ? (
            <Link
              className="flex items-center gap-3 font-semibold text-primary/75 hover:text-primary"
              href={content.href}
            >
              <span className="text-sm">{content.label}</span>
              <span className="text-sm">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ) : (
            <span className="cursor-default text-sm font-semibold text-primary/75">
              {content.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
