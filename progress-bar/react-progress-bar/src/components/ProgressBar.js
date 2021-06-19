import React from "react";
import styled from "styled-components";

const ProgressBarStyle = styled.div`
  height: 20px;
  background-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;

  div {
    width: ${({ width }) => `${width}%`};
    height: 100%;
    border-radius: 5px;
    background-color: #333;
    overflow: hidden;

    // css transition 에 animationSpeed 를 적용하자.
    transition: width ${({ animationSpeed }) => `${animationSpeed}ms`}} ease-in-out;
  }
`;

const ProgressBar = ({ width, animationSpeed }) => {
  // div 요소에서 props 스타일을 적용시키자.
  return (
    <ProgressBarStyle width={width} animationSpeed={animationSpeed}>
      <div></div>
    </ProgressBarStyle>
  );
};

export default ProgressBar;
