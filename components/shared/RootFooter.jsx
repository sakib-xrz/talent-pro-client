import Image from "next/image";
import Link from "next/link";

import Logo from "public/images/logo.png";

const footerOptions = [
  { name: "Hire Talents", href: "/recruiter-register" },
  { name: "Find Jobs", href: "/find-jobs" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

const date = new Date();
let year = date.getFullYear();

export default function RootFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-5 sm:px-8">
      <div className="flex flex-col items-center justify-between gap-8 py-10 md:flex-row ">
        <div className="flex gap-20">
          <div>
            <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 lg:gap-16">
          {footerOptions?.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="text-base font-medium text-gray-500 hover:text-gray-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <Image
            height={500}
            width={500}
            src="/images/twitter.png"
            className="h-5 w-5 cursor-pointer object-cover object-center opacity-40 hover:opacity-100"
            alt="twitter.png"
          />
          <Image
            height={500}
            width={500}
            src="/images/linkedin.png"
            className="h-5 w-5 cursor-pointer object-cover object-center opacity-40 hover:opacity-100"
            alt="linkedin.png"
          />
          <Image
            height={500}
            width={500}
            src="/images/facebook.png"
            className="h-5 w-5 cursor-pointer object-cover object-center opacity-40 hover:opacity-100"
            alt="facebook.png"
          />
        </div>
      </div>
      <hr />
      <p className="py-4 text-center text-base text-gray-500">
        © Copyright {year} Talent Pro
      </p>
    </footer>
  );
}
