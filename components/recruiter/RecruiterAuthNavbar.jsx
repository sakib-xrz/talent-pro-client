"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";

import Logo from "public/images/logo.png";
import { useStore } from "@/context/StoreProvider";

import { Button } from "../ui/button";
import MobileNavOptions from "./MobileNavOptions";
import RecruiterCard from "./RecruiterCard";
import RecruiterCardDropdown from "./RecruiterCardDropdown";
import RightSideDrawer from "../shared/RightSideDrawer";

export default function RecruiterAuthNavbar() {
  const { user } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-4 py-3 shadow sm:px-8">
      <Link href={"/recruiter"}>
        <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
      </Link>
      <div className="hidden items-center lg:flex">
        <RecruiterCardDropdown />
      </div>
      <div className="lg:hidden">
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
        {!user.isOnboardComplete && (
          <div>
            <MobileNavOptions setOpen={setDrawerOpen} />
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
  );
}
