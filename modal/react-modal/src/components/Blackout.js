import React from "react";
import styled from "styled-components";

const BlackoutContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.65);
  display: ${({ modalVisible }) => (modalVisible ? "block" : "none")};
`;

// 내려준 props 로 style 을 유동적으로 바꾼다.
const Blackout = ({ modalVisible, modalVisibleHandler }) => {
  return <BlackoutContainer modalVisible={modalVisible} onClick={modalVisibleHandler} />;
};

export default Blackout;
