import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty"
import {fetchCountries, Item} from "./interfaces";

export function useFetch(searchTerm:string = "", isSelectedCountry:Object,loadOptions?:fetchCountries,) {
    const [countries, setCountries] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        if (!isEmpty(isSelectedCountry)) return;
        setIsLoading(true);
        debouncedValue(searchTerm);
    }, [debouncedValue, isSelectedCountry, searchTerm]);

    return { countries, isLoading };
}
