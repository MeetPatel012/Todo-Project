"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const route = useRouter();

  const navi = (name: string) => {
    route.push(name);
  };

  return (
    <>
      <div className="pt-2">
        <ul className="flex flex-col justify-center text-left  ">
          <li
            className="p-5 list-none hover:text-blue-500 hover:bg-slate-100  flex justify-left items-center hover:ml-1 cursor-pointer"
            onClick={() => navi("/")}
          >
            <img src="./star.png" className="w-4 h-auto mr-6 " />
            Important
          </li>

          <li
            className="p-5 list-none hover:text-green-500  hover:bg-slate-100 flex justify-left items-center hover:ml-1 cursor-pointer  "
            onClick={() => navi("/planned")}
          >
            <img src="./add-contact.png" className="w-4 h-auto mr-6" />
            Planned
          </li>

          <li
            className="p-5 list-none hover:text-blue-400  hover:bg-slate-100 flex justify-left items-center hover:ml-1 cursor-pointer "
            onClick={() => navi("/assigned")}
          >
            <img src="./clipboard.png" className="w-4 h-auto mr-6" />
            Assigned
          </li>

          <li
            className="p-5 list-none hover:text-green-400 hover:bg-slate-100 flex justify-left items-center hover:ml-1 cursor-pointer  "
            onClick={() => navi("/task")}
          >
            <img src="./home.png" className="w-4 h-auto mr-6" />
            Tasks
          </li>
        </ul>
      </div>
    </>
  );
}
