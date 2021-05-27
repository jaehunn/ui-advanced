import React from "react";
import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Chips from "./Chips";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Chips />
      </Container>
    </>
  );
};

export default App;
