import AnalogClock from "./components/AnalogClock";
import Title from "./components/Title";
import GlobalStyles from "./styles/global";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Title>Analog Clock</Title>
      <AnalogClock />
    </>
  );
};

export default App;
