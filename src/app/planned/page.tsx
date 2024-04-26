import React from "react";
import Assigned from "../assigned/page";

export default function planned() {
  return (
    <div>
      <Assigned
        title="Planned"
        placeHolderTitle="Plese add you plans here..."
        localStorageTitle="PlannedTodo"
        imageProps={"./add-contact.png"}
        textColorProps="text-green-700"
      />
    </div>
  );
}
