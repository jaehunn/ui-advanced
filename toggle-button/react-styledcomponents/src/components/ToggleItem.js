import React, { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  width: 100%;
  cursor: pointer;
  outline: none;

  background-color: none;
  background-color: ${({ active }) => (active ? "#ccc" : "none")};
  border-left: ${({ index }) => index && ` 1px solid rgba(0, 0, 0, 0.32)`};
`;

const ToggleTitle = styled.span`
  position: relative;
  display: inline-block;
  padding: 0 12px;
  line-height: 48px;
`;

const ToggleItem = ({ name, index, active, setSelectedIndex }) => {
  return (
    <ToggleContainer active={active} index={index} onClick={() => setSelectedIndex(index)}>
      <ToggleTitle>{name}</ToggleTitle>
    </ToggleContainer>
  );
};

export default ToggleItem;
