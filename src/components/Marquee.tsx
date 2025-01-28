import React from 'react'

export default function Marquee() {
  return (
    <div className=' w-full h-10 text-nowrap bg-black text-white text-[8px] sm:text-sm md:text-md flex items-center justify-around'>
      <h1 className=''>Summer Sale For All Swim Suits And Express Delivery - OFF 50% <span className=' font-bold underline'></span></h1>
      <h1 className='hidden sm:flex text-white font-bold'>
        <span className='underline'>Shop Now</span>
        </h1>
    </div>
  )
}