import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [pending, setPending] = useState(true);
  const timerId = useRef(null);

  // useEffect deps 별로 작성하면 가독성이 좋아진다.
  // 1. seconds 의 증가를 useEffect deps 로 감지한다. -> 60초를 넘겼나?
  useEffect(() => {
    if (seconds === 60) {
      // 함수형 업데이트는 언제 써야할까.
      setMinutes((minutes) => minutes + 1);
      setSeconds(() => 0);
    }
  }, [seconds]);

  // 2. pending 의 상태를 useEffect deps 로 감지한다. -> interval
  useEffect(() => {
    if (!pending) {
      timerId.current = setInterval(() => setSeconds((seconds) => seconds + 1), 1000);
    } else clearInterval(timerId.current); // 접근은 반드시 .current 로 접근한다.
  }, [pending]);

  // click handler 로 pending 값을 컨트롤하자.
  const startButtonClickHandler = () => {
    setPending(false);
  };

  const stopButtonClickHandler = () => {
    setPending(true);
  };

  const resetButtonClickHandler = () => {
    setPending(true);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (time) => `0${time}`.slice(-2);

  return (
    <div className="container">
      <div className="timer-container">
        <span className="minutes">{formatTime(minutes)}</span> : <span className="seconds">{formatTime(seconds)}</span>
      </div>
      <div className="button-container">
        <div className="button start" onClick={startButtonClickHandler}>
          Start
        </div>
        <div className="button stop" onClick={stopButtonClickHandler}>
          Stop
        </div>
        <div className="button reset" onClick={resetButtonClickHandler}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default App;
