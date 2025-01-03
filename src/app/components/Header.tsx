"use client";
import React, { useState } from "react";
import { PiEye } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbLogout, TbLogout2 } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { persistor } from "../store/store";

const Header = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const logOut = async () => {

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);

        return;
      }

      const data = await response.json();
      

      console.log(data);
      persistor.purge();
      //redirect to login
      router.push('/login');
      
 
    } catch (err) {
      console.log(err);

    } 
  };

  const handleLogOut = () => {
    logOut();
  };
  return (
    <div className="font-inter w-full h-[3.5rem] grid grid-cols-[17rem_auto] bg-my-primary-950 py-2">
      <div className="h-full flex items-center justify-between px-5">
        <img src={"/smartmenuicon.svg"} className="h-[2rem] w-auto" />
        <button className="h-[2rem] flex text-[#3FA9F5] bg-my-primary-900 rounded-[0.2rem] px-3 gap-2 items-center ">
          <PiEye className="flex text-[1.2rem]" />
          <p className="text-sm tracking-wide">My Menu</p>
        </button>
      </div>
      <div className="relative px-5 flex justify-end">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`hover:bg-my-primary-900 ${showDropdown ? "bg-my-primary-900" : ""} w-[200px] flex justify-between  items-center px-2 rounded-md`}
        >
          <div className="flex gap-3 items-center">
            <img src={"/my-profile.svg"} className="h-[1.9rem] w-auto" />
            <p className="text-sm text-my-primary-200 tracking-wide">
              SmartMenu
            </p>
          </div>
          {showDropdown ? (
            <IoIosArrowUp className="text-[#a4b7d5] text-[1.1rem]" />
          ) :
          (
              <IoIosArrowDown className="text-[#a4b7d5] text-[1.1rem]" />
          )
              
          }
          
        </button>
        {showDropdown && (
          <div className="absolute right-5 top-[calc(100%+0.5rem)] px-4 py-3 bg-white border border-my-black-300 rounded-bl-md rounded-br-md text-my-primary-950 text-sm flex flex-col gap-3 w-[200px]">
            <div className="flex items-center gap-3 ">
              <BiUser className="text-[1.2rem] flex text-my-dark-400" />
              Edit Profile
            </div>
            <hr></hr>
            <div className="flex items-center gap-3 text-[#ea4a68] font-semibold">
              <TbLogout className="text-[1.2rem] flex" />
              <button onClick={handleLogOut}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
