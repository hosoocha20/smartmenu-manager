"use client";

import { MenuCategoryI } from "@/app/interfaces/MenuI";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import React, { useMemo, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

import { selectCategoryTableData } from "@/app/lib/selectors/categorySelectors";

import { TiArrowUnsorted } from "react-icons/ti";

const MenuCategory = () => {
  const cols = [
    { key: "categoryName", name: "Category Name" },
    { key: "subCategories", name: "No. Subcategories" },
    { key: "items", name: "No. Items" },
    { key: "status", name: "Status" },
    { key: "action", name: "" },
  ];
  const categoryTableData = useSelector(selectCategoryTableData);
  //console.log(categoryTableData);
  const selectStatus = [
    {
      key: "all",
      value: "All Status",
    },
    {
      key: "active",
      value: "Active",
    },
    {
      key: "inactive",
      value: "Inactive",
    },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  const pages = Math.ceil(categoryTableData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return categoryTableData.slice(start, end);
  }, [page, categoryTableData]);

  const dummyarr: MenuCategoryI[] = [
    {
      key: 1,
      categoryName: "Appetizers",
      subCategories: ["a", "b", "c"],
      items: ["a", "b", "c"],
    },
    {
      key: 2,
      categoryName: "Salads",
      subCategories: [],
      items: ["a", "b", "c"],
    },
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
    {
      key: 7,
      categoryName: "Dessert",
      subCategories: [],
      items: ["a", "b", "c"],
    },
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
  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "subCategories":
        return <p>{row.subcategoryCount}</p>;
      case "items":
        return <p>{row.itemCount}</p>;
      case "status":
        return (
          <div className="flex justify-center items-center">
            <p className="px-7 py-1 bg-[#d7e7ff] text-[#3985f7] w-fit font-semibold text-[0.75rem]  rounded-full">
              Active
            </p>
          </div>
        );
      case "action":
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
    <div className="font-inter bg-[#ffffff] py-4 px-5 flex flex-col">
      <h1 className="text-my-black-950 font-semibold text-[1.4rem] tracking-wide">
        Your Menu Categories
      </h1>
      <div className="mt-4 flex gap-8">
        <label className="relative">
          <IoIosSearch className="absolute left-2 top-[50%] translate-y-[-50%] flex text-[1rem] text-[#b3b3b3]" />
          <input
            type="text"
            placeholder="Search a category..."
            className="bg-white py-[0.35rem]  pl-8 pr-3 border border-[#cccccc] text-[#b3b3b3] text-[0.87rem] w-[400px] rounded-md"
          />
        </label>
        <Select
          className=" text-my-black-950 text-[0.87rem] w-[7.5rem] h-full  "
          aria-label="Filter by Status"
          items={selectStatus}
          
          radius="sm"
          data-hover="false"
          classNames={{trigger: "bg-[#ffffff] border border-my-black-300  hover:bg-my-black-50",popoverContent:"bg-white  border-my-black-300 rounded-lg"}}
          defaultSelectedKeys={["all"]}
          
          
        >
          
          {selectStatus.map((status) => (
            <SelectItem key={status.key} value={status.value}  classNames={{base:"bg-white data-[hover=true]:bg-black "}} className=" text-my-black-950 data-[hover=true]:bg-black "  aria-label={status.value}>{status.value}</SelectItem>
          ))}
        
          
        </Select>

        <button className="flex items-center gap-2 bg-primary-comp-600 text-[0.87rem] px-3 py-[0.35rem] rounded tracking-wide">
          <HiOutlinePlus className="flex text-[1.2rem]" />
          Add Category
        </button>
      </div>
      <div className="border flex-1">
        <Table
          aria-label="Table for Managing Menu Categories"
          className="bg-white  border-[#cccccc] border-opacity-50 mt-4 h-full"
          classNames={{wrapper:"border border-[#cccccc] ", table:"h-full", td:""}}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader className="" columns={cols}>
            {(column) => (
              <TableColumn
                key={column.key}
                className={`bg-[#f7f7f7] py-2 pl-7 border-b text-[0.87rem] font-medium text-[#5e6277] ${
                  column.key === "categoryName" ? "text-left" : "text-center"
                }`}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id} className="">
                {(columnKey) => (
                  <TableCell
                    className={` text-[0.9rem] py-3 pl-7   border-b text-my-black-950 ${
                      columnKey === "categoryName" ? "text-left" : "text-center "
                    }`}
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MenuCategory;
