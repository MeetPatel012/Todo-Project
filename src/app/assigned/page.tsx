"use client";
import { useEffect, useState } from "react";

interface Element {
  id: string;
  name: any;
}

export default function planned() {
  let initTodo = [] as Element[];
  if (localStorage.getItem("assignedtodo") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("assignedtodo") as string);
  }

  const [value, setValue] = useState("");
  const [list, setList] = useState<Element[]>(initTodo);

  const handleChange = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  };

  //add the list
  const addtodo = () => {
    if (!value) {
      return console.log("error");
    }
    const allInputData = { id: new Date().getTime().toString(), name: value };
    setList([...list, allInputData]);
    console.log("When Add", allInputData);
    setValue("");
  };

  useEffect(() => {
    localStorage.setItem("assignedtodo", JSON.stringify(list));
  }, [list]);

  //delete the list
  const deleteOn = (index: any) => {
    console.log(index);
    const updateitem = list.filter((elem) => {
      return index !== elem.id;
    });
    setList(updateitem);
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addtodo();
              }
            }}
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
            {list.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex justify-between items-center w-full outline-none h-8 rounded-md p-5 mb-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                >
                  {item.name}
                  <button className="" onClick={() => deleteOn(item.id)}>
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
