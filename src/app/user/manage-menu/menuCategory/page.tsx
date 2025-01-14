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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import { Switch } from "@nextui-org/switch";
import { Pagination } from "@nextui-org/pagination";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import React, { useMemo, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosSearch, IoMdEye } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { MdInfo, MdErrorOutline } from "react-icons/md";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { selectCategoryTableData } from "@/app/lib/selectors/categorySelectors";

import { TiArrowUnsorted } from "react-icons/ti";
import {
  createNewCategory,
  deleteCategoryThunk,
} from "@/app/store/thunks/categoryThunks";
import { AppDispatch, RootState } from "@/app/store/store";
import { Toast, ToastWrapper } from "@/app/ui/Toast";
import useToast from "@/app/hooks/useToast";
import { deleteCategory } from "@/app/services/categoryApi";
import { MenuState } from "@/app/store/slices/menuSlice";

interface RowData {
  id: number,
  categoryName: string,
  subcategoryCount: number,
  itemCount: number,
  status: boolean
}

const MenuCategory = () => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  //Form States
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  //Modal States
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<RowData>();
  //Popover state
  const [actionIsOpen, setActionIsOpen] = useState(-1);
  const [allActionOpenStates, setAllActionOpenStates] = useState<{
    [key: number]: boolean;
  }>({});
  const toggleAction = (id: number, isOpen: boolean) => {
    setAllActionOpenStates((prev) => ({
      ...prev,
      [id]: isOpen,
    }));
  };

  //Table
  const cols = [
    { key: "categoryName", name: "Category Name" },
    { key: "subCategories", name: "No. Subcategories" },
    { key: "items", name: "No. Items" },
    { key: "status", name: "Status" },
    { key: "action", name: "" },
  ];
  //Filter by Status
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null); // null for all, true for active, false for inactive
  const [statusValue, setStatusValue] = useState("all");

  const selectCategories = useSelector((state: RootState) => state.menu);
  console.log(selectCategories);
  const categoryTableData = useSelector(selectCategoryTableData(filterStatus));
  //console.log(categoryTableData);
  const selectStatus = [
    {
      key: "all",
      name: "All Status",
      value: null,
    },
    {
      key: "active",
      name: "Active",
      value: true,
    },
    {
      key: "inactive",
      name: "Inactive",
      value: false,
    },
  ];

  const handleSelectionChange = (e: any) => {
    setStatusValue(e.target.value);

    if (e.target.value === "active") setFilterStatus(true);
    else if (e.target.value === "inactive") setFilterStatus(false);
    else setFilterStatus(null);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(categoryTableData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return categoryTableData.slice(start, end);
  }, [page, categoryTableData]);

  //Toast
  const { toasts, addToast, removeToast } = useToast();

  //API
  const handleCreateNewCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createNewCategory({ newCategoryName, isActive })).unwrap();
      onClose();
      setNewCategoryName("");
      setIsActive(true);
      //alert("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      onClose();
      addToast("error", "Error: Oops something went wrong. Please log in.");
    }
  };
  const handleCategoryDelete = async (categoryId: number) => {
    //setActionIsOpen(false)
    deleteModal.onClose();
    try {
      await dispatch(deleteCategoryThunk({ categoryId })).unwrap();
      onClose();
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error creating category:", error);

      addToast("error", "Error: Oops something went wrong. Please log in.");
    }
  };

  const handleDeleteModal = (rowData: RowData) => {
    setSelectedCategory((prev) => ({
      id: rowData.id,
      categoryName: rowData.categoryName,
      subcategoryCount: rowData.subcategoryCount,
      itemCount: rowData.itemCount,
      status: rowData.status,
    }));
    deleteModal.onOpen();
  };

  const handleEditModal = (rowData: RowData) =>{
    setSelectedCategory((prev) => ({
      id: rowData.id,
      categoryName: rowData.categoryName,
      subcategoryCount: rowData.subcategoryCount,
      itemCount: rowData.itemCount,
      status: rowData.status,
    }));
    setNewCategoryName(rowData.categoryName);
    setIsActive(rowData.status)
    editModal.onOpen();
  } 

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
            <p
              className={`w-[6rem] py-1 ${
                row.status
                  ? "bg-[#d7e7ff] text-[#3985f7]"
                  : "bg-[#fde6e7] text-[#ea4a68]"
              }  font-semibold text-[0.75rem]  rounded-full`}
            >
              {row.status ? "Active" : "Inactive"}
            </p>
          </div>
        );
      case "action":
        return (
          <Dropdown placement="left-start" className="rounded-md">
            <DropdownTrigger>
              <button>
                <BsThreeDotsVertical />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="font-inter">
              <DropdownItem
                key="view"
                data-hover={false}
                startContent={<IoMdEye className="text-[1.2rem]" />}
                className="p-2 text-[#6a6c6e] data-[hover]:bg-[#f4f4f5] data-[hover]:text-[#5b5d5f] data-[hover]:font-medium rounded-[0.25rem]"
                classNames={{ base: "" }}
              >
                View
              </DropdownItem>
              <DropdownItem
                key="edit"
                onPress={()=>handleEditModal(row)}
                data-hover={false}
                startContent={<TbEdit className="text-[1.2rem]" />}
                showDivider
                className="p-2 text-[#6a6c6e] data-[hover]:bg-[#f4f4f5] data-[hover]:text-[#5b5d5f] data-[hover]:font-medium rounded-[0.25rem]"
              >
                Edit
              </DropdownItem>
              <DropdownItem
                key="delete"
                onPress={() => handleDeleteModal(row)}
                data-hover={false}
                className="p-2 text-[#eb4865] hover:bg-[#fde6e7]  rounded-[0.25rem]"
                classNames={{
                  base: "data-[hover]:bg-[#fde6e7]  data-[hover=true]:text-[#eb4865]",
                  wrapper: "text-[#eb4865] ",
                  title: "font-normal hover:font-medium",
                }}
                startContent={<LuTrash2 className="text-[1.2rem]" />}
              >
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          /*           <Popover
            key={row.id}
            isOpen={allActionOpenStates[row.id]}
            onOpenChange={(isOpen) => toggleAction(row.id, isOpen)}
            placement="left-start"
            backdrop="opaque"
            
            classNames={{ content: "p-2 rounded-md" }}
          >
            <PopoverTrigger>
              <button onClick={() => toggleAction(row.id, true)}>
                <BsThreeDotsVertical />
              </button>
            </PopoverTrigger>

            <PopoverContent>
              <div
                className="font-inter  w-[10rem]  flex flex-col gap-1  text-sm  "
                data-category-id={row.id}
              >
                <button className="flex items-center gap-2 p-2 text-[#6a6c6e] hover:bg-[#f8f8f8] hover:text-[#5b5d5f] hover:font-medium rounded-[0.25rem] transition-all duration-150 ease-in-out">
                  <IoMdEye className="text-[1.1rem]" />
                  <p>View</p>
                </button>
                <button
                  onClick={() => toggleAction(row.id, false)}
                  className="flex items-center gap-2 p-2 text-[#6a6c6e] hover:bg-[#f8f8f8] hover:text-[#5b5d5f] hover:font-medium rounded-[0.25rem] transition-all duration-150 ease-in-out"
                >
                  <TbEdit className="text-[1.1rem]" />
                  <p>Edit</p>
                </button>
                <hr className="mt-1"></hr>
                <button
                  onClick={() => handleCategoryDelete(row.id)}
                  className="mt-1 flex items-center gap-2 p-2 text-[#eb4865] hover:bg-[#fde6e7] hover:font-medium rounded-[0.25rem] transition-all duration-150 ease-in-out"
                >
                  <LuTrash2 className="text-[1.1rem]" />
                  <p className="">Delete</p>
                </button>
              </div>
            </PopoverContent>
          </Popover> */
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
          classNames={{
            trigger:
              "bg-[#ffffff] border border-my-black-300  hover:bg-my-black-50",
            popoverContent: "bg-white  border-my-black-300 rounded-lg",
          }}
          defaultSelectedKeys={["all"]}
          selectedKeys={[statusValue]}
          onChange={handleSelectionChange}
        >
          {selectStatus.map((status) => (
            <SelectItem
              key={status.key}
              classNames={{ base: "bg-white data-[hover=true]:bg-black " }}
              className=" text-my-black-950 data-[hover=true]:bg-black "
            >
              {status.name}
            </SelectItem>
          ))}
        </Select>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 bg-primary-comp-600 text-[0.87rem] px-3 py-[0.35rem] rounded tracking-wide"
        >
          <HiOutlinePlus className="flex text-[1.2rem]" />
          Add Category
        </button>
        <button
          onClick={() =>
            addToast("error", "Error: Oops something went wrong. Please log in")
          }
        >
          Error
        </button>
      </div>
      <div className=" flex-1">
        <Table
          aria-label="Table for Managing Menu Categories"
          className="bg-white  border-[#cccccc] border-opacity-50 mt-4 h-full"
          classNames={{
            wrapper: "border border-[#cccccc] ",
            table: "h-full",
            td: "",
          }}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                classNames={{
                  prev: "rounded-md",
                  next: "rounded-md",
                  cursor: "rounded-md",
                }}
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
                      columnKey === "categoryName"
                        ? "text-left"
                        : "text-center "
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
      {/*Create Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className="text-my-black-950 font-inter">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[1.1rem] font-semibold tracking-wide pt-7">
                Add New Category
              </ModalHeader>
              <ModalBody className="pt-0">
                <hr></hr>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => handleCreateNewCategorySubmit(e)}
                >
                  <label className="flex flex-col text-[0.97rem]  gap-2">
                    Name
                    <input
                      className="focus:outline-none placeholder-gray-400 placeholder:font-light border-2 border-my-black-100 rounded-md px-3 py-2 text-[0.89rem] "
                      placeholder="Add category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </label>

                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-[0.97rem] ">Display</h4>
                      <Tooltip
                        content="Setting this inactive will hide all items within this category."
                        placement="top-start"
                        className="!z-[999999] text-my-black-950 rounded-sm"
                      >
                        <div>
                          <MdInfo className="flex text-[1rem] text-my-black-700" />
                        </div>
                      </Tooltip>
                    </div>
                    <div className="flex mt-1 gap-[4rem] ">
                      <p className="text-[0.86rem] text-my-black-900 ">
                        Controlls whether the category is displayed in the menu.
                      </p>
                      <Switch
                        isSelected={isActive}
                        onValueChange={setIsActive}
                        size="sm"
                        className=""
                        classNames={{
                          wrapper: " group-data-[selected=true]:!bg-[#4dd164]",
                          label: "flex items-center gap-1 text-[0.86rem] ",
                        }}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </Switch>
                    </div>
                  </div>

                  <ModalFooter className=" px-0">
                    <div className=" w-full mt-7 flex justify-end gap-3  *:py-1 *:px-4 *:rounded-md *:text-[0.9rem] *:tracking-wide">
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-my-accent-500 font-medium border border-transparent hover:border-my-accent-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#3aa0fc] text-white border border-[#3aa0fc] hover:bg-[#3aa0fc]/95"
                      >
                        Add Now
                      </button>
                    </div>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/*DeleteModal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        size="md"
      >
        <ModalContent className="text-my-black-950 font-inter">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  items-center justify-center gap-[0.6rem] text-[1.1rem] font-semibold tracking-wide pt-7 text-center pb-1">
                <div className="relative bg-[#fccfd5]/90 p-2 rounded-full w-fit  before:absolute  before:w-full before:h-full before:rounded-full before:z-[-1] before:p-[1.4rem] before:left-[50%] before:top-[50%] before:translate-x-[-50%] before:translate-y-[-50%]   before:bg-[#fef2f3] before:border before:border-[#fccfd5]/60">
                  <MdErrorOutline className="text-[1.4rem] text-[#eb4865]" />
                </div>
                <h2>Delete category</h2>
              </ModalHeader>
              <ModalBody className="pt-0 text-[0.88rem] text-center flex flex-col gap-0">
                <p>
                  Are you sure you want to delete '
                  {selectedCategory?.categoryName}' category?
                </p>
                <p>
                  All items within this category will be{" "}
                  <b>permanently deleted</b>.
                </p>
              </ModalBody>
              <ModalFooter className="mt-3">
                <div className=" w-full  flex justify-end gap-3  *:py-1 *:px-5 *:rounded-md *:text-[0.9rem] *:tracking-wide">
                  <button
                    onClick={onClose}
                    className="text-my-black-950 font-medium border border-transparent hover:border-my-black-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#eb4865] text-white border border-[#eb4865] hover:bg-[#eb4865]/95"
                    onClick={() =>
                      handleCategoryDelete(selectedCategory!.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </ModalFooter>

              {/* <ModalFooter>
                <div>
                  <button>Close</button>
                </div>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
            {/*Edit Modal */}
      <Modal isOpen={editModal.isOpen} onOpenChange={editModal.onOpenChange} size="lg">
        <ModalContent className="text-my-black-950 font-inter">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[1.1rem] font-semibold tracking-wide pt-7">
                Edit Category
              </ModalHeader>
              <ModalBody className="pt-0">
                <hr></hr>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => handleCreateNewCategorySubmit(e)}
                >
                  <label className="flex flex-col text-[0.97rem]  gap-2">
                    Name
                    <input
                      className="focus:outline-none placeholder-gray-400 placeholder:font-light border-2 border-my-black-100 rounded-md px-3 py-2 text-[0.89rem] "
                      placeholder={selectedCategory?.categoryName}
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </label>

                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-[0.97rem] ">Display</h4>
                      <Tooltip
                        content="Setting this inactive will hide all items within this category."
                        placement="top-start"
                        className="!z-[999999] text-my-black-950 rounded-sm"
                      >
                        <div>
                          <MdInfo className="flex text-[1rem] text-my-black-700" />
                        </div>
                      </Tooltip>
                    </div>
                    <div className="flex mt-1 gap-[4rem] ">
                      <p className="text-[0.86rem] text-my-black-900 ">
                        Controlls whether the category is displayed in the menu.
                      </p>
                      <Switch
                        isSelected={isActive}
                        onValueChange={setIsActive}
                        size="sm"
                        className=""
                        classNames={{
                          wrapper: " group-data-[selected=true]:!bg-[#4dd164]",
                          label: "flex items-center gap-1 text-[0.86rem] ",
                        }}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </Switch>
                    </div>
                  </div>

                  <ModalFooter className=" px-0">
                    <div className=" w-full mt-7 flex justify-end gap-3  *:py-1 *:px-4 *:rounded-md *:text-[0.9rem] *:tracking-wide">
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-my-accent-500 font-medium border border-transparent hover:border-my-accent-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#3aa0fc] text-white border border-[#3aa0fc] hover:bg-[#3aa0fc]/95"
                      >
                        Update
                      </button>
                    </div>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/*Toast */}
      <ToastWrapper toasts={toasts} removeToast={removeToast} />

      {/* <Toast type={toastMsg.type} header={toastMsg.msg}/> */}
    </div>
  );
};

export default MenuCategory;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
