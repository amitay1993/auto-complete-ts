import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

import {fetchCountries, Item} from "./interfaces";


export function useFetch(searchTerm:string = "",isDropdownOpen:boolean, selectedCountry:Item|null,loadOptions?:fetchCountries,) {
    const [countries, setCountries] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(selectedCountry,isDropdownOpen);

    async function fetchData(newValue:string) {
        try {
            if(loadOptions) {
                const results:Array<Item> = await loadOptions(newValue);
                setCountries(results);
                setIsLoading(false);
            }
        } catch (error) {
            const { status: errorCode } = error.response;
            if (errorCode === 404) {
                console.log("country NOT found");
            }
        }
    }


    //TODO ask regarding deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedValue = useCallback(
        debounce((newValue) => fetchData(newValue), 700),
        []
    );


    useEffect(() => {
        if (selectedCountry ) return;
        console.log("loading")
        setIsLoading(true);
        debouncedValue(searchTerm);
    }, [debouncedValue, selectedCountry, searchTerm]);

    useEffect(()=>{
        if(isDropdownOpen && selectedCountry){
            setIsLoading(true);
            debouncedValue("");
        }
    },[isDropdownOpen])

    return { countries, isLoading,setCountries};
}
