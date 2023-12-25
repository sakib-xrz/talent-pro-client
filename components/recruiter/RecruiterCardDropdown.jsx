import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { useStore } from "@/context/StoreProvider";
import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { recruiterNavOptions } from "@/common/KeyChain";

export default function RecruiterCardDropdown() {
  const { user } = useStore();

  const dropdownItems = [
    ...(user.isOnboardComplete ? recruiterNavOptions : []),
    {
      name: "Logout",
      href: "/recruiter-logout",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <Menu as="div" className={"relative"}>
      <div>
        <Menu.Button>
          <div className="flex items-center gap-2 rounded-md border border-border p-2">
            <Image
              src={user?.image_url}
              alt="user-profile"
              width={100}
              height={100}
              priority
              className="border-primary-600 h-8 w-8 rounded-full border-2 object-cover"
            />
            <div className="pr-2">
              <p className="text-start text-xs font-semibold text-gray-700">
                {user?.name?.first_name} {user?.name?.last_name}{" "}
                <span className="italic">(Recruiter)</span>
              </p>
              <p className="text-start text-xs font-medium text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={
            "absolute right-0 z-50 mt-4 w-full origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          }
        >
          {dropdownItems.map((route, index) => (
            <Menu.Item key={index + 1}>
              <Link
                href={route.href}
                className={`flex w-full items-center gap-2 bg-white p-4 text-center text-sm font-medium text-gray-700 duration-300 first:rounded-t-sm last:rounded-b-sm ${
                  route.href === "/recruiter-logout"
                    ? "hover:bg-destructive hover:text-white"
                    : "hover:bg-secondary/80"
                } `}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
