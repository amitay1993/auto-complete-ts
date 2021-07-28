import React, { HTMLAttributes, useState } from "react";
import "./App.css";
import DropDown from "./Components/DropDown";
import { Item } from "./Utils/interfaces";
import { data } from "./MockData/countriesMock";

function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div>
      <DropDown
        options={data}
        onChange={setSelectedItem}
        value={selectedItem}
        renderInput={(inputProps, selectedItem) => {
          return (
            <>
              {selectedItem && (
                <img src={selectedItem.flag} alt={"Missing Pic"} />
              )}
              <input {...inputProps} />
            </>
          );
        }}
      />
    </div>
  );
}

export default App;
