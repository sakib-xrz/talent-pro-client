import "./globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";

import GlobalProvider from "@/components/shared/GlobalProvider";

const PlusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Talent Pro",
  description: "Powered by Talent Pro",
  keywords:
    "Talent Pro, talentpro , talentproweb, talentpro web, talentpro web app, talentpro web application, talentpro webapp, talentpro web application, talentpro webapp , job, candidate, recruiter, job seeker, job search, job application, job apply, job post, job posting, job listing, job list, job search, job search engine, job search platform, job search website, job search site, job search app, job search application, job search web",

  icon: "../public/images/logo-icon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={PlusJakartaSans.className}>
        <main>
          <GlobalProvider>{children}</GlobalProvider>
        </main>
      </body>
    </html>
  );
}
