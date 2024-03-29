"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import APIKit from "@/common/APIkit";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Logo from "public/images/logo.png";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function RootNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    APIKit.server.start();
  }, []);

  return (
    <nav className="sticky top-0 z-50 shadow backdrop-blur supports-[backdrop-filter]:bg-background/40 ">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
          </Link>
          <div className="hidden items-center gap-x-6 sm:flex">
            <div className=" flex items-center gap-4">
              <Link href={"/login"}>
                <Button>Sign in</Button>
              </Link>
              <Link href={"/register"}>
                <Button variant="outline">Sign up</Button>
              </Link>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <Link href={"/recruiter-login"}>
              <Button variant="link" className="px-0 font-semibold">
                Hire talent
              </Button>
            </Link>
          </div>
          <div className="relative sm:hidden">
            <Button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              Login
              <ChevronDownIcon className="h-4 w-4 text-white" />
            </Button>
            <div
              className={`${
                open ? "absolute right-0 top-12 flex flex-col" : "hidden"
              } " w-40 rounded-md border bg-white`}
            >
              <Link
                onClick={() => setOpen(false)}
                className=" border-b px-4 py-2 font-medium"
                href={"/login"}
              >
                As a Candidate
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="px-4 py-2 font-medium"
                href={"/recruiter-login"}
              >
                As a Recruiter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
