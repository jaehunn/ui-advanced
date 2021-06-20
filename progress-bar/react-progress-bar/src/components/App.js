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
  const isLoading = useRef(false); // isLoading 플래그로 이벤트 처리에 제약을 가하자.

  // setTimeout() 을 처리하고 프라미스를 뱉는 비동기 함수를 만들자.
  // buttonHandler 에서 프라미스를 처리하자. async/await

  // setTimeout() 의 delay 는 몇으로 해야할까? width 가 1%씩 증가하는 속도와 맞춰야할것이다.

  const delayTime = (delay) => {
    isLoading.current = true; // 로딩중으로 바뀌고

    // 프라미스 안에서 setTimeout() 을 처리한다. 따로 귀결값은 필요없다.
    // delay 가 지난 후에는 다시 풀어줘야겠다.
    return new Promise(() => setTimeout(() => (isLoading.current = false), delay));
  };

  const prevButtonHandler = async () => {
    // guard
    if (isLoading.current) return;
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);

    await delayTime(animationSpeed);
  };

  const nextButtonHandler = async () => {
    // guard
    if (currentIndex === lastIndex) return;
    if (isLoading.current) return;

    setCurrentIndex(currentIndex + 1);

    await delayTime(animationSpeed);
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
