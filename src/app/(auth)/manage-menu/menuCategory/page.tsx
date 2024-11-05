"use client";

import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

const MenuCategory = () => {
  return (
    <div className="font-inter bg-background py-4 px-5">
      <h1 className="text-my-black-950 font-semibold text-[1.4rem] tracking-wide">
        Your Menu Categories
      </h1>
      <div className="mt-4 flex gap-8">
        <button className="flex items-center gap-2 bg-primary-comp-600 text-[0.87rem] px-3 py-[0.35rem] rounded tracking-wide">
          <HiOutlinePlus className="flex text-[1.2rem]" />
          Add Category
        </button>
        <label className="relative">
            <IoIosSearch className="absolute left-2 top-[50%] translate-y-[-50%] flex text-[1rem] text-[#b3b3b3]"/>
          <input
            type="text"
            placeholder="Search a category..."
            className="bg-white py-[0.35rem]  pl-8 pr-3 border border-[#cccccc] text-[#b3b3b3] text-[0.87rem] w-[400px]"
          />
        </label>
      </div>
    </div>
  );
};

export default MenuCategory;
