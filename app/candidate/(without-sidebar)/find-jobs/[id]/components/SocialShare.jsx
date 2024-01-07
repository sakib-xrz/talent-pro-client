import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import { Facebook, Link, Linkedin, Share2 } from "lucide-react";

export default function SocialShare() {
  return (
    <div>
      <Menu as="div" className="relative">
        <Menu.Button>
          <Share2 className="w-4.5 h-4.5" />
        </Menu.Button>
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
              "absolute right-0 z-50 mt-2 w-52 origin-top-right cursor-pointer rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
          >
            <Menu.Item>
              <div className="flex w-full items-center gap-2 bg-white p-4 text-center text-sm font-medium text-gray-700 duration-300 first:rounded-t-sm last:rounded-b-sm hover:bg-secondary/80 hover:text-primary">
                <div>
                  <Facebook className="h-4 w-4" />
                </div>
                <p>Share on Facebook</p>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="flex w-full items-center gap-2 bg-white p-4 text-center text-sm font-medium text-gray-700 duration-300 first:rounded-t-sm last:rounded-b-sm hover:bg-secondary/80 hover:text-primary">
                <div>
                  <Linkedin className="h-4 w-4" />
                </div>
                <p>Share on Linkedin</p>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="flex w-full items-center gap-2 bg-white p-4 text-center text-sm font-medium text-gray-700 duration-300 first:rounded-t-sm last:rounded-b-sm hover:bg-secondary/80 hover:text-primary">
                <div>
                  <Link className="h-4 w-4" />
                </div>
                <p>Copy link</p>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
