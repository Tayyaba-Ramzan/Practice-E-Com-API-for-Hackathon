import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
    return (
        <div className="w-full min-h-screen lg:p-20 p-10 flex flex-col justify-around gap-6 sm:gap-16">
            <div className="intro flex items-center">
                <h1>
                    Home / <span className="font-bold">Contact</span>
                </h1>
            </div>
            <section className="w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
                <div className="image w-full lg:w-1/3 flex justify-center">
                    <Image src={"/Frame 858.png"} width={340} height={457} alt="" />
                </div>

                <div className="input w-full lg:w-2/3">
                    <Card className="w-full max-w-[800px] lg:h-[440px] shadow-lg p-6">
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            id="name"
                                            placeholder="Your Name"
                                            className="bg-gray-200"
                                        />
                                        <Input
                                            id="email"
                                            placeholder="Your Email"
                                            className="bg-gray-200"
                                        />
                                        <Input
                                            id="phone"
                                            placeholder="Your Phone"
                                            className="bg-gray-200 col-span-1 md:col-span-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <textarea
                                            name="mess"
                                            title="mess"
                                            rows={6}
                                            placeholder="Your Message"
                                            className="w-full bg-gray-200 rounded-md p-2"
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end mt-4">
                            <Button className="bg-[#db4543] px-8 hover:bg-[#dc5d5b]">
                                Send Message
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
}
