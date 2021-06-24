import React from "react";
import styled from "styled-components";

const PageButtonListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const PageButtonStyle = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-hieght: 1.5;
  border: 1px solid lightgray;
  cursor: pointer;

  ${({ active }) =>
    active &&
    `
    background: gray;
    color: #fff;
  `}

  margin-right: 3px;
`;

const PageButtonList = ({ buttons, activeIndex, onClickHandler }) => {
  const pageButton = Array(buttons)
    .fill()
    .map((_, index) => {
      return (
        <PageButtonStyle key={`button${index}`} onClick={() => onClickHandler(index + 1)} active={index === activeIndex}>
          {index + 1}
        </PageButtonStyle>
      );
    });

  return <PageButtonListStyle>{pageButton}</PageButtonListStyle>;
};

export default PageButtonList;
