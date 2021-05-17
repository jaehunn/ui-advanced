import Laps from "./Laps";
import styled from "styled-components";
import useStopwatch from "../hooks/useStopwatch";

const Container = styled.div`
  text-align: center;
  font-size: 3em;
  padding: 30px;
`;

const Display = styled.div``;

const Control = styled.button`
  width: 120px;
  padding: 5px;
  margin: 15px;
  border: 2px solid #f44336;
  border-radius: 4px;

  font-size: 36px;
  font-weight: bold;

  cursor: pointer;
  outline: none;

  &:hover:enabled {
    background: #f44336;
    color: aliceblue;
  }

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;

const Stopwatch = () => {
  const { isRunning, elapsedTime, laps, setIsRunning, addLap, reset } = useStopwatch();

  return (
    <Container>
      <Display>{elapsedTime}</Display>

      {/* Start or Stop, Reset or Lap */}
      <Control onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Stop" : "Start"}</Control>
      <Control onClick={isRunning ? addLap : reset} disabled={elapsedTime === "00:00:00"}>
        {isRunning ? "Lap" : "Reset"}
      </Control>
      {laps.length > 0 && <Laps laps={laps} />}
    </Container>
  );
};

export default Stopwatch;
