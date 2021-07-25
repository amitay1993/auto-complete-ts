import {Dispatch, ReactElement, SetStateAction} from "react";

export interface Item {
    name:string,
    flag?:string,
}


export type fetchCountries= (searchTerm?:string)=>Promise<Item[]>
export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
export type setItem=(item:Item|null) => void;
// export interface test{
//     onChange:(text:string)=>void
//     value:string,
// }

//export declare function renderInput(inputProps:any):ReactElement<HTMLInputElement>;

// declare function f(x?: number): void;

