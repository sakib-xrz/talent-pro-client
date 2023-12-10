"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

const DEFAULT_STYLES = "cursor-pointer text-base truncate overflow-x-auto";
const ACTIVE_TAB_STYLES =
  "font-semibold text-primary rounded-t-md border-b-4 border-primary pb-2";
const DEFAULT_TAB_STYLES = "font-normal";

export default function TabNavigation(props) {
  const { tabs } = props;
  const pathname = usePathname();

  return (
    <ul className="flex w-full gap-8 border-b border-border pb-2">
      {tabs.map((tab) => (
        <li key={tab.label}>
          <Link
            href={tab.value}
            className={cn(
              DEFAULT_STYLES,
              pathname === tab.value ? ACTIVE_TAB_STYLES : DEFAULT_TAB_STYLES,
            )}
          >
            {tab.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
