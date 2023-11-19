"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import RightSideDrawer from "../shared/RightSideDrawer";
import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/images/logo.png";
import { selectUser } from "@/redux/reducers/userSlice";
import { useSelector } from "react-redux";
import CandidateCard from "./CandidateCard";

export default function CandidateAuthNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector(selectUser);
  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-4 py-3 shadow sm:px-8">
      <Link href={"/candidate"}>
        <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
      </Link>
      <div className="hidden items-center sm:flex">
        <CandidateCard />
      </div>
      <div className="sm:hidden">
        <Bars3Icon
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="h-8 w-8 cursor-pointer text-primary"
        />
      </div>
      <RightSideDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={
          <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
        }
      >
        This is content
      </RightSideDrawer>
    </div>
  );
}
