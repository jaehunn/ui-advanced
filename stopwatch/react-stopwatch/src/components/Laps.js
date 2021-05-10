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

const Laps = () => {
  return <Container></Container>;
};

export default Laps;
