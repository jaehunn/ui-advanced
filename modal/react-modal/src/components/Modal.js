import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 650px;
  height: 365px;
  position: absolute;
  z-index: 101;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 45px;
  border: 1px solid #ccc;

  opacity: ${({ modalVisible }) => (modalVisible ? "1" : "0")};
  pointer-events: ${({ modalVisible }) => (modalVisible ? "auto" : "none")};
`;

// Modal 도 마찬가지로 내려준 props 로 style 을 컨트롤하자
// Modal style 에서는 opacity 에 조정을 가하기 때문에 클릭되어질 수 있는 여지가 있다. 따라서 pointer-events 까지 조정하자.
const Modal = ({ modalVisible, children }) => {
  return <ModalContainer modalVisible={modalVisible}>{children}</ModalContainer>;
};

export default Modal;
