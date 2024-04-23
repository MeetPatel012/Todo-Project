"use client";
import { useEffect, useState } from "react";

export default function planned() {
  let initTodo;
  if (localStorage.getItem("assignedtodo") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("assignedtodo") as string);
  }

  const [value, setValue] = useState("");
  const [list, setList] = useState<string[]>(initTodo);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  //add the list
  const addtodo = (e: any) => {
    if (!value) {
      return console.log("error");
    }
    setList([...list, value]);
    setValue("");
  };

  useEffect(() => {
    localStorage.setItem("assignedtodo", JSON.stringify(list));
  }, [list]);

  //delete the list
  const deleteOn = (e: any) => {
    let deleteone = [...list];
    deleteone.splice(e, 1);
    setList([...deleteone]);

    localStorage.setItem("assignedtodo", JSON.stringify(list));
  };

  //delete all the element
  const deleteall = (e: any) => {
    let deleteone = [...list];
    deleteone.splice(e);
    setList([...deleteone]);
  };

  return (
    <main className="m-5">
      <div className="ml-2 mt-8">
        <h1 className="flex justify-left text-center text-3xl text-blue-500">
          <img src="./star.png" className="w-10 h-10 mr-4 " />
          Assigned to me
        </h1>

        <div className="mt-5 ">
          <input
            className="w-full outline-none h-10 rounded-md p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] overflow-auto"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Plese add asigned task here..."
          />

          <div className="flex justify-between mt-7">
            <div>
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded w-20"
                onClick={addtodo}
              >
                Add
              </button>
            </div>

            <div>
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded w-auto"
                onClick={deleteall}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 ">
          <ul className="">
            {list.map((item, i) => {
              return (
                <li
                  key={i}
                  className="flex justify-between items-center w-full outline-none h-8 rounded-md p-5 mb-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                >
                  {item}
                  <button className="" onClick={deleteOn}>
                    <img src="./delete.png" className="w-6 h-6  " />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
