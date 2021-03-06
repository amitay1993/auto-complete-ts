import React from "react";
import { Props, SyncDropdownProps } from "./DropDown";
import { useDropDown } from "../Utils/useDropDown";
import {
  Container,
  CountryListItem,
  Search,
  CountryList,
} from "../Styles/DrowDownStyles";
import { Item } from "../Utils/interfaces";

export const SyncDropDown: React.FC<SyncDropdownProps> = ({
  value: selectedItem,
  options,
  onChange: setSelectedItem,
  renderInput,
}) => {
  const {
    state: { isOpen, highlightedItemIndex, searchText },
    inputProps,
    inputRef,
    select,
  } = useDropDown({ selectedItem, setSelectedItem, options });

  const countries: Array<Item> | undefined = options;

  const showCountries = () => {
    let filteredCountries;
    if (selectedItem) {
      filteredCountries = countries?.map((country: Item, idx: number) => {
        return (
          <CountryListItem
            isFocused={idx === highlightedItemIndex}
            isSelected={selectedItem?.name === country.name}
            onClick={() => select(country)}
            key={country.name}
          >
            <Container>
              <img src={country.flag} />
              <span>{country.name}</span>
            </Container>
          </CountryListItem>
        );
      });
    } else {
      filteredCountries = countries
        ?.filter((country: Item) =>
          country.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((country: Item, idx: number) => {
          return (
            <CountryListItem
              isFocused={idx === highlightedItemIndex}
              onClick={() => select(country)}
              key={country.name}
            >
              <Container>
                <img src={country.flag} />
                <span>{country.name}</span>
              </Container>
            </CountryListItem>
          );
        });
    }
    return filteredCountries;
  };

  return (
    <Search ref={inputRef}>
      <label htmlFor="countriesChoice">Choose a Country:</label>
      {/*{selectedItem && <img src={selectedItem.flag} alt={"Missing pic"} />}*/}
      {renderInput(inputProps, selectedItem as Item)}
      {isOpen && <CountryList>{showCountries()}</CountryList>}
    </Search>
  );
};

export default SyncDropDown;
