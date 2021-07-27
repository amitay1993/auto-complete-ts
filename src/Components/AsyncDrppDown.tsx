import React from "react";
import { Item } from "../Utils/interfaces";
import { Props } from "./DropDown";
import { useDropDown } from "../Utils/useDropDown";
import styled from "styled-components";
import {
  Container,
  CountryList,
  CountryListItem,
  Search,
} from "../Styles/DrowDownStyles";

export const AsyncDropDown: React.FC<Props> = ({
  loadOptions,
  value: selectedItem,
  onChange: setSelectedItem,
  renderInput,
}: Props) => {
  const {
    state: { isOpen, highlightedItemIndex },
    inputProps,
    inputRef,
    select,
    countries,
    isLoading,
  } = useDropDown({ selectedItem, setSelectedItem, loadOptions });

  const showCountries = () => {
    return countries?.map((country: Item, idx: number) => {
      return (
        <CountryListItem
          isFocused={idx === highlightedItemIndex}
          isSelected={selectedItem?.name === country.name}
          onClick={() => select(country as Item)}
          key={country.name}
        >
          <Container>
            <img src={country.flag} alt={"Missing Pic"} />
            <span>{country.name}</span>
          </Container>
        </CountryListItem>
      );
    });
  };

  return (
    <SearchWithLoadingSpinner>
      <Search ref={inputRef}>
        <label htmlFor="countriesChoice">Choose a Country:</label>
        {selectedItem && <img src={selectedItem.flag} alt={"Missing Pic"} />}
        {renderInput(inputProps)}
        {isOpen && <CountryList>{showCountries()}</CountryList>}
      </Search>
      {isLoading && <div className="loader">Loading...</div>}
    </SearchWithLoadingSpinner>
  );
};

export const SearchWithLoadingSpinner = styled.div`
  display: flex;
  margin: 1.5rem;
`;

export default AsyncDropDown;
