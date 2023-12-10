"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navOptions } from "@/common/KeyChain";

const DEFAULT_STYLES = "flex w-full items-center gap-2 p-4 cursor-pointer";
const DEFAULT_NAV_BACKGROUND_STYLES = "hover:bg-secondary";
const ACTIVE_NAV_BACKGROUND_STYLES =
  "bg-primary/80 border-l-4 border-primary/90";
const DEFAULT_NAV_ICON_STYLES = "font-semibold";
const ACTIVE_NAV_ICON_STYLES = "text-white font-semibold";
const DEFAULT_NAV_TEXT_STYLES = "font-semibold";
const ACTIVE_NAV_TEXT_STYLES = "text-white font-semibold";

export default function Sidebar() {
  let pathname = usePathname();
  const currentPathname = pathname.split("/").slice(0, 3).join("/");
  const isActiveRoute = (currentNav) => currentNav.includes(currentPathname);

  return (
    <div className="min-h-[calc(100vh-5rem)] border-r border-border">
      {navOptions.map((option, index) => (
        <Link
          href={option.href}
          key={index + 1}
          className={
            (isActiveRoute(option.href)
              ? ACTIVE_NAV_BACKGROUND_STYLES
              : DEFAULT_NAV_BACKGROUND_STYLES) +
            " " +
            DEFAULT_STYLES
          }
        >
          <option.icon
            className={
              (isActiveRoute(option.href)
                ? ACTIVE_NAV_ICON_STYLES
                : DEFAULT_NAV_ICON_STYLES) + " h-5 w-5"
            }
          />
          <h2
            className={
              (isActiveRoute(option.href)
                ? ACTIVE_NAV_TEXT_STYLES
                : DEFAULT_NAV_TEXT_STYLES) + " text-sm"
            }
          >
            {option.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
