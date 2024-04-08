import "./globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";

import GlobalProvider from "@/components/shared/GlobalProvider";

const PlusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Talent Pro",
  description: "Powered by Talent Pro",
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
