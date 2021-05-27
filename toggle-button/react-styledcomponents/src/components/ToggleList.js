import React, { useState } from "react";
import styled from "styled-components";
import ToggleItem from "./ToggleItem";

const ToggleContainer = styled.div`
  position: relative;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.32);
  border-radius: 5px;
`;

// active index 를 공통 부모에서 관리해야 공유할 수 있다.
const ToggleList = () => {
  const [toggleItems] = useState(["Bold", "Italic", "Underline"]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ToggleContainer>
      {toggleItems.map((toggleItem, index) => (
        <ToggleItem key={`item${index}`} name={toggleItem} index={index} active={selectedIndex === index} setSelectedIndex={setSelectedIndex} />
      ))}
    </ToggleContainer>
  );
};

export default ToggleList;
