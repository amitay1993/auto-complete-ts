import React, { useEffect, useRef, useState } from "react";
import { calcCorrectIndex } from "./calcCorrectIndex";
import {Dispatcher, fetchCountries, Item} from "./interfaces";
import {useFetch} from "./useFetch";


export function useDropDown( selectedItem: Object, setSelectedItem: Dispatcher<Item|null>,loadOptions?: fetchCountries,options?:Array<Item>) {
    const initialState = {
        isOpen: false,
        highlightedItemIndex: 0,
        searchText: "",
    };

    const [state, setState] = useState(initialState);
    const { countries, isLoading } = useFetch(
        state.searchText,
        selectedItem ,
        loadOptions,
    );
    const inputRef  =  useRef<HTMLInputElement>(null);


    const onChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const input = event.target.value;
        setSelectedItem(null);
        // queue = [setState, setState, setState]
        // setState((state) => ({ ...state, }))
        setState((prevState) => {
            return {
                ...prevState,
                searchText: input,
                isOpen: true,
            };
        });
    };

    const click = () => {
        if (state.isOpen) return;
        setState((prevState) => {
            return { ...prevState, isOpen: true };
        });
    };

    const select = (country:Item) => {
        setSelectedItem(country);
        setState((prevState) => {
            return {
                ...state,
                searchText: country.name,
                isOpen: false,
                highlightedItemIndex: -1,
            };
        });
    };

    const onKeyDown = (event:React.KeyboardEvent) => {
        const keyCode = event.code;
        let { highlightedItemIndex } = state;

        switch (keyCode) {
            case "ArrowUp":
                highlightedItemIndex--;
                break;
            case "ArrowDown":
                highlightedItemIndex++;
                console.log({ highlightedItemIndex });

                break;
            case "Enter":
                //TODO check regarding type here.
                select(countries[highlightedItemIndex]);
                break;
            default:
                return;
        }


        const calculatedIndex = calcCorrectIndex(highlightedItemIndex, countries);

        setState((prevState) => {
            return {
                ...prevState,
                highlightedItemIndex: calculatedIndex,
            };
        });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent):void {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                // setIsOpen(false);
                console.log(state);
                //TODO: setState(...state,isOpen:false) causing changes to other data from the state.
                setState((state) => ({ ...state, isOpen: false }));
            }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [inputRef]);

    useEffect(() => {
        if (!isLoading) {
            setState((prevState) => {
                return {
                    ...prevState,
                    isOpen: true,
                };
            });
        }
    }, [isLoading]);

    const inputProps = {
        value: state.searchText,
        onChange: onChange,
        onClick: click,
        onKeyDown: onKeyDown,
    };

    return {
        state,
        inputProps,
        inputRef,
        keydownHandler: onKeyDown,
        select,
        countries,
        isLoading,
    };
}
