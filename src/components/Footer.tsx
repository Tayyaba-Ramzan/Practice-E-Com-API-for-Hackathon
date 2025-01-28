import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <>
            <div className='bg-black text-white mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-20 px-4'>
                {/* Exclusive Section */}
                <div className='flex flex-col items-center justify-start gap-4'>
                    <h1 className='font-semibold text-[25px]'>Exclusive</h1>
                    <span className='text-[20px]'>Subscribe</span>
                    <p className='text-[16px] text-center'>Get 10% off your first order</p>
                    <div className='border border-white w-full sm:w-[217px] h-[48px] rounded-md flex items-center justify-start pl-4 gap-4'>
                        <h3 className='text-[#FAFAFA]'>Enter your email</h3>
                        <Image
                            src={"/send.png"}
                            alt='send'
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                {/* Support Section */}
                <div className='flex flex-col items-center justify-start gap-4'>
                    <h1 className='font-semibold text-[20px]'>Support</h1>
                    <address className='text-[16px] text-center'>
                        111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.
                    </address>
                    <p className='text-[16px] text-center'>exclusive@gmail.com</p>
                    <span className='text-[16px] text-center'>+88015-88888-9999</span>
                </div>

                {/* Account Section */}
                <div className='flex flex-col items-center justify-start gap-4'>
                    <h1 className='font-semibold text-[20px]'>Account</h1>
                    <ul className='list-none text-center'>
                        <li>My Account</li>
                        <li>Login / Register</li>
                        <li>Cart</li>
                        <li>Wishlist</li>
                        <li>Shop</li>
                    </ul>
                </div>

                {/* Quick Links Section */}
                <div className='flex flex-col items-center justify-start gap-4'>
                    <h1 className='font-semibold text-[20px]'>Quick Link</h1>
                    <ul className='list-none text-center'>
                        <li>Privacy Policy</li>
                        <li>Terms Of Use</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Download App Section */}
                <div className='flex flex-col items-center justify-start gap-4'>
                    <h1 className='font-semibold text-[20px]'>Download App</h1>
                    <span className='text-[12px] text-center'>Save $3 with App New User Only</span>
                    <div className='flex items-center justify-center gap-4'>
                        <Image
                            src={"/code.png"}
                            alt='code'
                            width={76}
                            height={76}
                        />
                        <Image
                            src={"/social.png"}
                            alt='social'
                            width={110}
                            height={84}
                        />
                    </div>
                    <Image
                        src={"/social-links.svg"}
                        alt='social'
                        width={168}
                        height={24}
                        className='mt-5'
                    />
                </div>
            </div>

            {/* Copyright Section */}
            <div className='bg-black h-[40px] flex items-center justify-center gap-3 text-white'>
                <Image
                    src={"/copyright.svg"}
                    alt='social'
                    width={20}
                    height={20}
                />
                <span className='w-full text-center sm:w-[311px] h-[24px]'>
                    Copyright Rimel 2022. All right reserved
                </span>
            </div>
        </>
    )
}

export default Footer
