"use client";
import React, { Fragment, ReactNode } from "react";
import { FiPlusSquare } from "react-icons/fi";
import {
  MdOutlineTableBar,
  MdOutlineQrCode,
  MdQrCode2,
  MdOutlineCategory,
} from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { IoEarth,  } from "react-icons/io5";

import { TbBulb } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";

interface GetStartedLinksI {
  name: string;
  icon: ReactNode;
  link: string;
}
interface OverviewI {
  name: string;
  icon: ReactNode;
}
const getStartedArr: GetStartedLinksI[] = [
  { name: "Add your menu categories", icon: <FiPlusSquare />, link: "" },
  { name: "Add your tables", icon: <MdOutlineTableBar />, link: "" },
  { name: "Set up your QR links", icon: <MdOutlineQrCode />, link: "" },
  { name: "Preview your menu", icon: <PiEye />, link: "" },
  { name: "Publish your digital menu", icon: <IoEarth />, link: "" },
];
const overviewArr: OverviewI[] = [
  { name: "Menu categories", icon: <MdOutlineCategory /> },
  { name: "Tables", icon: <MdOutlineTableBar /> },
  { name: "Hosting QR links", icon: <MdQrCode2 /> },
];

const Dashboard = () => {
  return (
    <div className="font-inter bg-background px-6 py-4 overflow-y-auto">
      <h1 className="text-my-black-950 font-semibold text-[1.5rem] tracking-wide">
        Dashboard
      </h1>
      <div className="dashboard-grid gap-4 w-full">
        {/*Smartmenu Get Started */}
        <div className="dashboard-start mt-4 w-full grid grid-cols-[50%_auto_auto] border border-[#CCCCCC] border-opacity-50 bg-white px-5 py-4 rounded-md">
          <div className="text-my-primary-900 flex flex-col justify-between">
            <div>
              <h2 className="text-[1.1rem] text-my-primary-900 font-medium tracking-wide">
                Welcome to your SmartMenu
              </h2>
              <p className="text-[0.93rem]">
                Manage and build your digital menu:
              </p>
            </div>
            <button className="w-fit mb-1 bg-my-secondary-400 text-white px-4 py-2 text-[.93rem] rounded-[.2rem]">
              Choose Your Design
            </button>
          </div>
          <div className="text-my-primary-800 py-3">
            <h4 className="font-semibold text-[0.95rem]">
              Lets Get You Started
            </h4>
            <div className="mt-2 grid grid-cols-[min-content_auto] gap-y-2 gap-x-3 text-my-primary-900 items-center">
              {getStartedArr.map((el: GetStartedLinksI, i: number) => (
                <Fragment key={i}>
                  <div className="flex text-[1.1rem]">{el.icon}</div>
                  <p className="text-my-accent-400 text-sm font-medium tracking-wide">
                    {el.name}
                  </p>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="text-my-primary-800 py-3">
            <div className="grid grid-cols-[min-content_auto] gap-y-2 gap-x-3 text-my-primary-900 items-center">
              <div className="flex text-[1.3rem] text-my-secondary-600">
                <TbBulb />
              </div>
              <p className=" text-sm font-medium tracking-wide">Tutorial</p>
            </div>
          </div>
        </div>
        {/*Overview */}
        <div className="dashboard-overview  w-full  border border-[#CCCCCC] border-opacity-50 bg-white px-5 py-3 rounded-md">
          <h2 className="text-[1.1rem] text-my-primary-900 font-medium tracking-wide">
            Overview
          </h2>
          <div className=" py-8  flex  w-[90%] mx-auto my-0 ">
            {overviewArr.map((el: OverviewI, i: number) => (
              <div key={i} className="text-my-primary-900 flex gap-2 flex-1">
                <div className={`text-white ${i === 0 ? "bg-my-secondary-300" : i === 1 ? "bg-royal-blue-500" : "bg-my-dark-700"}  text-[1.7rem] flex items-center justify-center  w-[3.2rem] h-[3.2rem] rounded-full`}>
                  {el.icon}
                </div>
                <div className="mt-[-0.5rem]">
                  <p className="text-sm text-[#636A7A]">{el.name}</p>
                  <p className="text-[1.9rem]  leading-none font-bold">7</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*Profile */}
        <div className="dashboard-profile w-full  gap-4 border border-[#CCCCCC] border-opacity-50 bg-white px-5 py-3 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.1rem] text-my-primary-900 font-medium tracking-wide">
              Your Profile
            </h2>
            <LuSettings className="flex text-[#808080] text-[1.2rem]"/>
          </div>
          <div className="mt-4 flex flex-col gap-1 text-[0.9rem] text-my-primary-900">
            <p ><span className="font-medium">Restaurant Name:</span> SmartMenu</p>
            <p ><span className="font-medium">Admin Name:</span> John Doe</p>
            <p ><span className="font-medium">Last Login:</span> 8:26pm 1/11/2024</p>
          </div>
        </div>
        {/*Activity */}
        <div className="dashboard-activity  w-full  border border-[#CCCCCC] border-opacity-50 bg-white px-5 py-3 rounded-md">
          <h2 className="text-[1.1rem] text-my-primary-900 font-medium tracking-wide">
            Overview
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
