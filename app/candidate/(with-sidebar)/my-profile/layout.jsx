"use client";

import SelectField from "@/components/form/SelectField";
import TabNavigation from "@/components/shared/TabNavigation";
import { usePathname, useRouter } from "next/navigation";

const profileTabsOptions = [
  {
    label: "Personal Information",
    value: "/candidate/my-profile/info",
  },
  {
    label: "Experience",
    value: "/candidate/my-profile/experience",
  },
  {
    label: "Education",
    value: "/candidate/my-profile/education",
  },
  {
    label: "Skills & Expertise",
    value: "/candidate/my-profile/skills-expertise",
  },
];

export default function MyProfileLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-full space-y-5">
      <div className="hidden md:block">
        <TabNavigation tabs={profileTabsOptions} />
      </div>
      <div className="md:hidden">
        <SelectField
          options={profileTabsOptions}
          value={profileTabsOptions.find((el) => el.value === pathname)}
          onChange={(selectedOption) => {
            router.push(selectedOption.value);
          }}
        />
      </div>
      <div className="rounded-md bg-white shadow">
        <div className="space-y-2 p-4 md:space-y-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
