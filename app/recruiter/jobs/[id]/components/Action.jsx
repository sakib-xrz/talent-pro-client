"use client";

import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Action({ job }) {
  return (
    <div>
      <Menu as="div" className="relative">
        <Menu.Button>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="mt-2">
                <MoreVertical className="w-4.5 h-4.5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>More Actions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              "absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
          >
            <Menu.Item>
              <div className="flex w-full cursor-pointer items-center gap-2 bg-white p-4 text-center text-sm font-medium text-primary duration-300 first:rounded-t-sm last:rounded-b-sm hover:bg-secondary/80">
                <div>
                  <PencilSquareIcon className="h-4 w-4 text-primary" />
                </div>
                <p>Edit Job</p>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="flex w-full cursor-pointer items-center gap-2 bg-white p-4 text-center text-sm font-medium text-primary duration-300 first:rounded-t-sm last:rounded-b-sm hover:bg-destructive hover:text-white">
                <div>
                  <TrashIcon className="h-4 w-4" />
                </div>
                <p>Delete Job</p>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
