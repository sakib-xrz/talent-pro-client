import Image from "next/image";
import ErrorImg from "/public/empty/no_results.png";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ErrorComponent({ status }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      if (pathname.includes("candidate")) {
        router.push("/candidate");
      } else if (pathname.includes("recruiter")) {
        router.push("/recruiter");
      } else {
        router.push("/");
      }
    }, 3000);
  }, []);

  const renderErrorMessages = (status) => {
    if (!status) return "Something Went Wrong!";
    if (status === 404) return "404 Page Not Found!";
    if (status >= 500) return "Server Is Under Maintenance!";
  };
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center space-y-4 px-4 md:px-0">
      <Image className="object-cover" src={ErrorImg} alt="no_results" />
      <h2 className="text-center text-3xl font-semibold text-primary">
        {renderErrorMessages(status)}
      </h2>
    </div>
  );
}
