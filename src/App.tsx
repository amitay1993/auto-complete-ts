import React, {HTMLAttributes, useState} from 'react';
import './App.css';
import {loadOptions} from "./Utils/loadOptions";
import DropDown from "./Components/DropDown";
import {Item} from "./Utils/interfaces";

function App() {
    const [selectedItem,setSelectedItem]=useState<Item | null>(null)
  return (
      <div>
        <DropDown
            // onSearchInputChange={(searchText) => dispatch(getCoutries())}
            // options={options}
            loadOptions={loadOptions}
            onChange={setSelectedItem}
            value={selectedItem}
            renderInput={(inputProps:HTMLAttributes<HTMLInputElement>)=><input {...inputProps} />}
        />
      </div>
  );
}

export default App;
