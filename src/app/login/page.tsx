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

export default function page() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
      {/* Image Section */}
      <div className="image w-full md:w-1/2 hidden md:flex items-center justify-center p-4 lg:p-20">
        <Image src="/Side Image.png" width={805} height={781} alt="Side" />
      </div>

      {/* Form Section */}
      <div className="card w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 lg:p-20">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Log in to Exclusive
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full gap-4">
                <div className="flex flex-col">
                  <Input
                    id="email"
                    placeholder="Email or Phone Number"
                    className="border-gray-300 focus:ring-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="border-gray-300 focus:ring-red-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button className="w-full bg-[#db4543] hover:bg-[#e36765] text-white">
                    Log In
                  </Button>
                </div>
                <div className="flex justify-center items-center space-y-1.5">
                  <Button className="w-full bg-white border-2 text-gray-800 hover:bg-gray-100">
                    <Image
                      src="/Frame 748.png"
                      alt="Google Login"
                      width={24}
                      height={24}
                    />
                    <span className="ml-2">Continue with Google</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center space-x-2">
            <span className="text-gray-600">Don’t have an account?</span>
            <Link
              href="/sign-up"
              className="text-red-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
