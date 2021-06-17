import styled from "styled-components";

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border: 1px solid #ccc;
  background-color: #ccc;
  font-weight: 500;
`;

const Button = ({ title, onVisible }) => {
  return <ButtonContainer onClick={() => (title === "Close" ? onVisible(false) : onVisible(true))}>{title}</ButtonContainer>;
};

export default Button;
