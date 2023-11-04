"use client";

import Logo from "public/images/logo.jpg";
import Button from "./Button";
import Image from "next/image";
import LinkButton from "./LinkButton";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function RootNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className=" border-b border-gray-200 bg-white px-4 py-5 sm:px-8 lg:border-none">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
        </Link>
        <div className="hidden items-center gap-x-6 divide-x-2 sm:flex">
          <div className=" flex items-center gap-4">
            <Link href={"/login"}>
              <Button>Sign In</Button>
            </Link>
            <Link href={"/register"}>
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
          <LinkButton
            extraClassName="pl-4 text-gray-800"
            href={"/recruiter-register"}
          >
            Hire talent
          </LinkButton>
        </div>
        <div className="relative sm:hidden">
          <Button
            onClick={() => setOpen(!open)}
            extraClassName="flex gap-2 items-center"
          >
            Register
            <ChevronDownIcon className="h-4 w-4 text-white" />
          </Button>
          <div
            className={`${
              open ? "absolute right-0 top-12 flex flex-col" : "hidden"
            } " w-36 rounded-md border bg-white`}
          >
            <Link className=" border-b p-2 font-medium" href={"register"}>
              As a candidate
            </Link>
            <Link className="p-2 font-medium" href={"/recruiter-register"}>
              As a recruiter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
