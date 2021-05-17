import { useState, useEffect } from "react";

const formatElapsedTime = (() => {
  const format = (n) => (n < 10 ? "0" + n : n + "");

  return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}`;
})();

const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState({ mm: 0, ss: 0, ms: 0 });
  const [laps, setLaps] = useState([]);

  // elapsedTime 변경 함수
  const updateElapsedTime = () => {
    setElapsedTime(({ mm, ss, ms }) => {
      ms += 1;

      if (ms >= 100) {
        ss += 1;

        ms = 0;
      }

      if (ss >= 60) {
        mm += 1;

        ss = 0;
      }

      return { mm, ss, ms };
    });
  };

  useEffect(() => {
    let targetTimer = null;

    if (isRunning) targetTimer = setInterval(updateElapsedTime, 10);

    return () => {
      clearInterval(targetTimer);
    };
  }, [isRunning]);

  const reset = () => {
    setElapsedTime({ mm: 0, ss: 0, ms: 0 });

    setLaps([]);
  };

  const addLap = () => setLaps([...laps, elapsedTime]);

  return {
    isRunning,
    elapsedTime: formatElapsedTime(elapsedTime),
    laps: laps.map((lap) => formatElapsedTime(lap)),
    setIsRunning,
    addLap,
    reset,
  };
};

export default useStopwatch;
