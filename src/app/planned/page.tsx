"use client";
import { useEffect, useState } from "react";

interface Element {
  id: string;
  name: string;
}

export default function planned() {
  let initTodo;
  if (localStorage.getItem("plannedtodos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("plannedtodos") as string);
  }

  const [value, setValue] = useState("");
  const [list, setList] = useState<any[]>(initTodo);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("plannedtodos", JSON.stringify(list));
  }, [list]);

  //-----------------------------------------------------------add the list
  const addtodo = () => {
    if (!value) {
      return console.log("error");
    } else if (value && !toggleSubmit) {
      setList(
        list.map((elem: any) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: value };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setValue("");
      setIsEditItem(null);
    } else {
      const allValueData = { id: new Date().getTime().toString(), name: value };
      setList([...list, allValueData]);
      setValue("");
    }
  };

  // delete selcted items
  const selectedDelete = (e: any) => {
    let select;
  };

  /*
  -----------------------------------------------------------delete the list
  const deleteOn = (e: any) => {
    let deleteone = [...list];
    deleteone.splice(e, 1);
    setList([...deleteone]);
    localStorage.setItem("plannedtodos", JSON.stringify(list));
  };
  */

  //-----------------------------------------------------------delete the list - vinod thapa youtube
  const deleteOn = (index: string) => {
    const updateditems = list.filter((elem: Element) => {
      return index !== elem.id;
    });
    setList(updateditems);
    localStorage.setItem("plannedtodos", JSON.stringify(list));
  };

  //-----------------------------------------------------------delete all the element
  const deleteall = (e: any) => {
    let deleteone = [...list];
    deleteone.splice(e);
    setList([...deleteone]);
  };

  //-----------------------------------------------------------Edit the element
  const editOn = (id: any) => {
    let newEditList = list.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditList);

    setToggleSubmit(false);
    setValue(newEditList.name);
    setIsEditItem(id);
  };

  return (
    <main className="m-5">
      <div className="ml-2 mt-8">
        <h1 className="flex justify-left text-center text-3xl text-blue-500">
          <img src="./star.png" className="w-10 h-10 mr-4 " />
          Planned
        </h1>

        <div className="mt-5 ">
          <input
            className="w-full outline-none h-10 rounded-md p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] overflow-auto"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Plese your plans here..."
          />

          <div className="flex justify-between mt-7">
            {toggleSubmit ? (
              <div>
                <button
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded w-20"
                  onClick={addtodo}
                >
                  Add
                </button>
              </div>
            ) : (
              <div className="flex justify-normal items-center bg-gray-600 hover:bg-black-800 font-bold py-1 px-3 rounded text-white h-8 w-48 text-nowrap">
                <img src="./edit.png" className="w-5 h-5 mr-2" />
                <button className="mr-2" onClick={addtodo}>
                  Click Hear to Edit
                </button>
              </div>
            )}

            {/* Selected delete */}
            <div>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded w-auto"
                onClick={selectedDelete}
              >
                Selected Delete
              </button>
            </div>
            {/* Selected delete */}

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

                  <div>
                    <button className="" onClick={() => editOn(item.id)}>
                      <img src="./editing.png" className="w-6 h-6 mr-7 " />
                    </button>
                    <button className="" onClick={() => deleteOn(item.id)}>
                      <img src="./delete.png" className="w-6 h-6 " />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
