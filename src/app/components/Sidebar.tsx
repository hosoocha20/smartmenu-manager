import React, { ReactNode } from 'react'
import { RxDashboard } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlinePalette, MdOutlinePermMedia } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { MdQrCode } from "react-icons/md";
import { IconType } from 'react-icons';

interface SidebarLink{
    name: string
    icon: ReactNode
    link: string
}

const Sidebar = () => {
    const sidebararr : SidebarLink[] = [{name: "Dashboard", icon: <RxDashboard />, link: "dashboard"}, {name: "Menu", icon: <BiFoodMenu />, link: "manage-menu"}]
    
  return (
    <div className='font-inter -full bg-my-primary-950'>
        {sidebararr.map((item: SidebarLink, i:number) => (
            <button className='flex text-my-black-600'>
                {item.icon}
                <p>{item.name}</p>
            </button>
        ))}
    </div>
  )
}

export default Sidebar