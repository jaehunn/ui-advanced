import { Title, Stopwatch } from "./components";

import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Title>Stopwatch</Title>
      <Stopwatch />
    </>
  );
};

export default App;
