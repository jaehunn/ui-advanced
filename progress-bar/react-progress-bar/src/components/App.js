import React, { useState, useRef } from "react";
import { ProgressBar, Button } from ".";

const App = () => {
  // 어떤 것들을 상태로 가져야할까?
  // 상태는 변화의 대상이지만 width 는 아니다. 어떤 것에 대해 상수만큼 변한다.
  // 어떤 것은 prev 버튼과 next 버튼에 조절된 숫자로 하자. 이것을 상태로 채택하면, 파생되어 width 가 바뀐다.
  // speed 는 내가 최초에 한번만 설정하면된다.
  const lastIndex = 4;
  const animationSpeed = 500;

  const [currentIndex, setCurrentIndex] = useState(0);
  const widthPerIndex = 100 / lastIndex;
  const currentWidth = currentIndex * widthPerIndex;
  // width 는 어떤 것에 변하므로 의존하는 변수로 값을 가져야한다.

  // 버튼 클릭을 일정시간 제한시키려면 어떻게 해야할까?
  // 핸들링에서 setTimeout 을 걸자.
  // setTimeout 함수를 중복해서 발생시키지 않아야한다. flag 를 설정하자.

  // useState() 와 useRef() 로 상태를 가지는 것에는 어떤 차이가 있을까?

  const prevButtonHandler = () => {
    // guard
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
  };

  const nextButtonHandler = () => {
    // guard
    if (currentIndex === lastIndex) return;

    setCurrentIndex(currentIndex + 1); // ...
  };

  return (
    <div>
      <ProgressBar width={currentWidth} animationSpeed={animationSpeed} />

      {/* button 의 라벨, 핸들러를 넘기자 */}
      <Button title="Prev" onClick={prevButtonHandler} />
      <Button title="Next" onClick={nextButtonHandler} />
    </div>
  );
};

export default App;
