import React from "react";
import Assigned from "./assigned/page";

export default function important() {
  return (
    <div>
      <Assigned
        title="Important Tasks"
        placeHolderTitle="Plese add you Important task here..."
        localStorageTitle="ImportantTodo"
        imageProps={"./star.png"}
        textColorProps="text-blue-700"
      />
    </div>
  );
}
