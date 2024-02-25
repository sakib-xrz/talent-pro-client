"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import Logo from "public/images/logo.png";
import { useStore } from "@/context/StoreProvider";

import { Button } from "../ui/button";
import MobileNavOptions from "./MobileNavOptions";
import RecruiterCard from "./RecruiterCard";
import RecruiterCardDropdown from "./RecruiterCardDropdown";
import RightSideDrawer from "../shared/RightSideDrawer";

const DEFAULT_STYLES =
  "flex justify-center items-center cursor-pointer px-3 py-1";
const ACTIVE_TAB_STYLES = "font-medium text-primary border-b-2 border-primary";
const DEFAULT_TAB_STYLES =
  "font-medium border-b-2 border-transparent text-primary/70 hover:text-primary";

const recruiterMenus = [
  {
    name: "Dashboard",
    href: "/recruiter",
  },
  {
    name: "Jobs",
    href: "/recruiter/jobs",
  },
  {
    name: "Applications",
    href: "/recruiter/applications",
  },
];

export default function RecruiterAuthNavbar() {
  const { user } = useStore();
  console.log(user);
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 bg-white ">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center justify-center gap-4 px-4 py-3 ">
        <Link href={"/recruiter"} className="col-span-8 lg:col-span-2">
          <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
        </Link>
        <div className="col-span-6 hidden gap-4 lg:flex">
          {user.isOnboardComplete &&
            recruiterMenus?.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={cn(
                  DEFAULT_STYLES,
                  pathname === item.href
                    ? ACTIVE_TAB_STYLES
                    : DEFAULT_TAB_STYLES,
                )}
              >
                {item.name}
              </Link>
            ))}
        </div>
        <div className="hidden items-center justify-end lg:col-span-4 lg:flex">
          <RecruiterCardDropdown />
        </div>
        <div className="col-span-4 flex w-full justify-end lg:hidden">
          <Bars3Icon
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="h-8 w-8 cursor-pointer text-primary"
          />
        </div>
        <RightSideDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          title={<RecruiterCard />}
        >
          {user.isOnboardComplete && (
            <div>
              <MobileNavOptions
                setOpen={setDrawerOpen}
                menus={recruiterMenus}
              />
            </div>
          )}
          <Link
            href="/recruiter-logout"
            className="absolute bottom-5 right-5 mx-auto w-fit"
          >
            <Button variant="destructive" className="w-full gap-2">
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </Link>
        </RightSideDrawer>
      </div>
    </div>
  );
}
