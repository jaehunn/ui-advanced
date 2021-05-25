import React from "react";
import GlobalStyle from "./styles/global";
import { Title, Carousel } from "./components";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Title>Carousel Slider</Title>
      <Carousel />
    </>
  );
};

export default App;
