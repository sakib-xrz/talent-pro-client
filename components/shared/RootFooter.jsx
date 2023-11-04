import Link from "next/link";
import Logo from "public/images/logo.jpg";
import Image from "next/image";

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
    <footer className="space-y-8 bg-white px-5 py-8 sm:px-8 md:py-16">
      <div className="flex flex-col items-center justify-between gap-8 border-gray-200 md:flex-row ">
        <div className="flex gap-20">
          <div>
            <Image src={Logo} width={150} height={40} alt="Talent Pro Logo" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 lg:gap-20">
          {footerOptions?.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="font-semibold text-gray-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5 ">
          <Image
            height={500}
            width={500}
            src="/images/twitter.png"
            className="h-5 w-5 object-cover object-center opacity-40"
            alt=""
          />
          <Image
            height={500}
            width={500}
            src="/images/linkedin.png"
            className="h-5 w-5 object-cover object-center opacity-40"
            alt=""
          />
          <Image
            height={500}
            width={500}
            src="/images/facebook.png"
            className="h-5 w-5 object-cover object-center opacity-40"
            alt=""
          />
        </div>
      </div>
      <hr />
      <p className="text-center text-base text-gray-400">
        © Copyright {year} Talent Pro
      </p>
    </footer>
  );
}
