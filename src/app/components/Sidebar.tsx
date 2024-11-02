'use client'

import React, { ReactNode } from 'react'
import { RxDashboard } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlinePalette, MdOutlinePermMedia, MdQrCode } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import Link from 'next/link';
import { usePathname } from 'next/navigation';



interface SidebarLink{
    name: string
    icon: ReactNode
    link: string
}

const Sidebar = () => {
    const currentPath = usePathname();
    const sidebararr : SidebarLink[] = [{name: "Dashboard", icon: <RxDashboard />, link: "/dashboard"}, {name: "Menu", icon: <BiFoodMenu />, link: "/manage-menu"}, {name: "Appearance", icon: <MdOutlinePalette />, link: "/manage-appearance"}, {name: "Media", icon: <MdOutlinePermMedia />, link: "/manage-media"}, {name: "Activity Log", icon: <GoHistory />, link: "/activity-log"}, {name: "QR Links", icon: <MdQrCode />, link: "/manage-qr-links"}]
    
  return (
    <div className='font-inter -full bg-my-primary-950 px-4 py-3'>
        <div className='flex flex-col gap-1'>
            {sidebararr.map((item: SidebarLink, i:number) => (
                <Link href={`${item.link}`} key={i} className={ `${currentPath === item.link || currentPath.startsWith(item.link) ? "bg-primary-comp-800 text-white" : "text-my-black-600"}  flex gap-3 items-center w-full py-3 px-3 rounded-md `}>
                    <div className='flex text-[1.3rem]'>{item.icon}</div>
                    <p className='text-[0.9rem]  tracking-wide'>{item.name}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Sidebar