import React, { useState, useEffect, useRef } from "react";
import GlobalStyle from "./global";
import CarouselItem from "./CarouselItem";
import Button from "./Button";

const App = () => {
  const itemsLength = 5;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const prevButtonClickHandler = () => {
    if (!isMoving.current) {
      const newCurrentItemIndex = currentItemIndex === 0 ? itemsLength - 1 : currentItemIndex - 1;

      setCurrentItemIndex(newCurrentItemIndex);
    }
  };

  const nextButtonClickHandler = () => {
    if (!isMoving.current) {
      const newCurrentItemIndex = currentItemIndex === itemsLength - 1 ? 0 : currentItemIndex + 1;

      setCurrentItemIndex(newCurrentItemIndex);
    }
  };

  // isMoving 을 어떻게 알까?
  // currentItemIndex 를 useEffect deps 로 감지하자.
  const isMoving = useRef(false); // ref 로 기억한다.
  useEffect(() => {
    // currentItemIndex 가 변하면 true 로 바꾸고 일정시간을 지연시킨다.
    // ref 는 .current 로 접근하기

    isMoving.current = true;

    // carousel item 의 transition delay 로 한다.
    setTimeout(() => {
      isMoving.current = false;
    }, 500);
  }, [currentItemIndex]);

  return (
    <>
      <GlobalStyle />

      {
        // 캐러셀 아이템들을 나열해야한다. 더불어서 currentItemIndex 에 따라 prev, next, active 클래스를 설정해야한다.
        // CarouselItem 은 클래스명을 다르게 가지며 그에 따라 스타일이 변한다.
        Array(itemsLength)
          .fill(null)
          .map((_, index) => {
            // 캐러셀 아이템은 currentItemIndex 에 따라 prev 가 누구인지, next 가 누구인지, active 가 누구인지안다.
            const prevItemIndex = currentItemIndex === 0 ? itemsLength - 1 : currentItemIndex - 1;
            const nextItemIndex = currentItemIndex === itemsLength - 1 ? 0 : currentItemIndex + 1;

            // 현재 itemIndex 와 비교한 불리언값을 props 로 넘겨 style 을 설정하자.
            return (
              <CarouselItem
                src={`https://picsum.photos/id/${index}/1600/900`}
                key={`item_${index}`}
                active={index === currentItemIndex}
                prev={index === prevItemIndex}
                next={index === nextItemIndex}
              />
            );
          })
      }

      <Button type="prev" onClick={prevButtonClickHandler} />
      <Button type="next" onClick={nextButtonClickHandler} />
    </>
  );
};

export default App;
