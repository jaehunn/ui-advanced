import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  z-index: 101;
  width: 3rem;
  height: 3rem;
  border: 1px solid #333;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;

  // icon 을 쓰지않고 css 로 그리기
  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 54%;

    // ㄴ 모양을 변환시켜 화살표로 만들것
    border-left: 1px solid #333;
    border-bottom: 1px solid #333;

    transform: ${({ type }) => (type === "prev" ? "translate(-50%, -50%) rotate(45deg);" : "translate(-50%, -50%) rotate(225deg);")};
  }

  // 유동적으로 바뀌어야하는 스타일은 무엇인가? -> props 로 처리할 것
  // 1. ㄴ 모양 transform rotate (주의할 점, translate 를 rotate 와 분리해서 작성할 수 없다.)
  // 2. icon 위치: left or right
  ${({ type }) => (type === "prev" ? "left: 0;" : "right: 0;")}
`;

const Button = ({ type, onClick }) => {
  return <ButtonStyle type={type} onClick={onClick} />;
};

export default Button;
