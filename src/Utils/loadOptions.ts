import axios, {AxiosResponse} from "axios";
import {Item} from "./interfaces";


export function loadOptions(searchTerm:string = ""):Promise<Item[]> {

    if (searchTerm) {
        return axios
            .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
            .then((res:AxiosResponse) => {
                return res.data.map((country:Item) => {
                    return {
                        name: country.name,
                        flag: country.flag
                    };
                });
            });

    } else {
        return axios.get("https://restcountries.eu/rest/v2/all").then((res:AxiosResponse) => {
            return res.data.map((country:Item) => {
                return {
                    name: country.name,
                    flag: country.flag
                };
            });
        });
    }
}
