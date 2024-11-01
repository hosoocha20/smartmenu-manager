"use client";
import React, { ReactNode } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineTableBar, MdOutlineQrCode } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { IoEarth } from "react-icons/io5";
import { TbBulb } from "react-icons/tb";

interface GetStartedLinksI {
  name: string;
  icon: ReactNode;
  link: string;
}
const getStartedArr: GetStartedLinksI[] = [
  { name: "Add your menu categories", icon: <FiPlusSquare />, link: "" },
  { name: "Add your tables", icon: <MdOutlineTableBar />, link: "" },
  { name: "Set up your QR links", icon: <MdOutlineQrCode />, link: "" },
  { name: "Preview your menu", icon: <PiEye />, link: "" },
  { name: "Publish your digital menu", icon: <IoEarth />, link: "" },
];

const Dashboard = () => {
  return (
    <div className="font-inter bg-background px-6 py-4">
      <h1 className="text-my-black-950 font-semibold text-[1.5rem] tracking-wide">
        Dashboard
      </h1>
      <div className="mt-4 w-full grid grid-cols-[50%_auto_auto] border border-[#CCCCCC] border-opacity-50 bg-white px-4 py-5 rounded-md">
        <div className="text-my-primary-900 flex flex-col justify-between">
          <div>
            <h2 className="text-[1.1rem] text-my-primary-900 font-medium tracking-wide">
              Welcome to your SmartMenu
            </h2>
            <p className="text-[0.93rem]">Manage and build your digital menu:</p>
          </div>
          <button className="w-fit bg-my-secondary-400 text-white px-4 py-2 text-[.93rem] rounded-[.2rem]">
            Choose Your Design
          </button>
        </div>
        <div className="text-my-primary-800 py-3">
          <h4 className="font-semibold text-[0.95rem]">Lets Get You Started</h4>
          <div className="mt-2 grid grid-cols-[min-content_auto] gap-y-2 gap-x-3 text-my-primary-900 items-center">
            {getStartedArr.map((el: GetStartedLinksI, i: number) => (
              <>
                <div className="flex text-[1.1rem]">{el.icon}</div>
                <p className="text-my-accent-400 text-sm font-medium tracking-wide">
                  {el.name}
                </p>
              </>
            ))}
          </div>
        </div>
        <div className="text-my-primary-800 py-3">
          <div className="grid grid-cols-[min-content_auto] gap-y-2 gap-x-3 text-my-primary-900 items-center">
            <div className="flex text-[1.3rem] text-my-secondary-600">
              <TbBulb />
            </div>
            <p className=" text-sm font-medium tracking-wide">
              Tutorial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
