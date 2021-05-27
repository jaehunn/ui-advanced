import React, { useState } from "react";
import styled from "styled-components";
import Chip from "./Chip";
import { buttons } from "../data";

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items; center;
`;

const Input = styled.input`
  width: 150px;
  background: transparent;
  color: currentColor;
  border: none;
  outline: none;
  padding: 0;
  max-width: 100%;
  vertical-align: bottom;
  text-align: inherit;
`;

const Chips = () => {
  const [buttonItems, setButtonItems] = useState(buttons);
  const [inputText, setInputText] = useState("");

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value);
  };

  const handleInputEnter = ({ key }) => {
    if (key === "Enter") {
      setButtonItems((buttonItems) => [...buttonItems, inputText]);

      setInputText("");
    }
  };

  return (
    <ChipsContainer>
      {buttonItems.map((buttonItem, index) => (
        <Chip key={`item${index}`} name={buttonItem} />
      ))}

      <Input placeholder="Enter Text..." value={inputText} onChange={handleInputChange} onKeyUp={handleInputEnter} />
    </ChipsContainer>
  );
};

export default React.memo(Chips);
