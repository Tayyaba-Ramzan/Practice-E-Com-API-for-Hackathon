import React from 'react'
import Image from 'next/image'

const AboutPage = () => {
    return (
        <>
            <h1 className="text-[16px] w-[103px] h-[21px] mt-28 ml-6 sm:ml-12">
                Home / About
            </h1>
            <div className='flex flex-col lg:flex-row items-center justify-around mt-16 lg:mt-36 ml-6 sm:ml-12'>
                <div className='lg:w-1/2 w-full'>
                    <h1 className='text-[32px] sm:text-[40px] font-bold mb-8'>Our Story</h1>
                    <p className='w-full sm:w-[525px] lg:w-[525px] h-auto text-[14px] sm:text-[16px]'>
                        Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
                    </p>
                    <br />
                    <p className='w-full sm:w-[505px] lg:w-[505px] h-auto text-[14px] sm:text-[16px]'>
                        Exclusive has more than 1 million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer.
                    </p>
                </div>
                <div className='mt-4 lg:mt-0 flex items-center justify-center lg:justify-end mr-12'>
                    <Image
                        src={"/side-img.png"}
                        alt='side-img'
                        width={705}
                        height={609}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className='flex flex-wrap items-center justify-evenly mt-16 gap-6'>
                <div className='w-[270px] h-[230px] border border-black rounded flex flex-col items-center justify-center gap-2 hover:bg-[#DB4444] hover:text-[#FAFAFA] hover:border-none'>
                    <Image
                        src={"/ico1.png"}
                        alt='icon-1'
                        width={80}
                        height={80}
                    />
                    <h3 className='text-[32px] font-bold'>10.5k</h3>
                    <p>Sellers active on our site</p>
                </div>
                <div className='w-[270px] h-[230px] border border-black rounded flex flex-col items-center justify-center gap-2 hover:bg-[#DB4444] hover:text-[#FAFAFA] hover:border-none'>
                    <Image
                        src={"/ico2.png"}
                        alt='icon-2'
                        width={80}
                        height={80}
                        className='hover:text-white'
                    />
                    <h3 className='text-[32px] font-bold'>33k</h3>
                    <p>Monthly Product Sale</p>
                </div>
                <div className='w-[270px] h-[230px] border border-black rounded flex flex-col items-center justify-center gap-2 hover:bg-[#DB4444] hover:text-[#FAFAFA] hover:border-none'>
                    <Image
                        src={"/ico3.png"}
                        alt='icon-3'
                        width={80}
                        height={80}
                    />
                    <h3 className='text-[32px] font-bold'>45.5k</h3>
                    <p>Customers active on our site</p>
                </div>
                <div className='w-[270px] h-[230px] border border-black rounded flex flex-col items-center justify-center gap-2 hover:bg-[#DB4444] hover:text-[#FAFAFA] hover:border-none'>
                    <Image
                        src={"/ico4.png"}
                        alt='icon-4'
                        width={80}
                        height={80}
                    />
                    <h3 className='text-[32px] font-bold'>25k</h3>
                    <p>Annual gross sale on our site</p>
                </div>
            </div>

            <div className='flex flex-wrap items-center justify-around mt-16 lg:mt-28 gap-6'>
                <div className='w-full sm:w-[370px] h-auto'>
                    <Image
                        src={"/per1.png"}
                        width={370}
                        height={430}
                        alt='per-1'
                        className="w-full h-auto"
                    />
                    <h1 className='font-bold text-[24px] sm:text-[32px] mt-4 text-center'>Tom Cruise</h1>
                    <p className='text-center'>Founder & Chairman</p>
                    <Image
                        src={"/social-media.png"}
                        width={104}
                        height={24}
                        alt='per-1'
                        className='mt-3 mx-auto'
                    />
                </div>
                <div className='w-full sm:w-[370px] h-auto'>
                    <Image
                        src={"/per2.png"}
                        width={370}
                        height={430}
                        alt='per-2'
                        className="w-full h-auto"
                    />
                    <h1 className='font-bold text-[24px] sm:text-[32px] mt-4 text-center'>Tom Cruise</h1>
                    <p className='text-center'>Founder & Chairman</p>
                    <Image
                        src={"/social-media.png"}
                        width={104}
                        height={24}
                        alt='per-2'
                        className='mt-3 mx-auto'
                    />
                </div>
                <div className='w-full sm:w-[370px] h-auto'>
                    <Image
                        src={"/per3.png"}
                        width={370}
                        height={430}
                        alt='per-3'
                        className="w-full h-auto"
                    />
                    <h1 className='font-bold text-[24px] sm:text-[32px] mt-4 text-center'>Tom Cruise</h1>
                    <p className='text-center'>Founder & Chairman</p>
                    <Image
                        src={"/social-media.png"}
                        width={104}
                        height={24}
                        alt='per-3'
                        className='mt-3 mx-auto'
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10 mt-16 lg:grid-cols-3 lg:gap-20 sm:px-4 mb-10">
                <div className="flex flex-col items-center justify-center text-center">
                    <Image
                        src="/logo1.png"
                        width={80}
                        height={80}
                        alt="logo-1"
                    />
                    <h1 className="mt-6 text-[20px] font-semibold lg:text-[24px]">
                        FREE AND FAST DELIVERY
                    </h1>
                    <p className="text-[14px] lg:text-[16px]">
                        Free delivery for all orders over $140
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                    <Image
                        src="/logo2.png"
                        width={80}
                        height={80}
                        alt="logo-2"
                    />
                    <h1 className="mt-6 text-[20px] font-semibold lg:text-[24px]">
                        24/7 CUSTOMER SERVICE
                    </h1>
                    <p className="text-[14px] lg:text-[16px]">
                        Friendly 24/7 customer support
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                    <Image
                        src="/logo3.png"
                        width={80}
                        height={80}
                        alt="logo-3"
                    />
                    <h1 className="mt-6 text-[20px] font-semibold lg:text-[24px]">
                        MONEY BACK GUARANTEE
                    </h1>
                    <p className="text-[14px] lg:text-[16px]">
                        We return money within 30 days
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutPage
