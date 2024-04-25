"use client";
import { useEffect, useState } from "react";

interface Element {
  id: string;
  name: string;
  isChecked: boolean;
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
  const [showEditBtn, setShowEditBtn] = useState("");
  const [editedFieldValue, setEditedFieldValue] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [check, setCheck] = useState(false);

  const handleChange = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  };

  //add the list
  const addtodo = () => {
    if (!value) {
      return console.log("error");
    }
    const allInputData = {
      id: new Date().getTime().toString(),
      name: value,
      isChecked: false,
    };
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

  //checkbox
  const handlecheckbox = (select: Element) => {
    const data = list.map((item) =>
      item.id === select.id ? { ...item, isChecked: !item.isChecked } : item
    );
    setList(data);
    console.log(data);

    // const checkedIdx = list.findIndex((u) => u.id === select.id);
    // if (checkedIdx === 1) return;
    // const updateUser = [...list];
    // updateUser[checkedIdx].isChecked = !updateUser[checkedIdx].isChecked;
    // setList(updateUser);
    // setCheck(select.isChecked);
  };

  //Edit if
  const clickOnEdit = (selectedTodo: Element) => {
    setShowEditBtn(selectedTodo.id);

    setEditedFieldValue(selectedTodo.name);
    console.log(selectedTodo);
  };

  const edittodo = (select: Element) => {
    const edit = list.map((item) =>
      item.id === select.id ? { ...item, name: editedTodo || item.name } : item
    );
    console.log("edit", edit);
    setShowEditBtn("");
    setList(edit);
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
            <div className="">
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded w-20 flex justify-center items-center"
                onClick={addtodo}
              >
                <img src="./plus.png" className="w-3 h-3 items-center mr-2" />
                Add
              </button>
            </div>

            {/* Selected delete */}
            {check ? (
              <div>
                <button
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded w-auto"
                  // onClick={selectedDelete}
                >
                  Selected Delete
                </button>
              </div>
            ) : null}
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
                <div key={item.id} className="flex gap-6">
                  {showEditBtn === item.id ? (
                    <>
                      <div className="flex justify-center items-center w-full mb-5 bg-white rounded-md  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
                        <input
                          className="w-full p-3 h-10  rounded-md  outline-none "
                          type="text"
                          defaultValue={editedFieldValue}
                          onChange={(e) => setEditedTodo(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              edittodo(item);
                            }
                          }}
                        />
                        <img
                          src="./check.png"
                          className="w-6 h-6 flex justify-center items-center mr-3"
                          onClick={() => edittodo(item)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center w-full outline-none h-8 rounded-md p-5 mb-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                        <li
                          className={`   flex justify-between items-center w-full
                    ${item.isChecked ? "line-through" : ""}
                    `}
                        >
                          {item.name}
                          <div>
                            <button
                              className=""
                              onClick={() => clickOnEdit(item)}
                            >
                              <img
                                src="./editing.png"
                                className="w-6 h-6 mr-7 "
                              />
                            </button>
                            <button
                              className=""
                              onClick={() => deleteOn(item.id)}
                            >
                              <img src="./delete.png" className="w-6 h-6  " />
                            </button>
                          </div>
                        </li>
                      </div>

                      <div className="p-1">
                        <input
                          name="checkbox1"
                          defaultChecked={item.isChecked}
                          onChange={() => handlecheckbox(item)}
                          type="checkbox"
                          className={`w-6 h-6 shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-default-checkbox
                          
                      
                          `}
                        />

                        <label
                          htmlFor="hs-default-checkbox"
                          className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
                        >
                          {/* Default checkbox */}
                        </label>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
