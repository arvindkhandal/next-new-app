"use client";

import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import MenuForm from "./menuForm";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, editData, fetchData, postData } from "./store/slices";
import { AppDispatch } from "./store/store";

interface RootState {
  selectedCategoriesSlice: {
    menu: any[];
  };
}

function TreeItem({
  item,
  expanded,
  onToggle,
  onAddNew,
  level = 0,
  deleteMode,
}) {
  const [plus, setPlus] = useState(false);
  const handlePlus = () => {
    setPlus(true);
  };
  const removePlus = () => {
    setPlus(false);
  };
  const hasChildren = Boolean(item.children && item.children.length > 0);
  return (
    // <div className="relative">
      <div
        className={` tree-item relative pl-[40px]`}

        // style={{ paddingLeft: `${level * 20}px` }}
      >
        {/* Line for connecting nodes */}
        {level > 0 && (
          <div className="absolute left-[0.7rem] top-0 w-0.5 h-full bg-gray-300"></div>
        )}
        <div
          className="flex items-center hover:bg-gray-200 w-fit rounded px-2 py-1 cursor-pointer"
          onMouseOver={handlePlus}
          onMouseLeave={removePlus}
        >
          {hasChildren && (
            <button
              className=" h-4 flex items-center justify-center mr-2"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(item.id);
              }}
            >
              {expanded ? (
                <FaChevronDown className="h-3 w-3" />
              ) : (
                <FaChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          <span className="text-sm item-center flex gap-3">
            <span className="text-[1rem] text-[#101828] mt-[0.2rem]">
              {item.name}
            </span>
            {plus && (
              <>
                <button
                  className="p-[0.3rem] bg-[#253BFF] rounded-[100%]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNew(item, "add");
                  }}
                >
                  <FaPlus className="text-white" />
                </button>
                <button
                  className="p-[0.3rem] bg-[orange] rounded-[100%]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNew(item, "edit");
                  }}
                >
                  <MdEdit className=" text-white" />
                </button>
                <button
                  className="p-[0.3rem] bg-[red] rounded-[100%]"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMode(item?.id);
                  }}
                >
                  <MdDelete className=" text-white" />
                </button>
              </>
            )}
          </span>
        </div>
        {expanded && item.children && (
          <div className="">
            {item.children.map((child) => (
              <TreeItem
                key={child.id}
                item={child}
                expanded={expanded} // Pass the correct expanded state
                onToggle={onToggle} // Pass the toggle handler
                // onSelect={onSelect} // Pass the select handler
                onAddNew={onAddNew} // Pass the add new handler
                level={level + 1}
                deleteMode={deleteMode}
              />
            ))}
          </div>
        )}
      </div>
    // </div>
  );
}

export function MenuContent() {
  const [expanded, setExpanded] = useState(["system"]);
  const [mode, setMode] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const { menu } = useSelector(
    (state: RootState) => state.selectedCategoriesSlice
  );

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const toggleItem = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectItem = (item, val) => {
    setSelectedItem(item);
    setMode(val);
  };

  const onSubmit = (formData: any) => {
    if (mode === "add") {
      dispatch(postData(formData));
    } else {
      dispatch(editData(formData));
    }
  };

  const deleteMode = async (id) => {
    await dispatch(deleteData(id));
    await dispatch(fetchData());
  };

  const onAddFirst = (val) => {
    setSelectedItem(true);
    setMode(val);
  };

  return (
    <div className="grid xl:grid-cols-2 p-6 h-full">
      {/* Left Panel */}
      <div className="w-full space-y-4">
      <div className="flex gap-2 items-center mt-8 lg:mt-4"><FaFolder className="text-[#D0D5DD]"/><span className="font-medium text-[0.9rem]"> / Menus
        </span></div>
        <div className="flex items-center gap-2 pt-4">
          <div className="h-12 w-12 bg-[#253BFF] rounded-[100%] flex items-center justify-center">
            <TbLayoutDashboardFilled className="text-white text-[1.2rem]" />
          </div>
          <h1 className="text-2xl font-bold ">Menus</h1>
        </div>

        <div className="relative w-full min-w-[15rem] max-w-[30rem]">
      {/* Label */}
      <label
        htmlFor="dropdown"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {"Menus"}
      </label>

      {/* Select Input */}
      <div className="relative">
        <div
          id="dropdown"
          // onChange={(e) => onChange(e.target.value)}
          className=" item-center w-full px-4 py-[0.9rem] text-gray-900 bg-[#F9FAFB] rounded-xl shadow-sm"
        >
          System Management
        </div>

        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

        <div className="flex gap-2 xl:gap-4 pt-4">
          <button
            className=" px-4 xl:px-8 py-2 bg-[#1D2939] text-white rounded-[2.5rem]"
            onClick={() => setExpanded(["system"])}
          >
            Expand All
          </button>
          <button
            className="px-4 xl:px-8 py-2 border-2 rounded-[2.5rem]"
            onClick={() => setExpanded([])}
          >
            Collapse All
          </button>
        </div>

        {/* Tree Structure */}
        {menu?.length ? (
          <div className="tree-container space-y-2">
            {menu?.map((item) => (
              <TreeItem
                key={item.id}
                item={item}
                expanded={expanded.includes(item.id)}
                onToggle={() => toggleItem(item.id)}
                onAddNew={(ele, val) => selectItem(ele, val)}
                level={0}
                deleteMode={deleteMode}
              />
            ))}
          </div>
        ) : (
          <button
            className="p-2 bg-[#253BFF] rounded-[100%]"
            onClick={(e) => {
              e.stopPropagation();
              onAddFirst("add");
            }}
          >
            <FaPlus className="h-5 w-5 text-white" />
          </button>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-auto rounded space-y-4 h-full flex items-center">
        {selectedItem && (
          <MenuForm
            selectedItem={selectedItem}
            onSubmit={onSubmit}
            mode={mode}
          />
        )}
      </div>
    </div>
  );
}
