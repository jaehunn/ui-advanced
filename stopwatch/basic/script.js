// start 버튼은 stop 으로 바뀔 수 있고, reset 버튼은 laps 로 바뀔 수 있다.

// stopwatch 요소에 이벤트를 핸들링한다 (버블링)
// 1. stopwatch 요소 안의 start 와 reset 버튼을 잡는다.
// 2. start, reset 에 대한 핸들링을 정의한다. 그외 요소에 대해 가드절로 거른다.

const stopwatchEl = document.querySelector(".stopwatch");

// 핸들러를 스코프로 가둔 이유는? IIFE 로 왜 정의 했을까 -> 상태 및 함수 캡슐화
stopwatchEl.onclick = (() => {
  let runningFlag = false; // start, stop 또는 laps, reset 의 판단 기준이 된다.
  let elapsedTime = { mm: 0, ss: 0, ms: 0 }; // 업데이트 된다. -> let
  let laps = []; // 초기화가능성이 있다. -> let

  const [startStopButtonEl, resetLapsButtonEl] = document.querySelectorAll(".stopwatch > .control");

  const startStopButtonHandler = (() => {
    let timerId = null; // stop 시 setInterval 을 풀어줘야한다.

    const start = () => {
      let { mm, ss, ms } = elapsedTime;

      // ms 두자리까지 표현되므로, 10ms 까지 표현된다.
      timerId = setInterval(() => {
        ms += 1;

        if (ms >= 100) {
          ss += 1;

          ms = 0;
        }

        if (ss >= 60) {
          mm += 1;

          ss = 0;
        }

        // 경과된 시간으로 reset 버튼의 활성화 상태를 판단한다.
        resetLapsButtonEl.disabled = mm + ss + ms === 0;

        elapsedTime = { mm, ss, ms };

        // 시간 렌더링 함수 호출
        renderElapsedTime();
      }, 10);
    };

    // timerId 를 clear 한다.
    const stop = () => clearInterval(timerId);

    // 1. runningFlag 로
    return () => {
      runningFlag ? stop() : start();
      runningFlag = !runningFlag; // 반전

      // 컨텐츠 내용
      startStopButtonEl.textContent = runningFlag ? "STOP" : "START";
      resetLapsButtonEl.textContent = runningFlag ? "LAPS" : "RESET";
    };
  })();

  const resetLapsButtonHandler = (() => {
    // reset 되면, 지난 시간이 0ms 로 초기화되므로 더이상 reset 할 수 없다.
    const reset = () => {
      resetLapsButtonEl.disabled = true;

      elapsedTime = { mm: 0, ss: 0, ms: 0 };

      // elapsed 렌더링
      renderElapsedTime();

      // laps 초기화
      laps = [];
      renderLaps();
    };

    const addLap = () => {
      laps = [...laps, elapsedTime]; // 캡쳐한 시간을 붙힌다.

      // laps 를 render 한다.
      renderLaps();
    };

    // runningFlag 가 true 임은 start 상태임을 뜻하고 laps 를 찍을 수 있음을 뜻한다.
    return () => {
      runningFlag ? addLap() : reset();
    };
  })();

  const renderElapsedTime = (() => {
    const displayEl = document.querySelector(".stopwatch > .display");

    return () => {
      displayEl.textContent = formatElapsedTime(elapsedTime);
    };
  })();

  const renderLaps = (() => {
    const lapsEl = document.querySelector(".stopwatch > .laps");

    // laps 를 잡고 컴포넌트를 생성하고 붙힌다.
    const createLapElement = (newLap, no) => {
      const fragEl = document.createDocumentFragment();
      const noEl = document.createElement("div");

      noEl.textContent = no;
      fragEl.appendChild(noEl);

      const newLapEl = document.createElement("div");
      newLapEl.textContent = formatElapsedTime(newLap);
      fragEl.appendChild(newLapEl);

      lapsEl.appendChild(fragEl);
      lapsEl.style.display = "grid";
    };

    const removeAllLapElement = () => {
      // lap-title 이 아닌 laps 에 대해 모두 삭제한다.
      document.querySelector(".laps > div:not(.lap-title)").forEach((lapEl) => lapEl.remove());

      lapsEl.style.display = "none";
    };

    // renderLaps 는 reset 파트, addLaps 파트에 반응한다.
    // laps 길이가 판단 기준이 된다.
    return () => {
      const { length } = laps;

      if (length) {
        const newLap = laps[length - 1];

        // 마지막 laps 정보를 렌더링한다.
        createLapElement(newLap, length);
      } else {
        removeAllLapElement();
      }
    };
  })();

  const formatElapsedTime = (() => {
    // 각 시간이 일의 자리로 표현되면 0이 앞에 추가되어야한다
    const format = (n) => (n < 10 ? "0" + n : n + "");

    return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}}`;
  })();

  // 핸들러 부, 버블링으로 잡힌 요소를 컨트롤한다.
  return ({ target }) => {
    if (!target.classList.contains("control")) return;

    // 가드절로 필터하면, 둘 중하나로 범위를 좁힐 수 있다. (start 버튼 또는 reset 버튼)
    target === startStopButtonEl ? startStopButtonHandler() : resetLapsButtonHandler();
  };
})();

// startStopButtonHandler()
//

// resetLapsButtonHandler()
