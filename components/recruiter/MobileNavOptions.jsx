import Link from "next/link";
import { usePathname } from "next/navigation";

import { BuildingOffice2Icon, UserIcon } from "@heroicons/react/24/outline";

const DEFAULT_STYLES =
  "flex w-full items-center gap-2 p-3 cursor-pointer rounded-sm";
const DEFAULT_NAV_BACKGROUND_STYLES = "hover:bg-secondary";
const ACTIVE_NAV_BACKGROUND_STYLES = "bg-primary/80";
const DEFAULT_NAV_ICON_STYLES = "font-semibold";
const ACTIVE_NAV_ICON_STYLES = "text-white font-semibold";
const DEFAULT_NAV_TEXT_STYLES = "font-semibold";
const ACTIVE_NAV_TEXT_STYLES = "text-white font-semibold";

const navOptions = [
  {
    name: "My Profile",
    href: "/recruiter/my-profile",
    icon: UserIcon,
  },
  {
    name: "My Organization",
    href: "/recruiter/organization",
    icon: BuildingOffice2Icon,
  },
];

export default function MobileNavOptions({ setOpen }) {
  let pathname = usePathname();
  const currentPathname = pathname.split("/").slice(0, 3).join("/");
  let isActiveRoute = (currentNav) => currentNav.includes(currentPathname);
  return (
    <div>
      <div className="space-y-1">
        {navOptions.map((option, index) => (
          <Link
            key={index + 1}
            href={option.href}
            className={
              (pathname === "/recruiter"
                ? DEFAULT_NAV_BACKGROUND_STYLES
                : isActiveRoute(option.href)
                  ? ACTIVE_NAV_BACKGROUND_STYLES
                  : DEFAULT_NAV_BACKGROUND_STYLES) +
              " " +
              DEFAULT_STYLES
            }
            onClick={() => setOpen(false)}
          >
            <option.icon
              className={
                (pathname === "/recruiter"
                  ? DEFAULT_NAV_ICON_STYLES
                  : isActiveRoute(option.href)
                    ? ACTIVE_NAV_ICON_STYLES
                    : DEFAULT_NAV_ICON_STYLES) + " h-5 w-5"
              }
            />
            <h2
              className={
                (pathname === "/recruiter"
                  ? DEFAULT_NAV_TEXT_STYLES
                  : isActiveRoute(option.href)
                    ? ACTIVE_NAV_TEXT_STYLES
                    : DEFAULT_NAV_TEXT_STYLES) + " text-sm"
              }
            >
              {option.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
