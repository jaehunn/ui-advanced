import { useState, useEffect } from "react";

const useStopwatch = (() => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState({ mm: 0, ss: 0, ms: 0 });
  const [laps, setLaps] = useState([]);
})();

const formatElapsedTime = (() => {})();
