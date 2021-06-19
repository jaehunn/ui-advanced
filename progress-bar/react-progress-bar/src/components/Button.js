import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button``;

const Button = ({ title, onClick }) => {
  return <ButtonStyle onClick={onClick}>{title}</ButtonStyle>;
};

export default Button;
