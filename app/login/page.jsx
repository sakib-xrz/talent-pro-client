import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/images/logo.png";

export default function CandidateLogin() {
  return (
    <div className="mx-auto w-full sm:w-2/3 sm:py-10 xl:w-1/3">
      <div className="space-y-8 rounded-md bg-white px-8 py-10 shadow">
        <div className="flex justify-center">
          <Image src={Logo} width={200} height={50} alt="Talent Pro Logo" />
        </div>
        <h2 className="scroll-m-20 text-center text-3xl font-semibold tracking-tight first:mt-0">
          Sign In to Your Account
        </h2>
        <form action="" className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="example@gmail.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Password id="password" placeholder="min 8 characters" />
            <p className="flex justify-end">
              <Button variant="link" className="p-0 font-semibold">
                Forget Password
              </Button>
            </p>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <p className="text-center text-sm font-medium leading-none">
            Don’t have an account?
            <Link href={"/register"}>
              <Button variant="link" className="p-0 font-bold">
                Create Account
              </Button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
