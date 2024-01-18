import { ApplicationStatus } from "@/common/KeyChain";
import Select from "@/components/form/Select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TableBodyData() {
  return (
    <tr className="bg-white">
      <td className="sticky left-0 bg-white p-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12">
            <Image
              src={"/images/empty_user.jpg"}
              className="h-12 w-12 rounded-full border-2 border-border object-cover"
              width={48}
              height={48}
              alt="user-image"
            />
          </div>

          <div className="truncate">
            <h5 className="font-semibold">Md Sakibul Islam</h5>
            <p className="text-muted-foreground">sakibul.islam0808@gmail.com</p>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm font-medium text-gray-500 sm:pr-6 ">
        <p className="truncate capitalize">
          Junior Frontend Developer - React/Next.Js
        </p>
      </td>

      <td className="w-full whitespace-nowrap  p-4 text-sm">
        <p className="text-muted-foreground">8 Jan, 2024</p>
      </td>
      <td className="w-full whitespace-nowrap  p-4 text-sm">
        <p className="text-muted-foreground">+8801409029742</p>
      </td>
      <td className="w-full whitespace-nowrap  p-4 text-sm">
        <p className="text-muted-foreground">Resume.pdf</p>
      </td>
      <td className="w-full whitespace-nowrap  p-4 text-sm">
        <p className="text-muted-foreground">1 Year</p>
      </td>
      <td className="w-full whitespace-nowrap  p-4 text-sm">
        <p className="text-muted-foreground">৳35,000 - ৳40,000</p>
      </td>
      <td className="whitespace-nowrap p-4 text-center text-sm">
        <div className="w-52">
          <Select
            options={ApplicationStatus}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </td>
      <td className="w-full whitespace-nowrap  p-4 text-sm">
        <Button variant="link">View Details</Button>{" "}
      </td>
    </tr>
  );
}
