import { Dispatch, ReactElement, SetStateAction } from "react";

export interface Item {
  name: string;
  flag?: string;
}

export interface Country {
  label: string;
  value: unknown;
}

const b: { label: string; value: number; flag: string } = {
  label: "asdsad",
  value: 5,
  flag: "israel.png",
};

function a(country: Country) {
  console.log(country);
}

a(b);

export type fetchCountries = (searchTerm?: string) => Promise<Item[]>;
export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
export type setItem = (item: Item | null) => void;
// export interface test{
//     onChange:(text:string)=>void
//     value:string,
// }

//export declare function renderInput(inputProps:any):ReactElement<HTMLInputElement>;

// declare function f(x?: number): void;
