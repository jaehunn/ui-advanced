import styled from "styled-components";

const BlackoutContainer = styled.div`
  position: absolute;
  // body 를 가리고, modal 보다는 뒤에 있어야한다.
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const Blackout = ({ visible, onVisible }) => {
  return <BlackoutContainer visible={visible} onClick={() => onVisible(false)} />;
};

export default Blackout;
