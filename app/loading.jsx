import Image from "next/image";
import logo from "@/public/images/logo-icon.png";

export default function loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        priority
        src={logo}
        alt="Talent Pro"
        className="h-20 w-20 animate-ping"
      />
    </div>
  );
}
