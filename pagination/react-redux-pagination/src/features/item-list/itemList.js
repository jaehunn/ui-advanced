import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentPageItems } from "../../app/modules/items";
import styled from "styled-components";

const ItemStyle = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  & > div {
    float: right;
    vertical-align: middle;
  }

  & > p {
    margin: 10px 0;
  }
`;

const ItemList = () => {
  // items reducer 에 대해 currentPageItems 상태를 가져온다.
  const { currentPageItems } = useSelector((state) => state.items);
  const dispatch = useDispatch(); // dispatch() 에 액션 함수를 넣는다.

  // ISSUE) currentPageItems 에 proxy 가 담긴다.
  // 파라미터에서 바로 디스터럭처링을 남용하면 const 객체에 대해 속성을 변경할 수 없다. 객체.속성 = 값 으로 const 한 객체 속성에 변경을 가할 수 있다.
  useEffect(() => {
    dispatch(getCurrentPageItems({ targetPageNum: 1 }));
  }, [dispatch]);

  return currentPageItems.map(({ profile_url, author, createdAt, content }, index) => (
    <ItemStyle key={`item${index}`}>
      <img src={profile_url} alt="" />

      <span>{author}</span>

      <div>{createdAt}</div>

      <p>{content}</p>
    </ItemStyle>
  ));
};

export default ItemList;
