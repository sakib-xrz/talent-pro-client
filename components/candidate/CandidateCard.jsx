import { useUser } from "@/context/UserProvider";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const dropdownItems = [
  {
    name: "My Profile",
    href: "/candidate/my-profile",
    icon: UserIcon,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: ArrowLeftOnRectangleIcon,
  },
];

export default function CandidateCard() {
  const { user } = useUser();
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
                {user?.name?.first_name} {user?.name?.last_name}
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
            <Link
              href={route.href}
              key={index + 1}
              className={`flex w-full items-center gap-2 bg-white p-4 text-center text-sm font-medium text-gray-700 duration-300 first:rounded-t-sm last:rounded-b-sm ${
                route.href === "/logout"
                  ? "hover:bg-destructive hover:text-white"
                  : "hover:bg-secondary/80"
              } `}
            >
              <route.icon className="h-5 w-5" />
              {route.name}
            </Link>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
