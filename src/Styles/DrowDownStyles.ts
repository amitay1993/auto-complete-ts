import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  align-items: center;
  & img {
    height: 25px;
    width: 25px;
  }
`;

export const Search = styled.div`
  position: relative;

  & input {
    height: 25px;
    text-indent: 35px;
  }
  > img {
    padding: 0.2rem;
    position: absolute;
    width: 24px;
    height: 24px;
  }
`;

export const CountryList = styled.ul`
  list-style-type: none;
`;



export const CountryListItem = styled.li<{ isFocused?: boolean,isSelected:boolean }>`
  display: flex;
  border: 1px solid lightgray;
  padding: 0.5rem;

  &:hover {
    background-color: rgba(139, 234, 255, 0.89);
    cursor: pointer;
  }

  background-color: ${(props?) => props.isFocused && "rgba(0, 95, 115, 0.5)"};
  background-color: ${(props) => props.isSelected && "rgba(0, 95, 115, 0.5)"};
`;

// const Button = styled.button<{ primary?: boolean }>`
//   background: ${props => props.primary ? 'red' : 'white'};
//   color: ${props => props.primary ? 'white' : 'red'};
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 1px solid green;
//   border-radius: 3px;
// `;
