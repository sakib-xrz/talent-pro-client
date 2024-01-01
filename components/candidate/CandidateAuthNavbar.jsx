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
import CandidateCard from "./CandidateCard";
import CandidateCardDropdown from "./CandidateCardDropdown";
import RightSideDrawer from "../shared/RightSideDrawer";
import MobileNavOptions from "./MobileNavOptions";

const DEFAULT_STYLES =
  "flex justify-center items-center cursor-pointer px-3 py-1";
const ACTIVE_TAB_STYLES = "font-medium text-primary border-b-2 border-primary";
const DEFAULT_TAB_STYLES =
  "font-medium text-primary border-b-2 border-transparent";

const candidateMenus = [
  {
    name: "Dashboard",
    href: "#",
  },
  {
    name: "Explore Opportunities",
    href: "/candidate/jobs",
  },
];

export default function CandidateAuthNavbar() {
  const { user } = useStore();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 mx-auto grid max-w-7xl grid-cols-12 items-center justify-center gap-4 bg-white px-4 py-3 ">
      <Link href={"/candidate"} className="col-span-8 lg:col-span-2">
        <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
      </Link>
      <div className="col-span-6 hidden gap-4 lg:flex">
        {candidateMenus?.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={cn(
              DEFAULT_STYLES,
              pathname === item.href ? ACTIVE_TAB_STYLES : DEFAULT_TAB_STYLES,
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="hidden items-center justify-end lg:col-span-4 lg:flex">
        <CandidateCardDropdown />
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
        title={<CandidateCard />}
      >
        {user.isOnboardComplete && (
          <div>
            <MobileNavOptions setOpen={setDrawerOpen} menus={candidateMenus} />
          </div>
        )}
        <Link
          href="/logout"
          className="absolute bottom-5 right-5 mx-auto w-fit"
        >
          <Button variant="destructive" className="w-full gap-2">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </Link>
      </RightSideDrawer>
    </div>
  );
}
