import React from "react";
import styled from "styled-components";

const CarouselItemStyle = styled.img`
  // 모든 캐러셀 아이템들은 가려져있다. active 를 따져서 보여야한다.
  opacity: 0;

  position: absolute;
  top: 0;
  width: 100%;
  padding: 1rem 3rem;
  margin: auto;
  z-index: 100;

  // 속성은 , 로 나열된다.
  transition: transform 0.5s, opacity 0.5s, z-index 0.5s;

  // prev 와 next 는 active 양쪽으로 있을 것이다.
  transform: ${({ prev, next }) => (prev ? "translateX(-100%)" : next ? "translateX(100%)" : "")})

  // z-index 로 위로 올려줘야한다.
  z-index: ${({ prev, next }) => (prev || next ? 800 : "")};

  // 속성을 미리 정하지말고, props 에 따라 속성과 값을 완전히 설정한다.
  ${({ active }) =>
    active &&
    `
    opacity: 1;
    z-index: 101;
  `}
`;

const CarouselItem = ({ src, active, prev, next }) => {
  // props 를 그대로 가져간다.
  return <CarouselItemStyle src={src} active={active} prev={prev} next={next} />;
};

export default CarouselItem;
