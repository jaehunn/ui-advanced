import styled from "styled-components";

const ModalContainer = styled.div`
  height: 365px;
  width: 650px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 45px;
  display: block;
  z-index: 1011;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

const Modal = ({ children, visible }) => {
  return (
    <ModalContainer visible={visible}>
      <h1>Title</h1>
      <div>
        Content A <br />
        Content B <br />
      </div>
      {children}
    </ModalContainer>
  );
};

export default Modal;
