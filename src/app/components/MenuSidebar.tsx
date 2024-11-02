'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuSidebarLinksI {
  name: string;
  link: string;
}
const MenuSidebar = () => {
  const menuSidebarLinksArr: MenuSidebarLinksI[] = [
    { name: "Menu Category", link: "/manage-menu/menuCategory" },
    { name: "Menu Sub Category", link: "/manage-menu/menuSubcategory" },
    { name: "Menu Items", link: "/manage-menu/menuItems" },
    { name: "Customize Add ons", link: "/manage-menu/customizeAddons" },
  ];
  const currentPath = usePathname();

  return (
    <div className="font-inter bg-royal-blue-50 border border-[#cccccc] w-full h-full flex flex-col">
      {menuSidebarLinksArr.map((el: MenuSidebarLinksI, i: number) => (
        <Link
          key={i}
          href={el.link}
          className={` ${currentPath === el.link ? "bg-[#cbd7f2] *:font-semibold" : "bg-royal-blue-50"} w-full border-b border-[#cccccc] text-my-primary-900  px-3 py-4`}
        >
          <p className="text-[0.95rem] ">{el.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default MenuSidebar;
