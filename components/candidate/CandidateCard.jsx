import { selectUser } from "@/redux/reducers/userSlice";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function CandidateCard() {
  const user = useSelector(selectUser);
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
            "absolute right-0 mt-2 w-32 origin-top-right rounded-md border border-border bg-white shadow"
          }
        >
          <Menu.Item>
            <h5 className="rounded-md p-2 hover:bg-destructive hover:text-white">
              Logout
            </h5>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
