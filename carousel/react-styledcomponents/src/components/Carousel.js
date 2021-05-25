import React from "react";
import styled from "styled-components";
import { useCarousel } from "../hooks";

const Container = styled.div`
  width: ${({ width }) => width}px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  // 요소가 렌더링되고 너비가 결정될 때까지 감춘다.
  opactiy: ${({ width }) => (width ? 1 : 0)};
`;

const Slides = styled.div`
  display: flex;

  // 마운트와 렌더링에 대한 지연시간 컨트롤
  transition: transform ${({ duration }) => duration}ms ease-out;

  // 슬라이딩
  // css 변수로 사용했던 것들을 props 로 처리할 수 있다.
  transform: translate3D(${({ currentSlide }) => currentSlide * -100}%, 0, 0);
`;

const Img = styled.img`
  padding: 5px;
`;

// 버튼 공통 스타일 정의
const Control = styled.button`
  // Container 안에서 좌우로 배치될 것이다.
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  color: #fff;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  z-index: 99;

  &:focus {
    outline: none;
  }
`;

// 공통 스타일 확장하기
const PrevControl = styled(Control)`
  left: 0;
`;

const NextControl = styled(Control)`
  right: 0;
`;

const Carousel = () => {
  // 핸들링
  // 1. 컴포넌트 마운트시, 너비 세팅하기
  // 2. 버튼 클릭시 슬라이딩
  // 3. 슬라이드 사이클링
  const { images, width, currentSlide, isMoving, duration, setWidth, setIsMoving, sliding } = useCarousel();

  const handleImageLoad = ({ target }) => {
    if (width !== target.offsetWidth) setWidth(target.offsetWidth);

    sliding(1);
  };

  const handleButtonClick = ({ target }) => {
    // 지연시간 중에 동작하지않는다.
    if (isMoving) return;

    const delta = target.id === "prev" ? -1 : 1;

    sliding(currentSlide + 1 * delta, 500);
  };

  // 사이클 핸들러
  const handleTransitionEnd = () => {
    setIsMoving(false);

    // 맨 앞 이미지는 본래 마지막 이미지로 이동한다. (마지막에서 -1)
    // 맨 뒤 이미지는 본래 첫 이미지로 이동한다. (1)
    const delta = currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

    if (delta === 0) return;

    sliding(currentSlide + images.length * delta);
  };

  return (
    <Container width={width}>
      {/* Carosel Slides */}
      <Slides currentSlide={currentSlide} duration={duration} onTransitionEnd={handleTransitionEnd}>
        {[images[images.length - 1], ...images, images[0]].map((url, index) => (
          <Img key={`image${index}`} src={url} onLoad={handleImageLoad} />
        ))}
      </Slides>

      {/* Buttons */}
      <PrevControl id="prev" onClick={handleButtonClick}>
        &laquo;
      </PrevControl>
      <NextControl id="next" onClick={handleButtonClick}>
        &raquo;
      </NextControl>
    </Container>
  );
};

export default Carousel;
