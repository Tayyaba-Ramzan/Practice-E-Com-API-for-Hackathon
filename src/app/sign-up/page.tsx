import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center">
      {/* Side Image Section */}
      <div className="image hidden md:flex w-full md:w-[60%] lg:p-20">
        <Image src={'/Side Image.png'} width={805} height={781} alt="Side Image" className="w-full h-auto"/>
      </div>

      {/* Card Section */}
      <div className="card w-full md:w-[40%] p-5 md:lg:p-20 flex justify-center">
        <Card className="w-full max-w-[371px] h-auto border-none">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl">Create an account</CardTitle>
            <CardDescription className="text-black text-center">
              Enter your details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="name" placeholder="Name" className="border-none"/>
                  <div className="line w-full border-t-2 ml-3"></div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="email" placeholder="Email or Phone Number" className="border-none"/>
                  <div className="line w-full border-t-2 ml-3"></div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" placeholder="Password" className="border-none"/>
                  <div className="line w-full border-t-2 ml-3"></div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button className="bg-[#db4543] hover:bg-[#e36765]">Create Account</Button>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button className="bg-white border-2 hover:bg-slate-200">
                    <Image src={'/Frame 748.png'} alt="Google Icon" width={100} height={100}/>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-around text-sm md:text-base">
            <span>Already have an account?</span>
            <Link href={'/login'} className="hover:underline hover:underline-offset-4 decoration-[#b3aeae]">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
