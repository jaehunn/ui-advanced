import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentPageItems } from "../../app/modules/items";
import styled from "styled-components";

const PageButtonListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const PageButtonStyle = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
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

const PageButtonList = () => {
  const { items, currentPageNum, itemsPerPage } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const buttons = Math.ceil(items.length / itemsPerPage);

  const pageButtonClickHandler = (targetPageNum) => {
    dispatch(getCurrentPageItems({ targetPageNum }));
  };

  return (
    <PageButtonListStyle>
      {Array(buttons)
        .fill()
        .map((_, index) => (
          <PageButtonStyle key={`button${index}`} active={index + 1 === currentPageNum} onClick={() => pageButtonClickHandler(index + 1)}>
            {index + 1}
          </PageButtonStyle>
        ))}
    </PageButtonListStyle>
  );
};

export default PageButtonList;
