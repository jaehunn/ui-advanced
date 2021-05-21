import { useRef, useEffect } from "react";

// 동작 점검하기: 1000ms 가 흐르면 시분초침을 변경한다. -> useEffect 안에서 setInterval() 로 관리
// 먼저, 시분초침에 대한 ref 를 만들고, setProperty() 함수로 --deg 값을 변경한다. (시분초침을 움직이는 작업은 css 에서 한다.)

const useAnalogClock = () => {
  const $hourHand = useRef();
  const $minuteHand = useRef();
  const $secondHand = useRef();

  // 시분초침에 대해 1000ms 마다 위치를 변경하는 동작은 마운트시 한번만 관여한다.
  useEffect(() => {
    // 마운트가 되면 setInterval() 1000ms 마다 setProperty() 로 --deg 를 시간당 각도만큼 움직인다.
    // 시분초침은 매초마다 움직이는 각도가 다르다.
    // 언마운트시 타이머(setInterval) 를 clearing 해줘야하므로 레퍼런스로 등록한다.

    const timerId = setInterval(() => {
      const currentTime = new Date();

      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentSeconds = currentTime.getSeconds();

      // ref 를 등록한 요소에는 current 로 접근가능하다
      // 초침은 초당 6도
      // 분침은 분당 6도 초당 6/60도
      // 시침은 시간당 30도 분당 30/60 초당 0.5/60
      $secondHand.current.style.setProperty("--deg", currentSeconds * 6);
      $minuteHand.current.style.setProperty("--deg", currentMinutes * 6 + currentSeconds * 0.1);
      $hourHand.current.style.setProperty("--deg", currentHours * 30 + currentMinutes * 0.5 + currentSeconds * (0.5 / 60));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return [$hourHand, $minuteHand, $secondHand];
};

export default useAnalogClock;
