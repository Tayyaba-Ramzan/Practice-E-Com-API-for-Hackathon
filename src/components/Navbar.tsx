'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IoMdMenu } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from '@/components/CartContext'

export default function Navbar() {
  const { cartItems, getCartCount } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(getCartCount());
  }, [cartItems, getCartCount]);

  const pathname = usePathname();
  const hideIcons = ['/sign-up', '/login'];

  return (
    <div className='w-full h-20 flex items-center justify-between px-4 sm:px-8 md:px-16 border-b-2 border-[#b3aeae]'>

      {/* Brand / Title */}
      <div className="title font-bold text-2xl sm:text-3xl">Exclusive</div>

      {/* Main Navigation Links */}
      <div className="list-none hidden sm:flex items-center gap-6 md:gap-10 font-bold">
        <li className='hover:underline underline-offset-4 decoration-[#b3aeae]'>
          <Link href={'/'}>Home</Link>
        </li>
        <li className='hover:underline underline-offset-4 decoration-[#b3aeae]'>
          <Link href={'/contact'}>Contact</Link>
        </li>
        <li className='hover:underline underline-offset-4 decoration-[#b3aeae]'>
          <Link href={'/about'}>About</Link>
        </li>
        <li className='hover:underline underline-offset-4 decoration-[#b3aeae]'>
          <Link href={'/sign-up'}>Sign Up</Link>
        </li>
      </div>

      {/* Search Bar for larger screens */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-[300px]">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm outline-none flex-grow"
        />
        <Image
          src="/search.svg"
          alt="search-icon"
          width={26}
          height={26}
        />
      </div>

      {/* Cart & Wishlist Icons */}
      {!hideIcons.includes(pathname) && (
        <div className="icons flex gap-4 items-center ml-44 hidden sm:flex">
          <div>
            <Link href={"/account"}>
              <Image
                src="/user.png"
                alt="cart-icon"
                width={32}
                height={32}
                className="cursor-pointer hover:scale-110 transition"
              />
            </Link>
          </div>

          <Link href={'/wishlist'}>
            <Image src={'/heart.svg'} width={32} height={32} alt='like' />
          </Link>
          <div className="cart w-[50px] relative">
            <Link href={'/cart'}>
              <CiShoppingCart className="size-8 cursor-pointer" />
            </Link>
            {totalItems > 0 && (
              <div className="oval w-[16px] h-[16px] text-sm flex items-center justify-center bg-red-600 text-white rounded-full absolute top-0 right-4">
                {totalItems}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <IoMdMenu className="cursor-pointer hover:opacity-25 text-2xl" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {/* Links */}
                <div className="lists mt-8">
                  <ol className='flex flex-col items-center gap-10 font-bold'>
                    <li className='hover:underline underline-offset-4'>
                      <Link href={'/'}>Home</Link>
                    </li>
                    <li className='hover:underline underline-offset-4'>
                      <Link href={'/contact'}>Contact</Link>
                    </li>
                    <li className='hover:underline underline-offset-4'>
                      <Link href={'/about'}>About</Link>
                    </li>
                    <li className='hover:underline underline-offset-4'>
                      <Link href={'/sign-up'}>Sign Up</Link>
                    </li>
                  </ol>
                </div>
                {/* Mobile Cart & Wishlist Icons */}
                {!hideIcons.includes(pathname) && (
                  <div className="mobile-icons flex gap-6 justify-center mt-8">
                    <div>
                      <Link href={"/account"}>
                        <Image
                          src="/user.png"
                          alt="cart-icon"
                          width={32}
                          height={32}
                          className="cursor-pointer hover:scale-110 transition"
                        />
                      </Link>
                    </div>

                    <Link href={'/wishlist'}>
                      <Image src={'/heart.svg'} width={32} height={32} alt='like' />
                    </Link>
                    <div className="cart w-[50px] relative">
                      <Link href={'/cart'}>
                        <CiShoppingCart className="text-3xl cursor-pointer" />
                      </Link>
                      {totalItems > 0 && (
                        <div className="oval w-[16px] h-[16px] text-sm flex items-center justify-center bg-red-600 text-white rounded-full absolute top-0 right-0">
                          {totalItems}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
