import React from "react";
import styled from "styled-components";

const ChipContainer = styled.div`
  display: inline-flex;
  padding: 7px 8px 7px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 5px;
`;

const ChipLabel = styled.span`
  margin-right: 5px;
`;

const ChipImg = styled.img`
  cursor: pointer;
  background-color: #aaa;
  border-radius: 5px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  text-align: center;
  line-height: 17px;
  display: inline-block;
`;

const Chip = ({ name }) => {
  return (
    <ChipContainer>
      <ChipLabel>{name}</ChipLabel>
      <ChipImg />
    </ChipContainer>
  );
};

export default React.memo(Chip);
