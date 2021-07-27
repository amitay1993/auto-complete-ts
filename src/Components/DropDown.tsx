import React, { ReactElement } from "react";
import { Dispatcher, fetchCountries, Item } from "../Utils/interfaces";
import SyncDropDown from "./SyncDropDown";
import { AsyncDropDown } from "./AsyncDrppDown";

export interface Props {
  onChange: Dispatcher<Item | null>;
  value: Item | null;
  renderInput: (
    inputProps: Object,
    selectedItem: Item
  ) => ReactElement<HTMLInputElement>;
  loadOptions?: fetchCountries;
  options?: Array<Item>;
}

const DropDown: React.FC<Props> = ({ loadOptions, ...props }: Props) => {
  if (loadOptions) {
    return <AsyncDropDown loadOptions={loadOptions} {...props} />;
  } else {
    return <SyncDropDown {...props} />;
  }
};

export default DropDown;
