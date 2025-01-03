"use client";

import { MenuCategoryI } from "@/app/interfaces/MenuI";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { AppState } from "@/app/lib/types/selectorTypes";
import { selectCategoryTableData } from "@/app/lib/selectors/categorySelectors";
import { NormalizedState } from "@/app/lib/normalizedUserData";

const MenuCategory = () => {
    const cols = [{key: "categoryName", name: "Category Name"}, {key: "subCategories", name: "No. Subcategories"}, {key: "items", name: "No. Items"}, {key: "status", name: "Status"},{key: "delete", name: "Delete"} ]
    const categoryTableData = useSelector(
      selectCategoryTableData
    );
    console.log(categoryTableData)
    const dummyarr: MenuCategoryI[] = [
    {
    key: 1,
      categoryName: "Appetizers",
      subCategories: ["a", "b", "c"],
      items: ["a", "b", "c"],
    },
    { key: 2, categoryName: "Salads", subCategories: [], items: ["a", "b", "c"] },
    {
        key: 3,
      categoryName: "Daily Lunch Specials",
      subCategories: [],
      items: ["a", "b", "c", "d", "e", "f"],
    },
    {
        key: 4,
      categoryName: "Pizza",
      subCategories: [],
      items: ["a", "b", "c", "d", "e", "f"],
    },
    {
        key: 5,
      categoryName: "Pasta",
      subCategories: ["a", "b", "c"],
      items: ["a", "b", "c", "d", "e"],
    },
    {
        key: 6,
      categoryName: "Kids Corner",
      subCategories: [],
      items: ["a", "b", "c", "d", "e"],
    },
    { key: 7, categoryName: "Dessert", subCategories: [], items: ["a", "b", "c"] },
    {
        key: 8,
      categoryName: "Beverages",
      subCategories: ["a", "b", "c", "d"],
      items: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    },
  ];

  //render table dynamically using items prop and providing a render function allows react-aria to automatically 
  //cache the results of rendering each item and avoid re-rendering all items in the collection when only one of them changes. 
  //This has big performance benefits for large collections.
  const renderCell = React.useCallback((row : any, columnKey : any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "subCategories":
        return(
            <p>{row.subcategoryCount}</p>
        );
      case "items":
        return(
            <p>{row.itemCount}</p>
        )
      case "status":
        return (
          <div className="flex justify-center items-center">
            <p className="px-7 py-1 bg-[#d7e7ff] text-[#3985f7] w-fit font-semibold text-[0.88rem]  rounded-full">Active</p>
          </div>
        );
      case "delete":
        return (
          <div className="flex justify-center items-center">
            <BsThreeDots />
          </div>
          
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="font-inter bg-[#ffffff] py-4 px-5">
      <h1 className="text-my-black-950 font-semibold text-[1.4rem] tracking-wide">
        Your Menu Categories
      </h1>
      <div className="mt-4 flex gap-8">

        <label className="relative">
          <IoIosSearch className="absolute left-2 top-[50%] translate-y-[-50%] flex text-[1rem] text-[#b3b3b3]" />
          <input
            type="text"
            placeholder="Search a category..."
            className="bg-white py-[0.35rem]  pl-8 pr-3 border border-[#cccccc] text-[#b3b3b3] text-[0.87rem] w-[400px]"
          />
        </label>
        <button className="flex items-center gap-2 bg-primary-comp-600 text-[0.87rem] px-3 py-[0.35rem] rounded tracking-wide">
          <HiOutlinePlus className="flex text-[1.2rem]" />
          Add Category
        </button>
      </div>
      <Table aria-label="Table for Managing Menu Categories"  className="bg-white border border-[#cccccc] border-opacity-50 mt-4">
        <TableHeader className="" columns={cols}>
            {(column) => <TableColumn key={column.key}  className={`bg-[#f7f7f7] py-2 pl-7 border-b text-[0.875rem] font-medium text-[#5e6277] ${column.key === "categoryName" ? "text-left" : "text-center"}`}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={categoryTableData}>
            {(item) => (
                <TableRow key={item.id}  className="">
                    {(columnKey) => <TableCell  className={` text-[0.9rem] py-3 pl-7   border-b text-my-black-950 ${columnKey === "categoryName" ? "text-left" : "text-center "}`}>{renderCell(item, columnKey)}</TableCell>}
                    
                </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuCategory;
