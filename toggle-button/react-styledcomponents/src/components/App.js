import React from "react";
import styled from "styled-components";
import ToggleList from "./ToggleList";
import GlobalStyle from "../styles/global";

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
        <ToggleList />
      </Container>
    </>
  );
};

export default App;
