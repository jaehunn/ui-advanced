import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  column-gap: 50px;
  row-gap: 10px;
  widht: 260px;
  margin: 10px auto;
  font-size: 0.5em;
`;

const Laps = ({ laps }) => {
  return (
    <Container>
      <div>Laps</div>
      <div>Time</div>
      {laps.map((elapsedTime, index) => (
        <React.Fragment key={index}>
          <div>{index + 1}</div>
          <div>{elapsedTime}</div>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Laps;
