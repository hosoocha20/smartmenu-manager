'use client'
import React from 'react'
import { PiEye } from "react-icons/pi";

const Header = () => {
  return (
    <div className='font-inter w-full h-[3.5rem] grid grid-cols-[17rem_auto] bg-my-primary-950 py-2'>
      <div className='h-full flex items-center justify-between px-5'>
        <img src={"/smartmenuicon.svg"} className='h-[2rem] w-auto'/>
        <button className='h-[2rem] flex text-[#3FA9F5] bg-my-primary-900 rounded-[0.2rem] px-3 gap-2 items-center '>
          <PiEye className='flex text-[1.2rem]'/>
          <p className='text-sm tracking-wide'>My Menu</p>
        </button>
      </div>
      <div className='px-5 flex justify-end'>
        <button className=' w-fit flex gap-2  items-center'>
          <p className='text-sm text-my-primary-200 tracking-wide'>SmartMenu</p>
          <img src={"/my-profile.svg"} className='h-[1.9rem] w-auto'/>
        </button>
      </div>
    </div>
  )
}

export default Header