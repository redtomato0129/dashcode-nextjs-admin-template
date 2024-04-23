import React from "react";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import useWidth from "@/hooks/useWidth";
import { toggleMobileTodoSidebar } from "./store";
import { useDispatch, useSelector } from "react-redux";
const TodoHeader = ({ onChange }) => {
  const { width, breakpoints } = useWidth();
  const { mobileTodoSidebar } = useSelector((state) => state.todo);
  const actions = [
    {
      name: "Reset Sort",
      icon: "heroicons-outline:sort-ascending",
    },
    {
      name: "Sort A-Z ",
      icon: "heroicons-outline:sort-ascending",
    },
    {
      name: " Sort Z-A ",
      icon: "heroicons-outline:sort-descending",
    },
  ];
  const dispatch = useDispatch();
  return (
    <div className="md:flex justify-between items-center sticky bg-white dark:bg-slate-800 top-0 pt-6 pb-4 px-6 z-[44] border-b border-slate-100 dark:border-slate-700 rounded-t-md">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        {width < breakpoints.lg && (
          <div
            className="md:h-8 md:w-8 h-6 w-6 bg-slate-100 dark:bg-slate-900
           dark:text-slate-400 flex flex-col justify-center items-center md:text-base
            text-sm rounded-full cursor-pointer"
            onClick={() =>
              dispatch(toggleMobileTodoSidebar(!mobileTodoSidebar))
            }
          >
            <Icon icon="heroicons-outline:menu-alt-2" />
          </div>
        )}
        <div className="max-w-[180px] flex items-center space-x-1 rtl:space-x-reverse">
          <div className="flex-none dark:text-slate-300">
            <Icon icon="heroicons-outline:search" />
          </div>
          <div className="flex-1">
            <input
              onChange={onChange}
              type="text"
              placeholder="Search Task"
              className="bg-transparent text-sm font-regular text-slate-600 dark:text-slate-300 transition duration-150 rounded px-2 py-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="md:block hidden">
        <Dropdown
          classMenuItems="w-[130px]"
          label={
            <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400 bg-slate-100">
              <Icon icon="heroicons-outline:dots-vertical" />
            </span>
          }
        >
          {actions.map((item, i) => (
            <Menu.Item key={i}>
              <div
                className={`
                
                  ${"hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70  dark:text-slate-300 hover:text-white"}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  text-slate-600 capitalize rtl:space-x-reverse `}
              >
                <span className="text-base">
                  <Icon icon={item.icon} />
                </span>
                <span>{item.name}</span>
              </div>
            </Menu.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default TodoHeader;
