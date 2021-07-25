import React, {Dispatch, JSXElementConstructor, ReactElement, SetStateAction} from 'react';
import {Dispatcher, fetchCountries, Item,} from "../Utils/interfaces";
import SyncDropDown from "./SyncDropDown";
import {AsyncDropDown} from "./AsyncDrppDown";



export interface Props {
    onChange: Dispatcher<Item|null>,
    value:any,
    renderInput:(inputProps:Object) => ReactElement<HTMLInputElement>,
    loadOptions?:fetchCountries,
    options?:Array<Item>
}


const DropDown: React.FC<Props> = ({loadOptions,...props}:Props) => {

    if (loadOptions) {
        console.log(props)
        return <AsyncDropDown loadOptions={loadOptions} {...props} />;
    } else {
        // console.log(props);
        return <SyncDropDown {...props} />;
    }

}
// function DropDown({loadOptions}: Props,{...rest}:Props) {
//     if (loadOptions) {
//         return <AsyncDrppDown loadOptions={loadOptions} {...props} />;
//     } else {
//         // console.log(props);
//         return <SyncDropDown {...props} />;
//     }
//
// }


export  default DropDown;

// function DropDown({loadOptions:Promise,...props}) {
//     if (loadOptions) {
//         return <AsyncDrppDown loadOptions={loadOptions} {...props} />;
//     } else {
//         // console.log(props);
//         return <SyncDropDown {...props} />;
//     }
// }
//
// export default DropDown;