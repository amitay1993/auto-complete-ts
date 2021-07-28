import React, { ReactElement } from "react";
import { Dispatcher, fetchCountries, Item } from "../Utils/interfaces";
import SyncDropDown from "./SyncDropDown";
import { AsyncDropDown } from "./AsyncDrppDown";

export interface Props {
  onChange: Dispatcher<Item | null>;
  // setItem: (countries: Item | null) => void;
  value: Item | null;
  renderInput: (
    inputProps: React.HTMLAttributes<HTMLInputElement> & { value: string },
    selectedItem: Item | null
  ) => ReactElement<HTMLInputElement>;
  loadOptions?: fetchCountries;
  options?: Array<Item>;
}

export interface AsyncDropdownOptions extends Props {
  loadOptions: fetchCountries;
}

// type SyncDropdownProps = Required<Props>;
export interface SyncDropdownProps extends Props {
  options: Item[];
}

const DropDown: React.FC<Props> = ({ ...props }) => {
  if (props.loadOptions) {
    return <AsyncDropDown loadOptions={props.loadOptions} {...props} />;
  } else if (props.options) {
    return <SyncDropDown options={props.options} {...props} />;
  }

  return null;
};

export default DropDown;
