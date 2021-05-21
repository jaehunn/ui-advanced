import styled from "styled-components";
import useAnalogClock from "../hooks/useAnalogClock";

const Container = styled.div`
  position: relative; // 내부 요소들을 자유롭게 배치할 것임
  width: 300px;
  height: 300px;
  background-color: #fff;
  border: 5px solid white;
  border-radius: 50%;
  margin: 40px auto;
  box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #333;
    border-radius: 50%;
    z-index: 100;
  }
`;

// 시분침 공통 스타일
// css 변수 사용(--deg)
const Hand = styled.div`
  --deg: 0; // 단위 종속 없애기
  position: absolute;
  bottom: 50%;
  left: 50%;
  border: 1px solid white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform-origin: bottom;

  // 실질적으로 시분침을 움직이는 부분. var() 변수를 사용하고, calc() 로 산술계산한다.
  transform: translate3D(-50%, 0, 0) rotate(calc(var(--deg) * 1deg));
  z-index: 10;
`;

// 스타일 상속받기, 기존 스타일에서 크기와 색을 확장
const HourHand = styled(Hand)`
  width: 8px;
  height: 80px;
  background-color: #333;
`;

const MinuteHand = styled(Hand)`
  width: 6px;
  height: 110px;
  background-color: #333;
`;

const SecondHand = styled(Hand)`
  width: 4px;
  height: 120px;
  background-color: #f00;
`;

const Mark = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;

  // 동일한 스타일을 사용하는 Mark 를 여러개를 만들필요없이 props 에 따라 다른 모양을 가지도록한다.
  transform: rotate(${({ index }) => index * 30}deg);
`;

const AnalogClock = () => {
  // Hand Control -> Custom Hooks
  const [$hourHand, $minuteHand, $secondHand] = useAnalogClock();

  return (
    <Container>
      <HourHand ref={$hourHand} />
      <MinuteHand ref={$minuteHand} />
      <SecondHand ref={$secondHand} />
      {Array.from({ length: 12 }, (_, index) => (
        <Mark key={`Mark${index}`} index={index}>
          |
        </Mark>
      ))}
    </Container>
  );
};

export default AnalogClock;
