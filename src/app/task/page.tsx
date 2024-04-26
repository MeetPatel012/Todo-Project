import React from "react";
import Assigned from "../assigned/page";

export default function task() {
  return (
    <div>
      <Assigned
        title="Task"
        placeHolderTitle="Plese your task here..."
        localStorageTitle="DailyTaskTodo"
        imageProps={"./home.png"}
        textColorProps="text-green-500"
      />
    </div>
  );
}
